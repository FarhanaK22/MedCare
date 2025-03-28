const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: 3001,
  dbUser: process.env.DB_USER,
  dataBase: "doctorAppointment",
  dbPort: 5432,
  dbPassword:process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 3000, // Corrected typo
  connectionTimeoutMillis: 2000, // Make sure this key matches
  sessionSecret: process.env.SESSION_SECRET,
  secretkey: process.env.SECRET_KEY, // Ensure this matches your .env file
};

module.exports = config;