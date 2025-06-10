const jwt=require("jsonwebtoken");
const redisclient=require("../redis/redis")
const user=require("../models/users")


const usermiddleware=async (req,res,next)=>{
try{
    const {token}=req.cookies;  // ye token cookie me hoiga wha se nikal jayega 
    if(!token)        // let say token exis nhi kiya ya koi glat user is token ko bheja tho error throw krkre bhejo
      throw new Error("token dont exist");
    const payload=jwt.verify(token,process.env.JWT_KEY);




    const{id}=payload;    // playload ,e se id ko extract krke wha se info nikalo b
    if(!id)
      throw new Error("id is missing");
    const ans1=await user.findById(id);
    if(!ans1)
      throw new Error("user1 dont exist");


// check kro mi ye token redis me to nhi hai hai to vh block hai to usse nhi lens agr hua to
    const isblock= await redisclient.exists(`token:${token}`);
    if(isblock)
     throw new Error("invalid token");
 
   req.ans1=ans1; // req yha to ek object hai to usi ke ander is ans1 ko store kr ade rje hai phir ye request as a response me chla jayega index1 me nhi to wha pr bhi likhna pdta to db me do bar request dalna pdta so yha hm kr rhe hai optimise
   console.log("user authentication done");

  

next();
}
    catch(err){
    res.status(401).send("Error: "+ err.message)
    } 
} 
module.exports=usermiddleware;