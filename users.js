const mongoose = require('mongoose');

const {Schema}=mongoose;


const userschema=new Schema({
    firstname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
  
      },
      lastname:{
        type:String,
        minlength:3,
        maxlength:20
      },
     
      emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        immutable:true,
        lowercase:true
  
      },

      age:{
        type:Number,
        min: 6,
        max:90
      },

      role:
     { type:String,
      enum:['user','admin'],
      default:'user'
    },
// problem solved me problem id ko store krna chahiye, submission id ko nhi krengeb kyunki aisa ho skta hai ki ek problem ko ek se jyada bar solvr kr de to alg alag aayega ,to sare sub. id ko nhi dalna so problem id bco same problem id ke kitne bhi sol ho but problem id always same rhega 
      problemsolved:{
        type :[{     // jitna bhi problem solve kr diye uska no store kr do kitna no solve kiya jaise 220/3465   unique problem jo solve kiye hia usko dalenge iske nadr ye nhi ki ek hi problem ko bar bar bdalengeb
           type:Schema.Types.ObjectId,
           ref:'problem'
        
        }],
        unique:true
      },
      password:{
        type:String,
        required:true,
        
      },
       
  
      
    },{timestamps:true})


    // jaise hi profile delete hoga tb ye post executr=e hoga yha post mtlb bad me delete ke bad findoneanddelete mtlb jaise hi profile delete mare to ye code execute ho jayeg aaur sare submission ko delete mar dega us particular id ka
    userschema.post('findOneAndDelete', async function (userInfo) {
        if (userInfo) {
          await mongoose.model('submission').deleteMany({ userId: userInfo.id });
        }
      });

const user=mongoose.model("user",userschema)
    module.exports=user; 
