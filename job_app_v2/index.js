const express=require("express")
require("dotenv").config();
const app=express();
const connection=require("./db")
const session=require("express-session")
const {body,validationResult}=require('express-validator');

app.set("view engine","ejs")
app.use(express.json());

const multer = require('multer');
const upload = multer();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const port=process.env.PORT || 5000;

app.use(session({
    secret:'nilesh',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }
}));

// -----------------------session-------------------
app.get("/admin",(req,res)=>{
    req.session.user='admin';
    res.redirect('/');
})

app.get("/login",(req,res)=>{
    const id=req.query.id;
    console.log(id);
    
    req.session.userId=id;
    res.redirect('/');
})

app.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        console.log("-------------------log out--------------------");
        
    })
    res.redirect("/users");
})

// ----------------------------Render all pages-------------------------





app.get("/form",(req,res)=>{
    res.render("form",{errors:[]});    
})

app.get("/update/form",(req,res)=>{
   res.render("update_form",{errors:[]});
})

app.get("/users",(req,res)=>{
    res.render("show_users");    
})

app.get("/",async(req,res)=>{
    res.render("view_user_detail")
})


app.get("/address",(req,res)=>{
    res.render("view_address");
})


app.get("/eduction",(req,res)=>{
    res.render("view_eduction");
})


app.get("/experience",(req,res)=>{
    res.render("view_experience");
})


app.get("/language",(req,res)=>{
    res.render("view_language");
})


app.get("/technology",(req,res)=>{
    res.render("view_technology");
})


app.get("/references",(req,res)=>{
    res.render("view_references");
})


app.get("/preferences",(req,res)=>{
    res.render("view_preferences");
})

app.get("/view",(req,res)=>{
    res.render("view_all_data");
})

// ----------------------------get combobox data---------------------------

app.get("/get/select",async(req,res)=>{
    const name=req.query.name;
    try{
        const [select] =  await (await connection).query(`
            select * from select_master where unique_name=?
            `,[name]) ;
            
           res.status(200).json(select); 
    }catch(err){
        console.log("connection fail",err.message);
        
    }
})

app.get("/get/option/:id", async (req,res)=>{
    const id=parseInt(req.params.id);
        try{
            const [option]= await ( await connection).query(`
                select * from option_master where select_master_id=?
                `,[id]);
               res.status(200).json(option);
        }catch(err){
            console.log("connection fail:",err.message);
        }
})

//  ------------------------insert form data into database-------------------

