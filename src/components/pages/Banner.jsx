import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div>
      <marquee behavior="" direction="from left" className="uppercase text-[brown] text-[lona]" >Anniversary sales starts on the 24th of september 2024. all our items will be over 20% off. miss am make e pain you</marquee>
        <div className=" banner-container">
            <div className="image">
             {/* <img src="/banner2.png" alt=""/>  */}
            
            <div className="bannerText ">
              <h1 className='text-7xl text-center text-[blanchedalmond] bg-[brown]'>Bimscollections</h1>
              <p className='text-3xl bg-[brown] mb-2 text-center capitalize text-[blanchedalmond]'>where affordability meets luxury</p>
              <button type="button" className='bg-[blanchedalmond] ml-24 py-3 px-12 text-xl w-[25rem] rounded  border-2 text-[brown] border-[brown] hover:text-[blanchedalmond] hover:bg-[brown] hover:border-[blanchedalmond] m-auto '><Link to='/product'>View Shop</Link></button>
              
            </div>
            </div>
        </div>
    </div>
  )
}

export default Banner