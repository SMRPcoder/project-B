const express = require("express");
const cors=require("cors");
const connection=require("./db/connection");
const UserRouter = require("./router/user-routers");
require("dotenv").config();
const app= express();
connection();

app.use(cors());
app.use(express.json());
app.use("/api/user",UserRouter);


app.get("/",(req,res)=>{
    res.status(200).json({message:"hello world",status:true});
})




module.exports=app;