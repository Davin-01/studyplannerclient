import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarLandPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Left SVG Icon */}
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="6" x2="12" y2="12" />
            <line x1="12" y1="12" x2="18" y2="12" />
          </svg>
        </div>

        {/* Center Title */}
        <h1 className="text-blue-600 text-2xl font-bold mx-auto">StudyPlanner</h1>

        {/* Right Side Buttons and Hamburger Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/signup" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">Sign Up</Link>
          <Link to="/signin" className="bg-transparent border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition duration-200">Sign In</Link>
        </div>
        {/* Hamburger icon */}
        <button className="md:hidden flex items-center text-blue-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-center py-3">
            <Link to="/signup" className="block w-full text-center py-2 text-blue-600 hover:bg-gray-100 transition duration-200">Sign Up</Link>
            <Link to="/signin" className="block w-full text-center py-2 text-blue-600 hover:bg-gray-100 transition duration-200">Sign In</Link>
            <Link to="/" className="block w-full text-center py-2 text-blue-600 hover:bg-gray-100 transition duration-200">Home</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarLandPage;

