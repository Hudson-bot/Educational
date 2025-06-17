import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../utils/axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('user', JSON.stringify({
        name: res.data.name,
        email: res.data.email,
        role: res.data.role
      }));
      
      // Redirect based on role
      if (res.data.role === 'teacher') {
        navigate('/upload');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 mt-2">Sign in to your account</p>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-purple-400">Forgot password?</Link>
              </div>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {error && (
              <div className="mt-4 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="text-center mt-6 text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-400">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
