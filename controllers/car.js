const Car = require('../model/car');
const router = require('express').Router();

router.get('/car', async (req, res) => {
  try {
    const cars = await Car.find();
    res.render('car/index.ejs', { cars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/car/new', (req, res) => {
  res.render('new.ejs'); // Fixed rendering
});

router.post('/car', async (req, res) => {
  try {
    req.body.isReadyToGo = req.body.isReadyToGo === 'on';
    await Car.create(req.body);
    res.redirect('/car');
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(400).send('Bad Request');
  }
});

router.get('/car/:carId', async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    res.render('car/show.ejs', { car });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(404).send('Car Not Found');
  }
});

router.delete('/car/:carId', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.carId);
    res.redirect('/car');
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/car/:carId/edit', async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    res.render('car/edit.ejs', { car });
  } catch (error) {
    console.error('Error fetching car for edit:', error);
    res.status(404).send('Car Not Found');
  }
});

router.put('/car/:carId', async (req, res) => {
  try {
    req.body.isReadyToGo = req.body.isReadyToGo === 'on';
    await Car.findByIdAndUpdate(req.params.carId, req.body);
    res.redirect(`/car/${req.params.carId}`);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
