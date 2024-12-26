const mongoose = require('mongoose')

const carShema = new mongoose.Schema ({
  name: String,
  isReadyToGo: { type: Boolean, set: v => v === 'on'}
})

const Car = mongoose.model('Car', carShema)

module.exports = Car