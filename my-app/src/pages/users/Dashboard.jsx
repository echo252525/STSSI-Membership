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
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-3 col-md-2 bg-light position-fixed h-100 p-3" style={{ top: 0, left: 0, zIndex: 1000 }}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-9 col-md-10 offset-md-2 ml-sm-auto p-3" style={{ marginLeft: '250px' }}>
          <h1>Welcome to Your Dashboard</h1>
          <p>This is your exclusive membership area!</p>

          {/* User Info Section */}
          {user ? (
            <div className="user-info mt-4">
              <h3>User Details</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              {/* Render membership_type if it exists */}
              <p>
                <strong>Membership Type:</strong> {membershipType || 'Not Set'}
              </p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
