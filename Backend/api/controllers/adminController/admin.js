const pool = require("../../db/index.js")

const validAdminPassword = "admin"
const adminLogin = async(req,res,next)=>
{  console.log("checking admin")
        const { apiKey } = req.query;
        if (!apiKey) {
          return res.status(400).json({ error: "API key is required" });
        }
        console.log("user valid")
        if (apiKey === validAdminPassword) {
          res.status(200).json({ message: "Login successful", isAdmin: true });
          return next()
          
        } else {
          return res.status(401).json({ error: "Incorrect password" });
        }
}

const doctorsData = async(req,res) =>
{ if(!req.isAdmin) return res.send("unauthorised")
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

}
const updateDoctor = async(req,res)=>
{
    
}
const deleteDoctor = async(req,res)=>
{
    
}

const bookings = async(req,res)=>
{

}
const manageBooking = async(req,res)=>
{
    
}

module.exports = {adminLogin, doctorsData ,addDoctor ,updateDoctor, deleteDoctor,manageBooking,bookings }