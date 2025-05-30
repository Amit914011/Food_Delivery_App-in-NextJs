"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RestaurantHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // null = not logged in
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (data) {
      try {
        const parsedUser = JSON.parse(data);
        if (parsedUser?.name) {
          setUser(parsedUser);
        } else {
          router.push("/restaurant"); // redirect to login if data invalid
        }
      } catch (error) {
        console.error("Invalid JSON in localStorage", error);
        router.push("/restaurant");
      }
    } else {
      router.push("/restaurant"); // redirect to login if no data
    }
  }, [router]);

  const menuVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <header className="bg-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-indigo-700 cursor-pointer select-none">
          <span className="text-orange-500">🍽️</span> DineDelight
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 text-gray-700 font-semibold items-center">
          <a href="#home" className="hover:text-indigo-600 transition">
            Home
          </a>
          <a href="#menu" className="hover:text-indigo-600 transition">
            Menu
          </a>
          <a href="#about" className="hover:text-indigo-600 transition">
            About
          </a>
          <a href="#contact" className="hover:text-indigo-600 transition">
            Contact
          </a>
        </nav>

        {user?.name ? (
          <div className="justify-center items-center gap-3 hidden md:flex ">
            <div className="w-8 h-8 rounded-full uppercase bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              {user?.name.charAt(0)}
            </div>
            <p className="capitalize text-1xl font-semibold">{user?.name}</p>
            <button className="bg-blue-950 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-800">
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex">
            <Link
              href="/restaurant"
              className="bg-blue-950 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-800"
            >
              Login
            </Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div
          className="md:hidden flex flex-col space-y-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block h-0.5 w-6 bg-indigo-700 transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-indigo-700 transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-indigo-700 transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-[#000000da] bg-opacity-20 z-40"
              onClick={() => setIsOpen(false)}
            ></div>
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-md px-6 py-6 space-y-6 text-left font-semibold text-indigo-700 z-50 flex flex-col justify-between"
            >
             <div>
               <a
                href="#home"
                className="block hover:text-orange-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#menu"
                className="block hover:text-orange-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </a>
              <a
                href="#about"
                className="block hover:text-orange-500 transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block hover:text-orange-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
             </div>
             <div>
               {user?.name ? (
          <div className="justify-center items-center gap-3 flex  md:hidden ">
            <div className="w-8 h-8 rounded-full uppercase bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              {user?.name.charAt(0)}
            </div>
            <p className="capitalize text-1xl font-semibold">{user?.name}</p>
            <button className="bg-blue-950 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-800">
              Logout
            </button>
          </div>
        ) : (
          <div className="md:hidden">
            <Link
              href="/restaurant"
              className="bg-blue-950 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-800"
            >
              Login
            </Link>
          </div>
        )}
             </div>
              
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default RestaurantHeader;
