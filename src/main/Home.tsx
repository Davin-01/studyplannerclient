import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';

const Home: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>(''); // Replace with your actual profile image URL
  const defaultProfileImage = 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250'; // Placeholder image URL

  return (
    <>
      <NavbarHome />
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <section className="hero bg-blue-500 text-white min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-12 px-4 md:px-8 bg-cover bg-center" style={{ backgroundImage: 'url("/hero-bg.jpg")' }}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to StudyPlanner</h1>
          <p className="text-lg md:text-xl mb-6 text-center max-w-3xl drop-shadow-md">
            Your personal study companion for planning and managing your courses efficiently.
          </p>
          <Link
            to="/planner"
            className="bg-white text-blue-500 py-2 px-6 rounded shadow-lg hover:bg-gray-100 transition duration-200"
          >
            Get Started
          </Link>
        </section>

        {/* About Section */}
        <section className="about py-12 px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-600 mb-6">About StudyPlanner</h2>
          <p className="text-gray-700 text-lg md:text-xl mb-6 max-w-4xl mx-auto">
            StudyPlanner helps you organize your study sessions with an AI-powered planner, making it easier to schedule and track your progress. Whether you're a student managing courses or an individual looking to optimize your study time, we've got you covered.
          </p>
        </section>

        {/* Features Section */}
        <section className="features py-12 px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-600 text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Courses Feature */}
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <img src="/onlinecourses.jpg" alt="Courses Icon" className="h-20 w-20 rounded-full mb-4" />
              <h3 className="text-xl font-semibold mb-2">Courses</h3>
              <p className="text-gray-700 mb-4">
                Access a variety of courses tailored to improve your knowledge and skills.
              </p>
              <Link
                to="/courses"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Explore Courses
              </Link>
            </div>

            {/* Planner Feature */}
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <img src="/aiplanner.jpg" alt="Planner Icon" className="h-20 w-20 rounded-full mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Planner</h3>
              <p className="text-gray-700 mb-4">
                Our intelligent scheduler adapts to your learning style, optimizing your study time.
              </p>
              <Link
                to="/planner"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Start Planning
              </Link>
            </div>

            {/* Profile Feature */}
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <img src={profileImage || defaultProfileImage} alt="Profile Icon" className="h-20 w-20 rounded-full mb-4" />
              <h3 className="text-xl font-semibold mb-2">Profile</h3>
              <p className="text-gray-700 mb-4">
                Manage your personal information and track your learning journey.
              </p>
              <Link
                to="/profile"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                View Profile
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <p className="text-center text-gray-600 text-sm">© 2024 StudyPlanner. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;

