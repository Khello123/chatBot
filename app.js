const express=require("express");
const cors=require("cors");
const body_parser=require("body-parser");
const xlsx = require('xlsx');

let wb = xlsx.readFile('data.xlsx');
let ws = wb.Sheets['data'];
let medicalQuestions = xlsx.utils.sheet_to_json(ws)
// console.log(medicalQuestions)
const app=express()

app.use(cors());
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:false}))

// app.get("/",(req,res)=>{
//     res.send(medicalQuestions)
// })

app.get("/getQuestions",(req,res)=>{
const filteredQuestion=medicalQuestions.filter((item)=>item.id===1||item.id===2)
res.send(filteredQuestion.map((q)=>({question:q.questions,id:q.id,role:"user"})))
})

app.get("/getNextQuestions/:id",(req,res)=>{
    const {id}=req.params;
    const med=medicalQuestions.find((qu)=>qu.id.toString()===id)
   
    
    if(id==="1"){
        const filteredQuestion=medicalQuestions.filter((item)=>item.id===3||item.id===4)
        const nextQuestions=filteredQuestion.map((q)=>({question:q.questions,id:q.id,role:"user"}))
        res.send([{answer:med.answers,id:med.id,role:"system"},...nextQuestions])
    }else if(id==="2"){
        const filteredQuestion=medicalQuestions.filter((item)=>item.id===5||item.id===6)
        const nextQuestions=filteredQuestion.map((q)=>({question:q.questions,id:q.id,role:"user"}))
        res.send([{answer:med.answers,id:med.id,role:"system"},...nextQuestions])
    }
   
})




app.listen("5080",()=>{console.log("http://localhost:5080")})



// interface Message {
//     id: number;
//     role: "system" | "user";
//     question?: string;
//     answer?: string;
//   }