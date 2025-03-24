const express = require("express")
const app = express()
const port = 3000
const  doctorRoutes = require("./api/routes/doctors.js")
const userRoutes = require("./api/routes/user.js")

app.use('/appointment',doctorRoutes)
app.use('/user',userRoutes)

app.listen(port,()=>
{
    console.log(`http://localhost:${port}`)
})