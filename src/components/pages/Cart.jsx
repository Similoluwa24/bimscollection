import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import EcomContext from '../../context/EcomContext'


function Cart() {
    const {cartItems, calculateSubTotal, calculateVat, calculateTotalAmount,removeCartItems, updateCartItems} = useContext(EcomContext)
  return (
    <div>
         <div className="container max-w-5xl mx-auto my-24 cart">
            <div className="grid grid-cols-1">
                <div className="p-3 table">
                    <table className='text-center'>
                        <thead className='p-3' >
                            <tr className='p-3'>
                                <th>Name</th>
                                 <th>Product Image</th> 
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Quantity</th>
                                {/* <th>Updates</th> */}
                                <th>Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems.products?.map((item, index)=> (
                            // {cartItems.products && cartItems?.products?.map((item, index)=> (

                            <tr key={item.product?._id}>
                                <td>{item.product?.name}</td>
                                {/* <td className='flex align-center justify-center'><img src={item.img} className='w-[100px] h-[100px]' alt="" /></td> */}
                                 <td className='flex align-center justify-center'><img src={item.product?.images[0]?.img}   className='w-[100px] h-[100px]' alt={item.product?.name} /></td> 
                                 <td><s>N</s>{item.product?.price}</td>
                                {/* <td></td> */}
                                <td><s>N</s>{item.amount}</td>
                                <td>
                                    <input type="number" onChange={(e)=>updateCartItems(item.product?._id, e.target.value)} min={1}  value={item.quantity} className='font-bold w-[30%] outline-none text-[black]'/>   
                                </td>
                                <td>
                                    <button onClick={()=>removeCartItems(item.product?._id)} type="submit"><i className='fa-solid fa-xmark'></i></button>
                                </td>
                                
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
                                <td className=''> Subtotal: <s>N</s>{calculateSubTotal()}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className=''>VAT (7.5%): <s>N</s>{calculateVat()}</td>
                            </tr>
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className=''><Link to="/checkout" className='product-btn p-2 text-[fff] rounded bg-[#cda124] hover:bg-[#a42cd6] '>Checkout</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart