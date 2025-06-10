const express=require('express');
const authrouter=express.Router();
const usermiddleware=require("../middleware/middle")
const adminmiddleware=require("../middleware/adminmiddle")

const {register,login,logout,adminregister,deleteprofile}=require("../controllers/userauthentication");
const user = require('../models/users');


// const authrouter=express.Router();

authrouter.post('/login',login);
authrouter.post('/logout',usermiddleware,logout);  // logout se phle dekho ki ye token valid token hai ki nhi by using the middleware

authrouter.post('/register',register);
authrouter.post('/admin/register',adminmiddleware,adminregister);
// authrouter.post('/admin/register',usermiddleware,adminregister);// ye bhi kr skte the without using adminmiddleware ,usermiddleware se check ho jata jate admi r egister me wha likhte agr req.ans1.role!='admin
//  throw new error(err); phir bhi ho jata  req.ans1 isliye ki ans1 me admin ka sara chij hioga agr role admin nhi hua to invalid crdential btakr bhej denge


// authrouter.get('/getpofile',getprofile);


    authrouter.delete("/profile",adminmiddleware,deleteprofile);
   authrouter.get('/check',usermiddleware,(req,res)=>{
   
       const reply = {
           firstname: req.ans1.firstname,
           emailId: req.ans1.emailId,
           id:req.ans1.id,
        role:req.ans1.role

       }
   
       res.status(200).json({
           user:reply,
           message:"Valid User"
       });
    })


module.exports=authrouter;



