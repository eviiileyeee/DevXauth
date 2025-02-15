import React from 'react';
import { Github, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="DevXHub Logo" className="h-12 w-12 mr-2 rounded-full" />
              <span className="text-xl font-bold text-white">DevXHub</span>
            </div>
            <p className="text-gray-400">
              A thriving community of developers, innovators, and tech enthusiasts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-400 transition-colors duration-300">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors duration-300">About</a></li>
              <li><a href="#events" className="hover:text-blue-400 transition-colors duration-300">Events</a></li>
              <li><a href="#team" className="hover:text-blue-400 transition-colors duration-300">Team</a></li>
              <li><a href="#join" className="hover:text-blue-400 transition-colors duration-300">Join Us</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">Email: support@devxhub.com</p>
            <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DevXHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;