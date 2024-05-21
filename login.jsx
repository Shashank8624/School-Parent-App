import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch users from the JSON file
      const response = await fetch("/users.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();

      // Check if the user exists and the password matches
      const user = users.find(
        (user) =>
          user.registrationId === registrationId && user.password === password
      );

      if (user) {
        // Redirect to the dashboard
        navigate("/StaffDashboard");
      } else {
        setError("Invalid registration ID or password");
      }
    } catch (error) {
      console.error("Error fetching the users:", error);
      setError("Failed to load user data");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Registration ID</label>
          <input
            type="text"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
