const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()

const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")




const USER = mongoose.model("USER")


const {Jwt_secret} = require("../keys");
const requireLogin = require('../middleWares/requireLogin')







router.post("/signup" , (req,res)=> {
    const {name , userName , password ,email , address , phone} = req.body;
    const ip = req.headers['cf-connecting-ip'] ||
                req.headers['x-real-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress || '' ;


    if(!name ||!userName ||!password ||!email ||!address ||!phone){
        return res.status(422).json({error : "Please add all the fields"})
    }

    USER.findOne({$or : [{email : email} , {userName: userName}]}).then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error : "user already exist with that email or userName"})
        }


        bcryptjs.hash(password , 12).then((hashedPassword) => {
            const user = new USER ({
                name , 
                userName , 
                email,    
                address , 
                phone,
                password:hashedPassword, //hiding password,
                ip
            })
        
            user.save()
            .then(user => {res.json({message : "Data Saved"})})
            .catch(err => {console.log(err)})
        })
    })
})



router.post("/signin" , (req , res) => {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(422).json({error: "please add all the fields"})
    }

    USER.findOne({email:email}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email"})
        }
        bcryptjs.compare(password , savedUser.password).then((match) => {
            if(match){
                // return res.status(200).json({message :"Signed In Successufully" })
                const token = jwt.sign({_id:savedUser.id} , Jwt_secret)
                const {_id ,name , email , userName , phone , address , cart} = savedUser
                res.json({token , user:{_id ,name , email , userName , phone , address , cart}})
                console.log({token , user:{_id ,name , email , userName , phone , address , cart}})
            }else{
                return res.status(422).json({error :"Invalid password" })
            }
        })
        .catch(err => console.log(err))
        // console.log(savedUser)
    })
})




module.exports = router;