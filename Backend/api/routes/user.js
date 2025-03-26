const express = require("express")
const router = express.Router()

const {userLogin} = require ("../controllers/userController/user.js")
const {addReview}   = require ("../controllers/userController/user.js")
const {bookSlot} = require ("../controllers/userController/user.js")

router.post('/userlogin',userLogin)
router.post('/addReview',addReview)
router.post('/bookSlot',bookSlot)

module.exports = router