app.post("/add_data",[
    body('fname').notEmpty().withMessage("fname require"),
    body('lname').notEmpty().withMessage("lname require"),
    body('email').notEmpty().withMessage("email require")
    // .isEmail().withMessage("invalid email format"),
    // body('designation').notEmpty().withMessage("designation require"),
    // body('dob').notEmpty().withMessage("dob require"),
    // body('zip').notEmpty().withMessage("zip require"),
    // body('rname').notEmpty().withMessage("rname require"),
    // body('adress1').notEmpty().withMessage("adress1 require"),
    // body('adress2').notEmpty().withMessage("adress2 require"),
    // body('notice_period').notEmpty().withMessage("notice_period require"),
    // body('current_ctc').notEmpty().withMessage("current_ctc require"),
    // body('expected ctc').notEmpty().withMessage("expected ctc require")

],async (req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        res.status(200).json(error.array());
        return;
    }
    try{
        const data=req.body;
        console.log(data);
        

        await (await connection).beginTransaction();
        // basic detail insert
       const [basic_details]=  await (await connection).query(`
            insert into basic_details (first_name,last_name,email,designation,phone_number,gender,relationship_status,dob)
            values(?,?,?,?,?,?,?,?);
            `,[data.fname,data.lname,data.email,data.designation,data.phoneNumber,data.gender,data.relationship_status,data.dob]);
            console.log("basic_detail data inserted success fulllllllllly");
            
        const last_inserted_id= basic_details.insertId;

        // address
        await(await connection).query(`
            insert into address(basic_detail_id,city,state,zip_code,address_1,address_2)
            values(?,?,?,?,?,?) `,[last_inserted_id,data.city,data.state,data.zip,data.address1,data.address2])
            console.log("address data inserted success fulllllllllly");

         //  eduction detail
         for(let i=0; i<data.course_name.length; i++){

              await(await connection).query(`
            insert into eduction_detail(basic_detail_id,course_name,passing_year,uni_board,result)
            values(?,?,?,?,?)
            `,[last_inserted_id,data.course_name[i],data.passing_year[i],data.uni_board[i],data.result[i]])
         }
                   console.log("eduction detail data inserted success fulllllllllly");

            // work_experience
            for(let j=0; j<data.compnay_name.length; j++){
                 await(await connection).query(`
            insert into work_experience(basic_detail_id,company_name,designation,start_date,end_date)
            values(?,?,?,?,?)
            `,[last_inserted_id,data.compnay_name[j],data.work_designation[j],data.start_date[j],data.end_date[j]])

            }
            console.log("experience detail data inserted success fulllllllllly");
             

            // language known
            for(let k=0; k<data.language.length; k++){
                if(data.language[k]=='english'){
                     await(await connection).query(`
            insert into language_known(basic_detail_id,language_name,can_read,can_write,can_speak)
            values(?,?,?,?,?)
            `,[last_inserted_id,data.language[k],data.eng_skill.indexOf('read')!=-1,data.eng_skill.indexOf('write')!=-1,data.eng_skill.indexOf('speak')!=-1])
                }
                if(data.language[k]=='gujarati'){
                     await(await connection).query(`
            insert into language_known(basic_detail_id,language_name,can_read,can_write,can_speak)
            values(?,?,?,?,?)
            `,[last_inserted_id,data.language[k],data.guj_skill.indexOf('read')!=-1,data.guj_skill.indexOf('write')!=-1,data.guj_skill.indexOf('speak')!=-1])
                }
                
                if(data.language[k]=='hindi'){
                     await(await connection).query(`
            insert into language_known(basic_detail_id,language_name,can_read,can_write,can_speak)
            values(?,?,?,?,?)
            `,[last_inserted_id,data.language[k],data.hindi_skill.indexOf('read')!=-1,data.hindi_skill.indexOf('write')!=-1,data.hindi_skill.indexOf('speak')!=-1])
                }

            }
            console.log("language data inserted success fulllllllllly");
              

            // technology_known
            for(let n=0; n<data.tech.length; n++){
                if(data.tech[n]=='java'){
                     await(await connection).query(`
                insert into technology_known(basic_detail_id,technology_name,skill_level) values(?,?,?)
                `,[last_inserted_id,data.tech[n],data.java_level]);
                }

                if(data.tech[n]=='php'){
                     await(await connection).query(`
                insert into technology_known(basic_detail_id,technology_name,skill_level) values(?,?,?)
                `,[last_inserted_id,data.tech[n],data.php_level]);
                }

                if(data.tech[n]=='java'){
                     await(await connection).query(`
                insert into technology_known(basic_detail_id,technology_name,skill_level) values(?,?,?)
                `,[last_inserted_id,data.tech[n],data.mysql_level]);
                }
               

            }
            console.log("technology data inserted success fulllllllllly");
             

            // references
            await(await connection).query(`
            insert into reference_detail(basic_detail_id,name,contact_number,relation) values(?,?,?,?)
            `,[last_inserted_id,data.rname,data.contect_number,data.relation]);

            console.log("references data inserted success fulllllllllly");

            // preferences
             await(await connection).query(`
            insert into preferences(basic_detail_id,prefered_location_1,prefered_location_2,prefered_location_3,notice_period,department,current_ctc,expected_ctc)
            values(?,?,?,?,?,?,?,?)`,[last_inserted_id,data.preferred[0]|| '',data.preferred[1] ||'',data.preferred[2] || '',data.notice_period,data.department,data.current_ctc,data.expected_ctc])
            console.log("preferencesa data inserted success fulllllllllly");


        await (await connection).commit();
              console.log("--------------------data inserted success fully----------------------");
         res.redirect("/logout");       
    }catch(err){
        console.log("connection fail:",err.message);
        await(await connection).rollback();
    }
})



// ---------------------------get user data-------------------------------

app.get("/get/allUser",async(req,res)=>{
    try{
        if(req.session.user){
            const [basic_detail]=await (await connection).query(`select * from basic_details `) 
        res.status(200).json({
            basic_detail
        });
        }else{
            const [basic_detail]=await (await connection).query(`select * from basic_details where basic_detail_id=?`,[req.session.userId]) 
            res.status(200).json({
                basic_detail
            });
        }
        
        
        
    }catch(err){
        console.log("connection fail:"+err.message);
        
    }
})


app.get("/get/User",async(req,res)=>{
    try{
        const [basic_detail]=await (await connection).query(`select * from basic_details `) 
        res.status(200).json({
            basic_detail
        });
        
    }catch(err){
        console.log("connection fail:"+err.message);
        
    }
})



