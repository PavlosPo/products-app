const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

let addressSchema = new Schema({
  area: {type: String}, 
  road: {type: String}
}, {_id: false})

let phoneSchema = new Schema({
type: {type: String},
number: {type: String}
}, {_id: false})  // this is because it's subdocument, and doesn't have to have an id

let productSchema = new Schema({
product: {type: String},
cost: { type: Number },
quantity: { type: Number, required: true},
date: {type: Date, default: Date.now}
})


let userSchema = new Schema({ // this is something like protection before entering the data in the database
  username: {
    type: String,
    required: [true, "Username is required field"],
    max: 10,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String, 
    required: [true, "Password is required field"],
    max: 15
  },

  name: {
    type: String
  }, 

  surname: {
    type: String
  },

  email: {
    type: String,
    required: [true, "Email is required field"],
    max: 20,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email address is not valid"],
    null : false
  },
  address: addressSchema,  // this tells mongoose, check the 'addressSchema' created below 
  phone: {
    type: [phoneSchema], // array of phoneSchema
    null: true
  },
  products: {type: [productSchema], null: true}
}, {  // second object == database related config
  collection: 'users',  // the mongo table/document to corralte it to 
  timestamps: true  // imports two fileds. createTmp and updateTmp
});


userSchema.plugin(uniqueValidator)  // this adds the plugin, for uniquness in the USER SCHEMA

module.exports = mongoose.model('User', userSchema) // this exports the Schema
// the 'User' is the callable object for the rest of the app.
