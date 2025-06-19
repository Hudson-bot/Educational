import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiSave, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../../utils/profileApi';

const ModernProfileSettings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    study: '',
    about: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          study: data.study || '',
          about: data.about || ''
        });
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Profile load error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(profile);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
      console.error('Profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const NavBar = () => (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link 
              to="/student/dashboard"
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <FiArrowLeft className="mr-2" /> Back to Dashboard
            </Link>
            <span className="text-xl font-semibold text-white">EduPortal</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <NavBar />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-y-auto">
      <NavBar />
      <div className="max-w-lg mt-8 mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-blue-100">Update your personal information</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mx-6 mt-4">
            <p>{error}</p>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiUser className="mr-2 text-blue-600" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiMail className="mr-2 text-blue-600" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiPhone className="mr-2 text-blue-600" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* What do you study Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              What do you study?
            </label>
            <input
              type="text"
              name="study"
              value={profile.study}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g. Computer Science, Mathematics"
            />
          </div>

          {/* About Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              About You (max 200 characters)
            </label>
            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
              maxLength={200}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              placeholder="I am a curious learner who loves..."
            />
            <div className="text-xs text-gray-400 text-right">
              {profile.about.length}/200
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <FiSave className="mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModernProfileSettings;