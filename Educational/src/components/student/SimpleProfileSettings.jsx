import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiSave, FiUpload } from 'react-icons/fi';

const ModernProfileSettings = () => {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    password: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic would go here
    alert('Profile updated successfully!');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-y-auto">
      <div className="max-w-lg mt-8 mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white text-center">
          <div className="relative mx-auto w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4">
            <img 
              src={avatar || '/default-avatar.png'} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100">
              <FiUpload className="text-blue-600" />
              <input 
                type="file" 
                className="hidden" 
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </label>
          </div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-blue-100">Update your personal information</p>
        </div>

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
              value={user.name}
              onChange={handleChange}
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
              value={user.email}
              onChange={handleChange}
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
              value={user.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiLock className="mr-2 text-blue-600" /> New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition-all"
            >
              <FiSave className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModernProfileSettings;