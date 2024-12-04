import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div className=" relative overflow-hidden text-center">
  {/* Marquee Announcement */}
  <marquee
    behavior="scroll"
    direction="left"
    className="uppercase text-white text-sm font-bold py-2 tracking-wide bg-[#BF5906]"
  >
    Anniversary sales start on the 24th of September 2024. All items will be over 20% off. Miss am make e pain you!
  </marquee>

  {/* Banner Content */}
  <div className="banner-container flex flex-col justify-center items-center h-screen">
    {/* Banner Image */}
    <div className="image absolute top-0 left-0 w-full h-full -z-10">
      {/* Replace with your image source
      <img src="/banner2.png" alt=""/>   */}
    </div>

    {/* Text and Call-to-Action */}
    <div className="bannerText bg-[#D97706]/90 px-6 py-10 rounded-lg shadow-xl">
      <h1 className="text-5xl md:text-7xl font-bold text-[#F4F4F9] mb-4">
        BimbsCollections
      </h1>
      <p className="text-lg md:text-2xl capitalize text-[#F4F4F9] mb-6">
        Where affordability meets luxury
      </p>
      <button
        type="button"
        className="bg-[#F4F4F9] py-3 px-12 text-lg md:text-xl font-semibold rounded-md border-2 text-[#D97706] border-[#F4F4F9] hover:text-[#F4F4F9] hover:bg-[#D97706] hover:border-[#F4F4F9] transition-all duration-300 ease-in-out"
      >
        <Link to="/product">View Shop</Link>
      </button>
    </div>
  </div>
</div>

  )
}

export default Banner