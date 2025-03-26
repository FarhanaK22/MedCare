const pool = require("../../db/index.js")

const adminLogin = async(req,res,next)=>
{
    next()
}

const doctorsData = async(req,res) =>
{
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