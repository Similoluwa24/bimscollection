import React, { useContext } from 'react';
import AdminSidebar from './AdminSidebar';
import EcomContext from '../../context/EcomContext';
import { FaHome, FaBoxOpen, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";

function Dashboard() {
  const { allUsers, product, allOrders, categories } = useContext(EcomContext);

  return (
    <div className="flex w-full">
      <AdminSidebar />
      <div className="w-full p-4 ml-2">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <article className="bg-[#D97706] shadow-lg rounded-md p-6 flex flex-col items-center text-[#F4F4F9]">
            <IoPeopleSharp className="text-4xl mb-4" />
            <p className="text-2xl font-semibold">{allUsers.length} users</p>
          </article>

          <article className="bg-[#D97706] shadow-lg rounded-md p-6 flex flex-col items-center text-[#F4F4F9]">
            <FaBoxOpen className="text-4xl mb-4" />
            <p className="text-2xl font-semibold">{product.length} products</p>
          </article>

          <article className="bg-[#D97706] shadow-lg rounded-md p-6 flex flex-col items-center text-[#F4F4F9]">
            <FaShoppingCart className="text-4xl mb-4" />
            <p className="text-2xl font-semibold">{allOrders.length} orders</p>
          </article>

          <article className="bg-[#D97706] shadow-lg rounded-md p-6 flex flex-col items-center text-[#F4F4F9]">
            <BiSolidCategory className="text-4xl mb-4" />
            <p className="text-2xl font-semibold">{categories.length} categories</p>
          </article>
        </div>

        {/* Additional Info or Content */}
        {/* Add any additional sections here */}
      </div>
    </div>
  );
}

export default Dashboard;
