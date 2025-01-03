const express = require ('express')
const registerUser = require('../controller/registerUser')  // controller of the register user 
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')
const searchUser = require('../controller/searchUser')

const router = express.Router()

//Routing 
//Express provides a simple way to define routes for handling HTTP requests.
// "HTTP" request pahle route par hi ata hai, route controller par bhejta hai, controller model par and model database se intract karta hai.
//Routes are used to map different URLs to specific pieces of code, making it easy to organize your application's logic.

// Create api
router.post('/register', registerUser)

router.post('/email', checkEmail)  // Ye api login ke liye hai (Ham login two part me karenge pahle "email" check karenge phir "password" check karenge)
router.post('/password', checkPassword)

router.get('/user-details',userDetails)
router.get('/logout',logout)
router.post('/update-user',updateUserDetails)
router.post("/search-user",searchUser)


module.exports = router 