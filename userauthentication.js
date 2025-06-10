const user=require("../models/users")
const validate=require("../utils/validator")
// const bcrypt=require("bcrypt")
// // require("dotenv").config(); 




const redisclient = require("../redis/redis");
// const User =  require("../models/user")
// const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const submission = require("../models/submission");






// const register=async (req,res)=>{
// try{
//     // validate the data which we create
 
//     validate(req.body); 
//     const {firstname,emailId,password}=req.body;
//      // check email exist or  not for another same time email  ye to unique se bhi pta chl jayga jo hmne sche,a me likha hi so  o need to that one 
//         //  const ans=user.exist({emailId});   // ans in 0 and 1

//         //  if(!ans)
//         //     throw new error("email exist already");
    

// req.body.password=await bcrypt.hash(password,10)
// req.body.role='user';    // is path se as a user koi admin bhi dal kr aayega t register user ke nam se hi hoga 

//     const user1=await user.create(req.body);
    

//     // now register ho gya hai b token bhej dete hai jisse vh dubara access kr paye token se 
//     const token=jwt.sign({id:user1.id,emailId:emailId,role:'user'},process.env.JWT_KEY,{expiresIn:3600});  // initially to ek user hi register krega to role user jissr db me query dalna na pade


//      const reply={
//         firstname:user1.firstname,
//         emailId:user1.emailId,
//       id:user1.id
//       }
//     res.cookie('token',token,/*{expiresIn:new Date(Date.now())}   OR */ {maxAge:60*60*1000});   // maxage is in milisec
//     res.status(201).json({
//         user1:reply,
//         message:"register successfully"
//       })
      

// }
// catch(err){
//    res.status(400).send("error : "+err);
// }
// }

// // const register = async (req,res)=>{
    
// //     try{
// //         // validate the data;



// //       validate(req.body); 
// //       const {emailId, password}  = req.body;

// //       req.body.password = await bcrypt.hash(password, 10);
// //       req.body.role = 'user'
// //     //
    
// //      const user =  await user.create(req.body);
// //      const token =  jwt.sign({_id:user._id , emailId:emailId, role:'user'},process.env.JWT_KEY,{expiresIn: 60*60});
// const reply={
//         firstname:user1.firstname,
//         emailId:user1.emailId,
//       id:user1.id
//       }

// //      res.cookie('token',token,{maxAge: 60*60*1000});
// //    res.status(201).json({
//         user1:reply,
//         message:"register successfully"
//       })
// //     }
// //     catch(err){
// //         res.status(400).send("Error: "+err);
// //     }
// // }


// // FIXED `register` function

// const register = async (req, res) => {
//     try {
//         validate(req.body); 
//         const { firstname, emailId, password } = req.body;

//         // --- NEW VALIDATION ---
//         // You should check for an existing user BEFORE creating a new one
//         const existingUser = await user.findOne({ emailId: emailId });
//         if (existingUser) {
//             // Send a specific, JSON-formatted error
//             return res.status(400).json({ message: 'User with this email already exists' });
//         }
//         // --- END OF VALIDATION ---

//         req.body.password = await bcrypt.hash(password, 10);
//         req.body.role = 'user';
          
//         const user1 = await user.create(req.body);
//         const token = jwt.sign({ id: user1.id, emailId: emailId, role: 'user1' }, process.env.JWT_KEY, { expiresIn: 60*60 });
        
//         const reply = {
//             firstname: user1.firstname,
//             emailId: user1.emailId,
//             id: user1.id
           
//         };

//         res.cookie('token', token, { maxAge: 60*60*1000, httpOnly: true }); // Added httpOnly for security
        
//         // This success response is already correct
//         res.status(201).json({
//             user: reply,
//             message: "Register Successfully"
//         });
        
//         console.log("done");

//     } catch (err) {
//         // --- THIS IS THE FIX ---
//         console.error(err); // Log the full error for your own debugging
//         // Send a JSON response with a 'message' key
//         res.status(400).json({ message: err.message || 'An error occurred during registration.' });
//     }
// };

const register = async (req,res)=>{
    
    try{
        // validate the data;
      validate(req.body); 
      const {firstname, emailId, password}  = req.body;

      req.body.password = await bcrypt.hash(password, 10);
      req.body.role = 'user'
        
     const user1 =  await user.create(req.body);
     const token =  jwt.sign({id:user1.id , emailId:emailId, role:'user1'},process.env.JWT_KEY,{expiresIn: 60*60});
     const reply = {
        firstname: user1.firstname,
        emailId: user1.emailId,
        id: user1.id,
        role:user1.role

    }
     res.cookie('token',token,{maxAge: 60*60*1000});
     res.status(201).json({
        user:reply,
        message:"register  Successfully"
    })
    console.log("done")
    }
    catch(err){
        res.status(400).send("Error1: "+err);
    }
}


