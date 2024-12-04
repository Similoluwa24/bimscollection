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

  
   let time = new Date().toLocaleTimeString()  
    const [currentTime, setCurrentTime] = useState(time)
    const updateTime = ()=>{
      let time = new Date().toLocaleTimeString()
      setCurrentTime(time)
    }
    setInterval(updateTime,1000)

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#D97706] text-[#F4F4F9] shadow-md header">
  {/* Logo Section */}
  <div className="text-2xl uppercase font-black tracking-tighter logo">
    <Link to="/" className="hover:text-[white] transition-colors">
      Bimscollections
    </Link>
  </div>

  {/* Desktop Navigation */}
  <nav className="hidden lg:flex items-center space-x-8">
    {isAuthenticated && (
      <p className="text-lg font-medium">{`Hello 👋🏾 ${user.lastName}`}</p>
    )}
    <Link to="/" className="hover:underline">
      Home
    </Link>
    <Link to="/product" className="hover:underline">
      Products
    </Link>
    {isAuthenticated ? (
      <Link
        onClick={logout}
        className="hover:text-[white] transition-colors cursor-pointer"
      >
        Log Out
      </Link>
    ) : (
      <>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
      </>
    )}
    <Link to="/cart" className="relative hover:text-[white] transition-colors">
      <i className="fa-solid fa-cart-shopping text-xl"></i>
      <div className="absolute -top-2 -right-2 text-[#D97706] bg-[#F4F4F9] text-center rounded-full h-5 w-5 text-[15px] flex items-center justify-center font-bold">
        {cartItems.products?.length || 0}
      </div>
    </Link>
  </nav>

  {/* Mobile Menu Button */}
  <button
    type="button"
    className="lg:hidden text-[#F4F4F9] text-2xl focus:outline-none"
    onClick={() => setOpen(!open)}
  >
    <i className="fa-solid fa-bars"></i>
  </button>

  {/* Mobile Navigation */}
  <div
    className={`fixed top-0 left-0 w-[300px] h-full bg-[#D97706] shadow-lg transition-transform z-20 duration-300 ${
      open ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    {/* Close Button */}
    <button
      type="button"
      className="absolute top-5 right-5 text-3xl text-[#F4F4F9] focus:outline-none"
      onClick={() => setOpen(false)}
    >
      <i className="fa-solid fa-x"></i>
    </button>

    {/* Mobile Menu Items */}
    <nav className="flex flex-col items-center gap-6 text-[#F4F4F9] text-xl pt-20 px-6">
      <Link to="/" className="hover:underline" onClick={() => setOpen(false)}>
        Home
      </Link>
      <Link
        to="/about"
        className="hover:underline"
        onClick={() => setOpen(false)}
      >
        About
      </Link>
      <Link
        to="/product"
        className="hover:underline"
        onClick={() => setOpen(false)}
      >
        Products
      </Link>
      {isAuthenticated ? (
        <Link
          onClick={logout}
          className="hover:text-[white] transition-colors cursor-pointer"
        >
          Log Out
        </Link>
      ) : (
        <>
          <Link
            to="/login"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hover:underline"
            onClick={() => setOpen(false)}
          >
            Signup
          </Link>
        </>
      )}
      <Link
        to="/cart"
        className="relative hover:text-[white] transition-colors"
        onClick={() => setOpen(false)}
      >
        <i className="fa-solid fa-cart-shopping text-xl"></i>
        <div className="absolute -top-2 -right-2 text-[#D97706] bg-[#F4F4F9] text-center rounded-full h-5 w-5 text-[15px] flex items-center justify-center font-bold">
          {cartItems.products?.length || 0}
        </div>
      </Link>
    </nav>
  </div>
</div>

  )
}

export default Header