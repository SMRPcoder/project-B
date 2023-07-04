const User = require("../models/User");
const { request, response } = require("express");

const { createJWT } = require("../functions/function");


exports.addUser = (req = request, res = response) => {
    try {
        const { email, firstname, lastname, password } = req.body;
        User.where({ email: email }).findOne().then((data) => {
            if (data) {
                res.status(200).json({ message: "User Already Exits" });
            } else {
                var newuserupdate={
                    email,
                    firstname,
                    lastname,
                    password
                }
                if(req.file){
                    newuserupdate["profile"]=req.file.path;
                }
                    const newuser=new User(newuserupdate)
                newuser.save().then((data)=>{
                    res.status(200).json({data:data,status:true});
                })
            }
        })
    } catch (error) {
        console.error(`Error Occured While User Adding- Error : ${error}`)
        res.status(500).json({ message: "Error", status: false });
    }

}

exports.login=(req=request,res=response)=>{

    try {
        const {email,password}=req.body;
        User.where({email:email}).findOne().then(data=>{
            if(data){
                data.verifyPassword(password,(err,valid)=>{
                    if(valid){
                        const token=createJWT(data);
                        res.status(200).json({message:"Logged in Success",status:true,token:token});
                    }else{
                        res.status(200).json({message:"Password wrong",status:false});
                    }
                })
            }else{
                res.status(200).json({message:"username not found",status:false});
            }
        })
    } catch (error) {
        console.error(`Error Occured While Login- Error : ${error}`)
        res.status(500).json({ message: "Error", status: false });
    }

}

exports.getuser=(req=request,res=response)=>{

    try {
        const {email}=req.body;
        User.where({email:email}).findOne().then((data)=>{
            if(data){
                res.status(200).json({data:data,status:true})
            }else{
                res.status(200).json({status:false,message:"username not exit"});
            }
        })
    } catch (error) {
        console.error(`Error Occured In GetUser- Error : ${error}`)
        res.status(500).json({ message: "Error", status: false });
    }
}

exports.editUser=(req=request,res=response)=>{
    try {
        const {firstname,lastname,profile,password,id}=req.body
        User.findOneAndUpdate({_id:id},{
            firstname,
            lastname,
            password,
            profile
        }).then(data=>{
            const token=createJWT(data);
            // console.log(data);
            res.status(200).json({message:"updated successfully",data:data,status:true,token:token});
        })
    } catch (error) {
        console.error(`Error Occured In editUser- Error : ${error}`);
        res.status(500).json({ message: "Error", status: false });
    }
}