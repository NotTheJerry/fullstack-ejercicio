const mongoose = require('mongoose')
require('dotenv').config()
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(process.env.MONGODB_URI)
.then(result => {
    console.log('conected to MongoDB');
})
.catch(error => {
    console.log('error connecting to MongoDB', error.message);
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    number: {
        type: String,
        required: true,
        minlength: 8,
        unique: true,
    },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)


