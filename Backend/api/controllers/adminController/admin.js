const pool = require("../../db/index.js")

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
{const {name, speciality, degree, experience, email, gender} = req.body
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
{ const id = parseInt(req.params.id, 10)
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
const manageBooking = async(req,res)=>
{
    
}

const sendMail = async(req,res)=>
{ res.send("I am sending mail")

}

module.exports = {adminLogin, doctorsData ,sendMail,
  addDoctor ,updateDoctor, 
  deleteDoctor,manageBooking,bookings }