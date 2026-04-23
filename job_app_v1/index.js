const express = require("express");
require('dotenv').config();
const app = express();
const ejs = require("ejs")
const mysql = require("mysql2/promise")
const path = require("path");
const { log, error } = require("console");
const session = require('express-session');
const flash = require('connect-flash');
const { json } = require("stream/consumers");
const { body, validationResult } = require('express-validator');

// 1. Session Middleware
app.use(session({
  secret: 'secret-key', // Change this to any string
  resave: false,
  saveUninitialized: true
}));

// 2. Flash Middleware
app.use(flash());
app.use((req, res, next) => {
    // This makes 'message' available in every EJS template
    res.locals.message = req.flash ? req.flash('message') : ""; 
    next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = process.env.PORT || 5000;

app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.redirect("view/basic_detail")
})

app.get("/app/form", (req, res) => {
      const errors = req.flash('errors');
    res.render("job_app.ejs",{errors})
})

// ------------------------------------------display---------------------------------------------

app.get("/view", async (req, res) => {
    let id = req.query.id ||1;
    console.log(id);
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

            let [basic_detail]= await connection.query("select * from basic_details where basic_detail_Id=?",[id])
            let [address]= await connection.query("select * from address where basic_detail_Id=?",[id])
            let [eduction]= await connection.query("select * from eduction_detail where basic_detail_Id=?",[id])
            let [language]= await connection.query("select * from language_known where basic_detail_Id=?",[id])
            let [technology]= await connection.query("select * from technology_known where basic_detail_Id=?",[id])
            let [preference]= await connection.query("select * from preferences where basic_detail_Id=?",[id])
            let [reference]= await connection.query("select * from reference_detail where basic_detail_Id=?",[id])
            let [expreience]= await connection.query("select * from work_experience where basic_detail_Id=?",[id])
            console.log(basic_detail);
            console.log(address);
            console.log(eduction);
            console.log(language);
            console.log(technology);
            console.log(preference);
            console.log(reference);
            console.log(expreience);
            console.log("all done");

         
        res.render("applicant_data",{
            basic_detail:basic_detail[0],
            address:address[0],
            eduction:eduction,
            language:language,
            preference:preference[0],
            technology:technology,
            expreience:expreience,
            reference:reference,
            preferences:preference

        });
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
   
})

// ------------------------------------------inseret---------------------------------------------

