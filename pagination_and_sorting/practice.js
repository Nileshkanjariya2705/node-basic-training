const express = require("express");
const mysql = require("mysql2/promise")


const app = express();

app.use(express.json());

app.set("view engine","ejs")

//  get request
app.get("/api/users/getall", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "test"
        })

    const [user] = await connection.execute("select * from users")
    res.status(200).json(user)

    } catch (err) {
        console.log("connectioin fail" + err.message)
    }
    finally{
        connection.end();
    }

})

// post reques

app.post("/api/users/add/",async (req, res) => {
          let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "test"
        })
      
        const newuser={
            name : req.body.name,
            city : req.body.city
        }
        let sql=`insert into users (name,city) values('${newuser.name}','${newuser.city}')`;
    const [user] = await connection.execute(sql)
    if(user.affectedRows>0){
    res.status(200).json(newuser)

    }else{
        res.status(404).json("data not found")
    }

    } catch (err) {
        console.error("connectioin fail" + err.message)
    }
    finally{
        connection.end();
    }
})

// get one
app.get("/api/users/get/:id", async(req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "test"
        })
      
        let id=req.params.id;
        let sql=`select * from users where id=${id}`
    const [user] = await connection.execute(sql)
    if(user.length>0){
    res.status(200).json(user)

    }else{
        res.status(404).json("data not found")
    }

    } catch (err) {
        console.log("connectioin fail" + err.message)
    }
    finally{
        connection.end();
    }

})

//  put reques
app.put("/api/users/update/",async (req, res) => {
         let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "test"
        })
      
    let id=req.body.id;

    let [isidexist] = await connection.query(`select * from users where id=${id}`)

        
    if(isidexist.length>0){
        
       let [ans] = await connection.query(`update users set name="${req.body.name}" , city="${req.body.city}" where id=${id}`)
       if(ans.affectedRows>0){
        res.status(200).json(isidexist);
       }else{
        res.status(404).json("data not found")
       }
    }else{
        res.status(404).json("data not found")
    }

    } catch (err) {
        console.log("connectioin fail" + err.message)
    }
    finally{
        connection.end();
    }

})

// delete eques
app.delete("/api/users/delete/:id", async (req, res) => {
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "test"
        })
      
    let id=req.params.id;

    let [isidexist] = await connection.query(`select * from users where id=${id}`)

        
    if(isidexist.length>0){
        
       let [ans] = await connection.query(`delete from users where id=${id}`)
       if(ans.affectedRows>0){
        res.status(200).json(isidexist);
       }else{
        res.status(404).json("data not found")
       }
    }else{
        res.status(404).json("data not found")
    }

    } catch (err) {
        console.log("connectioin fail" + err.message)
    }
    finally{
        connection.end();
    }
})

app.get("/data",(req,res)=>{
    res.render("data");
})

app.listen(8080);