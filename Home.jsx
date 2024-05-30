import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Link } from "react-router-dom";

const slideImages =
  "https://www.greatschools.org/gk/wp-content/uploads/2014/03/The-school-visit-what-to-look-for-what-to-ask-1-750x325.jpg";

const logoUrl =
  "http://www.connectustech.com/wp-content/uploads/2021/01/connectusschool-app-for-parents.png";

export const Home = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handleRadioChange = (e) => {
  //   this.setState({ Radiovalue: e.target.value });
  // };

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
    <>
      <div className="header-container">
        <div className="logo-container">
          <img src={logoUrl} width="100" height="100" alt="Logo" />
        </div>
        <div className="school-name">
          <h1 className="heading-title">School Parent App</h1>
        </div>
      </div>
      <div className="main-page-container">
        <div className="slide-container">
          <img src={slideImages} alt="slide" />
        </div>
        <div className="main-container">
          <div className="login-container">
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
              <div className="footer">
                <p>
                  don't have an account ?
                  <Link to="/Register" className="register-footer">
                    Register Now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Link } from "react-router-dom";

const slideImages =
  "https://www.greatschools.org/gk/wp-content/uploads/2014/03/The-school-visit-what-to-look-for-what-to-ask-1-750x325.jpg";

const logoUrl =
  "http://www.connectustech.com/wp-content/uploads/2021/01/connectusschool-app-for-parents.png";

export const Home = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("staff");
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
        if (userType === "staff") {
          navigate("/StaffDashboard");
        } else if (userType === "Parents") {
          navigate("/ParentDashboard");
        }
        // Redirect to the dashboard
      } else {
        setError("Invalid registration ID or password");
      }
    } catch (error) {
      console.error("Error fetching the users:", error);
      setError("Failed to load user data");
    }
  };

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <img src={logoUrl} width="100" height="100" alt="Logo" />
        </div>
        <div className="school-name">
          <h1 className="heading-title">School Parent App</h1>
        </div>
      </div>
      <div className="main-page-container">
        <div className="slide-container">
          <img src={slideImages} alt="slide" />
        </div>
        <div className="main-container">
          <div className="login-container">
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
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="staff"
                    checked={userType === "staff"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  Staff
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="parent"
                    checked={userType === "parent"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  Parent
                </label>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit">Login</button>
              <div className="footer">
                <p>
                  don't have an account ?
                  <Link to="/Register" className="register-footer">
                    Register Now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};



// Home.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [userType, setUserType] = useState('Staff');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    if (userType === 'Staff') {
      try {
        const response = await axios.get('/users.json');
        const users = response.data;
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          history.push('/StaffDashboard');
        } else {
          alert('Invalid credentials for Staff');
        }
      } catch (error) {
        console.error('Error fetching users.json:', error);
      }
    } else if (userType === 'Parents') {
      try {
        const response = await axios.post('/api/login', { registrationId, password });
        if (response.data.success) {
          history.push('/ParentDashboard');
        } else {
          alert('Invalid credentials for Parents');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <div>
        <label>
          <input
            type="radio"
            value="Staff"
            checked={userType === 'Staff'}
            onChange={() => setUserType('Staff')}
          />
          Staff
        </label>
        <label>
          <input
            type="radio"
            value="Parents"
            checked={userType === 'Parents'}
            onChange={() => setUserType('Parents')}
          />
          Parents
        </label>
      </div>
      {userType === 'Staff' ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Registration ID"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Home;

