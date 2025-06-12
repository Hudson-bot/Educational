import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 mt-2">Sign in to your account</p>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue="ngbd@gmail.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                defaultValue="........"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition"
              />
            </div>

            {/* Sign In Button */}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 mb-4">
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-600"></div>
              <div className="px-3 text-gray-400">or</div>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
              <FaGoogle className="text-red-400" />
              Sign in with Google
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;