app.get("/get/address",async(req,res)=>{
    try{
        if(req.session.user){
                const [address]=await(await connection).query(`
            select * from address `)
        res.status(200).json(address);  
        }else{
            const [address]=await(await connection).query(`
            select * from address where basic_detail_id=?;
            `,[req.session.userId])
            res.status(200).json(address);  
        }
          
    }catch(err){
        console.error("connection fail",err.message);
        
    }
})

app.get("/get/eduction",async(req,res)=>{
    try{
        if(req.session.user){
            const [eduction]=await(await connection).query(`
            select * from eduction_detail`)
           res.status(200).json(eduction); 
        }else{
            const [eduction]=await(await connection).query(`
            select * from eduction_detail where basic_detail_id=?
            `,[req.session.userId])
           res.status(200).json(eduction); 
        }
           
    }catch(err){
        console.error("connection fail",err.message);
        
    }
})

app.get("/get/language",async(req,res)=>{
    try{
        if(req.session.user){
            const [language]=await(await connection).query(`
            select * from language_known `)
        res.status(200).json(language);   
        }else{
            const [language]=await(await connection).query(`
            select * from language_known where basic_detail_id=?;
            `,[req.session.userId])
        res.status(200).json(language);   
        }
         
    }catch(err){
        console.error("connection fail",err.message);
        
    }
})

app.get("/get/technology",async(req,res)=>{
    try{
        if(req.session.user){
            const [technology]=await(await connection).query(`
            select * from technology_known `)
        res.status(200).json(technology);  
        }else{
            const [technology]=await(await connection).query(`
            select * from technology_known where basic_detail_id=?;
            `,[req.session.userId])
        res.status(200).json(technology);  
        }
          
    }catch(err){
        console.error("connection fail",err.message);
        
    }
})

app.get("/get/experience",async(req,res)=>{
    try{
        if(req.session.user){
               const [experience]=await(await connection).query(`
            select * from work_experience `)
        res.status(200).json(experience);   
        }else{
               const [experience]=await(await connection).query(`
            select * from work_experience where basic_detail_id=?;
            `,[req.session.userId])
        res.status(200).json(experience);   
        }
      
    }catch(err){
        console.error("connection fail",err.message);
        
    }
})

app.get("/get/references",async(req,res)=>{
    try{
        if(req.session.user){
            const [references]=await(await connection).query(`
            select * from reference_detail `)
        res.status(200).json(references); 
        }else{
            const [references]=await(await connection).query(`
            select * from reference_detail where basic_detail_id=?;
            `,[req.session.userId])
        res.status(200).json(references); 
        }
           
    }catch(err){
        console.error("connection fail",err.message);
        
    }
})

app.get("/get/preferences",async(req,res)=>{
    try{
        if(req.session.user){
             const [preferences]=await(await connection).query(`
            select * from preferences `);
            res.status(200).json(preferences);
        }else{
             const [preferences]=await(await connection).query(`
            select * from preferences  where basic_detail_id=?
            `,[req.session.userId]);
            res.status(200).json(preferences);

        }
        
       
            
        res.status(200).json(preferences);    
    }catch(err){
        console.error("connection fail",err.message);
        
    }
})

app.get("/get/alldata/:id",async(req,res)=>{
    const id=parseInt(req.params.id);
    try{
        const [basic_detail]=await (await connection).query(`select * from basic_details where basic_detail_id=?`,[id])

        const [address]=await (await connection).query(`select * from address where basic_detail_id=?`,[id])

        const [eduction_detail]=await (await connection).query(`select * from eduction_detail where basic_detail_id=?`,[id])

        const [work_experience]=await (await connection).query(`select * from work_experience where basic_detail_id=?`,[id])

        const [language]=await (await connection).query(`select * from language_known where basic_detail_id=?`,[id])

        const [technology]=await (await connection).query(`select * from technology_known where basic_detail_id=?`,[id])

        const [reference_detail]=await (await connection).query(`select * from reference_detail where basic_detail_id=?`,[id])

        const [preferences]=await (await connection).query(`select * from preferences where basic_detail_id=?`,[id])
        res.status(200).json({
            basic_detail,
            address,
            eduction_detail,
            work_experience,
            language,
            technology,
            reference_detail,
            preferences
        });
        
    }catch(err){
        console.log("connection fail:"+err.message);
        
    }
})

// --------------------------delete data data-------------------------------------

