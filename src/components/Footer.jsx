import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <footer className='bg-[brown] p-4 px-3 gap-4'>
        <div className='grid grid-cols-3 bg-[brown] p-4 px-3 gap-4'>
        
            <div className=" intouch">
              <h1 className='text-5xl font-semibold font-[tangerine] text-center mb-3 text-[blanchedalmond]'>Stay In Touch</h1>
              <p className='text-md text-justify font-[lora] text-[blanchedalmond] '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus impedit nisi assumenda aliquid fugit a quia porro.
                Molestias nostrum distinctio, voluptatibus id quos doloremque, non voluptates qui mollitia ad facilis!</p>
                <div className="space-x-5 p-3 text-[blanchedalmond] icons">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-x-twitter"></i>
                <i className="fa-brands fa-pinterest"></i>
                </div>
            </div>
            <div className="services">
              <h1 className='text-5xl font-semibold font-[tangerine] text-center text-[blanchedalmond]'>Quick Links</h1>
              <nav className='text-md flex flex-col font-[lora] px-40 space-y-4 text-[blanchedalmond] '>
              <Link to="" >Home</Link>
                <Link to="/about">About</Link>
                <Link to="/product">Products</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/cart" className='relative'></Link>
              </nav>
            </div>
            <div className="cotactUs">
              <h1 className='text-5xl font-semibold font-[tangerine] text-center text-[blanchedalmond]'>Contact Us</h1>
                <div className="text-md font-[lora] space-y-4 text-[blanchedalmond] contact">
                  <div className="flex gap-3 servi">
                  <i className="fa-solid fa-map "></i>
                  <p>Adetokunbo Ademola Street, Victoria Island, Lagos Nigeria</p>
                  </div>

                  <div className="flex gap-3 servi">
                  <i className="fa-solid fa-phone"></i>
                  <p>Phone Number: +234 201 2772700</p>
                  </div>

                  <div className="flex gap-3 servi">
                  <i className="fa-regular fa-envelope"></i>
                  <p>BimbsCollection.1@gmail.com</p>
                  </div>
                </div>
            </div>
            </div>
            <p className="text-lg text-center font-[lora] space-y-4 text-[blanchedalmond] ">Copyright © 2024 Bimbscollections</p>
      </footer>
    </div>
  )
}

export default Footer