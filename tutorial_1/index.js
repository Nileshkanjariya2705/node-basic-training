const express=require('express')
const ejs=require('ejs')

let app=express();

app.set('view engine',"ejs")

app.get('/',(req,res)=>{
        res.render('master')
}).listen(8080)

app.get('/cucucube',(req,res)=>{
        res.render('cucucube')
});

app.get('/cucucube',(req,res)=>{
        res.render('cucucube')
});

app.get('/traffic_signal',(req,res)=>{
        res.render('traffice_signal')
});
app.get('/job_application',(req,res)=>{
        res.render('job_app')
});

app.get('/pracrice_table',(req,res)=>{
        res.render('practice_table')
});


app.get('/pagination',(req,res)=>{
        res.render('pagination')
});


