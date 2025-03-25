const express = require("express")
const router = express.Router()

const {doctorsData} = require("../controllers/doctorsController/doctors.js")
const {filterDoctors }= require("../controllers/doctorsController/doctors.js")
const {search_doctor} = require("../controllers/doctorsController/doctors.js")
const {doctorID} = require("../controllers/doctorsController/doctors.js")

router.get('/all',doctorsData)
router.get('/filter',filterDoctors)
router.get("/search/:query",search_doctor) 
router.get("/booking/:doctor_id",doctorID)

module.exports = router