app.get("/delete/preferences",async(req,res)=>{
    try{
        const id=parseInt(req.query.id);
        await (await connection).query(`
            delete from preferences where preferences_id=?
            `,[id]);
        res.status(200).json({
            msg:"preferese deleted success fully"
        })    
    }catch(err){
        console.error("connection fail:",e.message);
        
    }
})

app.get("/delete/references",async(req,res)=>{
    try{
        const id=parseInt(req.query.id);
        await (await connection).query(`
            delete from reference_detail where reference_detail_id=?
            `,[id]);
        res.status(200).json({
            msg:"referese deleted success fully"
        })    
    }catch(err){
        console.error("connection fail:",e.message);
        
    }
})

app.get("/delete/technology",async(req,res)=>{
    try{
        const id=parseInt(req.query.id);
        await (await connection).query(`
            delete from technology_known where technology_know_id=?
            `,[id]);
        res.status(200).json({
            msg:"technology deleted success fully"
        })    
    }catch(err){
        console.error("connection fail:",e.message);
        
    }
})

app.get("/delete/language",async(req,res)=>{
    try{
        const id=parseInt(req.query.id);
        await (await connection).query(`
            delete from language_known where language_known_id=?
            `,[id]);
        res.status(200).json({
            msg:"language deleted success fully"
        })    
    }catch(err){
        console.error("connection fail:",e.message);
        
    }
})

app.get("/delete/experience",async(req,res)=>{
    try{
        const id=parseInt(req.query.id);
        await (await connection).query(`
            delete from work_experience where work_experience_id=?
            `,[id]);
        res.status(200).json({
            msg:"work_experience deleted success fully"
        })    
    }catch(err){
        console.error("connection fail:",e.message);
        
    }
})

app.get("/delete/eduction",async(req,res)=>{
    try{
        const id=parseInt(req.query.id);
        await (await connection).query(`
            delete from eduction_detail where eduction_detail_id=?
            `,[id]);
        res.status(200).json({
            msg:"eduction deleted success fully"
        })    
    }catch(err){
        console.error("connection fail:",e.message);
        
    }
})

app.get("/delete/address",async(req,res)=>{
    try{
        const id=parseInt(req.query.id);
        await (await connection).query(`
            delete from address where address_id=?
            `,[id]);
        res.status(200).json({
            msg:"address deleted success fully"
        })    
    }catch(err){
        console.error("connection fail:",e.message);
        
    }
})


//  -----------------------edite data---------------------------
app.get("/edit_basic_detail",(req,res)=>{
    res.render("edit_basic_detail",{errors:[]})
})
app.get("/edit_address",(req,res)=>{
    res.render("edit_address",{errors:[]})
})

app.get("/edit_eduction",(req,res)=>{
    res.render("edit_eduction",{errors:[]})
})

app.get("/edit_work_experience",(req,res)=>{
    res.render("edit_work_experience",{errors:[]})
})

app.get("/edit_preferences",(req,res)=>{
    res.render("edit_preferences",{errors:[]})
})

app.get("/edit_references",(req,res)=>{
    res.render("edit_references",{errors:[]})
})

app.get("/edit_language",(req,res)=>{
    res.render("edit_language")
})


