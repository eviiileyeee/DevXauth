import React, { useState, useEffect } from "react";
import { Bell, User, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/1734760408581.jpeg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path === '/workshops') setActiveTab('workshops');
    else if (path === '/about') setActiveTab('about');
    else if (path === '/speakers') setActiveTab('speakers');
    else if (path === '/visit') setActiveTab('visit');
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'About', path: '/about', id: 'about' },
    { name: 'Events', path: '/events', id: 'events' },
    { name: 'Contact', path: '/contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[var(--color-background)] z-50 font-raleway">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-[var(--color-text)] text-xl font-extrabold uppercase tracking-wide">
                EVENTFLOW
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.path)}
                className={`text-sm font-bold uppercase tracking-wide ${
                  activeTab === link.id ? 'text-[var(--color-primary)]' : 'text-black hover:text-[var(--color-secondary)]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => navigate("/notification")}
                >
                  <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => navigate("/profile")}
                >
                  <img
                    className="h-10 w-10 object-cover rounded-full"
                    src={user.profileImage || "https://tse3.mm.bing.net/th?id=OIP.JttmcrrQ9_XqrY60bFEfgQHaHa&pid=Api&P=0&h=180"}
                    alt="User Avatar"
                  />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6B85B6] hover:bg-gray-950 dark:bg-[#A7B9D5] dark:hover:bg-[#6B85B6] rounded-full transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-black">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-[var(--color-primary)]" />
              ) : (
                <Menu className="h-6 w-6 text-[var(--color-primary)]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[var(--color-background)] z-50 p-8">
          <div className="flex justify-end mb-16">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--color-primary)]">
              <X className="h-8 w-8" />
            </button>
          </div>
          <div className="space-y-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-[var(--color-primary)] text-xl font-bold uppercase"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => {
                navigate("/tickets");
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-[var(--color-primary)] text-xl font-bold uppercase underline"
            >
              BUY TICKETS!
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
