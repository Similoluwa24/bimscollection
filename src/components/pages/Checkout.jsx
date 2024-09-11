import React, { useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import { Link, Navigate } from 'react-router-dom'


function Checkout() {
    const {cartItems, calculateTotalAmount, isAuthenticated} = useContext(EcomContext)
    if (!isAuthenticated) {
        <Navigate to="/login"/>
    }

    const handlePayment = async (e) => {
        e.preventDefault();

        const amount = calculateTotalAmount()
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const email = e.target.email.value
        const phone = e.target.phone.value
        const address = e.target.address.value
        const currency = e.target.currency.value

        try {
            const res = await fetch("http://localhost:8000/api/payment/initiate",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    address,
                    currency,
                    amount
                })
            })
            const data = await res.json()
            if(res.ok){
                window.location.href = data.link
            }else{
                res.json("something went wrong")
            }
        } catch (error) {
            
        }
    }
  return (
         <div>
        <div className="container max-w-6xl p-3 mx-auto my-24 check">
            <div className="grid md:grid-cols-2 shadow-xl grid-cols-3">
                <div className="p-3 table">
                    <h1 className="text-start text-xl font-bold border-b pb-3">Order Summary</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Product Image</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems?.products?.map((items,index)=>(
                                <tr key={index}>
                                    <td>{items.product?.name}</td>
                                    <td className='flex align-center justify-center'>
                                        <img src={items.product?.images[0].img} width="70px" alt="" />
                                    </td>
                                    <td>{items.quantity}</td>
                                    <td><s>N</s>{items.amount}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className=''>Total: <s>N</s>{calculateTotalAmount()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <div className=" h-[100vh] p-3 m-3 bg-[blanchedalmond] cform">
                        <h1 className="text-center p-5 uppercase text-xl-font-bold border-b pb-3">Deliver Details</h1>
                        <form action="" className='p-5' onSubmit={(e)=>handlePayment(e)}>
                            <div className='p-3'>
                                <label htmlFor="">First Name</label>
                                <input type="text" name='firstName' className='w-[80%] block  bg-transparent border-0 border-b border-blue-200 outline-none' />
                            </div>
                            <div className='p-3'>
                                <label htmlFor="">Last Name</label>
                                <input type="text" name='lastName' className='w-[80%] block  bg-transparent border-0 border-b border-blue-200 outline-none' />
                            </div>
                            <div className='p-3'>
                                <label htmlFor="">E-mail</label>
                                <input type="email" name='email' className='w-[80%] block bg-transparent border-0 border-b border-blue-200 outline-none' />
                            </div>
                            <div className='p-3'>
                                <label htmlFor="">Delivery Details</label>
                                <input type="text" name='address' className='w-[80%]  bg-transparent border-0 border-b border-blue-200 outline-none' />
                            </div>
                            <div className='p-3'>
                                <label htmlFor="">Phone Number</label>
                                <input name='phone' className='w-[80%]   bg-transparent border-0 border-b border-blue-200 outline-none' />
                            </div>
                            <div className='flex space-x-3 border-2 p-3'>
                            <select name="currency" className='outline-0' id="">
                                <option value="NGN">NGN</option>
                                <option value="USD">USD</option>
                                <option value="GBP">GBP</option>
                            </select>
                            <h2 name="amount" className='text-xl font-semibold'>{calculateTotalAmount()}</h2>
                            </div>
                            <div className='p-3'>
                                <button className="product-btn  w-full text-[blanchedalmond] rounded bg-[brown] p-4 capitalize hover:bg-[#a42cd6]" type='submit'>Pay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout