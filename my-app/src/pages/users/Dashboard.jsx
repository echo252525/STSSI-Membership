import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'; // Import Sidebar from components
import supabase from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [membershipType, setMembershipType] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data) {
        navigate('/auth/login'); // Redirect to login if user is not authenticated
      } else {
        setUser(data.user); // Set the user object

        // Now fetch user details from the 'users' table
        const { data: userDetails, error: userDetailsError } = await supabase
          .from('users')
          .select('membership_type') // Fetch the membership_type
          .eq('email', data.user.email); // Match the email of the authenticated user

        if (userDetailsError) {
          console.error('Error fetching user details:', userDetailsError);
        } else {
          setMembershipType(userDetails[0]?.membership_type); // Set the membership_type
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Sidebar will be fixed on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="dashboard-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>This is your exclusive membership area!</p>

        {/* User Info Section */}
        {user ? (
          <div className="user-info">
            <h3>User Details</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* Render membership_type if it exists */}
            <p>
              <strong>Membership Type:</strong> {membershipType || 'Not Set'}
            </p>
            {/* Add more user-specific content here */}
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
