const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./helper.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

let token, decodedToken

beforeEach(async () => {
    
    await User.deleteMany({})
    await Blog.deleteMany({})
    
    await api.post('/api/users').send(helper.initialUsers[0]).expect(201).expect('Content-Type', /application\/json/)

    token = await helper.getToken()
    decodedToken = jwt.verify(token, process.env.SECRET)

    const newBlog = {
        title: 'Nuevo blog 1',
        author: 'Que onda 1',
        url: 'http://sharktank.com.mx',
        likes: 111,
        user: decodedToken.id
    }

    await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(201)
})

describe('users', () => {
    test('test fails if no password or ussername is given', async () => {
        const newUser = {
            username: "GeraTetrix",
            name: "Gera Glez",
            password: ""
        }
    
        await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    
        const currentUsersDb = await helper.usersInDb()
    
        expect(currentUsersDb).toHaveLength(helper.initialUsers.length)
     })
    
    test('can post at root endpoint', async () => {
        const newUser = {
            username: "Testing_User_2",
            name: "Usuario Testeo 2",
            password: "perenganito1234"
        }
    
        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
    
        const currentUsersDb = await helper.usersInDb()
    
        expect(currentUsersDb).toHaveLength(helper.initialUsers.length + 1)
    })
    
})

describe('blogs', () => {
    test('can get all blogs in root endpoint', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })
   
    test('can post at endpoint /api/blogs', async () => {
        const newBlog = {
            title: 'Can post at endpoint /api/blogs',
            author: 'Gera Glez',
            url: 'http://can-post-/api/blogs.com.mx',
            likes: 1,
            user: decodedToken.id
        };
    
        await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(201);
    
        const blogsCurrentlyInDB = await helper.blogsInDB();
    });
    
    test('can delete one blog', async () => {    
        const blogsAtTheBeggining = await helper.blogsInDB()
    
        await api.delete(`/api/blogs/${blogsAtTheBeggining[0].id}`).set('Authorization', `bearer ${token}`).expect(204)
    
        const blogsAtTheEnd = await helper.blogsInDB()
        expect(blogsAtTheEnd).toHaveLength(blogsAtTheBeggining.length - 1)
    })
    
    test('add a new blog should return a json ', async () => {     

        const newBlog = {
            title: "Blog should return a json",
            url: "http://anonymus.com",
            author: 'Anonymus',
            likes: 100,
            user: decodedToken.id,
        }
    
        await api.post('/api/blogs/').set('Authorization', `bearer ${token}`).send(newBlog).expect('Content-Type', /application\/json/)

    })    
    
    test('can update a blog succesfully', async () => {
        const allBlogs = await helper.blogsInDB()
        const blogToUpdate = allBlogs[0]

        const newBlogUpdated = {
            title: "Blog updated",
            url: "http://updating.com",
            author: 'Mr. Update',
            likes: 999,
            user: decodedToken.id,
        }

        await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `bearer ${token}`).send(newBlogUpdated).expect(200).expect('Content-Type', /application\/json/)

        const blogsAtTheEnd = await helper.blogsInDB()

        console.log('AT THE END:', blogsAtTheEnd);
        expect(blogsAtTheEnd).toHaveLength(allBlogs.length)

    })
})


afterAll(() => {
    mongoose.connection.close()
})