import express from  "express";

const app = express();

app.get("/",(req,res)=>{
     res.send("foi2")
})

app.listen(8080,()=>{
     console.log("foi")
})