app.post("/applicant",[
      body('fname').trim().notEmpty().withMessage('First name is required'),
        body('lname').trim().notEmpty().withMessage('Last name is required'),
        body('email').normalizeEmail().isEmail().withMessage('Valid email is required'),
        body('gender').notEmpty().withMessage('Gender is required'),
        body('dob').notEmpty().withMessage('Date of birth is required'),
        body('designation').trim().notEmpty().withMessage('Designation is required'),
        body('phoneNumber').matches(/^\d{10}$/).withMessage('10-digit phone number required'),
        body('RelationShip').trim().notEmpty().withMessage('Relationship is required'),
        body('address1').trim().notEmpty().withMessage('Address line 1 is required'),
        body('address2').trim().notEmpty().withMessage('Address line 2 is required'),
        body('city').trim().notEmpty().withMessage('City is required'),
        body('state').trim().notEmpty().withMessage('State is required'),
        body('zip').isNumeric().withMessage('ZIP must be numeric'),
        body('rname').trim().notEmpty().withMessage('Relative name is required'),
        // body('contact_number').matches(/^\d{10}$/).withMessage('Contact number must be 10 digits'),
        body('department').trim().notEmpty().withMessage('Department is required'),
        body('current_ctc').isFloat().withMessage('Current CTC must be a number'),
        body('expected_ctc').isFloat().withMessage('Expected CTC must be a number'),
        body('notice_period').isInt().withMessage('Notice period must be a number'),
        body('relation').trim().notEmpty().withMessage('Relation is required'),
        // body('edu_course_name.*').notEmpty().withMessage('Course name is required'),
        // body('edu_passing_year.*').notEmpty().withMessage('Passing year is required'),
        // body('edu_board_uni.*').notEmpty().withMessage('Board/University is required'),
        // body('edu_result.*').notEmpty().withMessage('Result is required')
        // body('exp_company.*').notEmpty().withMessage('Company name is required'),
        // body('exp_designation.*').notEmpty().withMessage('Designation is required'),
        // body('exp_from.*').notEmpty().withMessage('Start date is required'),
        // body('exp_to.*').notEmpty().withMessage('End date is required')  
        
         body('language').isArray({ min: 1 }).withMessage("Please select at least one language")   ,
    //    , body('guj_skill.*').notEmpty().withMessage("uni_board year is require"),
    //     body('hindi_skill.*').notEmpty().withMessage("uni_board year is require"),
    //     body('eng_skill.*').notEmpty().withMessage("uni_board year is require"),
        body('tech').isArray({min:1}).withMessage("please select at least one technology"),
        // body('java_level.*').notEmpty().withMessage("uni_board year is require"),
        // body('php_level.*').notEmpty().withMessage("uni_board year is require"),
        // body('mysql_level.*').notEmpty().withMessage("uni_board year is require"),
        // body('larava_level.*').notEmpty().withMessage("uni_board year is require")
], async (req, res) => {
    const data = req.body;
    console.log(data)

    const errors=validationResult(req);
    if(!errors.isEmpty()){
   
    // Convert array to object: { fieldName: 'error message' }
    const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    
    // req.flash('errors', errorObj);
    return res.render('job_app', {
        errors: errorObj,
        formData: req.body  // Pass submitted data
        });
  
    }
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")
        let fname = data.fname;
        let lname = data.lname;
        let email = data.email;
        let desigantioin = data.designation;
        let phone_number = data.phoneNumber;
        let gender = data.gender;
        let relationShip_status = data.RelationShip;
        let dob = data.dob;

        let [insert_basic_detail] = await connection.query(
            `insert into basic_details (first_name,last_name, email,designation,phone_number,gender,relationship_status,dob)
            values('${fname}','${lname}','${email}','${desigantioin}','${phone_number}','${gender}','${relationShip_status}','${dob}')
            `
        )
        console.log("last inserted id:" + insert_basic_detail.insertId);
        const last_inserted_id = insert_basic_detail.insertId;
        if (insert_basic_detail.affectedRows > 0) {
            console.log("data inserted success fully...")
        } else {
            console.log("some thing went wrong");

        }

        // // // insert data for address
        let address1 = data.address1;
        let address2 = data.address2;
        let city = data.city;
        let state = data.state;
        let zip = data.zip;

        let [insert_address] = await connection.query(`
            insert into address (basic_detail_id,city,state,zip_code,address_1,address_2)
             values ('${last_inserted_id}','${city}','${state}','${zip}','${address1}','${address2}') `)

        if (insert_address.affectedRows > 0) {
            console.log("address data inserted success fully...")
        } else {
            console.log("some thing went wrong");

        }

        // insert data for eduction detail;
        // 1. Ensure it's an array so .length works for rows, not characters
        // 1. Normalize all inputs into arrays

        let eduction_length = data.edu_course_name.length;
        // console.log(typeof data.edu_course_name)

        const course_name_arr = Object.values(data.edu_course_name);
        const passing_year_arr = Object.values(data.edu_passing_year);
        const board_uni_arr = Object.values(data.edu_board_uni);
        const result_arr = Object.values(data.edu_result);


        for (let k = 0; k < eduction_length; k++) {
            let course_name = course_name_arr[k];
            let passing_year = passing_year_arr[k];
            let board_uni = board_uni_arr[k];
            let result = result_arr[k];
            console.log(course_name)
            console.log(passing_year)
            // console.log(p)

            let [insert_eduction] = await connection.query(`insert into eduction_detail (basic_detail_id,course_name,passing_year,uni_board,result) 
                values(?,?,?,?,?)`, [last_inserted_id, course_name, passing_year, board_uni, result]);
            if (insert_eduction.affectedRows > 0) {
                console.log("eduction data inserted success fully")
            }
        }



        //     // insert data for work expreience

        let work_ex_length = data.exp_company.length;

        for (let j = 0; j < work_ex_length; j++) {
            let company_name = data.exp_company[j];
            let company_designation = data.exp_designation[j];
            let from = data.exp_from[j];
            let to = data.exp_to[j];

            let [insert_experience] = await connection.query(`
                insert into work_experience (basic_detail_id,company_name,designation,start_date,end_date)
                values ('${last_inserted_id}','${company_name}','${company_designation}','${from}','${to}')
                `)
            if (insert_experience.affectedRows > 0) {
                console.log("work experience data inserted success fully")
            }
        }

        // //  insert data for language know
        const skillMap = {
            gujarati: data.guj_skill,
            hindi: data.hindi_skill,
            english: data.eng_skill
        };

        for (let language of data.language) {
            if (language != '') {
                let skill = skillMap[language];
                if (skill) {
                    await connection.query(`
                        insert into language_known (basic_detail_id,language_name,can_read,can_write,can_speak)
                        values (?,?,?,?,?)
                        `, [last_inserted_id, language, skill[0] === 'on', skill[1] === 'on', skill[2] === 'on'])
                }
            }
        }

        // // insert data for technology known
        const techArray = Array.isArray(data.tech) ? data.tech : [data.tech];

        // 2. Check if the array is empty or undefined to avoid errors
        if (data.tech) {
            for (let tech of techArray) {
                const level = data[`${tech}_level`];

                // 3. Use ? placeholders to safely handle strings/enums
                await connection.query(
                    `INSERT INTO technology_known (basic_detail_id, technology_name, skill_level) 
             VALUES (?, ?, ?)`,
                    [last_inserted_id, tech, level]
                );
            }
        }


        // // insert data for References contect:
        let r_name = data.rname;
        let contect_number = data.contect_number;
        let relation = data.relation

        let [insert_references] = await connection.query(`
            insert into reference_detail (basic_detail_id,name,contact_number,relation)
            values ('${last_inserted_id}','${r_name}','${contect_number}','${relation}')  
            `)

        // insert for preferences
        let preferd_location1 = data.preferd_location[0];
        let preferd_location2 = data.preferd_location[1];
        let preferd_location3 = data.preferd_location[2];
        let notice_period = data.notice_period;
        let expected_ctc = data.expected_ctc;
        let current_ctc = data.current_ctc;
        let department = data.department;

        let [insert_preferences] = await connection.query(`
            insert into preferences (basic_detail_id,prefered_location_1,prefered_location_2,prefered_location_3,notice_period,department,current_ctc,expected_ctc)
            values(?,?,?,?,?,?,?,?)
            `, [last_inserted_id, preferd_location1, preferd_location2, preferd_location3, notice_period, department, current_ctc, expected_ctc])
        if (insert_preferences.affectedRows > 0) {
            console.log("all data inserted success fully")
        }
        console.log("all data inserted success fullllly...")

        // validation
    } catch (err) {
        console.log("connection fail:" + err.message);
    }
    res.redirect("/view/basic_detail")

})


