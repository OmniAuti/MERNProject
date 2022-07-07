const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Must provide type'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Must provide a quantity'],
  },
  description: {
    type: String,
    required:[true, 'Must provide description'],
    trim: true,
    maxlength:[49, 'Description can not be more than 49 characters']
  },
  condition: {
    type: String,
      required: [true, 'Must provide condition'],
  },
  location: {
    type: String,
    required:[true, 'Must provide city or town'],
    maxlength: [49, 'Please Provide a city or town'],
  },
  zipcode: {
    type: String,
    required:[true, 'Must provide a ZIP code'],
  }
})




module.exports = mongoose.model('Items', ItemSchema)