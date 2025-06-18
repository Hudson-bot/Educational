import { Route, Routes } from "react-router-dom";
import './App.css'
import LoginPage from './components/auth/login'
import SignupPage from './components/auth/SignUp'
import ForgotPasswordPage from "./components/auth/forgotPassword";
import ChooseUploadType from "./components/content/ChooseUploadType";
import Dashboard from "./components/content/Dashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import AllContent from "./components/student/AllContent";
import Notes from "./components/student/Notes";
import InterviewBot from "./components/student/InterviewBot";
import SimpleProfileSettings from "./components/student/SimpleProfileSettings";
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/upload" element={<ChooseUploadType />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/content" element={<AllContent />} />
        <Route path="/student/notes" element={<Notes />} />
        <Route path="/student/interview" element={<InterviewBot />} />
        <Route path="/student/profile-settings" element={<SimpleProfileSettings />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
