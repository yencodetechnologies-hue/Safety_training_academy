const User = require("../models/User");
const Company = require ("../models/Company")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{
 try{

 const {name,email,phone,password,role} = req.body;

 const userExists = await User.findOne({email});

 if(userExists){
   return res.status(400).json({message:"User already exists"});
 }

 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password,salt);

 const user = await User.create({
   name,
   email,
   phone,
   password:hashedPassword,
   role,
 });

res.json({
message:"Register success",

});

 }catch(err){
   res.status(500).json({message:"Server Error"});
 }
};


exports.login = async (req,res)=>{
 try{

 const {email,password} = req.body;
let user = await User.findOne({ email });

if (!user) {
  user = await Company.findOne({ email }); // 👈 second table check
}

if (!user) {
  return res.status(400).json({ message: "Invalid Credentials" });

 }

 const isMatch = await bcrypt.compare(password,user.password);

 if(!isMatch){
   return res.status(400).json({message:"Invalid Credentials"});
 }

 const token = jwt.sign(
   {id:user._id,role: user.role},
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
 );

 res.json({
   token,
   user:{
     id:user._id,
      name: user.name || user.companyName || user.email,
     email:user.email,
     role:user.role,
   }
 });

 }catch(err){
   res.status(500).json({message:"Server Error"});
 }
};