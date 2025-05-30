'use client'
import React from 'react';
import { FaHamburger, FaShoppingCart, FaClock, FaCog ,FaPlusCircle, FaUtensils, FaChartLine, FaUserEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';

const stats = [
  {
    title: 'Total Foods',
    value: 42,
    icon: <FaHamburger className="text-white text-3xl" />,
    color: 'from-pink-500 to-red-400',
  },
  {
    title: 'Total Orders',
    value: 168,
    icon: <FaShoppingCart className="text-white text-3xl" />,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'Pending Orders',
    value: 9,
    icon: <FaClock className="text-white text-3xl" />,
    color: 'from-yellow-400 to-orange-500',
  },
  {
    title: 'Settings',
    value: 'Manage',
    icon: <FaCog className="text-white text-3xl" />,
    color: 'from-gray-600 to-gray-800',
  },
];
const quickActions = [
  {
    icon: <FaPlusCircle className="text-green-600 text-xl" />,
    label: 'Add New Food Item',
  },
  {
    icon: <FaUtensils className="text-orange-500 text-xl" />,
    label: 'Manage All Foods',
  },
  {
    icon: <FaChartLine className="text-blue-500 text-xl" />,
    label: 'Track Live Orders',
  },
  {
    icon: <FaUserEdit className="text-purple-500 text-xl" />,
    label: 'Edit Profile / Restaurant Info',
  },
];

const DashboardComponent = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen w-full rounded-2xl">
      <motion.h2
        className="text-3xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🍽️ Restaurant Owner Dashboard
      </motion.h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-r ${item.color} p-6 rounded-2xl shadow-lg flex justify-between items-center`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div>
              <p className="text-sm text-white/80">{item.title}</p>
              <h3 className="text-3xl font-bold text-white">{item.value}</h3>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="mt-10 bg-white rounded-2xl shadow-lg p-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <motion.div
      className="mt-10 bg-white rounded-2xl shadow-xl p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4">⚡ Quick Actions</h3>

      <ul className="space-y-4">
        {quickActions.map((action, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 p-4 rounded-xl shadow-sm cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-white shadow-inner p-2 rounded-full">{action.icon}</div>
            <span className="text-gray-800 font-medium">{action.label}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardComponent;
