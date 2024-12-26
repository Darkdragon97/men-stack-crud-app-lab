const Car = require('./model/car')

const express = require('express')

require('dotenv').config()

const app = express()

const mongoose = require('mongoose')

const methodOverride = require('method-override')

const port = 3000
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

// Corrected mongoose connection line
mongoose.connect(process.env.MONGOOSE_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.get('/car/new', (req, res) => {
  res.render('new')
})

app.post('/car', async (req, res) => {
  await Car.create(req.body)
  console.log(req.body.name + req.body.isReadyToGo)
  res.redirect('/car')
})

app.get('/car', async (req, res) => {
  const cars = await Car.find()
  res.render('car/index.ejs', { cars })
})

app.get('/car/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render('car/show.ejs', { car })
  } catch (error) {
    console.error('Error fetching car:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.get('/car/:id/edit', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) {
      return res.status(404).send('Car not found')
    }
    res.render('car/edit.ejs', { car })
  } catch (error) {
    console.error('Error rendering edit view:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.put('/car/:id', async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.redirect(`/car/${car._id}`)
})

app.delete('/car/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id)
  res.redirect('/car')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, (req, res) => {
  console.log('App is listening on port:', port)
})
