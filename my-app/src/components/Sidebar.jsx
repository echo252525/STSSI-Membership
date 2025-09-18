import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap icons are imported

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3">
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
      <div className="mt-auto">
        <button className="btn btn-danger w-100 mt-4">
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
