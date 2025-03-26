
const express = require("express")
const app = express()
require('events').EventEmitter.defaultMaxListeners = 20;
const config = require("./config.js")
const port = config.port
const  doctorRoutes = require("./api/routes/doctors.js")
const userRoutes = require("./api/routes/user.js")
const admin = require("./api/routes/admin.js")
const  bodyParser =  require("body-parser")
const cors = require("cors");
const session = require("express-session")
const passport = require("passport")
const {Strategy} = require("passport-local")
// user session
app.use(session({
    secret : "USERLOGSESSION",
    resave:false,
    saveUninitialized :true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

passport.use(new Strategy(async function verify(email,password,cb){
    try {
        const checkemail = await pool.query("SELECT * FROM users WHERE email = $1",[email,])
        if(checkemail.rows.length == 0){
        // {return res.status(400).json({
        // message: " user doesnot exits"})
        return cb(null, false, { message: "User does not exist" });
    }
        const user = checkemail.rows[0]
        const hashedpassword = user.password

        bcrypt.compare(password,hashedpassword,(err,result)=>
        {
            if(err)
            {
                // console.log("error in comparing passwords",err)
                return cb(err)
            }
            else {
        if(result)
        {
            return cb(null,user)
            // res.status(200).json({ message: "login success"})
        }
            else{
                // res.status(400).json({ message: "wrong password"})
                return cb(null,false)
            }}
        })
    }
    catch(err)
    {
        // res.send("error at server side")
        return cb(err)
    }
}))
passport.serializeUser((user,cb)=>
{
    cb(null,user)
})
passport.deserializeUser((user,cb)=>
{
    cb(null,user)
})
app.use('/doctors',doctorRoutes)
app.use('/admin',admin)
app.use('/user',userRoutes)
app.listen(port,()=>
{
    console.log(`http://localhost:${port}`)
})