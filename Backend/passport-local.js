const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import JWT
const pool = require("./api/db/index.js");

// const authConfig = {
//     secret: "your_jwt_secret_key", // Replace with your secret key
// };

passport.use(new Strategy({ usernameField: "email" }, async function verify(email, password, cb) {
    try {
        console.log("user details", email, password);
        const checkemail = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkemail.rows.length == 0) {
            return cb(null, false, { message: "User does not exist" });
        }
        const user = checkemail.rows[0];
        const hashedpassword = user.password;
        console.log("Hashed Password:", hashedpassword); // Debugging

        bcrypt.compare(password, hashedpassword, (err, result) => {
            if (err) {
                console.error("Error in bcrypt.compare:", err);
                return cb(err);
            }

            if (result) {
                // Generate JWT token
                const token = jwt.sign({ id: user.user_id },"secret", {
                    expiresIn: 86400, // 24 hours
                });
                user.token = token; // Attach token to the user object
                return cb(null, user);
            } else {
                return cb(null, false, { message: "Incorrect password" });
            }
        });
    } catch (err) {
        console.error("Error in passport-local strategy:", err);
        return cb(err);
    }
}));

passport.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("inside verify")
    if (!authHeader) {
        return res.status(403).json({ message: "No token provided" });
    }
  
    // Extract token from "Bearer <token>" format
    const token = authHeader.split(" ")[1]; 
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = decoded; // Attach decoded user info to the request
        next();
    });
};

passport.serializeUser((user, cb) => {
    console.log("User in serializeUser:", user); // Debugging
    if (!user || !user.user_id) {
        return cb(new Error("Invalid user object for serialization"));
    }
    return cb(null, user.user_id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (result.rows.length === 0) {
            return cb(new Error("User not found"));
        }
        const user = result.rows[0];
        return cb(null, user); // Pass the user object to the callback
    } catch (err) {
        return cb(err); // Pass the error to the callback
    }
});


module.exports = passport;