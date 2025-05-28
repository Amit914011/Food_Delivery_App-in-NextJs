import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function RestaurantFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center">
            <span className="text-orange-500 mr-2 text-3xl">🍽️</span>DineDelight
          </h2>
          <p className="mt-3 text-sm">
            Experience culinary delight with our curated menu and warm ambiance. Perfect for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-orange-400 transition">Home</a></li>
            <li><a href="#menu" className="hover:text-orange-400 transition">Menu</a></li>
            <li><a href="#about" className="hover:text-orange-400 transition">About</a></li>
            <li><a href="#contact" className="hover:text-orange-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">📍 123 Food Street, Culinary City</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ info@dinedelight.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-orange-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-orange-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-orange-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-orange-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DineDelight. All rights reserved.
      </div>
    </footer>
  );
}

export default RestaurantFooter;
