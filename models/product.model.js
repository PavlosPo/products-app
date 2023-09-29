const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let productSchema = new Schema({
  product: { type: String, required: true},
  cost: { type: Number, required: true},
  description: { type: String },
  quantity: { type: Number}
}, {
  collection: 'products',
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)