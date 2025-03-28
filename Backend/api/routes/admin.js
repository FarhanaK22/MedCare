const express = require("express")
const router = express.Router()
const {doctorsData} = require("../controllers/adminController/admin.js")
const {addDoctor}=require("../controllers/adminController/admin.js")
const {updateDoctor}=require("../controllers/adminController/admin.js")
const {deleteDoctor}=require("../controllers/adminController/admin.js")
const {manageBooking}=require("../controllers/adminController/admin.js")
const {bookings} = require("../controllers/adminController/admin.js")
const {adminLogin} = require("../controllers/adminController/admin.js")

router.post('/adminLogin',adminLogin)
router.get('/all',doctorsData)
router.post('/addDoctor',addDoctor)
router.patch('/updateDoctor',updateDoctor)
router.delete('/deleteDoctor',deleteDoctor)

router.get('/bookings',bookings)
router.patch('/manageBooking',manageBooking)



module.exports = router