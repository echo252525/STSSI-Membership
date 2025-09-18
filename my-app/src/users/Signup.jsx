// Signup.jsx
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with your URL and anon key from .env.local
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL, // Use REACT_APP_ prefix
  process.env.REACT_APP_SUPABASE_ANON_KEY // Use REACT_APP_ prefix
);

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use Supabase Auth to sign up the user
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Successfully signed up the user
        alert('Signup successful! Please check your email to confirm.');
        console.log(user);
      }
    } catch (err) {
      setError('Error signing up');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
