const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const PORT = 3000

app.get('/', (req, res) => {
  res.render('index.ejs')
})

// Corrected mongoose connection line
mongoose.connect(process.env.MONGOOSE_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

// Corrected express.urlencoded and methodOverride
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

const carCtrl = require('./controllers/car')

app.use('/', carCtrl)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
