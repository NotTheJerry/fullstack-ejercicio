const Blog = require('../models/blog')
const User = require('../models/user')

const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const initialUsers = [
    {
        username: "GeraTetrix",
        name: "Gera Glez",
        password: "prueba123"
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const getToken = async () => {
    const logginUser = {
        username: "GeraTetrix",
        name: "Gera Glez",
        password: "prueba123"
    }

    const response = await api.post('/api/login').send(logginUser).expect(200).expect('Content-Type', /application\/json/)
    return response.body.token
}

module.exports = { blogsInDB, initialUsers, usersInDb, getToken }