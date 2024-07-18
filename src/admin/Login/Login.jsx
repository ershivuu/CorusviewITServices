import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notification from "../../Notification/Notification";

function Login({ onLogin }) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "corusviewit" && password === "corusview@admin") {
      localStorage.setItem("username", username);
      onLogin();
      navigate("/admin/editheader");
    } else {
      setAlertMessage("Invalid credentials");
      setAlertSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <>
      <div className="login-container">
        <div style={{ textAlign: "center" }}>
          <p className="login-content">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" autoComplete="on">
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              id="password-eye"
              className="password-toggle "
              onClick={handleTogglePassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>

          <div className="btn-login">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>

        <div className="design-content">
          <p>Design & Developed By CorusView</p>
        </div>
      </div>
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={alertMessage}
        alertSeverity={alertSeverity}
      />
    </>
  );
}

export default Login;
