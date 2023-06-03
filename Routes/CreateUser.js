const express= require('express')
const router= express.Router();
const FormData =require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtSecret="priyanshuverma"

router.post("/CreateUser",[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{
    
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = await bcrypt.genSalt(10);
  let secPassword= await bcrypt.hash(req.body.password, salt)
 try {
   await FormData.create({
        name: req.body.name,
        email:req.body.email,
        password: secPassword
        
        
    })
    res.json({succes:true})
 } catch (error) {
    console.log(error)
    res.json({succes:false})
 }
})


router.post("/LoginUser",[

  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let email=req.body.email;
try {
 let useremail=await FormData.findOne({email});
 if(!useremail){
  return res.status(400).json({ errors: "try login with correct cradintils" });
 }
 const pwdCompair = await bcrypt.compare(req.body.password,useremail.password)
if(!pwdCompair){
  return res.status(400).json({ errors: "try login with correct cradintils" });
}
  const data={
    FormData:{
      id:useremail.id
    }
  }
  const authToken = jwt.sign(data,jwtSecret)
return res.json({succes:true,authToken:authToken})
} catch (error) {
  console.log(error)
  res.json({succes:false});
}
})
module.exports =router;