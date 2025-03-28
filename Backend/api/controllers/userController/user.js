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
      }    catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const logout = (req, res) => {
  try {
    // Clear the authentication token cookie
    res.clearCookie("token"); // Clear the JWT token cookie

    // Clear the session if it exists
    if (req.session) {
      req.session = null;
      console.log("user logout")
    }

    return res.status(200).json({ message: "Logout successful. Please delete the token on the client side." });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};
const addReview = (req,res)=>
{ 
  res.send(req.body,"you enetered private area")
}

const bookSlot = (req,res)=>
{

}

module.exports = { addReview ,bookSlot ,register,logout}