import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
              <p className="text-gray-400 mt-2">Get started with us today</p>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
              Sign Up
            </button>

            <div className="text-center mt-6 text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
