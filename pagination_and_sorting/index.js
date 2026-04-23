const express = require("express")
const ejs = require('ejs')
const mysql = require("mysql2/promise")


const app = express();

app.set('view engine', "ejs")

app.get("/", (req, res) => {
    res.render("paginations")
});

app.listen(8080);





app.get('/pagination_manual', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "test"
        });

        console.log('Connected to MySQL successfully!');
        let page = parseInt(req.query.page) || 1;
        let limit = 10;
        let offset = (page - 1) * limit;

        const [countrows] = await connection.execute("select count(*) as total from students")
        let totalItems = countrows[0].total;
        let totalPage = Math.ceil(totalItems / limit);

        console.log(countrows[0].total)

        const [rows] = await connection.query("select * from students limit ? offset ?", [limit, offset]);
        console.log("--- Rows as Objects ---");
        // console.log(rows);
        res.render('pagination_manual', {
            studentList: rows,
            currentPage: page,
            totalPages: totalPage,
            totalItems: totalItems, // Total 10000 records
            limit: limit              // Records per pagee 
        });

    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
});

app.get('/pagination_2', (req, res) => {
    
    res.render('pagination_2')
});
app.get('/pagination_1', async(req, res) => {
let andor=req.query.andor || 'AND'
    let connection;
    try{
        connection= await mysql.createConnection({
            host : "localhost",
            user : "nilesh",
            password : "root",
            database : "test"
        });

        console.log("connection successfully...")

        let limit=10;
        let page=req.query.page ||1;
        let offset= (page-1)*limit;
        let sortby=req.query.sortby || "student_id"
        let order=req.query.order || "ASC"

        let first_name=req.query.first_name ?`${req.query.first_name}%`: '%';
        let last_name=req.query.last_name ? `${req.query.last_name}%`: '%';
        let email=req.query.email ? `${req.query.email}%`: '%';
        let contect_number=req.query.contect_number ?`${req.query.contect_number}%` :'%';
        let city=req.query.city ? `${req.query.city}%` : '%';

        

        console.log(first_name);
        console.log(last_name);
        console.log(email);
        console.log(city);
        console.log(contect_number);
        console.log(andor);
        

        const [rowset] = await connection.execute("select count(*) as total from students")
        let totalItems=rowset[0].total;
        let totalPage=totalItems/limit;

        let sql='';

        if(andor==='AND'){
                sql=`select * from students
        where first_name like ? and
        last_name like ? and
        email like ? and    
        city like ? and
        contect_number like ?
        order by ${sortby} ${order} limit ? offset ?`;
        }else{
         sql=`select * from students
        where first_name like ? or
        last_name like ? or
        email like ? or    
        city like ? or
        contect_number like ?
        order by ${sortby} ${order} limit ? offset ?`;
        }

      
        const [resultset] = await connection.query(sql,[first_name,last_name,email,city,contect_number,limit,offset])
        console.log(resultset)
        res.render("pagination_1",{
            students:resultset, 
            currentPage:page,
            totalPages:totalPage,
            totalItems:totalItems,
            limit:limit,
            page:page
        })

    }catch(err){
        console.error("connection fail:"+err.message)
    }finally{
        connection.end();
    }
});



app.get("/pagination_3",async (req,res)=>{
    let connection;
    try{
         connection= await mysql.createConnection({
            host :"localhost",
            user : "nilesh",
            password : "root",
            database : "test"
        });
        console.log("connection successfully..")

        let page=parseInt(req.query.page) ||1;
        let sortby=req.query.sortby || "student_id"
        let order=req.query.order || 'ASC'
        // console.log(sortby)
        limit=10;
        offset=(page-1)*limit;

        const [rowset] =await connection.execute("select count(*) as total from students")
            console.log(rowset[0])
        let totalItems=rowset[0].total;
        console.log(totalItems);

        let totalPage=totalItems/limit;
       console.log(totalPage)
        let sql=`select * from students order by ${sortby} ${order} limit ? offset ?`
        let [resultset]= await connection.query(sql,[limit,offset]);
        // console.log(resultset);

        res.render('pagination_3',{
            students : resultset,
            currentPage :page,
            limit:limit,
            totalItems : totalItems,
            totalPages : totalPage
        })

    }catch(error){
        console.error("connection fail:" +error.message)
    }finally{
        connection.end();
    }
})

// $Sta^sk_638[jsa]sav
