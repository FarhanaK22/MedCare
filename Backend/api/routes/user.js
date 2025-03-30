const express = require("express")
const router = express.Router()
const pool = require("../db/index.js")
const {register ,addReview ,bookSlot,logout} = require ("../controllers/userController/user.js")
const passport_local = require("../../passport-local.js")
const passport_google = require("../../passport-google.js")
const jwt = require("jsonwebtoken")
const passport = require("../../passport-local.js");

router.post('/register',register)

router.post('/login', (req, res, next) => {
  passport_local.authenticate("local", (err, user, info) => {
      if (err) {
          console.error("Error during authentication:", err);
          return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
          return res.status(400).json({ message: info.message });
      }
      res.cookie('token', user.token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'Lax',
        });
      return res.status(200).json({
          message: "Login successful",
          token: user.token,
          user: { id: user.user_id, email: user.email, username: user.username },
      });
  })(req, res, next);
});
router.post('/logout',logout)
router.post('/addReview/:id', passport.verifyToken, addReview);
router.post('/bookSlot/:id', passport.verifyToken, bookSlot);

router.get('/checktoken',(req, res) => {
    console.log("Cookies:", req.cookies);
    const token = req.cookies?.token; // Extract token from cookies
    if (!token) {
        return res.status(403).json({ message: "No token found in cookies" });
    }
    jwt.verify(token,"secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        res.status(200).json({ message: "Token is valid", user: decoded });
    });
  })

router.get(
    "/google",
    passport_google.authenticate("google", {
        scope: ["profile", "email"],
    })
);
router.get(
    "/google/callback",
    passport_google.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
    }),
    async(req, res) => {
        console.log("user in google")
        const data = await pool.query('SELECT user_id FROM users WHERE email = $1',[req.user.email])
        console.log(data.rows[0]?.user_id)
        const user_id =  data.rows[0]?.user_id
        const token = jwt.sign(
            { id:user_id, email: req.user.email, name: req.user.username }, // Payload
            "secret", // Secret key from environment variable
            { expiresIn: "1h" } // Token expiration
          );
      
          console.log("Generated Token:", token);
        res.redirect(`http://localhost:3000/auth/google/callback?token=${token}`);
    }
);

module.exports = router