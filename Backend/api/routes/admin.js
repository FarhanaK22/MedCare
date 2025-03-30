const express = require("express")
const router = express.Router()
const {doctorsData} = require("../controllers/adminController/admin.js")
const {addDoctor}=require("../controllers/adminController/admin.js")
const {updateDoctor}=require("../controllers/adminController/admin.js")
const {deleteDoctor}=require("../controllers/adminController/admin.js")
const {bookings} = require("../controllers/adminController/admin.js")
const {adminLogin,sendMail} = require("../controllers/adminController/admin.js")


router.post('/adminLogin',adminLogin)
router.get('/allDoctor',doctorsData)
router.post('/addDoctor',addDoctor)
router.put('/updateDoctor/:id',updateDoctor)
router.delete('/deleteDoctor/:id',deleteDoctor)
router.post('/sendMail',sendMail)
router.get('/bookings',bookings)



module.exports = router