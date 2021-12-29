const express = require('express');
const EmployeesRoute = require('./routes/Employees.route')
const mongodb = require('./mongodb/mongodb.connect')
const app = express()

app.use(express.json())
mongodb.connect();
app.use('/Employees',EmployeesRoute);
app.use((error,req,res,next)=>{
    res.status(500).send({message:"Something Went Wronge"});
})
app.get('/',(req,res)=>{
    res.status(200).send("Server Running Smoothlyy")
})

app.listen(8000,()=>{
    console.log("Server Running at http://localhost:8000/")
})

module.exports = app;