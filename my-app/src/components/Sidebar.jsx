import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient'; // Ensure Supabase client is initialized
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap icons are imported

const Sidebar = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Log the user out
    window.history.replaceState(null, '', '/auth/login'); // Prevent going back to the Dashboard
    navigate('/auth/login'); // Redirect to login page
  };

  return (
    <div className="sidebar bg-light p-3" style={{ width: '250px', height: '100vh' }}>
      <h3 className="text-center mb-4">Dashboard</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/pages/users/dashboard" className="nav-link">
            <i className="bi bi-house-door-fill"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/pages/users/profile" className="nav-link">
            <i className="bi bi-person-circle"></i> Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/pages/users/settings" className="nav-link">
            <i className="bi bi-gear-fill"></i> Settings
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto">
        <button onClick={handleLogout} className="btn btn-danger w-100 mt-4">
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
