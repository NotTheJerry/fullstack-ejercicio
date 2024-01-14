const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate('blogs')
    response.json(allUsers)
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.username || !body.password){
        return response.status(400).json( { "error": "No username/password was given" } )
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
    })

    const savedUser = await newUser.save()
    
    response.status(201).json(savedUser)
})

module.exports = userRouter