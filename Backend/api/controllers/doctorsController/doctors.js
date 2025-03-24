const { response, json } = require("express");
const pool = require("../../db/index.js")

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
module.exports = doctorsData