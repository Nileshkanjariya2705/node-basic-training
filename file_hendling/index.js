import express from 'express'
import multer from 'multer';
import fs from 'fs/promises'
import csv from 'csv-parser'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const logger = require('./logger.js');

import logger from './logger.js';



const app = express();
// app.set("views",win32.join(__dirname,'views'))
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    }

})
const upload = multer({ storage: storage })

app.set("view engine", "ejs")
app.use(express.json())

app.get('/', (req, res) => {
    res.render('file')
})


app.post("/add", upload.single('resume'), async (req, res) => {
    logger.info("file uploding oparation start")
    const file = req.file;
    const fileName=req.body
    console.log(file);
    console.log(fileName);
    const time_zone=Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentTime=new Date().toLocaleString('en-US',{timeZone:`${time_zone}`})
    
    try {
        fs.appendFile('./data.csv', `"${fileName.name}","${file.path}",${currentTime} \n`)
        res.redirect('/read')
    } catch (error) {
        logger.error("Error during file uploading",error)

    }
})

app.get("/read",async(req,res)=>{
    logger.info("file reading opration start...")
    try {
        const data= await fs.readFile('data.csv','utf-8');
        res.render('show_data',{data:data})
    } catch (error) {
        logger.error("error during reading file",error)        
    }
})


app.get('/delete/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    if(!id){
        return;
    }
    logger.info("delete oparation start")
    try {
        const csvFile=await fs.readFile("data.csv",'utf-8');
       
        const csvFileArray=csvFile.split("\n");
        await fs.writeFile('data.csv','');
        for(let i=0; i<csvFileArray.length-1; i++){
            if(i+1===id){
                continue;
            }
            await fs.appendFile('data.csv',`${csvFileArray[i]} \n`)

        }
        logger.info("data deleted success fully")
        res.redirect('/read')
        
       
    } catch (error) {
        logger.error("errror during deleting file:",error)
        
    }
})



// view fileData
app.get('/view',async(req,res)=>{
    logger.info("view Oparation start")
    const pathName=req.query.path
    console.log(pathName);
    
    res.sendFile(`${__dirname}/${pathName.substring(1,pathName.length-1)}`)
    
})

app.post("/update/:id",upload.single('resume'),async(req,res)=>{
    logger.info("update oparation start")
    try {
          const id=req.params.id
            const fileName=req.body;
            const file=req.file;
            console.log(fileName);
            console.log(file);

             const time_zone=Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentTime=new Date().toLocaleString('en-US',{timeZone:`${time_zone}`})

        const csvFileData=await fs.readFile('data.csv','utf8')
        const csvArray=csvFileData.split('\n');
        let newArray=new Array();
        for(let i=0; i<csvArray.length-1; i++){
            if(i==id-1){
                newArray.push(`${fileName.name},${file.path},${currentTime}`);
                continue;
            }else{
                newArray.push(csvArray[i]);
            }
        }
        console.log(newArray);
        await fs.writeFile('data.csv','');
        newArray.forEach(ele=>{
            addFile(ele);
        })
        res.redirect('/read')
        
    } catch (error) {
        logger.error("error during uploading file",error)
        
    }
  

    
    
    

})


async function addFile(ele){
    try {
        await fs.appendFile('data.csv',`${ele}\n`)
    } catch (error) {
        logger.info("error during updating")
    }
}

app.get("/update",(req,res)=>{
    const fileName=req.query.fileName;
    const id=req.query.id;
    console.log(fileName);
    console.log(id);
       res.render("updateFile",{fileName:fileName,id:id})
})

app.listen(8080);