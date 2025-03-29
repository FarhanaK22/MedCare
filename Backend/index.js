const express = require("express");
const app = express();
require('events').EventEmitter.defaultMaxListeners = 20;
const config = require("./config.js");
const port = config.port;
const doctorRoutes = require("./api/routes/doctors.js");
const userRoutes = require("./api/routes/user.js");
const admin = require("./api/routes/admin.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const passport_local = require("./passport-local.js");
const session = require("express-session");

// Remove session-based authentication
app.use(session({
    secret : "USERLOGSESSION",
    resave:false,
    saveUninitialized :true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
}));
app.use(passport.session());

app.use(passport.initialize());

// Enable CORS
app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3002"], // Specify the exact origin
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Important to allow credentials
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const cookieParser = require("cookie-parser"); // Import cookie-parser

app.use(cookieParser());
// Define routes
app.use('/doctors', doctorRoutes);
app.use('/admin', admin);
app.use('/user', userRoutes);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});