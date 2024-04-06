const express = require('express')
const http = require('http')
const nodeMailer = require('nodemailer')

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

var routers = require("./routes/index");

app.use('/',routers)

http.createServer(app).listen(3000,()=>{
    console.log("APP IS LISTEN ON PORT 3000");
})
