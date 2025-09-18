import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  supabase  from './supabaseClient';  // Ensure Supabase is initialized
import Dashboard from './pages/users/Dashboard';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      navigate('/auth/login');  // Redirect to login if not logged in
    }
  }, [navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/pages/users/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
