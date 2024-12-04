import { Link, useNavigate } from "react-router-dom"
import { FaHome, FaBoxOpen, FaShoppingCart, FaArrowLeft } from "react-icons/fa"
import {  AiOutlineTransaction } from "react-icons/ai"
import { IoPeopleSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import EcomContext from "../../context/EcomContext";
import useLocalStorage from '../../hooks/useLocalStorage'
import AuthContext from "../../context/AuthContext";





function AdminSiderbar() {
const {showHide} = useContext(EcomContext)
const { deleteItem} = useLocalStorage("auth-token");
const [state, dispatch] = useContext(AuthContext)
const redirect = useNavigate()

   let time = new Date().toLocaleTimeString()
   const [currentTime, setCurrentTime] = useState(time)
   const updateTime = ()=>{
      let time = new Date().toLocaleTimeString()
      setCurrentTime(time)
   }
     setInterval(updateTime, 1000)

     const logout = (e)=>{
      e.preventDefault()
      dispatch({type:"setToken", payload:null})
      deleteItem("auth-token");
      redirect("/login")
      showHide("success", 'Logged Out!')
    }
  return (
    <div className='bg-[#F4F4F9] w-fit h-svh lg:w-60 p-2 lg:p-4 '>
      <div className="p-4 text-center title">
         <h1 className='font-[aladin] text-[#D97706] text-[10px] md:text-lg lg:text-2xl'>ADMIN</h1>
         <h1>Ojo Oluwapelumi</h1>
         <h1>{currentTime}</h1>
      </div>
      <hr />
      <div className=" mt-4 m-auto ">
         <ul className="m-auto space-y-5 text-[aladin] list ">
            <li><Link to="/admin/dashboard">
            <span><FaHome className='inline mx-2'></FaHome> </span><span className='hidden md:inline'>Home</span>
            </Link></li>

            <li><Link to="/admin/product">
            <span><FaBoxOpen className='inline mx-2'></FaBoxOpen> </span><span className='hidden md:inline'>Product</span>
            </Link></li>

            <li><Link to="/admin/category">
            <span><BiSolidCategory className='inline mx-2'></BiSolidCategory> </span><span className='hidden md:inline'>Category</span>
            </Link></li>

            <li><Link to="/admin/orders">
            <span><FaShoppingCart className='inline mx-2'></FaShoppingCart> </span><span className='hidden md:inline'>Orders</span>
            </Link></li>

            <li><Link to="/admin/customers">
            <span><IoPeopleSharp className='inline mx-2'></IoPeopleSharp> </span><span className='hidden md:inline'>Users</span>
            </Link></li>

            <li><Link to="/admin/transaction">
            <span><AiOutlineTransaction className='inline mx-2'></AiOutlineTransaction> </span><span className='hidden md:inline'>Transactions</span>
            </Link></li>

            <li ><button type='submit' onClick={logout}>
            <span><FaArrowLeft className='inline mx-2'></FaArrowLeft> </span><span className='hidden md:inline'>Log Out</span>
            </button></li>

         </ul>
      </div>

</div>

  )
}

export default AdminSiderbar