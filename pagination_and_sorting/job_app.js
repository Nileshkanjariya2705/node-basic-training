 const express = require("express");
 const ejs= require("ejs");
 const app= express();

 app.use(express.json());

 app.use(express.urlencoded({ extended: true }));

 app.set("view engine","ejs")

 app.get("/job_app",(req,res)=>{
    res.render("job_app");
 })

 app.post("/student_data",(req,res)=>{
      

       const data = req.body; 
    console.log(data);
    res.send("Data received!");
      
 });

 app.listen(8080);