app.get("/view/basic_detail", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from basic_details");
        console.log(result_set)
        res.render("view_basic_detail", { data: result_set });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
})

app.get("/view/address", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from address");
        console.log(result_set)
        res.render("view_address", { data: result_set });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
})

app.get("/view/eduction", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from eduction_detail");
        console.log(result_set)
        res.render("view_eduction", { data: result_set });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

})


app.get("/view/experience", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from work_experience");
        console.log(result_set)
        res.render("view_experience", { data: result_set });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
})

app.get("/view/technology/", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from technology_known");
        console.log(result_set)
        res.render("view_technologies", { data: result_set });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

})


app.get("/view/language", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from language_known");
        console.log(result_set)
        res.render("view_languages", { data: result_set });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

})

app.get("/view/preference", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from preferences");
        console.log(result_set)
        res.render("view_preferences", { data: result_set });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

})

app.get("/view/reference", async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from reference_detail");
        res.render("view_references", { data: result_set });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

})

// ------------------------------------------delete---------------------------------------------


// delete data
app.get("/view/address/delete",async(req,res)=>{
    let id=parseInt(req.query.id);
    let message;
    if(id==null|| id==0){
        console.log("enter in this code")
        req.flash('message', 'id not found!');
       res.redirect("/view/address");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("delete from address where address_id=?",[id]);
        req.flash('message', 'Address deleted successfully!'); 
       
        res.redirect("/view/address");

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

app.get("/eduction/delete",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
        console.log("enter in this code")
        req.flash('message', 'id not found!');
       res.redirect("/view/eduction");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("delete from eduction_detail where eduction_detail_id=?",[id]);
        req.flash('message', 'eduction row deleted successfully!'); 
        console.log("eduction row deleted successfully!")
        res.redirect("/view/eduction");

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

// delete experience
app.get("/experience/delete",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
        console.log("enter in this code")
        req.flash('message', 'id not found!');
       res.redirect("/view/experience");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("delete from work_experience where work_experience_id=?",[id]);
        req.flash('message', 'this experience deleted successfully'); 
        console.log("this experience deleted successfully!")
        res.redirect("/view/experience");

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

// delete technology
app.get("/technology/delete",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/technology");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("delete from technology_known where technology_know_id=?",[id]);
        req.flash('message', 'this technology deleted successfully'); 
      
        res.redirect("/view/technology");

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})


// delete language
app.get("/language/delete",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/language");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("delete from language_known where language_known_id=?",[id]);
        req.flash('message', 'this language deleted successfully'); 
      
        res.redirect("/view/language");

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})


// preferences delete
app.get("/preference/delete",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/preference");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("delete from preferences where preferences_id=?",[id]);
        req.flash('message', 'this preference deleted successfully'); 
      
        res.redirect("/view/preference");

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

// refernece deltre
app.get("/reference/delete",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/reference");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("delete from reference_detail where reference_detail_id=?",[id]);
        req.flash('message', 'this reference deleted successfully'); 
      
        res.redirect("/view/reference");

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

// ------------------------------------------update---------------------------------------------

app.get("/basic_detail/update",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/basic_detail");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query("select * from basic_details where basic_detail_id=?",[id]);
        console.log(result_set);
      
        res.render("update_basic_detail",{
            data:result_set,
            errors:[]
        });

    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})
app.post("/update/basic_datails/:id",[
          body('fname').trim().notEmpty().withMessage('First name is required'),
        body('lname').trim().notEmpty().withMessage('Last name is required'),
        body('email').normalizeEmail().isEmail().withMessage('Valid email is required'),
        body('gender').notEmpty().withMessage('Gender is required'),
        body('dob').notEmpty().withMessage('Date of birth is required'),
        body('designation').trim().notEmpty().withMessage('Designation is required'),
        body('phoneNumber').matches(/^\d{10}$/).withMessage('10-digit phone number required'),
        body('RelationShip').trim().notEmpty().withMessage('Relationship is required'),
        body('city').trim().notEmpty().withMessage('City is required'),
        body('state').trim().notEmpty().withMessage('State is required'),
        body('zip').isNumeric().withMessage('ZIP must be numeric'),
],async(req,res)=>{

    let id=parseInt(req.params.id);
     let connection;
      const errors=validationResult(req);
    if(!errors.isEmpty()){
   
    // Convert array to object: { fieldName: 'error message' }
    const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    return res.render("update_basic_detail",{errors:errorObj})
}
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

       
        let data=req.body;

        let [result_set] = await connection.query(`
            update basic_details set
            first_name=?,
            last_name=?,
            email=?,
            designation=?,
            phone_number=?,
            gender=?,
            relationship_status=?,
            dob=?
            where basic_detail_id=?

            `,[data.fname,data.lname,data.email,data.designation,data.phoneNumber,data.gender,data.RelationShip,data.dob,id])
        
            if(result_set.affectedRows>0){
                console.log("data updated success fully...")

            }
            req.flash('message', 'data update successfully'); 

            res.redirect("/view/basic_detail")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

app.get("/update/eduction",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/eduction");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] = await connection.query(
            `select * from eduction_detail where eduction_detail_id=?`,[id]
        )


        res.render("update_eduction",{
            data:result_set,
            errors:[]
             });
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

app.post("/eduction/update/:id",[
    body('course_name').notEmpty().withMessage("course name is require"),
    body('passing_year').notEmpty().withMessage("passing year is require"),
    body('uni_board').notEmpty().withMessage("uni/board  is require"),
    body('result').notEmpty().withMessage("result  is require")
],async(req,res)=>{
    console.log("--------------------------------------")
        let id=(req.params.id);
     const errors=validationResult(req)

     if(!error.isEmpty()){
         const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    
    // req.flash('errors', errorObj);
    return res.render('update_eduction', {
        errors: errorObj,
        formData: req.body  // Pass submitted data
        });
     }

     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let data=req.body;

        let [result_set] = await connection.query(
            `update eduction_detail
            set
            course_name=?,
            passing_year=?,
            uni_board=?,
            result=?
            where eduction_detail_id=?`,[data.course_name,data.passing_year,data.uni_board,data.result,id]
        )


        req.flash("message","data updated success fully")
        res.redirect("/view/eduction")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})


app.get("/update/experience",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/experience");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set]= await connection.query(`
            select * from work_experience where work_experience_id=?    
            `,[id])

       res.render("update_experience",{
        data:result_set[0],
        errors:[]
       })
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})


app.post("/experience/update/:id",[
    body('company_name').notEmpty().withMessage("company name is require"), 
    body('Work_designation').notEmpty().withMessage("designation is require"), 
    body('from').notEmpty().withMessage("start date is require"), 
    body('to').notEmpty().withMessage("end date  is require")
],async (req,res)=>{
    console.log("--------------------------------------")
        let id=(req.params.id);
         const errors=validationResult(req)

     if(!error.isEmpty()){
         const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    
    // req.flash('errors', errorObj);
    return res.render('update_experience', {
        errors: errorObj,
        formData: req.body  // Pass submitted data
        });
     }
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")
        let data=req.body;

        let [result_set] = await connection.query(
            `update work_experience
            set
            company_name=?,
            designation=?,
            start_date=?,
            end_date=?
            where work_experience_id=?`,[data.company_name,data.designation,data.from,data.to,id]
        )


        req.flash("message","data updated success fully")
        res.redirect("/view/experience")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
})


app.get("/view/technology/update",async(req,res)=>{

         let id=parseInt(req.query.id);
        let value=req.query.value;
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")
    
        let [result_set] = await connection.query(
            `update technology_known set skill_level=? where technology_know_id=?`,[value,id]
        )    


        req.flash("message","data updated success fully")
        res.redirect("/view/technology")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
})

app.get("/update/reference",async(req,res)=>{
    let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/reference");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] =await connection.query(`
            select * from reference_detail where reference_detail_id=?
            `,[id])
            console.log(result_set);
        res.render("update_reference",{data:result_set[0],errors:[]})
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})



app.post("/references/update/:id",[
    body('rname').notEmpty().withMessage("name is require"),
    body('contect_number').notEmpty().withMessage("number is require"),
    body('relation').notEmpty().withMessage("relation require")
],async (req,res)=>{
    console.log("--------------------------------------")
        let id=(req.params.id);
      const errors=validationResult(req)

     if(!error.isEmpty()){
         const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    
    // req.flash('errors', errorObj);
    return res.render('update_reference', {
        errors: errorObj,
        formData: req.body  // Pass submitted data
        });
     }
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let data=req.body;


        let [result_set] = await connection.query(
            `update reference_detail
            set
            name=?,
            contact_number=?,
            relation=?
            where reference_detail_id=?`,[data.rname,data.contect_number,data.relation,id]
        )


        req.flash("message","data updated success fully")
        res.redirect("/view/reference")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
})

app.get("/update/preference",async(req,res)=>{
      let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/update_preference");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] =await connection.query(`
            select * from preferences where preferences_id=?
            `,[id])
            console.log(result_set);
        res.render("update_preference",{data:result_set[0],errors:[]})
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})


app.post("/preference/update/:id",[
    body('notice_period').notEmpty().withMessage("notice period is require"),
    body('expected_ctc').notEmpty().withMessage("expected_ctc is require"),
    body('current_ctc').notEmpty().withMessage("current_ctc is require"),
],async(req,res)=>{
      let id=parseInt(req.params.id);
   
      const errors=validationResult(req)

     if(!error.isEmpty()){
         const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    
    // req.flash('errors', errorObj);
    return res.render('update_preference', {
        errors: errorObj,
        formData: req.body  // Pass submitted data
        });
     }
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        let data=req.body;
         let [result_set] = await connection.query(
            `update preferences
            set
            notice_period=?,
            department=?,
            current_ctc=?,
            expected_ctc=?
            where preferences_id=?`,[data.notice_period,data.department,data.current_ctc,data.expected_ctc,id]
        )

    req.flash("message","data updated success fully")
       res.redirect("/view/preference")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

   
    
})


app.get("/update/language",async (req,res)=>{
         let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/language");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] =await connection.query(`
            select * from language_known where language_known_id=?
            `,[id])
          console.log(result_set)
        res.render("update_language",{data:result_set[0]})
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

})

app.post("/language/update/:id",async(req,res)=>{
      let id=parseInt(req.params.id);
   
     const errors=validationResult(req)

     if(!error.isEmpty()){
         const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    
    // req.flash('errors', errorObj);
    return res.render('update_language', {
        errors: errorObj,
        formData: req.body  // Pass submitted data
        });
     }
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        let data=req.body;
        
         let [result_set] = await connection.query(
            `update language_known
            set
            language_name=?,
            can_read=?,
            can_write=?,
            can_speak=?
            where language_known_id=?`,[data.language_name,data.can_read==='on',data.can_write==='on',data.can_speak==='on',id]
        )

    req.flash("message","data updated success fully")
       res.redirect("/view/language")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

   
    
})

app.get("/update/address",async (req,res)=>{
         let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/address");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] =await connection.query(`
            select * from address where address_id=?
            `,[id])
          console.log(result_set)
        res.render("update_address",{data:result_set[0],errors:[]})
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

})


app.post("/address/update/:id",[
    body('address1').notEmpty().withMessage("address1 is require"),
    body('address2').notEmpty().withMessage("address2 is require"),
    body('city').notEmpty().withMessage("city is require"),
    body('zip').notEmpty().withMessage("zip is require"),
],async(req,res)=>{
      let id=parseInt(req.params.id);
   
      const errors=validationResult(req)

     if(!error.isEmpty()){
         const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    
    // req.flash('errors', errorObj);
    return res.render('update_address', {
        errors: errorObj,
        formData: req.body  // Pass submitted data
        });
     }
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        let data=req.body;
        console.log(data)
        
         let [result_set] = await connection.query(
            `update address
            set
            city=?,
            state=?,
            zip_code=?,
            address_1=?,
            address_2=?
            where address_id=?`,[data.city,data.state,data.zip,data.address1,data.address2,id]
        )

    req.flash("message","data updated success fully")
       res.redirect("/view/address")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

   
    
})

// basic_detail delete
app.get("/basic_detail/delete",async (req,res)=>{
         let id=parseInt(req.query.id);
   
    if(id==null|| id==0){
       
        req.flash('message', 'id not found!');
       res.redirect("/view/basic_detail");
    }    
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        console.log("connection successfully...")

        let [result_set] =await connection.query(`
            delete from basic_details where basic_detail_id=?
            `,[id])
          
    req.flash("message","data deleted success fully")

        res.redirect("/view/basic_detail")
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }

})

app.get("/add/reference",async (req,res)=>{
         let id=parseInt(req.query.id);
   
            if(id==null|| id==0){
            
                req.flash('message', 'id not found!');
            res.redirect("/view");
            }    
     
        res.render("add_reference",{id:id})
 
})

app.post("/reference/add/:id",async(req,res)=>{
      let id=parseInt(req.params.id);
     
     let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        let data=req.body;
        console.log(data);
        
        let [insert_references] = await connection.query(`
            insert into reference_detail (basic_detail_id,name,contact_number,relation)
            values (?,?,?,?) 
            `,[id,data.rname,data.contect_number,data.relation]);


        req.flash("message","data inserted success fully")
       res.redirect(`/view/${id}`);
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }



   
    
})


app.get("/add/language",async (req,res)=>{
         let id=parseInt(req.query.id);
   
            if(id==null|| id==0){
            
                req.flash('message', 'id not found!');
            res.redirect("/view");
            }    
     
        res.render("add_language",{id:id})
 
})

app.post("/language/add/:id",async(req,res)=>{
      let id=parseInt(req.params.id);
   
     console.log(id);
     
     let connection;

    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        let data=req.body;
       
        let [result_set]= await connection.query(
              `insert into language_known (basic_detail_id,language_name,can_read,can_write,can_speak)
                        values (?,?,?,?,?)
                        `, [id, data.language_name, data.can_read === 'on', data.can_write === 'on', data.can_speak === 'on'])
        req.flash("message","data inserted success fully")
       res.redirect(`/view/${id}`);
       
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})


app.get("/add/technology",async (req,res)=>{
         let id=parseInt(req.query.id);
   
            if(id==null|| id==0){
            
                req.flash('message', 'id not found!');
            res.redirect("/view");
            }    
     
        res.render("add_technology",{id:id})
 
})

app.post("/technology/add/:id",async(req,res)=>{
      let id=parseInt(req.params.id);
   
     console.log(id);
     
     let connection;

    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        let data=req.body;
        console.log(data);
        let [result_set]= await connection.query(
                    `INSERT INTO technology_known (basic_detail_id, technology_name, skill_level) 
             VALUES (?, ?, ?)`,
                    [id, data.technology_name, data.technology]
                );
    

             
      req.flash("message","data inserted success fully")
       res.redirect(`/view?id=${id}`)
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

app.get("/add/experience",async (req,res)=>{
         let id=parseInt(req.query.id);
   
            if(id==null|| id==0){
            
                req.flash('message', 'id not found!');
            res.redirect(`/view?id${id}`);
            }    
     
        res.render("add_experience",{id:id})
 
})

app.post("/experice/add/:id",async(req,res)=>{
      let id=parseInt(req.params.id);
   
     console.log(id);
     
     let connection;

    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        let data=req.body;
        console.log(data);
        
            let [insert_experience] = await connection.query(`
                insert into work_experience (basic_detail_id,company_name,designation,start_date,end_date)
              value(?,?,?,?,?)  `,[id,data.company_name,data.designation,data.from,data.to]);
    

             
      req.flash("message","data inserted success fully")
       res.redirect(`/view?id=${id}`)
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
    
})

app.get("/add/eduction",async (req,res)=>{
         let id=parseInt(req.query.id);
   
            if(id==null|| id==0){
            
                req.flash('message', 'id not found!');
            res.redirect(`/view?id${id}`);
            }    
     
        res.render("add_eduction",{id:id})
 
})
app.post("/eduction/add/:id",async(req,res)=>{
      let id=parseInt(req.params.id);
   
     console.log(id);
     
     let connection;

    try {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "nilesh",
            password: "root",
            database: "job_application"
        })
        let data=req.body;
        console.log(data);
        
            let [insert_eduction] = await connection.query(`insert into eduction_detail (basic_detail_id,course_name,passing_year,uni_board,result) 
                values(?,?,?,?,?)`, [id, data.course_name, data.passing_year, data.uni_board, data.result]);
         

             
      req.flash("message","data inserted success fully")
       res.redirect(`/view?id=${id}`)
    } catch (err) {
        console.log(" coonectin fail:" + err.message)
    } finally {
        connection.end();
    }
})

app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}/`)
})

