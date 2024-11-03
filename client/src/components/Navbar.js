import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and Close icons

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("Logged Out");
  };

  return (
    <div className='w-full bg-gray-100 shadow-md'>
      <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
        
        <Link to="/" className='text-black font-bold text-[30px]'>
          Sehat Sathi
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-black text-3xl lg:hidden focus:outline-none">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <nav className='hidden lg:flex'>
          <ul className='text-black text-[20px] font-bold flex gap-x-6'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Auth Buttons for Desktop */}
        <div className='hidden lg:flex items-center gap-x-4'>
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className='bg-gray-800 text-white py-2 px-4 rounded-md'>
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className='bg-gray-800 text-white py-2 px-4 rounded-md'>
                  Sign up
                </button>
              </Link>
              <Link to="https://docmedsync.vercel.app/" target="_blank" rel="noopener noreferrer">
                <button className='bg-gray-800 text-white py-2 px-4 rounded-md'>
                  Web3 File Sharing
                </button>
              </Link>
            </>
          ) : (
            <>
              <button onClick={handleLogout} className='bg-gray-800 text-white py-2 px-4 rounded-md'>
                Log Out
              </button>
              <Link to="/dashboard">
                <button className='bg-gray-800 text-white py-2 px-4 rounded-md'>
                  Dashboard
                </button>
              </Link>
            </>
          )}
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='lg:hidden bg-gray-100'>
          <nav className='flex flex-col items-center gap-y-4 py-4'>
            <Link to="/" onClick={() => setMenuOpen(false)} className='text-black text-[20px] font-bold'>
              Home
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className='text-black text-[20px] font-bold'>
              About
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className='text-black text-[20px] font-bold'>
              Contact
            </Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className='bg-gray-800 text-white py-2 px-6 rounded-md'>
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className='bg-gray-800 text-white py-2 px-6 rounded-md'>
                  Sign up
                </Link>
                <Link to="https://docmedsync.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className='bg-gray-800 text-white py-2 px-6 rounded-md'>
                  Web3 File Sharing
                </Link>
              </>
            ) : (
              <>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className='bg-gray-800 text-white py-2 px-6 rounded-md'>
                  Log Out
                </button>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className='bg-gray-800 text-white py-2 px-6 rounded-md'>
                  Dashboard
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
