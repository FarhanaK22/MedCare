const pool = require("../../db/index.js")
const bcrypt  =  require("bcrypt")
const saltRounds = 10
const register = async(req,res)=>
{   if (req.isAuthenticated()) return res.status(200).json({ message: "User already logged in. Redirecting to home." });
 console.log(req.isAuthenticated())
  const { name, email, password } = req.body;
    try{
        const checkEmail = await pool.query("SELECT * FROM users WHERE email =$1",
            [email,])
        if(checkEmail.rows.length >0)
            return res.status(400).json({ message: "Email already exists. Try logging in." });
       
        const hash = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
          `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email`,
          [name, email, hash]
        );
        res.status(201).json({
          message: "User registered successfully",
          user: result.rows[0],
        });
      }catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const logout = (req, res) => {
  try {
    res.clearCookie("token"); 
    if (req.session) {
      req.session = null;
      console.log("user logout") }
    return res.status(200).json({ message: "Logout successful. Please delete the token on the client side." });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};
const addReview = async(req,res)=>
{ console.log("user gave review") 
  const { id } = req.params;
  const { userid, comment, rating } = req.body;
  if (!userid || !id || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid data provided." });
  }
  try {
    const check = await pool.query(
      `SELECT * FROM appointments 
      WHERE user_id=$1  AND doctor_id=$2`,[userid,id]
    )
    if (check.rows.length === 0) {
      return res.status(401).json({ error: "User has no appointment" });
    }
    const result = await pool.query(
      "INSERT INTO review (user_id, doctor_id, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [userid, id, comment, rating]
    );
    console.log(result.rows[0])
    res.status(200).json({ message: "Review added successfully", review: result.rows[0] });
  } catch (error) {
    console.error("Error inserting review:", error);
    res.status(500).json({ error: "Failed to submit review" });
  }
}

const bookSlot = async(req,res)=>
{
  console.log("user boooking precessing") 
  const { id } = req.params;
  const {userid , slot_time , slot_date, type} = req.body
     try {
      const formattedDate = `${slot_date.year}-${String(slot_date.month).
        padStart(2, '0')}-${String(slot_date.date).padStart(2, '0')}`;
      const [time, modifier] = slot_time.split(' ');
      let [hours, minutes] = time.split(':');
  
      if (modifier.toLowerCase() === 'pm' && parseInt(hours) !== 12) {
        hours = String(parseInt(hours) + 12);
      } else if (modifier.toLowerCase() === 'am' && parseInt(hours) === 12) {
        hours = '00';
      }  
      const formattedTime = `${hours}:${minutes}:00`;
      const slot =await pool.query(`
        SELECT slot_id FROM slots 
        WHERE slot_time = $1`,[formattedTime])
        if (slot.rows.length === 0) {
          throw new Error(`No slot found for time: ${formattedTime}`);}
        const slot_id = slot.rows[0].slot_id;
        const result = await pool.query(
        `INSERT INTO appointments 
        (user_id, doctor_id, slot_id, appointment_date, appointment_type,status)
         VALUES ($1, $2, $3, $4, $5,$6)
         RETURNING *`,
        [userid, id, slot_id, formattedDate, type,"pending"]
      );
        console.log("appointment doctor")
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
    const getPatient = async (req, res) => {
      try {
        const { userId, name } = req.query;
        console.log(userId, name);
    
        const parsedUserId = parseInt(userId);
    
        const result = await pool.query(
          "SELECT * FROM patients WHERE user_id = $1 AND LOWER(name) LIKE LOWER($2 || '%')",
          [parsedUserId, name]
        );
    
        console.log(result.rows[0]);
        console.log("inside patient check");
    
        if (result.rows.length > 0) {
          return res.status(200).json({message: "Patient exists"})
        } else {
          return res.status(404).json({ message: "Patient not found" });
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    };
    
    const patient = async(req,res) => {
      const { name, age, phone, disease_history, address, userId } = req.body;

     console.log(name, age, phone, disease_history, address, userId);
      try {
          const checkPatient = await pool.query(
              "SELECT * FROM patients WHERE user_id = $1 AND LOWER(name) = LOWER($2)",
              [userId, name]
          );
  
          if (checkPatient.rows.length > 0) {
              return res.status(400).json({
                  error: "Patient profile already exists"
              });
          }
          const result = await pool.query(
              `INSERT INTO patients (name, age, phone, disease_history, address, user_id)
               VALUES ($1, $2, $3, $4, $5, $6)
               RETURNING *`,
              [name, age, phone, disease_history, address, userId]
          );
  
          return res.status(200).json({
              message: "Patient profile added successfully",
              patient: result.rows[0]
          });
  
      } catch (error) {
          console.error("Error adding patient profile:", error);
          return res.status(500).json({ error: "Internal server error" });
      }
    };
module.exports = { addReview ,bookSlot ,register,logout ,patient,getPatient}