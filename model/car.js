const mongoose = require('mongoose')

const carShema = new mongoose.Schema ({
  name: String,
  isReadyToGo: Boolean
})

const Car = mongoose.model('Car', carShema)

module.exports = Car