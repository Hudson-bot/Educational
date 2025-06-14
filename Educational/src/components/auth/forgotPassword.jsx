import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import api from '../../utils/axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      setLoading(true);
      setError('');
      setMessage('');

      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'Reset link sent successfully!');
    } catch (err) {
      console.error('Password reset error:', err);
      setError(
        err.response?.data?.message || 
        'Failed to send reset email. Please try again.'
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
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center text-purple-400 mb-6"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </button>

            <h1 className="text-3xl font-bold text-white text-center mb-4">
              Reset Password
            </h1>
            <p className="text-gray-400 text-center mb-6">
              Enter your email to receive a reset link
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white mb-4"
                placeholder="you@example.com"
                required
              />

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg mb-4 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            {error && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-700/40 border border-green-500 text-green-300 p-3 rounded-lg">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
