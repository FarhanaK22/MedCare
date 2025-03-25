
const express = require("express")
const app = express()
const config = require("./config.js")
const port = config.port
const  doctorRoutes = require("./api/routes/doctors.js")
const userRoutes = require("./api/routes/user.js")
const  bodyParser =  require("body-parser")
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use('/doctors',doctorRoutes)
app.use('/user',userRoutes)

app.listen(port,()=>
{
    console.log(`http://localhost:${port}`)
})