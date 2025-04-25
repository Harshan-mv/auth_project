import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Import your components
import Login from './components/AuthForm';
import Dashboard from './components/Dashboard';



// Create a Context for user data
export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Not authenticated:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Context value with user data and setter function
  const userContextValue = {
    user,
    setUser,
    loading
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          

          </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;