import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./users/Login";
import Signup from "./users/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
