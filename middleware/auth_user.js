const fs=require("fs");
const jwt = require("jsonwebtoken");
const { request,response } = require("express");
const User=require("../models/User");

module.exports=auth_user=(req=request,res=response,next)=>{

    try {
        const {authorization}=req.headers;
        const private=fs.readFileSync('private.key');
        const {email,firstname,lastname,_id}=jwt.verify(authorization,private,{algorithms:"RS256"});
        User.where({_id:_id}).findOne().then(data=>{
            if(data){
                req.email=email;
                req.user_id=_id;
                next();
            }else{
                res.status(401).json({message:"UnAuthorized Token Provided",status:false})
            }
        })
    } catch (error) {
        console.error(`Error Occured In middleware- Error : ${error}`)
        res.status(500).json({ message: "Error", status: false });
    }

}