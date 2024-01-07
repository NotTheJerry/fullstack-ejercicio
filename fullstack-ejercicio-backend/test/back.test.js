const Blog = require('../models/blog')
const helper = require('./helper.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const initialBlogs = helper.initialBlogs.map(blog => new Blog(blog))
    const arrayPromises = initialBlogs.map(blog => blog.save())
    await Promise.all(arrayPromises)

})

test('can get all blogs in root endpoint', () => {
    const blogs = api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id property is been converted well', async () => {
    const { body } = await api.get('/api/blogs')

    expect(body[1].id).toBeDefined()
})

test('can post at endpoint /api/blogs', async () => {
    const newBlog = {
        title: 'Nuevo blog',
        author: 'Que onda',
        url: 'http://a-tu-corazon.com.mx',
        likes: 222
    }

    await api.post('/api/blogs').send(newBlog)

    const blogsInDB = await Blog.find({})

    expect(blogsInDB).toHaveLength(helper.initialBlogs.length + 1)
})

test('correct status is returned when not including title/url', async () => {
    const newBlog = {
        author: 'Autor del blog',
        likes: 5 // Otros campos necesarios, pero sin 'title' y 'url'
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Blog validation failed')
})



afterAll(() => {
    mongoose.connection.close()
})