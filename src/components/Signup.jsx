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
      const res = await fetch("http://localhost:8000/api/register",{
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
    <div>
      <div className="bg-[brown] heads my-7 w-[700px]  h-[650px] ">
        <div className="text-[blanchedalmond] text-center font-[tangerine] tracking-tighter pt-8 text-6xl ">Sign Up</div>
        <form onSubmit={registerHandler} className='text-[blanchedalmond] ml-[6rem] text-[lora] p-3'>
            <div className="p-3  label">
              <input type="text" name="" placeholder='FirstName' onChange={(e)=>{setfirstName(e.target.value)}} className='w-[80%] p-2 bg-transparent border-0 border-b border-[blanchedalmond] outline-none placeholder:text-[blanchedalmond] ' />
            </div>

            <div className="p-3  label">
              <input type="text" name="" placeholder='LastName' onChange={(e)=>{setlastName(e.target.value)}} className='w-[80%] p-2 bg-transparent border-0 border-b border-[blanchedalmond] outline-none placeholder:text-[blanchedalmond] ' />
            </div>

            <div className="p-3  label">
              <label htmlFor="" className='block'></label>
              <input type="email" name="" placeholder='Email Address' onChange={(e)=>{setEmail(e.target.value)}}  className='w-[80%] p-2  bg-transparent  border-0 border-b border-[blanchedalmond] outline-none placeholder:text-[blanchedalmond] ' />
            </div>

            <div className="p-3  label">
              <input type="text" name="" placeholder='Phone Number' onChange={(e)=>{setPhone(e.target.value)}} className='w-[80%] p-2 bg-transparent border-0 border-b border-[blanchedalmond] outline-none placeholder:text-[blanchedalmond] ' />
            </div>

            <div className="p-3  label">
              <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} className='w-[80%] p-2  bg-transparent border-0 border-b border-[blanchedalmond] outline-none placeholder:text-[blanchedalmond]' />
              {/* <input type="password" placeholder='Password' name="" onChangeCapture={validatePassword} onChange={(e)=>{setPassword(e.target.value)}} className='w-[80%] p-2  bg-transparent border-0 border-b border-[blanchedalmond] outline-none placeholder:text-[blanchedalmond]' /> */}
              {message && <p>{message}</p>}
            </div>
            
            <div className="p-3  label">
              <input type="password" name=""  placeholder='Repeat Password' onChange={(e)=>{setConfirmPassword(e.target.value)}} className='w-[80%] p-2  bg-transparent border-0 border-b border-[blanchedalmond] outline-none placeholder:text-[blanchedalmond]' />
            </div>
{/* 
            <div className=" terms">
              <input type="radio" className='inline' name=""  />
              <p>I agree all statement in <span className='underline'>Terms and Conditions</span> </p>
            </div> */}
          {/* <button type="submit" disabled={btnDisabled} className='text-xl p-3 bg-[#2cd8d8] rounded  w-[100px] '>Sign Up</button> */}
          <div className='flex justify-between mx-12 my-6 '>
          <button type="submit" className='text-xl p-3 bg-[blanchedalmond] text-[brown] rounded  w-[100px] '>Sign Up</button>
          <h1 className='text-[blanchedalmond] font-[lora]'>Already have an account? <Link to='/login' className='underline italic'>Log in</Link></h1>
          </div>
          </form>
      </div>
    </div>
  )
}

export default Signup