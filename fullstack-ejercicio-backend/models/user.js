const mongoose = require('mongoose')
const unqiueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        unique: true,
    },
    name: {
        type: String,
    },
    passwordHash: {
        type: String,
        minLength: 3,
        unique: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(unqiueValidator)

const User =  mongoose.model('User', userSchema)

module.exports = User