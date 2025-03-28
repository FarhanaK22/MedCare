const express = require("express")
const router = express.Router()

const {register ,addReview ,bookSlot,logout} = require ("../controllers/userController/user.js")
const passport_local = require("../../passport-local.js")
const passport_google = require("../../passport-google.js")
const jwt = require("jsonwebtoken")
router.post('/register',register)

// router.post('/login', (req, res, next) => {
//     passport_local.authenticate("local", (err, user, info) => {
//       if (err) {
//         console.error("Error during authentication:", err);
//         return res.status(500).json({ message: "Internal server error" });
//       }
//       if (!user)  res.status(400).json({ message: info.message });
  
//       req.logIn(user, (err) => {
//         if (err) {
//           console.error("Error during login:", err);
//           return res.status(500).json({ message: "Internal server error" });
//         }
//         return res.status(200).json({
//           message: "Login successful",
//           user: { id: user.user_id, email: user.email, username: user.username },
//         });
//       });
//     })(req, res, next);
//   });  

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
            httpOnly: true, // Prevent access from JavaScript
            secure: false, // Set to true in production (requires HTTPS)
            sameSite: 'Lax', // Adjust based on your frontend/backend setup
        });
      // Return the JWT token and user details
      return res.status(200).json({
          message: "Login successful",
          token: user.token, // JWT token generated in passport-local.js
          user: { id: user.user_id, email: user.email, username: user.username },
      });
  })(req, res, next);
});
const passport = require("../../passport-local.js");
router.post('/logout',logout)
router.post('/addReview', passport.verifyToken, addReview);
router.post('/bookSlot', passport.verifyToken, bookSlot);
router.get('/me', passport.verifyToken, (req, res) => {
    res.json(req.user); // Return user info from the token
});


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
    (req, res) => {
        res.redirect("http://localhost:3000/auth/google/callback");
    }
);
// router.get('/me',(req,res)=>
// {
//     if(req.isAuthenticated())
//     {
//         res.json(req.user)
//     }else{
//         res.status(401).json({message : "not authenticated"})
//     }
// })
module.exports = router