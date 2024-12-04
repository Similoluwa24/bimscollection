import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#D97706] text-white py-10">
      {/* Main Grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Stay In Touch Section */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold font-[Tangerine] mb-4">Stay In Touch</h2>
          <p className="text-sm font-[Lora] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus impedit nisi assumenda aliquid fugit a
            quia porro. Molestias nostrum distinctio voluptatibus id quos doloremque, non voluptates qui mollitia ad
            facilis!
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4 text-lg">
            <a href="#" aria-label="Facebook">
              <i className="fa-brands fa-facebook hover:text-blue-400"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram hover:text-pink-400"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter hover:text-blue-400"></i>
            </a>
            <a href="#" aria-label="Pinterest">
              <i className="fa-brands fa-pinterest hover:text-red-400"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold font-[Tangerine] mb-4">Quick Links</h2>
          <nav className="flex flex-col items-center space-y-2 font-[Lora]">
            <Link to="/" className="hover:underline hover:text-blue-400">Home</Link>
            <Link to="/about" className="hover:underline hover:text-blue-400">About</Link>
            <Link to="/product" className="hover:underline hover:text-blue-400">Products</Link>
            <Link to="/login" className="hover:underline hover:text-blue-400">Login</Link>
            <Link to="/signup" className="hover:underline hover:text-blue-400">Signup</Link>
            <Link to="/cart" className="hover:underline hover:text-blue-400">Cart</Link>
          </nav>
        </div>

        {/* Contact Us Section */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold font-[Tangerine] mb-4">Contact Us</h2>
          <ul className="space-y-3 text-sm font-[Lora]">
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-map text-lg"></i>
              <span>Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-phone text-lg"></i>
              <span>Phone: +234 201 2772700</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-regular fa-envelope text-lg"></i>
              <span>Email: BimbsCollection.1@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-[#F4F4F9]/50 pt-4">
        <p className="text-sm font-[Lora]">
          Copyright © 2024 <span className="font-bold">BimbsCollections</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
