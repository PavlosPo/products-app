const User = require('../models/user.model')
const { use } = require('../routes/user.route')


exports.findAll = async(req, res) => {
  console.log("find all user-products")

  try {
    const results = await User.find({}, { username: 1, products: 1})
    res.status(200).json({status: true, data: results})
    console.log("Successfully found all users")

  } catch(error) {
    res.status(400).json({status: false, data: error})
    console.log("Problem in reading user's products")
  }
}

exports.findOne = async(req, res) => {
  const username = req.params.username
  console.log("Finding one user")

  try {
    const result = await User.findOne({username: username}, {username: 1, products: 1})
    res.status(200).json({status: true, data: result})
    console.log("Success in reading user's products")
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log("Problem in finding user")
  }
}

exports.addProduct = async(req, res) => {
  const username = req.body.username;
  const products = req.body.products;

  console.log("Inserting product to username: ", username)

  try {
    const result = await User.updateOne(
      { username: username},
      { 
        $push: {
          product: products
        }
      }
    )

    res.status(200).json({status: true, data: result})
    console.log("Success in saving the product")

  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log("Problem saving the product")
  }
}

exports.updateProduct = async(req, res) => {
  const username = req.params.username
  const product_id = req.body.product._id
  const product_quantity = req.body.product.quantity
  
  console.log("Updating a product for username: ", username)

  try {
    const result = await User.updateOne(
      { username: username, "products._id" : product_id},
      {
        $set: {
          "products.$.quantity": product_quantity,

        }
      }
    )
  res.status(200).json({status: true, data: result})
  console.log("Success in updating the product")

  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log("Problem in updating product for user: ", username)
  }

}

exports.deleteProduct = async(req, res) => {

  const username = req.params.username
  const product = req.params.product

  try { 

    const result = await User.updateOne(
      {username: username }, 
      {
        $pull: {  // removes subdocuments
          products: { product : product } // where in products the product is 'this' product
        }
      })

    res.status(200).json({status: true, data: result})
    console.log("Success in deleting product for user: ", username)


  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log("Problem in deleting product for user: ", username)
  }
}

exports.stats1 = async(req, res) => {
  console.log("Exporting statistics 1")

  try {
    const result = await User.aggregate(
      [
        {
          $unwind: "$products"  // make them objects instead of objects inside in a list
        },
        {
          $project: { // return those values (id, username, products)
            id: 1,
            username: 1,
            products: 1
          }
        },
        {
          $group: { // group them by id.
            _id: {
              username: "$username",  // also return username
              product: "#products.product"  // and the product
            },
            totalAmount: {  // create this field
              $sum: { // where you sum
                $multiply: [ "$products.cost", "$products.quantity" ] // the cost * quantity 
              }
            },
            count: {
              $sum : 1
            }
          }
        }
      ]
    )
    res.status(200).json( {status: true, data: result})
      console.log("Succesfully returned the statistics 1")

  } catch(error) {
    res.status(400).json({ status: false, data: error})
  }
}