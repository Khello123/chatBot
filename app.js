const express=require("express");
const cors=require("cors");
const body_parser=require("body-parser");
const xlsx = require('xlsx');

let wb = xlsx.readFile('data.xlsx');
let ws = wb.Sheets['data'];
let IPData = xlsx.utils.sheet_to_json(ws)
// console.log(IPData)
const app=express()

app.use(cors());
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:false}))

// app.get("/",(req,res)=>{
//     res.send(IPData)
// })

app.get("/getQuestions",(req,res)=>{
res.send(IPData.filter((item)=>item.id===1||item.id===2))
})

app.get("/getNextQuestions/:id",(req,res)=>{
    const {id}=req.params;
    if(id==="1"){
        res.send(IPData.filter((item)=>item.id===3||item.id===4))
    }else if(id==="2"){
        res.send(IPData.filter((item)=>item.id===5||item.id===6))
    }
   
})




app.listen("5080",()=>{console.log("http://localhost:5080")})



