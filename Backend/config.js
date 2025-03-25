const dotenv = require("dotenv")
dotenv.config()

const config = {
  port: 3001,
  dbUser: "postgres",
  dataBase: "doctorAppointment",
  D:"doctors_appointment_booking",
  dbPassword: process.env.DB_PASSWORD,
  dbPort: 5432,
  max: 10,
  idleTimeoutMillies: 3000,
  connectionTimeoutMillis: 2000, // Make sure this key matches
  sessionSecret: process.env.SESSION_SECRET,
  secretkey: process.env.SECRET_KEY || "35465756t8gvhgjguyi997lihkgur7u5ryftdy",
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
};

module.exports=  config;
