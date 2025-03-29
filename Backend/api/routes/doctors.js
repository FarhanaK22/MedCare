const express = require("express")
const router = express.Router()


const {filterDoctors,
    availableSlots ,
    doctorID,
    doctorAvailability 
    ,reviews,
    allSlots,
    doctorSlots}= require("../controllers/doctorsController/doctors.js")
const passport = require("../../passport-local.js");

router.get('/filter',filterDoctors)
router.get("/detail/:doctor_id",passport.verifyToken, doctorID)
router.get('/availableSlots', availableSlots)
router.get('/doctorAvailability/:doctor_id',passport.verifyToken,doctorAvailability)
router.get('/doctorSlots/:doctor_id',passport.verifyToken,doctorSlots)
router.get('/allSlots',allSlots)
router.get('/reviews',reviews)
module.exports = router