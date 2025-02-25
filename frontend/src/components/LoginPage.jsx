import React, { useState } from "react";
import "../css/Loginpage.css";
import bitLogo from "../assets/bit logo.png"; // Correct way to import images

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <img src={bitLogo} alt="BIT Logo" className="logo" />

        <h3>BIT Information Portal</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <p className="signin-text">Sign in with your BIT account</p>
      </div>
    </div>
  );
};

export default Login;
