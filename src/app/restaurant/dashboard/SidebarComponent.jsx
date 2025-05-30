'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaBars,
  FaHome,
  FaHamburger,
  FaBoxOpen,
  FaChartBar,
  FaCog,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { label: 'Home', icon: <FaHome />, href: '/restaurant/dashboard' },
  { label: 'Add Food', icon: <FaHamburger />, href: '/restaurant/dashboard/add-food' },
  { label: 'Manage Foods', icon: <FaBoxOpen />, href: '/restaurant/dashboard/manage-foods' },
  { label: 'Orders', icon: <FaChartBar />, href: '/restaurant/dashboard/orders' },
  { label: 'Settings', icon: <FaCog />, href: '/restaurant/dashboard/settings' },
];

function SidebarComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-start pt-20">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <FaBars className="text-2xl text-gray-800" />
        </button>
        {/* <h2 className="text-lg font-bold text-gray-800">Dashboard</h2> */}
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
              <button onClick={() => setIsMobileOpen(false)}>✖</button>
            </div>
            <ul className="space-y-4 text-gray-700 font-medium">
              {menuItems.map((item, idx) => (
                <li key={idx} onClick={() => setIsMobileOpen(false)}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 hover:text-primary cursor-pointer"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`hidden md:flex flex-col bg-white border-r shadow-md p-4 pt-20
          transition-all duration-300 ease-in-out fixed top-0 left-0 h-screen z-40
          ${isExpanded ? 'w-64' : 'w-20'}
          `}
      >
        {/* Hamburger toggle for collapse/expand */}
        {/* <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-end mb-6 text-gray-600 hover:text-primary focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FaBars size={20} />
        </button> */}

        <h2
          className={`text-xl font-bold mb-6 text-gray-800
            ${isExpanded ? 'block' : 'hidden'}
          `}
        >
          Dashboard
        </h2>

        <ul className="flex flex-col space-y-4 text-gray-700 font-medium">
          {menuItems.map((item, idx) => (
            <li key={idx} className="group">
              <Link
                href={item.href}
                className={`flex items-center gap-3 cursor-pointer
                  hover:text-primary
                  ${
                    !isExpanded
                      ? 'justify-center'
                      : ''
                  }
                `}
                title={!isExpanded ? item.label : ''}
              >
                <span className="text-lg">{item.icon}</span>
                {isExpanded && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default SidebarComponent;
