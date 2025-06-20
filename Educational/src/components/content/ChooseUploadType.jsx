import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadContent from "./UploadContent";
import TeacherDialog from "./TeacherDialog";
import { FiVideo, FiFileText, FiUserPlus, FiLogOut, FiHome } from "react-icons/fi";

const ChooseUploadType = () => {
  const [type, setType] = useState("");
  const [userData, setUserData] = useState(null);
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [initialTeacher, setInitialTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      // Load saved teachers from localStorage if available
      const savedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
      setTeachers(savedTeachers);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleChoice = (selectedType) => {
    setType(selectedType);
  };

  const handleSaveTeacher = (teacherInfo) => {
    const updatedTeachers = [...teachers, teacherInfo];
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
  };

  const handleRemoveTeacher = (index) => {
    const updatedTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(updatedTeachers);
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
  };

  const handleOpenTeacherDialog = () => {
    if (teachers.length > 0) {
      setInitialTeacher(teachers[teachers.length - 1]);
    } else {
      setInitialTeacher(null);
    }
    setShowTeacherDialog(true);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-hidden min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full bg-gray-800/90 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700">
        <div>
          <span className="text-2xl font-bold text-white">EduPortal</span>
        </div>
         <span className="text-2xl font-bold text-white">
          Welcome, {userData?.name || 'User'}
        </span>
        <div className="flex gap-3">
          <button
            onClick={handleOpenTeacherDialog}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            title="Add Teacher"
          >
            <FiUserPlus size={18} />
            <span className="hidden sm:inline">Details</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            title="Dashboard"
          >
            <FiHome size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {!type ? (
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6 border border-white/10">
            <h2 className="text-3xl font-bold text-white text-center">
              Select Upload Type
            </h2>
            <p className="text-gray-300 text-center text-lg">
              Choose what you'd like to upload to the platform
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Video Upload Option */}
              <button
                onClick={() => handleChoice("video")}
                className="group relative bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-blue-400 rounded-xl p-6 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
                    <FiVideo className="text-blue-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Upload Video</h3>
                  <p className="text-gray-300 text-center text-sm">
                    Educational videos, lectures, or tutorials
                  </p>
                  <div className="mt-4 text-xs text-blue-300">
                    Supported: MP4, MOV, AVI (max 100MB)
                  </div>
                </div>
              </button>
              
              {/* Paper Upload Option */}
              <button
                onClick={() => handleChoice("paper")}
                className="group relative bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-green-400 rounded-xl p-6 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-all">
                    <FiFileText className="text-green-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Upload Research Paper</h3>
                  <p className="text-gray-300 text-center text-sm">
                    Academic papers, articles, or study materials
                  </p>
                  <div className="mt-4 text-xs text-green-300">
                    Supported: PDF, DOCX (max 10MB)
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <UploadContent 
            selectedType={type} 
            teachers={teachers}
            onBack={() => setType("")}
          />
        )}
      </div>

    

      {/* Teacher Dialog */}
      <TeacherDialog
        isOpen={showTeacherDialog}
        onClose={() => setShowTeacherDialog(false)}
        onSave={handleSaveTeacher}
        initialTeacher={initialTeacher}
      />
    </div>
  );
};

export default ChooseUploadType;