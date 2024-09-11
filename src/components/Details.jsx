import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import EcomContext from '../context/EcomContext'
import ProductImages from './pages/ProductImages';

function Details() {
  const { product, addToCart,isAuthenticated } = useContext(EcomContext);
  const params = useParams();
  // const showItems = params.id
  // const productItems = product.find((items)=>parseInt(items.id)===parseInt(showItems))
  const showItems = params.id
  const productItems= product.find((items) =>items._id === showItems)
  const [selectedImages, setSelectedImages]= useState(productItems?.images?.[0].img)
  if (!isAuthenticated) {
    <Navigate to="/login"/>
  }
  useEffect(()=>{
    setSelectedImages(productItems?.images?.[0].img)
  },[productItems])
  return (
    <div>
      <div className="container max-w-5xl mx-auto my-24">
            <h1 className="text-2xl my-5 uppercase text-[brown] font-bold text-center">{productItems?.name} Details</h1>
            <div className="grid  grid-cols-2 align-center justify-center ">
                <div>
                    {/* <img src={`http://localhost:3000/${productItems?.img}`} className='width-[300px] h-[300px] rounded border-2 border-[#cda247]' alt="" /> */}
                 <img src={selectedImages} className='width-[300px] h-[300px] mb-4 rounded border-2 border-[brown]' alt="" />
                 <ProductImages images={productItems?.images} setSelectedImages={setSelectedImages}/>
                 </div>
                <div>
                  
                <div
                  className="max-w-lg max-h-fit overflow-hidden bg-[blanchedalmond] border border-gray-200 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-lg hover:scale-105 relative group"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-10 blur-md"
                  ></div>
                  <div className="p-6 relative z-10">
                    <p className="text-2xl font-semibold capitalize text-[brown]">{productItems?.name}</p>
                    <p className="mt-2 text-lg text-[brown] ">
                    {productItems?.description}
                    </p>
                    <h2 className='text-2xl text-[brown] font-bold uppercase py-3'><s>N</s>{productItems?.price}</h2>
                    
                    <div className="flex items-center mt-4 text-gray-600">
                    <button onClick={() => addToCart( productItems._id, 1, productItems )} className="product-btn p-2 w-full text-[#fff] rounded bg-[brown] capitalize hover:bg-[#a42cd6]" type='submit'>Cart</button>
                    {/* <button onClick={() => addToCart({ ...productItems, quantity: 1 })} className="product-btn p-2 w-full text-[#fff] rounded bg-[brown] capitalize hover:bg-[#a42cd6]" type='submit'><Link to="/cart">Cart</Link></button> */}
                    </div>
                  </div>
                </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Details