const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')


// HOME PAGE
router.get('/',(req,res)=>{
    res.send("HOME ROUTE FOR API")
})

// REGISTRATION API FOR BOTH CUSTOMER AND ADMIN
router.post('/users',userController.createUser)

// ADMIN LOGIN API
router.post('/admin',userController.adminLogin)

// EMAIL VERIFICATION API
router.get('/verify/:token',userController.emailVerification)


module.exports = router