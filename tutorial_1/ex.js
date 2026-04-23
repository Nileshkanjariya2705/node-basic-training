const express=require('express')

const app=express();


// async function getData(){
//     console.log('start')
//     const result= await someOparation();
//     console.log('end oparation')
//     return result;
// }

// function someOparation(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>resolve("oparatioin completed"),1000);
//     });
// }
// getData().then(result=>console.log(result));

// Example: Sequential vs Parallel Operations

function fatchData(id){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(`data for id is:${id}`)
        },1000)
    })
}

// sequncial
 async function fatchDataSequnce(){
    console.log("start")
    const r1= await fatchData(1);
    const r2= await fatchData(2);
    const r3= await fatchData(3);
    console.log('end')
    return {r1,r2,r3}

}

async function fatchDataParelle(){
    console.log('start');
    const result=await Promise.all([
        fatchData(1),
        fatchData(2),
        fatchData(3)

    ])
    console.log('perellel')
    return result;
}

fatchDataSequnce().then((ans)=>{
    console.log(ans);
})
fatchDataParelle().then((ans)=>{
    console.log(ans)
})