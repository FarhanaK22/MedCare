const express = require("express")
const router = express.Router()


const {filterDoctors }= require("../controllers/doctorsController/doctors.js")
const {doctorID} = require("../controllers/doctorsController/doctors.js")
const {availableSlots } =  require("../controllers/doctorsController/doctors.js")
const {doctorAvailability} =  require("../controllers/doctorsController/doctors.js")

router.get('/filter',filterDoctors)
router.get("/detail/:doctor_id",doctorID)
router.get('/availableSlots',availableSlots)
router.get('/doctorAvailability/:doctor_id',doctorAvailability)

module.exports = router