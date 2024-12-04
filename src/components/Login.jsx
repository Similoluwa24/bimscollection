import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import useLocalStorage from '../hooks/useLocalStorage';
import AuthContext from '../context/AuthContext';
import EcomContext from '../context/EcomContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, dispatch] = useContext(AuthContext);
  const { showHide, isAuthenticated, setCartItems, fetchCart, user, getUser } = useContext(EcomContext);
  const { setItem, getItem, deleteItem } = useLocalStorage('auth-token');
  const redirect = useNavigate();
  const [message, setMessage] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  const validatePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value === '') {
      setBtnDisabled(true);
      setMessage('Enter your password');
    } else if (value.trim().length < 8) {
      setBtnDisabled(true);
      setMessage('Your Password must be at least 8 characters');
    } else {
      setBtnDisabled(false);
      setMessage('Valid Password');
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showHide('error', 'Email and Password are required');
      return;
    }

    try {
      const res = await fetch('https://bimscollection.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.message) {
        showHide('error', data.message);
      } else {
        dispatch({ type: 'setToken', payload: data.token });
        setItem(data.token);
        await getUser();

        const cartDataItem = JSON.parse(getItem('cart'));
        if (cartDataItem) {
          await Promise.all(
            cartDataItem?.products?.map(async (item) => {
              const response = await fetch('https://bimscollection.onrender.com/api/add-to-cart', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': data.token,
                },
                body: JSON.stringify({ productId: item.product._id, quantity: item.quantity }),
              });
              const cartdata = await response.json();
              if (response.ok) {
                setCartItems(cartdata?.products || []);
                fetchCart();
                showHide('success', 'Added to cart successfully');
              } else {
                console.error('Failed to add items to the backend cart');
              }
            })
          );
          deleteItem('cart');
        }

        redirect('/');
        showHide('success', 'You are now logged in');
      }
    } catch (error) {
      showHide('error', 'Something went wrong! Please try again.');
      console.error(error);
    }
  };

  return (
    // <div className="containers">
    //   <div className="rounded bg-[#D97706] flex flex-col justify-center max-w-3xl h-screen mx-auto my-12">
    //     <div className="text-7xl mx-auto text-[#F4F4F9] mt-8">
    //       <VscAccount />
    //     </div>
    //     <form onSubmit={loginHandler} className="text-[#F4F4F9] text-lora p-3 mx-auto w-3/4">
    //       <div className="p-3">
    //         <input
    //           type="email"
    //           id="email"
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="Enter e-mail address"
    //           required
    //           className="w-full p-2 outline-none border-0 border-b bg-transparent placeholder:text-sm placeholder:text-[#F4F4F9]"
    //         />
    //       </div>
    //       <div className="p-3">
    //         <input
    //           type="password"
    //           id="password"
    //           placeholder="Password"
    //           onChange={validatePassword}
    //           required
    //           className="w-full p-2 outline-none border-0 border-b bg-transparent placeholder:text-sm placeholder:text-[#F4F4F9]"
    //         />
    //         {message && <p>{message}</p>}
    //       </div>
    //       <button
    //         className="bg-[#F4F4F9] py-3 px-12 text-xl w-full rounded border-2 text-[#D97706] border-[#D97706] hover:text-blue-400 hover:bg-[#D97706] hover:border-[#F4F4F9]"
    //         disabled={btnDisabled}
    //         type="submit"
    //       >
    //         Login
    //       </button>
    //     </form>
    //     <div className="flex gap-4 justify-around mt-8">
    //       <Link to="/" className="text-[#F4F4F9] italic hover:text-blue-400 hover:underline">
    //         Forgot Password?
    //       </Link>
    //       <Link to="/signup" className="text-[#F4F4F9] italic hover:text-blue-400 hover:underline">
    //         New Here? <span>Sign Up</span>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-[#F4F4F9]">
  <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
    {/* Icon */}
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-[#D97706]">Welcome Back!</h1>
      <p className="text-gray-600 text-sm">Please log in to your account</p>
    </div>

    {/* Login Form */}
    <form onSubmit={loginHandler} className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#D97706] text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          onChange={validatePassword}
          placeholder="Enter your password"
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-[#D97706] text-gray-700 placeholder-gray-400"
        />
        {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={btnDisabled}
        className={`w-full py-3 rounded-lg text-white bg-[#D97706] hover:bg-[#D97706]/90 focus:outline-none focus:ring-2 focus:ring-[#D97706] ${
          btnDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Login
      </button>
    </form>

    {/* Additional Links */}
    <div className="mt-6 flex justify-between text-sm text-gray-600">
      <Link
        to="/"
        className="hover:text-[#D97706] hover:underline focus:outline-none focus:text-[#D97706]"
      >
        Forgot Password?
      </Link>
      <Link
        to="/signup"
        className="hover:text-[#D97706] hover:underline focus:outline-none focus:text-[#D97706]"
      >
        New Here? Sign Up
      </Link>
    </div>
  </div>
</div>

  );
}

export default Login;
