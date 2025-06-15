import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadContent from "./UploadContent";

const ChooseUploadType = () => {
  const [type, setType] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleChoice = (selectedType) => {
    setType(selectedType);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-hidden min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Welcome, {userData?.name || 'User'}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {!type ? (
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Select Upload Type
            </h2>
            <p className="text-gray-600 text-center">
              What would you like to upload today?
            </p>
            
            <div className="grid grid-cols-1 gap-4 mt-6">
              <button
                onClick={() => handleChoice("video")}
                className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Video</h3>
                  <p className="text-sm text-gray-500">MP4, MOV, AVI up to 100MB</p>
                </div>
              </button>
              
              <button
                onClick={() => handleChoice("paper")}
                className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Research Paper</h3>
                  <p className="text-sm text-gray-500">PDF, DOCX up to 10MB</p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <UploadContent selectedType={type} />
        )}
      </div>
    </div>
  );
};

export default ChooseUploadType;