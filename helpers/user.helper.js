const User = require('../models/user.model')

async function findLastInsertedUser() {
  console.log('Find last inserted user')

  try {
    const result = await User.find({}).sort({ _id: -1 }).limit(1);  // CRUD Database operation
    return result[0];
  } catch(err){
    return false;
  }
}

module.exports = { findLastInsertedUser}
