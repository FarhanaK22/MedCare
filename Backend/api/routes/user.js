const express = require("express")
const router = express.Router()

const {register ,addReview ,bookSlot} = require ("../controllers/userController/user.js")
const passport = require("passport")

router.post('/register',register)
router.post('/login',passport.authenticate("local",{
    successRedirect : "http://localhost:3001/doctors/availableSlots",
    failureRedirect: "/login-failed",
}))
router.post('/addReview',addReview)
router.post('/bookSlot',bookSlot)
router.get('/user/login-failed', (req, res) => {
    res.status(401).json({ message: "Login failed. Please check your credentials." });
});
module.exports = router