import React from 'react';
import { useNavigate } from 'react-router-dom';
import  supabase from '../supabaseClient';  // Make sure you have Supabase client initialized

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth/login');  // Redirect to login page after logout
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Welcome</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="/pages/users/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/pages/users/profile">Profile</a>
          </li>
          <li>
            <a href="/pages/users/settings">Settings</a>
          </li>
        </ul>
      </nav>
      <div className="logout-section">
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
