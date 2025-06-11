'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUtensils, FaInfoCircle, FaPhone, FaUser, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const router=useRouter()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold text-[#1D4ED8]">
         <Link href='/'>🍽️
          DineDelight</Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-[#1D4ED8] font-medium">
            <FaHome /> Home
          </Link>
          <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#1D4ED8] font-medium">
            <FaUtensils /> Menu
          </a>
          <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#1D4ED8] font-medium">
            <FaInfoCircle /> About
          </a>
          <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#1D4ED8] font-medium">
            <FaPhone /> Contact
          </a>
        </nav>

        {/* Buttons & Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* <button className="bg-[#e63946] text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300">
            Reserve Table
          </button> */}
          <button className="border border-[#1D4ED8] text-[#1D4ED8] px-4 py-2 rounded-full hover:bg-[#1D4ED8] hover:text-white transition duration-300 cursor-pointer"
          onClick={()=>router.push('/restaurant/dashboard')}
          >
           + Restaurant
          </button>
          {/* User and Cart Icons */}
          <FaUser className="text-xl text-gray-700 hover:text-[#1D4ED8] cursor-pointer" />
          <FaShoppingCart className="text-xl text-gray-700 hover:text-[#1D4ED8] cursor-pointer" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 text-2xl cursor-pointer">
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-md px-4 pb-4 z-40 md:hidden"
          >
            <nav className="flex flex-col space-y-3 mt-2">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-[#1D4ED8] font-medium">
                <FaHome /> Home
              </Link>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-[#1D4ED8] font-medium">
                <FaUtensils /> Menu
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-[#1D4ED8] font-medium">
                <FaInfoCircle /> About
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-[#1D4ED8] font-medium">
                <FaPhone /> Contact
              </a>
              {/* <button className="bg-[#e63946] text-white px-5 py-2 rounded-full hover:bg-red-700 transition duration-300 w-full">
                Reserve Table
              </button> */}
              <button
              onClick={()=>router.push('/restaurant/dashboard')}
              className="border border-[#1D4ED8] text-[#1D4ED8] px-5 py-2 rounded-full hover:bg-[#1D4ED8] hover:text-white transition duration-300 w-full cursor-pointer">
               + Restaurant
              </button>
              {/* User & Cart Icons */}
              <div className="flex gap-4 justify-center pt-2">
                <FaUser className="text-xl text-gray-700 hover:text-[#1D4ED8] cursor-pointer" />
                <FaShoppingCart className="text-xl text-gray-700 hover:text-[#1D4ED8] cursor-pointer" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
