import React, { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Attempt to sign up the user
    const { data: signUpData, error: signupError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signupError) {
      console.error("Error signing up:", signupError.message);
      alert("Error signing up. Please try again.");
      return;
    }

    // Check if the user object exists
    if (!signUpData.user) {
      console.error("No user object returned");
      alert("An error occurred. Please try again.");
      return;
    }

    const user = signUpData.user;

    // Insert user data into the 'users' table after sign-up
    const { data, error: insertError } = await supabase.from("users").insert([
      {
        email,
        full_name: fullName,
        membership_type: "basic", // Set default membership
        address,
        age: parseInt(age),
        id: user.id, // Use the authenticated user's id as the primary key
      },
    ]);

    if (insertError) {
      console.error("Error inserting user data:", insertError.message);
      alert("Error inserting user data. Please try again.");
      return;
    }

    console.log("User data inserted:", data);

    // Inform the user to confirm their email
    alert("Please check your email to confirm your account.");

    // Redirect to the login page
    navigate("/auth/login");
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            id="age"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
