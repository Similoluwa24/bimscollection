import React, { useContext } from 'react'
import ProductItems from './ProductItems'
import EcomContext from '../../context/EcomContext';

function FeaturedProduct() {
  const { featuredProduct} = useContext(EcomContext)
  return (
    <div>
        <div className="container max-w-6xl mt-6 m-auto">
        <h1 className='font-[lora] text-5xl font-bold text-[brown] text-center mb-5'>Featured Product</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {featuredProduct.map((items, index)=>(<ProductItems key={index} product_items_prop={items}/>))}
            </div>
        </div>
    </div>
  )
}

export default FeaturedProduct;