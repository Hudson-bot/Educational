import { Route, Routes } from "react-router-dom";
import './App.css'
import LoginPage from './components/auth/login'
import SignupPage from './components/auth/SignUp'
import ForgotPasswordPage from "./components/auth/forgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
    </Routes>
  )
}

export default App
