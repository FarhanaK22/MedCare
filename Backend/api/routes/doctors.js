const express = require("express")
const router = express.Router()

const doctorsData = require("../controllers/doctorsController/doctors.js")
router.get('/doctors',doctorsData)

module.exports = router