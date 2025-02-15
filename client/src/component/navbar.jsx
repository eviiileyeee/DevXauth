import React from 'react';
import { ArrowRight } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white text-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="DevXHub Logo" className="h-10 w-10 mr-2 rounded-full" />
          <span className="text-xl font-bold">DevXHub</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#home" className="hover:text-blue-500 transition-colors duration-300">Home</a>
          <a href="#about" className="hover:text-blue-500 transition-colors duration-300">About</a>
          <a href="#events" className="hover:text-blue-500 transition-colors duration-300">Events</a>
          <a href="#team" className="hover:text-blue-500 transition-colors duration-300">Team</a>
          <a href="#join" className="hover:text-blue-500 transition-colors duration-300">Join Us</a>
        </div>

        {/* Login/Signup Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-2 px-4 border-2 border-blue-500 rounded-lg transition-all duration-300">
            Login
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center">
            Sign Up <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;