import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import supabase from './supabaseClient'; // Ensure Supabase is initialized
import Dashboard from './pages/users/Dashboard';
import Login from './auth/Login';
import Signup from './auth/Signup';
import LandingPage from './auth/LandingPage'; // Import LandingPage component
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();  // Use getUser() instead of user()
      if (error || !data) {
        navigate('/auth/landing'); // Redirect to LandingPage if not logged in
      }
    };

    fetchUser();
  }, [navigate]);

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Default route to LandingPage */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route 
          path="/pages/users/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
