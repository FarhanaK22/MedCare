const passport = require("passport");
const pkg = require("passport-google-oauth20");
const GoogleStrategy = pkg.Strategy;
const dotenv = require("dotenv");
dotenv.config();
const pool = require("./api/db/index.js");

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/user/google/callback",
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // Check if the user already exists in the database
        const email = profile.emails[0].value; 
        const displayName = profile.displayName;// Get the user's email from the profile
        const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (checkUser.rows.length > 0) {
          user = checkUser.rows[0];
        } else {
          // User does not exist, create a new user
          const newUser = await pool.query(
            `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING user_id, username, email`,
            [displayName, email]
          );
          // return done(null, newUser.rows[0]);
          user = newUser.rows[0];  
        } return done(null, user);
      } catch (err) {
        console.error("Error during Google OAuth:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.user_id); 
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    if (result.rows.length === 0) {
      return cb(new Error("User not found"));
    }
    cb(null, result.rows[0]); // Pass the user object to the session
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;