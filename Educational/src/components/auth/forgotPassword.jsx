import { FaArrowLeft } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-purple-400 hover:text-purple-300 mb-6 transition"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </button>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Reset Password</h1>
              <p className="text-gray-400 mt-2">
                Enter your email to receive a password reset link
              </p>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition"
                placeholder="your@email.com"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 mb-6">
              Send Reset Link
            </button>

            {/* Success Message (hidden by default) */}
            <div className="hidden bg-green-900/30 border border-green-600 text-green-300 px-4 py-3 rounded-lg mb-6">
              Password reset link sent! Check your email.
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-600"></div>
              <div className="px-3 text-gray-400">or</div>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            {/* Alternative Option */}
            <div className="text-center text-gray-400">
              Need help? <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Contact support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;