const { response } = require('../app')
const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request, response, next) => {
 
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    const token = authorization.substring(7)
    request.token = token
    next()
  } else {
    return response.status(401).json({ error: 'Token has an error or is empty '})
  }
}

const getUserFrom = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(decodedToken.id){
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
  } 
}

const errorHandler = (error, request, response, next) => {
    logger.error('Errorhandler middleware says', error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({ 'error': 'malformatted id' })
      } else if (error.name === 'ValidationError'){
        return response.status(400).send({ error: error.message })
      } else if(error.name === 'JsonWebTokenError'){
        return response.status(400).json({ error: error.message })
      } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
          error: 'token expired'
        })
    }

    next(error)
}

module.exports = { getUserFrom, getTokenFrom, errorHandler, }