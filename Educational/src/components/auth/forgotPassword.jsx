import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl">
          <div className="p-8">
            <button onClick={() => window.history.back()} className="flex items-center text-purple-400 mb-6">
              <FaArrowLeft className="mr-2" />
              Back to Login
            </button>

            <h1 className="text-3xl font-bold text-white text-center mb-4">Reset Password</h1>
            <p className="text-gray-400 text-center mb-6">
              Enter your email to receive a reset link
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white mb-4"
              placeholder="you@example.com"
            />

            <button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg mb-4">
              Send Reset Link
            </button>

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
