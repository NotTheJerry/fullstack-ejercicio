const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./mongo')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('content-value', (request) => JSON.stringify(request.body) )

app.use( morgan(':method :url :status :res[content-length] - :response-time ms :content-value', { skip: (req, res) => req.method !== 'POST' }))

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === "CastError"){
        return response.status(400).send( { error: "Malformatted id" } )
    } else if(error.name === 'ValidationError'){
        return response.status(400).json( { error: error.message })
    }

    next(error)
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    const persons = Person.find({})
    .then(persons => {
        response.send(`Phonebook has ${persons.length} people<br />${date.toString()}`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if(person){
            response.json(person)
        } else {
            response.status(404).json({ "error": `Couldn't find any person with the ${request.params.id}` })
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
    .then(updatedNote => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({ "error": "missing name or number" });
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    });

    newPerson.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Person.findByIdAndUpdate(request.params.id, { number: body.number }, { new: true, runValidators: true })
    .then(updatedPerson =>{
        if(updatedPerson){
            response.json(updatedPerson)
        } else {
            response.status(404).json( { "error": "couldn't find any person with that id" } )
        }
    })
    .catch(error => next(error))
})


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})
  