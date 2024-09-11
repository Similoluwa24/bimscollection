import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import useLocalStorage from "../hooks/useLocalStorage"
import AuthContext from "../context/AuthContext"
import EcomContext from "../context/EcomContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [state, dispatch] = useContext(AuthContext)
  const redirect = useNavigate()
  const[message, setMessage] =useState("");
  const[btnDisabled, setBtnDisabled] =useState(true);
const { showHide, isAuthenticated,setCartItems, fetchCart } = useContext(EcomContext);
  const { setItem, getItem, deleteItem } = useLocalStorage("auth-token");

// client02@gmail.com
// qwerty456

  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  
  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showHide("error", "Email and Passowrd is required")
      return;
    } 
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.message) {
        showHide("error", data.message);
      }else {
        dispatch({ type: "setToken", payload: data.token });
        setItem(data.token);
        const cartDataItem = JSON.parse(getItem("cart"));
        if (cartDataItem) {
          console.log("request made");
          await Promise.all(cartDataItem?.products?.map(async (item) => {
            const response = await fetch("http://localhost:8000/api/add-to-cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": getItem("auth-token"),  // Use the token directly
              },
              body: JSON.stringify({ productId: item.product._id, quantity: item.quantity }),
            });

            const cartdata = await response.json();
            // console.log( "todday", cartdata);
            if (res.ok) {
              setCartItems(cartdata && cartdata.products);
              fetchCart();
              showHide("success", "added to cart successfully")
            } else {
              console.error("Failed to add items to the backend cart");
            }
          }));
          deleteItem("cart");
        }

        redirect("/");
        showHide("success", "you are now logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const validatePassword = (e) => {
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
    e.preventDefault();
}
  return (
    <div>
      
        <div class="containers">
            <div className= " rounded bg-[brown] flex-col flex justify-center max-w-[40rem] h-[80vh] ml-72 my-12 sign" >
          <div className="text-7xl ml-72 text-[blanchedalmond] mt-8 login">
          <VscAccount />
          </div>
          <form action="" onSubmit={loginHandler} className='text-[blanchedalmond] ml-[6rem] text-[lora] p-3 '>
            <div className="p-3  label">
              <input type="email" name="" id="email" onChange={(e) =>setEmail(e.target.value)}  placeholder='Enter e-mail address' required  className='w-[80%] p-2  outline-none border-0 border-b placeholder:text-sm placeholder:text-[blanchedalmond]   bg-transparent ' />
            </div>

            <div className="p-3  label">
              <input type="password" name="" placeholder='Password' onChange={(e) =>setPassword(e.target.value)} id="password" required onChangeCapture={validatePassword} className='w-[80%] p-2 outline-none border-0 border-b placeholder:text-sm placeholder:text-[blanchedalmond]   bg-transparent' />
              {message && <p>{message}</p>}
            </div>
          <button className='bg-[blanchedalmond] py-3 px-12 text-xl w-[25rem] rounded  border-2 text-[brown] border-[brown] hover:text-[#8ad6fb] hover:bg-[brown] hover:border-[blanchedalmond] m-auto ' disabled={btnDisabled} type="submit">Login</button>
          </form>
        <div className="flex gap-4 justify-around links">
         <Link to="/"> <h2 className='mb-16  justify-center font-italic hover:text-[#88bbe7] text-[blanchedalmond] italic font-[lora]  hover:underline '>Forgot Password?</h2></Link>
         <Link to="/signup"> <h2 className='mb-16  justify-center font-italic hover:text-[#88bbe7] text-[blanchedalmond] italic font-[lora]   '>New Here? <span className='hover:underline'>Sign Up</span></h2></Link>
        </div>
       </div>

       
        </div>

    </div>
  )
}

export default Login