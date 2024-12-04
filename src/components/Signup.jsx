import React, { useContext, useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import AuthContext from '../context/AuthContext'
import EcomContext from '../context/EcomContext' 
import Confirmation from './pages/Confirmation'

function Signup() {
  const [email, setEmail] = useState("")
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("client")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const {setItem } = useLocalStorage("auth-token")
  const [state, dispatch] = useContext(AuthContext)
  const {showHide} = useContext(EcomContext)
  const redirect = useNavigate()
  const[message, setMessage] =useState("");
  const[btnDisabled, setBtnDisabled] =useState(true);
  


  const registerHandler = async (e) =>{
    e.preventDefault();
    console.log('submitted');

    try {
      const res = await fetch("https://bimscollection.onrender.com/api/register",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          role,
          password,
          confirmPassword
        })
      })
      const data = await res.json();
      if (data.message) {
        showHide("error", data.message)
      }else if(data === "password do not match") {
        showHide("error", "password do not match")
      }else if(data === "User already exist!!") {
        showHide("error", "User already exist!!")
      }else{
        // dispatch({ type : "setToken", payload: data.token })
        // setItem(data.token)
        redirect("/login")
        showHide("success", "You have successful registered")
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const validatePassword = (e) => {
    e.preventDefault();
    if (password === "") {
        setBtnDisabled(true);
        setMessage("Enter your password");
    }  else if (password !== "" && password.trim().length < 8) {
        setBtnDisabled(true);
        setMessage("Your Password must be atleast 8 letters");
    }else {
        setBtnDisabled(false)
        setMessage("Valid Password")
    }
    setPassword(e.target.value)
  }
  return (
//     <div>
//       <div className="bg-[#D97706] heads my-7 w-[700px]  h-[650px] ">
//         <div className="text-[#F4F4F9] text-center font-[tangerine] tracking-tighter pt-8 text-6xl ">Sign Up</div>
//         <form onSubmit={registerHandler} className='text-[#F4F4F9] ml-[6rem] text-[lora] p-3'>
//             <div className="p-3  label">
//               <input type="text" name="" placeholder='FirstName' onChange={(e)=>{setfirstName(e.target.value)}} className='w-[80%] p-2 bg-transparent border-0 border-b border-[#F4F4F9] outline-none placeholder:text-[#F4F4F9] ' />
//             </div>

//             <div className="p-3  label">
//               <input type="text" name="" placeholder='LastName' onChange={(e)=>{setlastName(e.target.value)}} className='w-[80%] p-2 bg-transparent border-0 border-b border-[#F4F4F9] outline-none placeholder:text-[#F4F4F9] ' />
//             </div>

//             <div className="p-3  label">
//               <label htmlFor="" className='block'></label>
//               <input type="email" name="" placeholder='Email Address' onChange={(e)=>{setEmail(e.target.value)}}  className='w-[80%] p-2  bg-transparent  border-0 border-b border-[#F4F4F9] outline-none placeholder:text-[#F4F4F9] ' />
//             </div>

//             <div className="p-3  label">
//               <input type="text" name="" placeholder='Phone Number' onChange={(e)=>{setPhone(e.target.value)}} className='w-[80%] p-2 bg-transparent border-0 border-b border-[#F4F4F9] outline-none placeholder:text-[#F4F4F9] ' />
//             </div>

//             <div className="p-3  label">
//               <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} className='w-[80%] p-2  bg-transparent border-0 border-b border-[#F4F4F9] outline-none placeholder:text-[#F4F4F9]' />
//               {/* <input type="password" placeholder='Password' name="" onChangeCapture={validatePassword} onChange={(e)=>{setPassword(e.target.value)}} className='w-[80%] p-2  bg-transparent border-0 border-b border-[#F4F4F9] outline-none placeholder:text-[#F4F4F9]' /> */}
//               {message && <p>{message}</p>}
//             </div>
            
//             <div className="p-3  label">
//               <input type="password" name=""  placeholder='Repeat Password' onChange={(e)=>{setConfirmPassword(e.target.value)}} className='w-[80%] p-2  bg-transparent border-0 border-b border-[#F4F4F9] outline-none placeholder:text-[#F4F4F9]' />
//             </div>
// {/* 
//             <div className=" terms">
//               <input type="radio" className='inline' name=""  />
//               <p>I agree all statement in <span className='underline'>Terms and Conditions</span> </p>
//             </div> */}
//           {/* <button type="submit" disabled={btnDisabled} className='text-xl p-3 bg-[#2cd8d8] rounded  w-[100px] '>Sign Up</button> */}
//           <div className='flex justify-between mx-12 my-6 '>
//           <button type="submit" className='text-xl p-3 bg-[#F4F4F9] text-[#D97706] rounded  w-[100px] '>Sign Up</button>
//           <h1 className='text-[#F4F4F9] font-[lora]'>Already have an account? <Link to='/login' className='underline italic'>Log in</Link></h1>
//           </div>
//           </form>
//       </div>
//     </div>
<div className="min-h-screen flex items-center justify-center bg-[#F4F4F9]">
  <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
    {/* Header */}
    <div className="text-center mb-6">
      <h1 className="text-[#D97706] text-4xl font-bold">Sign Up</h1>
      <p className="text-gray-600 text-sm">Create your account to get started</p>
    </div>

    {/* Signup Form */}
    <form onSubmit={registerHandler} className="space-y-6">
      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          onChange={(e) => setfirstName(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#D97706] text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          onChange={(e) => setlastName(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#D97706] text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#D97706] text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#D97706] text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#D97706] text-gray-700 placeholder-gray-400"
        />
        {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Repeat your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#D97706] text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Signup Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white bg-[#D97706] hover:bg-[#D97706]/90 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-opacity-50"
      >
        Sign Up
      </button>
    </form>

    {/* Already Have Account */}
    <div className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <Link to="/login" className="text-[#D97706] font-medium hover:underline">
        Log in
      </Link>
    </div>
  </div>
</div>

  )
}

export default Signup