const mysql=require("mysql2/promise");

const connection= mysql.createConnection({
    host:"localhost",
    user:"nilesh",
    password:"root",
    database:"job_app_v2"
})

module.exports=connection;