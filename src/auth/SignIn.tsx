import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate an async action
    setTimeout( async () => {
      setLoading(false);
      // Handle successful form submission here
      try {
        const response = await axios.post('http://localhost:8000/api/sign-in/', {
          username: formData.username,
          password: formData.password,
        }, {
          withCredentials: true
        });
        console.log('Sign-in successful:', response.data);
        // Handle successful form submission here (e.g., redirect or show success message)
        navigate("/home");
      } catch (err) {
        console.error('Sign-in failed:', err);
        setError('An error occurred during sign-up. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 p-4">
      <div className="bg-blue-950 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-100 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your user name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-100 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-black transition duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-gray-100 mt-4">
          Don't have an account? <a href="/auth/signup" className="text-blue-400 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

