import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBoxOpen, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoPeopleSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import EcomContext from "../../context/EcomContext";
import useLocalStorage from '../../hooks/useLocalStorage';
import AuthContext from "../../context/AuthContext";

function AdminSidebar() {
  const { showHide } = useContext(EcomContext);
  const { deleteItem } = useLocalStorage("auth-token");
  const [state, dispatch] = useContext(AuthContext);
  const redirect = useNavigate();

  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);
  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);

  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: "setToken", payload: null });
    deleteItem("auth-token");
    redirect("/login");
    showHide("success", "Logged Out!");
  };

  return (
    <div className="bg-[#F4F4F9] w-fit lg:w-60 p-4">
      <div className="text-center mb-6">
        <h1 className="text-[#D97706] font-semibold text-xl">ADMIN</h1>
        <h2 className="text-md lg:text-lg font-medium">Ojo Oluwapelumi</h2>
        <p className="text-sm text-gray-500">{currentTime}</p>
      </div>
      <hr className="border-[#D97706] mb-6" />
      <ul className="space-y-6">
        <li>
          <Link
            to="/admin/dashboard"
            className="flex items-center text-[#D97706] hover:bg-[#F4F4F9] px-4 py-2 rounded-md transition-colors"
          >
            <FaHome className="mr-3 text-xl" />
            <span className="hidden md:inline text-base">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/product"
            className="flex items-center text-[#D97706] hover:bg-[#F4F4F9] px-4 py-2 rounded-md transition-colors"
          >
            <FaBoxOpen className="mr-3 text-xl" />
            <span className="hidden md:inline text-base">Product</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/category"
            className="flex items-center text-[#D97706] hover:bg-[#F4F4F9] px-4 py-2 rounded-md transition-colors"
          >
            <BiSolidCategory className="mr-3 text-xl" />
            <span className="hidden md:inline text-base">Category</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className="flex items-center text-[#D97706] hover:bg-[#F4F4F9] px-4 py-2 rounded-md transition-colors"
          >
            <FaShoppingCart className="mr-3 text-xl" />
            <span className="hidden md:inline text-base">Orders</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/customers"
            className="flex items-center text-[#D97706] hover:bg-[#F4F4F9] px-4 py-2 rounded-md transition-colors"
          >
            <IoPeopleSharp className="mr-3 text-xl" />
            <span className="hidden md:inline text-base">Users</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/transaction"
            className="flex items-center text-[#D97706] hover:bg-[#F4F4F9] px-4 py-2 rounded-md transition-colors"
          >
            <AiOutlineTransaction className="mr-3 text-xl" />
            <span className="hidden md:inline text-base">Transactions</span>
          </Link>
        </li>
        <li>
          <button
            onClick={logout}
            className="flex items-center text-[#D97706] hover:bg-[#F4F4F9] px-4 py-2 rounded-md transition-colors w-full"
          >
            <FaArrowLeft className="mr-3 text-xl" />
            <span className="hidden md:inline text-base">Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
