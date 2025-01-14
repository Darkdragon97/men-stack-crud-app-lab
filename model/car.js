const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  isReadyToGo: { type: Boolean, set: (v) => v === 'on' }
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car
