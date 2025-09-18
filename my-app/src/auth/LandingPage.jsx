import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container text-center py-5">
      <h1>Welcome to the Membership Site</h1>
      <p>Your gateway to exclusive content</p>
      <Link to="/auth/signup" className="btn btn-primary mx-2">Sign Up</Link>
      <Link to="/auth/login" className="btn btn-secondary mx-2">Login</Link>
    </div>
  );
};

export default LandingPage;
