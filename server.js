const express = require('express')
const mongoose = require('mongoose') 
const postRouter = require('./resources/Post')


require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
const db = mongoose.connection

app.use(express.json())

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.use('/v1/post', postRouter)


app.listen(3000, function () {
  console.log('Server is running port 3000')
})