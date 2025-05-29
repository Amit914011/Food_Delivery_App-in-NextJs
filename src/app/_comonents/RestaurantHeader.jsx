import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function RestaurantHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Simulate user logged in or not
  const [user, setUser] = useState(null); // null means not logged in

  // Toggle login state for demo (you can replace with real auth logic)
  const toggleLogin = () => {
    if (user) {
      setUser(null);
      setIsProfileOpen(false);
    } else {
      setUser({ name: "Amit Maurya" });
    }
  };
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
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, pointerEvents: "none" },
    visible: { opacity: 1, y: 0, pointerEvents: "auto" },
  };

  return (
    <header className="bg-white shadow-md  w-full z-50">
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

          {/* Login/Profile Section */}
          {!user ? (
            <button
              onClick={toggleLogin}
              className="ml-6 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Login
            </button>
          ) : (
            <div className="relative ml-6">
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center space-x-2 text-indigo-700 font-semibold focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                  {user.name.charAt(0)}
                </div>
                <span>{user.name}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-52 bg-white/70 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-indigo-100 text-sm text-indigo-900 font-medium">
                      👋 Hello,{" "}
                      <span className="font-semibold">{user.name}</span>
                    </div>
                    <div className="flex flex-col py-2">
                      <a
                        href="#profile"
                        className="flex items-center px-4 py-2 hover:bg-indigo-100 transition text-sm text-indigo-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-indigo-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.121 17.804A9.954 9.954 0 0112 15c2.485 0 4.746.91 6.879 2.404M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Profile
                      </a>
                      <button
                        onClick={toggleLogin}
                        className="flex items-center px-4 py-2 hover:bg-indigo-100 transition text-sm text-indigo-700"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden flex flex-col space-y-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
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
              className="fixed inset-0 bg-black bg-opacity-20 z-40"
              onClick={() => setIsOpen(false)}
            ></div>
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-md px-6 py-6 space-y-6 text-left font-semibold text-indigo-700 z-50"
            >
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

              {/* Mobile Login/Profile */}
              {!user ? (
                <button
                  onClick={() => {
                    toggleLogin();
                    setIsOpen(false);
                  }}
                  className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Login
                </button>
              ) : (
                <div className="mt-4 border-t pt-4">
                  <div className="font-semibold mb-2">Hello, {user.name}</div>
                  <a
                    href="#profile"
                    className="block py-2 hover:text-orange-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </a>
                  <button
                    onClick={() => {
                      toggleLogin();
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-2 hover:text-orange-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default RestaurantHeader;
