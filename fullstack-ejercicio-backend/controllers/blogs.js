const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', (request, response) => {
  const { title, url } = request.body
    if(!title || !url){
      return response.status(400).json({ error: "Blog validation failed" })
    }

    const blog = new Blog(request.body)

    blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error) => { 
      response.status(400).json({ error: error.message }) 
      next(error)
    })
})

module.exports = blogRouter