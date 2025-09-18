// src/pages/users/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient'; // Import supabase client

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data) {
        navigate('/auth/login');  // Redirect to login if user is not authenticated
      } else {
        setUser(data);  // Set user data to state
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>This is your exclusive membership area!</p>

        {/* Display User Info */}
        {user && (
          <div className="user-info">
            <h3>User Details</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Membership Type:</strong> {user.user_metadata.membership_type}</p>
            {/* Add more user-specific content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;  // Ensure it is exported as default
