const express=require('express')
const mysql=require("mysql2/promise");
const ejs=require("ejs");

const app=express();
app.set("view engine","ejs")


app.use(express.json());
app.get("/",async (req,res)=>{
    res.render("index")
})

app.get("/get/country",async(req,res)=>{
    let connection;
    try{
        connection= await mysql.createConnection({
            host:"localhost",
            user:"nilesh",
            password:"root",
            database:"test",

        })
        console.log("connection successfull");
        
        let [country] = await connection.query("select country_name from country");

        res.status(200).json(country);
    }catch(error){
        console.log("connection fail"+error.message);
        
    }finally{
        connection.end()
    }
})

app.get("/get/state",async(req,res)=>{
    let state=req.query.state;
    let connection;
    try{
        connection= await mysql.createConnection({
            host:"localhost",
            user:"nilesh",
            password:"root",
            database:"test",

        })
        console.log("connection successfull");
        
        let [state_date] = await connection.query(`
            select s.state_name as state_name
            from state as s
            join country as c
            on s.country_id=c.country_id
            where c.country_name=?
            `,[state]);
        
        res.status(200).json(state_date);
    }catch(error){
        console.log("connection fail"+error.message);
        
    }finally{
        connection.end()
    }
})

app.get("/get/city",async(req,res)=>{
    let city=req.query.city;
    let connection;
    try{
        connection= await mysql.createConnection({
            host:"localhost",
            user:"nilesh",
            password:"root",
            database:"test",

        })
        console.log("connection successfull");
        
        let [city_date] = await connection.query(`
            select c.city_name
            from city as c
            join state as s
            on s.state_id=c.state_id
            where s.state_name=?
            `,[city]);
        
        res.status(200).json(city_date);
    }catch(error){
        console.log("connection fail"+error.message);
        
    }finally{
        connection.end()
    }
})
app.listen(8080);