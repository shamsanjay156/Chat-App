const User =  require('../models/userModel')
const express = require("express");
const router = express.Router();
const {check} = require('express-validator')
const {register,login,setAvatar,allUser} = require('../controllers/userController')

router.post('/register',[
    check('username', "username should be atleast 3 characters").isLength({ min: 3, max: 32 }),
    check('email', "email should be valid email").isEmail(),
    check('password', "pasword should be atleast 8 characters").isLength({ min: 8, max: 20 }),
],register)
router.post('/login',[
    check('email', "email should be valid email").isEmail(),
    check('password', "pasword should be atleast 8 characters").isLength({ min: 8, max: 20 }),
],login)
router.post('/setAvatar',setAvatar)
router.get('/allusers',allUser)

module.exports = router