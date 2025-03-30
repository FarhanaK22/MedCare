const pool = require("../../db/index.js")
const nodemailer = require("nodemailer");
const {google} =require ("googleapis")

const dotenv = require("dotenv");

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ADMIN_ID,
  process.env.GOOGLE_ADMIN_SECRET,
  process.env.GOOGLE_REDIRECT_URL
)

oAuth2Client.setCredentials({refresh_token : process.env.GOOGLE_REFRESH_TOKEN})


const validAdminPassword = "admin"
const adminLogin = async(req,res,next)=>
{  console.log("checking admin")
        const { apiKey } = req.query;
        if (!apiKey) {
          return res.status(400).json({ error: "API key is required" });
        }
  
        if (apiKey === validAdminPassword) {
          console.log("user valid")
          res.status(200).json({ message: "Login successful", isAdmin: true });
          return next()
          
        } else {
          return res.status(401).json({ error: "Incorrect password" });
        }
}

const doctorsData = async(req,res) =>
{  const  {admin }= req.query
  if(!admin) return res.send("unauthorised")
    try {
        const result = await pool.query("SELECT * FROM doctors" ,[]);
        console.log("query",result)
        res.send(JSON.stringify(result.rows))
        return {
            success : true,
            data : result.rows
        }
    }
    catch(err)
    {
        console.log("error" ,err)
        return {
            success : false,
            error : err ,
            
        }
    }
}

const addDoctor = async(req,res)=>
{
  const {name, speciality, degree, experience, email, gender} = req.body
 try{
  const result = await pool.query(
    `INSERT INTO doctors (name, speciality, degree, experience, email, gender)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
    [name, speciality, degree, experience, email, gender])
    console.log("added doctor")
    res.status(201).json({
      success: true,
      doctor: result.rows[0],
    });
 }catch(err)
 { console.error("error", err);
  res.status(500).json({
    success: false,
    error: err.message,
  })
 }
}
const updateDoctor = async(req,res)=>
{ 
    const id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid doctor ID",
    });
  }
  const {name, speciality, degree, experience, email, gender} = req.body
  try{
  const result = await pool.query(
    `UPDATE doctors 
     SET name = COALESCE($1, name),
         speciality = COALESCE($2, speciality),
         degree = COALESCE($3, degree),
         experience = COALESCE($4, experience),
         email = COALESCE($5, email),
         gender = COALESCE($6, gender)
     WHERE doctor_id = $7
     RETURNING *`,
     [name, speciality, degree, experience, email, gender,id])
     console.log("Updated doctor")
     res.status(201).json({
       success: true,
       doctor: result.rows[0],
     });
     if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Doctor not found",
      });
    }

    console.log("Doctor updated successfully");
  }catch(err)
  { console.error("error", err);
   res.status(500).json({
     success: false,
     error: err.message,
   })
  }
}
const deleteDoctor = async(req,res)=>
{
  const id = parseInt(req.params.id, 10)
  try{
   const result = await pool.query(
     `DELETE FROM doctors WHERE doctor_id =$1 RETURNING *`,
     [id])
     console.log("deleted doctor")
     res.status(201).json({
       success: true,
       doctor: result.rows[0],
     });
  }catch(err)
  { console.error("error", err);
   res.status(500).json({
     success: false,
     error: err.message,
   })
  }
}

const bookings = async(req,res)=>
{
  try{
    const result = await pool.query(
      `SELECT  appointment_id ,
    user_id ,
    doctor_id ,
    slot_id ,
    booking_date ,
    appointment_date,
    appointment_type FROM appointments WHERE status = $1 `,["pending"]
    )
    res.status(200).json(result.rows)

  }catch(err)
  {
    console.log("error at server",err)
  }}

const sendMail = async(req,res)=>
{ 
 const {userid , type,status,date} = req.body
//  userid= parseInt(userid)
console.log("started")
try{
  let message = ""
  if(status === "approved")
  {
      message = `your ${type} appointment is ${status} for date : ${date}.`
      if(type === "online")
        message = message + `This is Dummylink to video consultation`
  }
  else{
      message =`Your Appointment is ${status} due to some reason. Please contact help : 911`
  }
console.log("user id",typeof(userid))
  const getEmail = await pool.query(`
    SELECT email FROM
    users 
    WHERE user_id = $1`,[userid])

  const useremail = getEmail.rows[0].user_id || "farhana30092k1@gmail.com"
  const accessToken = await oAuth2Client.getAccessToken()
  const transport = nodemailer.createTransport(
    {
      service : 'gmail',
      auth:{
        type: 'OAuth2',
        user:'farhana.khatoon@tothenew.com',
        clientId : process.env.GOOGLE_ADMIN_ID,
        clientSecret : process.env.GOOGLE_ADMIN_SECRET,
        refreshToken :process.env.GOOGLE_REFRESH_TOKEN,
        accessToken : accessToken,
      }
    } )
    const mailOptions = {
      from : "AdminMEDCARE<farhana.khatoon@tothenew.com>",
      to : useremail,
      subject : "Your MEDCARE :Appoinment confirmation  ",
      text : `${message}`,
      html: `<h1>${message}</h1>`
    }
    console.log("sent email")
    const result = await transport.sendMail(mailOptions)
    sendMail().then(result=>console.log("email sent .....",result))
    .catch((err)=>console.log(err.message))
    console.log("Email sent successfully:", result);
    const updateAppointment = await pool.query(
      `UPDATE appointments
    SET status = $1
    WHERE user_id =$2`,[status,userid]
    )
    // console.log(updateAppointment.rows[0])
    console.log("updated appointments")
res.status(200).json({ message: "Email sent successfully", result });
} catch (err) {
console.error("Error occurred:", err.message);
res.status(500).json({ error: "Failed to send email" });
}

}


module.exports = {adminLogin, doctorsData ,sendMail,
  addDoctor ,updateDoctor, 
  deleteDoctor,bookings }