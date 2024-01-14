const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
  })
  
blogRouter.post('/', middleware.getTokenFrom, middleware.getUserFrom, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!request.token || !decodedToken.id){
    return response.status(401).send({ error: "missing token or token invalid" })
  }

  if(!body.title || !body.url){
    return response.status(400).json({ error: "Blog validation failed" })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  user.blogs = user.blogs.concat(blog)
  await user.save()

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.getTokenFrom, middleware.getUserFrom, async (request, response, next) => {

  const blog = await Blog.findById(request.params.id)
  const user = await User.findById(request.user)

  if(user && blog){
    if(blog.user.toString() === user.id){
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end() //No content - 204
    } else {
      return response.status(401).json({ error: "You can't delete a blog that is not of your property" }) //Unauthorized - 401
    }
  } else {
    response.status(404).json({ error: "Couldn't find any blog/user" })  //Not found - 404
  }

  next()
  
})

blogRouter.put('/:id', middleware.getTokenFrom, middleware.getUserFrom, async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!request.token || !decodedToken.id){
    return response.status(401).send({ error: "missing token or token invalid" })
  }
  const blogToUpdate = Blog.findOne({ _id: request.params.id })

  if(!blogToUpdate){
    return response.status(404).json({ error: "Blog ID given couldn't be found" })
  }

  const body = request.body

  const newNote = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: body.userId
  }

  await Blog.findByIdAndUpdate(request.params.id, newNote, { new: true })

  response.status(200).json(newNote)

  next()
})

module.exports = blogRouter