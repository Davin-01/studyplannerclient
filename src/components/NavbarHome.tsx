import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarHome: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(''); // Replace with your actual profile image URL
  const defaultProfileImage = 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250'; // Placeholder image URL

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here (e.g., clearing cookies, tokens, etc.)
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Icon */}
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="6" x2="12" y2="12" />
            <line x1="12" y1="12" x2="16" y2="16" />
          </svg>
        </div>

        {/* Center Title */}
        <Link to="/home" className="text-white text-2xl font-bold">
          StudyPlanner
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link
            to="/home/courses"
            className="text-white hover:text-blue-300 transition duration-200"
            aria-label="Courses"
          >
            Courses
          </Link>
          <Link
            to="/home/planner"
            className="text-white hover:text-blue-300 transition duration-200"
            aria-label="Planner"
          >
            Planner
          </Link>
          <Link
            to="/home/myplans"
            className="text-white hover:text-blue-300 transition duration-200"
            aria-label="My Plans"
          >
            My Plans
          </Link>

          {/* Profile Image with Dropdown */}
          <div className="relative">
            <button
              onClick={handleToggleDropdown}
              className="flex items-center bg-white rounded-full p-1 border border-gray-300"
            >
              <img
                src={profileImage || defaultProfileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="py-1">
                  <Link
                    to="/home/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    aria-label="Profile"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;

