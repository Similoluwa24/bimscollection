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
    <div className="containers">
      <div className="rounded bg-[brown] flex flex-col justify-center max-w-3xl h-screen mx-auto my-12">
        <div className="text-7xl mx-auto text-[blanchedalmond] mt-8">
          <VscAccount />
        </div>
        <form onSubmit={loginHandler} className="text-[blanchedalmond] text-lora p-3 mx-auto w-3/4">
          <div className="p-3">
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter e-mail address"
              required
              className="w-full p-2 outline-none border-0 border-b bg-transparent placeholder:text-sm placeholder:text-[blanchedalmond]"
            />
          </div>
          <div className="p-3">
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={validatePassword}
              required
              className="w-full p-2 outline-none border-0 border-b bg-transparent placeholder:text-sm placeholder:text-[blanchedalmond]"
            />
            {message && <p>{message}</p>}
          </div>
          <button
            className="bg-[blanchedalmond] py-3 px-12 text-xl w-full rounded border-2 text-[brown] border-[brown] hover:text-blue-400 hover:bg-[brown] hover:border-[blanchedalmond]"
            disabled={btnDisabled}
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex gap-4 justify-around mt-8">
          <Link to="/" className="text-[blanchedalmond] italic hover:text-blue-400 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-[blanchedalmond] italic hover:text-blue-400 hover:underline">
            New Here? <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
