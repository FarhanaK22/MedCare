const pool = require("../../db/index.js")
const bcrypt  =  require("bcrypt")
const saltRounds = 10
const passport = require('passport');

const register = async(req,res)=>
{  const { name, email, password } = req.body;
    try{
        const checkEmail = await pool.query("SELECT * FROM users WHERE email =$1",
            [email,])
        if(checkEmail.rows.length >0)
            return res.status(400).json({ message: "Email already exists. Try logging in." });
        bcrypt.hash(password,saltRounds,async(err,hash)=>
        {if(err) console.log("error while hashing",err)
          const result  = await pool.query( `
                INSERT INTO users (username, email, password)
                VALUES ($1, $2, $3) `,[name, email, hash])
            res.status(201).json({
                message: "User registered successfully",
                user: result.rows[0],
            });
        })
        } catch (err) {
            console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// const login = async (req,res)=>
// {    const {email , password} = req.body
// }

const addReview = (req,res)=>
{
}

const bookSlot = (req,res)=>
{

}

module.exports = { addReview ,bookSlot ,register}