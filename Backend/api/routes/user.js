const express = require("express")
const router = express.Router()

const userLogin = require ("../controllers/userController/login.js")
router.get('/login',userLogin)

module.exports = router