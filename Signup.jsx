import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {registerUser} from '../authSlice'
import { useEffect } from 'react';

const signupSchema = z.object({
  firstname: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak")
});

function Signup() {
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {register,   handleSubmit,   formState: { errors }, } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated,navigate]);  // may not need to write navigate

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"> {/* Centering container */}
      <div className="card w-96 bg-base-100 shadow-xl"> {/* Existing card styling */}
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Leetcode</h2> {/* Centered title */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className={`input input-bordered ${errors.firstname && 'input-error'}`}
                {...register('firstname')}
              />
              {errors.firstname && (
                <span className="text-error">{errors.firstname.message}</span>
              )}
            </div>

            <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered ${errors.emailId && 'input-error'}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${errors.password && 'input-error'}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;








// THIS WILL NOT TAKE BCOZ HM FUTURE AISE BHUT SARE DATA LESKTE HAI LET RE ENTER PASSWORD KR LIYE CAPTCHA AND SOON TO USKE LIYE BAR BAR HMKO USESSTATE LEKR KRNA PADEGA SO HM REACT HOOK KA USE LRTE HAI


// import { useState } from "react";

// function Signup(){

//   const [name,setname]=useState('');
//   const [email,setemail]=useState('');
//   const [password,setpassword]=useState('');

  

//      const handlesubmit=(e)=>{
//         e.preventDefault(); // yha se form by default submit ho jata hai but hme valiadte check krna padega bcoz aisa bhi hi skta hai postman se koi bhi hm ye sb de skte hai at the end backend ke pass jayega json ke form me to wha pr data change ho skta ghai
   


//         // validation 


//         // form mo submit kr do
    
//    }
//     return (
//      /*signup me name email password likho bs kewal whi userschema me reuired kiye hau jisse hm db me pahuch jaye bs utna jyada nhi dalna hai mi user interface khrab ho jayer  */  
  
//     <form onSubmit={handlesubmit}>
//   <input  type="text"  value={name} placeholder="Enter Your FirstName" onChange={(e)=>setname(e.target.value)}></input>

//   <input  type="text"  value={email} placeholder="Enter Your EmailId" onChange={(e)=>setemail(e.target.value)}></input>
//   <input  type="text"  value={password} placeholder="Enter Your Password" onChange={(e)=>setpassword(e.target.value)}></input>
//   <button type="button">Submit</button>
  

//     </form>
//     )
// }