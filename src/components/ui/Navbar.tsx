import React from "react";
import { Bitcoin } from "lucide-react"; // Ensure this is the correct import for the Bitcoin icon

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Bitcoin className="h-8 w-8 text-yellow-400" />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              CoinShares Mining
            </span>
          </div>

          {/* Menu Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Services
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;