app.get("/edit_basic_detail/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
         const [data]= await (await connection).query(`select * from basic_details where basic_detail_id=?`,[id])
        res.status(200).json(data)
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.get("/edit/address/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
         const [data]= await(await connection).query(`select * from address where address_id=?`,[id])
        res.status(200).json(data)
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.get("/edit/eduction/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
         const [data]= await (await connection).query(`select * from eduction_detail where eduction_detail_id=?`,[id])
        res.status(200).json(data)
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})


app.get("/edit/work_experience/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
         const [data]= await (await connection).query(`select * from work_experience where work_experience_id=?`,[id])
         console.log(data);
         
        res.status(200).json(data)
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.get("/edit/preferences/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
         const [data]= await (await connection).query(`select * from preferences where preferences_id=?`,[id])
        res.status(200).json(data)
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.get("/edit/references/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
         const [data]= await (await connection).query(`select * from reference_detail where reference_detail_id=?`,[id])
        res.status(200).json(data)
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.get("/edit/language/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
         const [data]= await (await connection).query(`select * from language_known where language_known_id=?`,[id])
        res.status(200).json(data)
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

// -----------------------update database----------------------------------------

app.post("/update_basic_detail/:id",upload.none(),async(req,res)=>{
    const id=parseInt(req.params.id);
    const data=  req.body;
    
    
    try{
        
        console.log("-------------update_basic_detail---------------",req.params.id);
        await (await connection).query(`
            update basic_details 
            set first_name=?,
            last_name=?,
            designation=?,
            dob=?,
            email=?,
            phone_number=?,
            gender=?,
            relationship_status=?
            where basic_detail_id=?
            `,[data.fname,data.lname,data.designation,data.dob,data.email,data.phoneNumber,data.gender,data.relationship_status,id])

        console.log("basic_detail data updated success fully");
        res.status(200).json({
            msg:" basic detail data updated success fully"
        })
        
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.post("/update_address/:id",async(req,res)=>{
    const id=parseInt(req.params.id);
    const data=req.body;
    console.log(data);
    try{
        console.log("-------------update_address---------------",req.params.id);
        await (await connection).query(`
                update address set 
                city=?,
                state=?,
                zip_code=?,
                address_1=?,
                address_2=?
                where address_id=?

            `,[data.city,data.state,data.zip,data.address1,data.address2,id]);
        res.status(200).json({
            msg:" address data updated success fully"
        })
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.post("/update_eduction/:id",upload.none(),async(req,res)=>{
    const id=parseInt(req.params.id);
    const data=req.body;
    console.log(data);

    try{
        console.log("-------------update_eduction---------------",req.params.id);
        await (await connection).query(`
            update  eduction_detail
            set course_name=?,
            passing_year=?,
            uni_board=?,
            result=?
            where eduction_detail_id=?    
            `,[data.course_name,data.passing_year,data.uni_board,data.result,id]);
        res.status(200).json({
            msg:" eduction data updated success fully"
        })
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.post("/update_work_experience/:id",upload.none(),async(req,res)=>{
    const id=parseInt(req.params.id);
    const data=req.body;
    console.log(data);

    try{
        console.log("-------------update work_experience---------------",req.params.id);
        await(await connection).query(`
            update work_experience
            set company_name=?,
            designation=?,
            start_date=?,
            end_date=?
            where work_experience_id=?
            `,[data.compnay_name,data.work_designation,data.start_date,data.end_date,id])
          res.status(200).json({
            msg:" work experinecd data updated success fully"
        })
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.post("/update_language/:id",upload.none(),async(req,res)=>{
    const id=parseInt(req.params.id);
    const data=req.body;
    console.log(data);

    try{
        console.log("-------------update language---------------",req.params.id);
        await(await connection).query(`
            update language_known 
            set 
            can_read=?,
            can_write=?,
            can_speak=?
            where language_known_id=?
            `,[data.can_read=='YES',data.can_write=='YES',data.can_speak=='YES',id])
          res.status(200).json({
            msg:" language data updated success fully"
        })
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.get("/update/tech",async(req,res)=>{
    const id=req.query.id
    const skill_level=req.query.skill_level
    console.log(skill_level);

    

    try{
        console.log("-------------update technology---------------",id);
        await (await connection).query(`
            update technology_known 
            set 
            skill_level=?
            where technology_know_id=?
            `,[skill_level,id])
         
            res.redirect('/technology');
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.post("/update_preferences/:id",upload.none(),async(req,res)=>{
    const id=parseInt(req.params.id);
    const data=req.body;
    console.log(data);

    try{
        console.log("-------------update preferences---------------",req.params.id);
        await (await connection).query(`
            update preferences 
            set prefered_location_1=?,
             prefered_location_2=?,
             prefered_location_3=?,
            notice_period=?,
             department=?,
             current_ctc=?,
             expected_ctc=?
            where preferences_id=?
            `,[data.preferred[0] || null,data.preferred[1] || null,data.preferred[2]||null,data.notice_period,data.department,data.current_ctc,data.expected_ctc,id]);
          res.status(200).json({
            msg:" preferences data updated success fully"
        })
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})

app.post("/update_references/:id",upload.none(),async(req,res)=>{
    const id=parseInt(req.params.id);
    const data=req.body;
    console.log(data);

    try{
        console.log("-------------update references---------------",req.params.id);
        await (await connection).query(`
            update reference_detail 
            set name=?,
            contact_number=?,
            relation=?
            where reference_detail_id=?
            `,[data.rname,data.contect_number,data.relation,id])
          res.status(200).json({
            msg:" references data updated success fully"
        })
    }catch(err){
        console.error("connection fail:",err.message);
        
    }
})





app.listen(port,()=>{
    console.log(`appliction runnig at:http://localhost:${port}/`);
    
});