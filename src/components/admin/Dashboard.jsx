import React, { useContext } from 'react'
import AdminSiderbar from './AdminSidebar'
import EcomContext from '../../context/EcomContext'
import { FaHome, FaBoxOpen, FaShoppingCart, FaArrowLeft } from "react-icons/fa"
import { IoPeopleSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";


function Dashboard() {
  const {allUsers, product, allOrders,categories} = useContext(EcomContext)

 
  return (
    <div>
      <div className="flex  w-full">
            <AdminSiderbar/>
            <div className="dashboard">
              <div className="m-4 grid grid-cols-4 gap-8 data">
                <article className="w-60 h-24  bg-[brown] shadow p-4 space-y-2 rounded-md ">
                  <div className="flex justify-around pb-12 icon">
                    <IoPeopleSharp className='inline size-12 text-[blanchedalmond] pt-2'></IoPeopleSharp>
                    <p className="text-xl w-full capitalize text-center p-3  text-[blanchedalmond]">
                    {allUsers.length} users
                  </p>
                  </div>
                </article>


                <article className="w-60 h-24 bg-[brown] shadow p-4 space-y-2 rounded-md ">
                  <div className="flex justify-around pb-12 icon">
                      <FaBoxOpen className='inline size-12 text-[blanchedalmond] pt-2'></FaBoxOpen>
                      <p className="text-xl w-full capitalize text-center pt-3 text-[blanchedalmond]">
                      {product.length} products
                      </p>
                  </div>


                </article>
                <article className="w-60 h-24 bg-[brown] shadow p-4 space-y-2 rounded-md ">
                <div className="flex justify-around pb-12 icon">
                  <FaShoppingCart className='inline size-12 text-[blanchedalmond] pt-2'></FaShoppingCart>
                  <p className="text-xl w-full text-center pt-3 capitalize text-[blanchedalmond]">
                  {allOrders.length} orders
                  </p>
                </div>
                </article>
                <article className="w-60 h-24 bg-[brown] shadow p-4 space-y-2 rounded-md ">
                    <div className="flex justify-around pb-12 icon">
                      <BiSolidCategory className='inline size-12 text-[blanchedalmond] pt-2'></BiSolidCategory>
                      <p className="text-xl w-full text-center capitalize pt-3  text-[blanchedalmond]">
                      {categories.length} categories
                      </p>
                    </div>
                </article>

              </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard