import React from "react";
import logo from "../assets/Arogya_logo.png"; 
export default function Footer() {
  return (
    <footer className="bg-gray-300">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            {/* Logo Image */}
          <img src={logo || " "} alt="Logo" className="w-10 h-10 mr-2" />
          {/* Logo Text */}
          <h1 className="font-serif font-bold text-xl sm:text-2xl flex flex-wrap">
            <span className="bg-gradient-to-r from-green-800 to-lime-600 bg-clip-text text-transparent">Arogya</span>
          </h1>
          </div>

          <p className="mt-4 text-center text-sm text-gray-800 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
