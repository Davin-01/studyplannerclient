import React, { useState } from 'react';
import NavbarHome from '../components/NavbarHome';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: '',
    specialty: '',
    yearsOfExpertise: '',
    technologies: [] as string[],
  });
  const [isSaving, setIsSaving] = useState(false); // State to track saving status

  const defaultProfileImage = 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250';
  const specialties = ['Web Development', 'Data Science', 'Mobile App Development', 'AI/ML', 'Cybersecurity'];
  const expertiseYears = ['<1 year', '1-3 years', '4-6 years', '7+ years'];
  const technologyOptions = ['React', 'Django', 'Flutter', 'Python', 'Other'];

  const handleSave = () => {
    setIsSaving(true);
    console.log('Saving Profile...', user);

    // Simulate an API call delay
    setTimeout(() => {
      setIsSaving(false);
      console.log('Profile Saved:', user);
    }, 2000);
  };

  const toggleTechnology = (technology: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      technologies: prevUser.technologies.includes(technology)
        ? prevUser.technologies.filter((tech) => tech !== technology)
        : [...prevUser.technologies, technology],
    }));
  };

  return (
    <>
      <NavbarHome />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center">
            <img
              src={user.profileImage || defaultProfileImage}
              alt="Profile"
              className="h-32 w-32 rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Specialty Selection */}
          <div className="mt-6">
            <label className="block text-gray-700 mb-2 font-semibold">Specialty</label>
            <select
              value={user.specialty}
              onChange={(e) => setUser({ ...user, specialty: e.target.value })}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your specialty</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Years of Expertise Selection */}
          <div className="mt-4">
            <label className="block text-gray-700 mb-2 font-semibold">Years of Expertise</label>
            <select
              value={user.yearsOfExpertise}
              onChange={(e) => setUser({ ...user, yearsOfExpertise: e.target.value })}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select experience level</option>
              {expertiseYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Technologies to Familiarize With */}
          <div className="mt-4">
            <label className="block text-gray-700 mb-2 font-semibold">
              Technologies to Familiarize With
            </label>
            <div className="flex flex-wrap gap-2">
              {technologyOptions.map((tech) => (
                <label key={tech} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={user.technologies.includes(tech)}
                    onChange={() => toggleTechnology(tech)}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="text-gray-700">{tech}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              onClick={handleSave}
              className={`w-full py-2 px-4 rounded text-white transition duration-200 ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