const login =async(req,res)=>{

    try{
    
      const{emailId,password}=req.body;
      if(!emailId)
        throw new Error("invalid credential");
      
      if(!password)
        throw new Error("invalid credential");
      
      const people1=await user.findOne({emailId}); 
      const match=bcrypt.compare(password,people1.password);
  
      if(!match)
        throw new Error("invalid credential"); 
    
    const token=jwt.sign({id:people1.id,emailId:emailId,role:people1.role},process.env.JWT_KEY,{expiresIn:3600})  // login to koi bhi kr skta hai ya to admin ya to user 


    // ye isliye ki jb hm login krte hai to let say home about section rhta hai to jb hm home se about section pr jate haai to wh phir se hme login krne ke liye nhi bolta i.e., jaise hi hm logim krte hai sara data ko ek hi sath bhej deta hai
      const reply={
        firstname:people1.firstname,
        emailId:people1.emailId,
      id:people1.id,
        role:people1.role

      }
      
      res.cookie("token",token,{maxAge:3600*1000});
      res.status(200).json({
        user:reply,
        message:"Loggin successfully"
      })
      
}
      
      
      
      
      
      
      
      
      
      
      
      
      
      /*  // const people=await user1.findById(req.body.id);
      const people=await user.findOne({email:req.body.email}); 
  
      if(!(req.body.email===people.email))
        throw new Error("invalid credential");
      // const isallow=await bcrypt.compare(req.body.password,people.password);
      const isallow=people.verifypassword(req.body.password);
      if(!isallow)
        throw new Error("invalid credential");
      const token=jwt.sign({id:people.id,email:people.email},"qwery")
    //   const token=people.getjwt();
      res.cookie("token",token);
      res.send("successfully login")
      console.log("success");
    }*/
    catch(err){
    res.status(401).send("error" + err.message)
    }
  }




const logout=async (req,res)=>{
    try{
const {token}=req.cookies;

const payload=jwt.decode(token);  // is token ka sara data mil jayega isme iska expire time bhi likha rhta hai



await redisclient.set(`token:${token}`,"blocked");
 
await redisclient.expireAt(`token:${token}`,payload.exp);








    // res.cookie("token","qwertyuioplkjhgfd");
    res.cookie("token",null,{expires:new Date(Date.now())});

    res.send("logout successfully");}
    catch(err){
        res.status(503).send("invalid")
    }
  }

  const adminregister=async (req,res)=>{
    try{
        // validate the data which we create
        if(req.ans1.role!='admin')
          throw new console.Error("invalid credential");
          
     
        validate(req.body); 
        const {firstname,emailId,password}=req.body;
         // check email exist or  not for another same time email  ye to unique se bhi pta chl jayga jo hmne sche,a me likha hi so  o need to that one 
            //  const ans=user.exist({emailId});   // ans in 0 and 1
    
            //  if(!ans)
            //     throw new error("email exist already");
        

    
    req.body.password=await bcrypt.hash(password,10)
      // *  req.body.role='admin';// is path se as a user koi admin bhi dal kr aayega t register user ke nam se hi hoga 


    
        const user1=await user.create(req.body);
        
    
        // now register ho gya hai b token bhej dete hai jisse vh dubara access kr paye token se 
        const token=jwt.sign({id:user1.id,emailId:emailId,role:user1.role  /* OR * role:'admin*/},process.env.JWT_KEY,{expiresIn:3600});  // initially to ek user hi register krega to role user jissr db me query dalna na pade // usetr,role se tum agr admin likhenge to db me to admin hoga agr user likhenge tpt user hpoga
// agr kuch mention krke nhi bheje postman pr to user hi consider hoga bcoz default is user set in schema so for admin ,must mention admin as a role in postman
        res.cookie('token',token,/*{expiresIn:new Date(Date.now())}   OR */ {maxAge:60*60*1000});   // maxage is in milisec
        res.status(201).send("user registered successfully")
    
    }
    catch(err){
       res.status(400).send("error1: "+err);
    }
    }


    const deleteprofile=async(req,res)=>{
      try{
        const userid=req.ans1.id;
        await user.findByIdAndDelete(userid);

        // is user ke submission bhi delete kr do njisne profile apna delete kiya hai

        // await submission.deleteMany({userid});  // jis jis submission me is userid se hoga to usko delte maro
        // submission ko aise bhi delte kr skte hai aur userschema me jake post kr kre delete kr skte hai
        res.status(201).send("profile deleted successfully")
      }
      catch(err){
   res.send("internal server error"+err);
      }
    }
    
module.exports = {
    register,
    login,logout,adminregister,deleteprofile
  };



