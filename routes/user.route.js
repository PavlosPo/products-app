const express = require('express')
const router = express.Router() // get .Router()

const userController = require('../controllers/user.controller')  // gets the 'user.controller.js' file

router.get('/', userController.findAll)
router.get('/:username', userController.findOne)
router.post('/', userController.create)
router.patch('/:username', userController.update)
router.delete('/:username', userController.delete)

module.exports = router // this exports all the functions created in this file, using 'router' variable