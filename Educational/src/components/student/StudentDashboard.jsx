import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBook, FiEdit3, FiMic, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const StudentDashboard = () => {
  const [user, setUser] = useState({ name: '', course: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || { name: 'Student', course: 'Not Set' };
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Add navigation bar
  const NavBar = () => (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">EduPortal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
            </div>
            <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            title="Logout"
          >
            <FiLogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const dashboardCards = [
    {
      title: "Study Materials",
      description: "Access course materials and resources",
      icon: <FiBook className="text-blue-500" size={24} />,
      path: "/student/content",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      title: "Digital Notebook",
      description: "Take and organize your study notes",
      icon: <FiEdit3 className="text-purple-500" size={24} />,
      path: "/student/notes",
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      title: "AI Interview Prep",
      description: "Practice with mock interviews",
      icon: <FiMic className="text-green-500" size={24} />,
      path: "/student/interview",
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Profile Settings",
      description: "Manage your account and preferences",
      icon: <FiSettings className="text-amber-500" size={24} />,
      path: "/student/profile-settings",
      color: "bg-amber-50 hover:bg-amber-100"
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-y-auto">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, <span className="text-blue-400">{user.name}</span></h1>
            <p className="text-gray-300 mt-2">What would you like to do today?</p>
          </div>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <Link 
              to={card.path} 
              key={index}
              className={`${card.color} p-6 rounded-xl transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-gray-200`}
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <div className="mt-auto text-sm text-blue-600 font-medium flex items-center">
                  Get started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;