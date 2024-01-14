const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
require('express-async-errors')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
    console.log('Successfull conecction to the DB');
}).catch(error => {
    console.log('An error ocurred', error);
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app