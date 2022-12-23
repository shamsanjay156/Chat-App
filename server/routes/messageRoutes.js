const User =  require('../models/userModel')
const express = require("express");
const router = express.Router();
const {addMessages,getMessgaes} = require('../controllers/messageController')

router.post('/addmsg',addMessages)
router.post('/getmsg',getMessgaes)

module.exports = router