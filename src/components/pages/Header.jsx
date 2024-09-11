import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage';
import AuthContext from '../../context/AuthContext';
import EcomContext from '../../context/EcomContext';
import { CgProfile } from "react-icons/cg";
function Header() {
  const [open, setOpen] = useState(false);
  const { deleteItem} = useLocalStorage("auth-token");
  const [state, dispatch] = useContext(AuthContext)
  const redirect = useNavigate()
  const { showHide, isAuthenticated, cartItems, user} = useContext(EcomContext)
  const [profile, setProfile] = useState(false)



  const logout = (e)=>{
    e.preventDefault()
    dispatch({type:"setToken", payload:null})
    deleteItem("auth-token");
    redirect("/login");
    showHide("success", 'Logged Out!')
  }

  
    // if (isAuthenticated) {
    //   return <Navigate to="/login" />
    // }

  return (
    <div className="flex justify-between px-3 py-4 bg-[brown] text-[blanchedalmond] pr-8 header">
       
        <div className="text-2xl uppercase font-black tracking-tighter  logo">
                    <Link to=''>Bimscollections</Link>
        </div>
                    {/* <p>{`Hello ${user.firstName}`}</p> */}
        {/* first navbar  */}
        <nav className='hidden lg:flex  space-x-7'>
              {isAuthenticated ? (<><p>{`Hello 👋🏾 ${user.lastName}`}</p></>):""}
              <Link to="">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/product">Products</Link>
              {isAuthenticated ? (<>
                <Link onClick={logout}>Log Out</Link>              
              </>) : (<>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              </>)}
              <Link to="/cart" className='relative'>
                <i className="fa-solid fa-cart-shopping"></i>
                <div className='absolute bottom-4 left-4 text-[brown] bg-[blanchedalmond] text-center rounded-full h-5 w-5 text-[15px]'>
                  {cartItems.products?.length}
                </div>
                </Link>
        </nav>
        {/* first navbar done */}

      {/* menu button */}
        <button type="button" className='flex justify-end lg:hidden items-center w-[35px] h-[35px] '>
          <i className="fa-solid fa-bars" onClick={()=> setOpen(!open)}></i></button>
          {/* button done */}

          {/* second navbar(mobile) */}
          <div className={`fixed top-0 left-0 w-[300px] h-screen bg-[brown] transition-transform z-[20]  duration-200 ${open ? "translate-x-0":"-translate-x-full"} `}>
            {/* xmark for closing navbar */}
            <button type="button" className='absolute top-5 right-5 text-3xl text-[banchedalmond]' onClick={()=> setOpen(!open)}>
            <i className="fa-solid fa-x"></i>
            </button>
            <nav onClick={()=>setOpen(open)} className='flex flex-col gap-5 text-center text-[blanchedalmond] pt-20 px-10 text-[25px] '>
                <Link to="">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/product">Products</Link>
                {isAuthenticated ? (<>
                <Link onClick={logout}>Log Out</Link>
                </>) :(<>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                </>)}
                <Link to="/cart" className='relative'>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <div className='absolute bottom-4 left-20 text-[brown] bg-[blanchedalmond] text-center rounded-full h-5 w-5 text-[15px]'>
                  {cartItems.products?.length}
                  </div>
                  </Link>
            </nav>
          </div>
    </div>
  )
}

export default Header