const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Routes
const cors = require('cors')
const user = require('./routes/user.route') // this is the 'user' file
const product = require('./routes/product.route') // for 'product' file
const user_products = require('./routes/user-product.route')

// Swagger - UI
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require("./swagger")

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument.options)
)

// .Env
require('dotenv').config(); // .env

// Connection
mongoose.connect(process.env.MONGODB_URI) // this is from .env file
  .then(
    () => { console.log("Connection with database established")}, // if successfull
    err => { console.log("Failed to connect to MongoDB", err)}  // if rejected
  )


// Cross - Origin Protection
app.use(cors({
  origin: '*', // any ip
  // origin: ['https://www.example.com', 'http://localhost:8000']
}));  // to enable requests from other servers to ours

app.use('/', express.static('files')) // read files inside file, named : 'files' 


app.use('/api/users', user) // it will be called when someone calles '/api/users'

app.use('/api/users-products', user_products)

module.exports = app;