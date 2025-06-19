import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          // No token means not authenticated
          setUser(null);
          return;
        }

        const { data } = await axios.get('/auth/check');
        setUser(data.user);
        setError(null);
      } catch (err) {
        console.warn('Auth check failed:', err.response?.data?.message || err.message);
        setUser(null);
        setError(err.response?.data?.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}