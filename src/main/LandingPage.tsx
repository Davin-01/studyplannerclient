import React from 'react';
import NavbarLandPage from '../components/NavbarLandPage';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <NavbarLandPage />

      {/* Hero Section */}
      <section className="hero min-h-screen flex flex-col justify-center items-center relative bg-no-repeat bg-cover bg-center py-16 px-4 md:px-8 overflow-hidden" style={{ backgroundImage: 'url("/background.jpg")' }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate__animated animate__fadeIn">
            Welcome to StudyPlanner
          </h1>
          <p className="text-lg md:text-xl mb-8 animate__animated animate__fadeIn animate__delay-1s">
            Plan your study sessions and manage your courses effectively.
          </p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-2s">
            Get Started
          </button>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses py-16 px-4 md:px-8 flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg mt-8">
        {/* Illustration on the Left */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img
            src="/study.svg"
            alt="Courses Illustration"
            className="max-w-full h-auto object-contain transition-transform transform hover:scale-105"
            style={{ maxWidth: '500px' }} // Adjust as needed
          />
        </div>

        {/* Intro about Courses */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Courses Offered</h2>
          <p className="text-gray-700">
            Our platform offers a wide range of courses tailored to enhance your knowledge and skills. From introductory lessons to advanced modules, we ensure every learner finds the perfect course to match their goals.
          </p>
        </div>
      </section>

      {/* Planner Section */}
      <section className="planner py-16 px-4 md:px-8 flex flex-col md:flex-row items-center bg-blue-50 shadow-lg rounded-lg mt-8">
        {/* Intro about AI-Powered Planner */}
        <div className="w-full md:w-1/2 md:pr-8">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">AI-Powered Planner</h2>
          <p className="text-gray-700">
            Our AI-powered study planner helps you schedule your study sessions efficiently and adapts to your learning preferences. Experience a personalized study plan that maximizes your productivity.
          </p>
        </div>

        {/* Illustration on the Right */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="/ai3.png"
            alt="Planner Illustration"
            className="max-w-full h-auto object-contain transition-transform transform hover:scale-105"
            style={{ maxWidth: '500px' }} // Adjust as needed
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <p className="text-center text-gray-600">© 2024 StudyPlanner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

