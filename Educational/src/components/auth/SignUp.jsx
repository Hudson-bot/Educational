import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'student' // Default role is student
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'role') {
      setFormData({ ...formData, role: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('All fields are required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      
      const response = await api.post('/auth/register', formData);
      
      if (response.data) {
        alert('Signup successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(
        err.response?.data?.message || 
        'Signup failed. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
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

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                  minLength="6"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Role</label>
                <div className="flex gap-4">
                  <label className="flex items-center text-gray-300">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === 'student'}
                      onChange={handleChange}
                      id="role"
                      className="mr-2"
                    />
                    Student
                  </label>
                  <label className="flex items-center text-gray-300">
                    <input
                      type="radio"
                      name="role"
                      value="teacher"
                      checked={formData.role === 'teacher'}
                      onChange={handleChange}
                      id="role"
                      className="mr-2"
                    />
                    Teacher
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>

              {error && (
                <div className="mt-4 text-red-400 text-sm text-center bg-red-900/20 p-3 rounded">
                  {error}
                </div>
              )}
            </form>

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
