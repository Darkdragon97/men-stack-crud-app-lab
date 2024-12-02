const Car = require('../model/car')

const router = require('express').Router()

router.get('/car', async (req, res) => {
  const car = await Car.find()
  res.render('car/index.ejs', {
    car
  })
})

router.get('/car/new', (req, res) => {
  router.get('cars/new.ejs')
})

router.post('/car', async (req, res) => {
  if (req.body.isReadyToGo === 'on') {
    req.body.isReadyToGo = true
  } else {
    req.body.isReadyToGo = false
  }
  await Car.create(req.body)
  res.redirect('/car')
})

router.get('/car/:carId', async (req, res) => {
  const car = await Car.findById(req.params.carId)
  res.render('car/show.ejs', { Car })
})

router.delete('/car/:carId', async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId)
  res.redirect('/car')
})

router.get('/car/:carId/edit', async (req, res) => {
  const car = await Car.findById(req.params.carId)
  res.render('Car/edit.ejs', { car })
})

router.put("/car/:carId", async (req, res) => {
  if(req.body.isReadyToGo === "on"){
    req.body.isReadyToGo = true
  } else {
    req.body.isReadyToGo = false
  }
  await Car.findByIdAndUpdate(req.params.carId, req.body)
  res.redirect(`/Car/${req.params.carId}`)
})

module.exports = router