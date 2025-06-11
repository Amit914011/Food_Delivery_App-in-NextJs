import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Column 1 */}
        <div>
          <h2 className="text-lg font-semibold text-[#099da7] mb-4">About Us</h2>
          <p className="text-gray-400">
            We connect food lovers with the best restaurants. Experience quality dining at your fingertips.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-lg font-semibold text-[#099da7] mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-lg font-semibold text-[#099da7] mb-4">Contact Us</h2>
          <p className="text-gray-400">Email: info@example.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          <p className="text-gray-400">Address: 123 Main St, City, Country</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
