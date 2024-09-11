import React, { useContext, useEffect } from 'react'
import EcomContext from '../../context/EcomContext'
import { Link, Navigate, useSearchParams } from 'react-router-dom'


function Confirmation() {
  const { calculateTotalAmount,createOrder,order, isAuthenticated} = useContext(EcomContext)
  const[searchParams] = useSearchParams()
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id  = searchParams.get("transaction_id")

  if (!isAuthenticated) {
    <Navigate to="/login"/>
}

useEffect(()=>{
  if (tx_ref && transaction_id) {
    createOrder(transaction_id,tx_ref)
  }
}, [createOrder])
  return (
    <div>
      <div className="h space-y-3  bg-[white] max-w-[40rem] contain">
        <div className="dicon">
      <i className="fa-solid fa-circle-check mt-5 ico"></i>
        </div>
        <div className="space-y-3 text">
          <h1 className='text-3xl font-bold capitalize'>thank you for shopping with us</h1>
          <p className='capitalize'>your order number is {order?.transaction_id}</p>
          <p>we will send your order confirmation to </p>
          <p className='font-semibold'><span><i className="fa-regular fa-envelope"></i></span>  ojooluwapelumi@gmail.com</p>
        </div>
        <hr   className='bg-[brown] '/>
        <div className=" mx-4 my-3 delivery">
          <h1 className='my-3 capitalize text-center font-semibold text-2xl'>order details</h1>
          <h3 className='my-3 capitalize font-semibold text-lg'>contact details</h3>
          <h1 className='my-px capitalize'>oluwapelumi ojo</h1>
          <h2 className='my-3 capitalize font-semibold text-lg'>shipping address</h2>
          <p className='my-px capitalize'>no 5 babatunde salako cresent lekki phase 1, lagos, nigeria</p>
          <h2 className='my-3 capitalize font-semibold text-lg'>shipping method</h2>
          <p className='my-px capitalize'>express shipping</p>
          <hr />
          <h1 className='my-3 capitalize font-semibold text-2xl text-center'>order summary</h1>
          <p className='my-px capitalize'>order number: {order?.transaction_id} </p>
          <p className='my-px capitalize'>order total: <s>N</s>{calculateTotalAmount()}</p>

          <Link to="/product"><button className='bg-[brown] p-3 rounded-md my-3 text-[blanchedalmond] capitalize  '>Continue shopping</button></Link>

        </div>
      </div>
    </div>
  )
}

export default Confirmation