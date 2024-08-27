// src/App.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Notification from "../../Notification/Notification";

function AdminPanel() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setNotificationMessage("Login successful!");
    setNotificationSeverity("success");
    setNotificationOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    navigate("/");
    setIsLoggedIn(false);
    setNotificationMessage("Logout successful!");
    setNotificationSeverity("success");
    setNotificationOpen(true);
    clearTimeout(logoutTimer);
  };
  let logoutTimer;
  const startLogoutTimer = () => {
    logoutTimer = setTimeout(() => {
      handleLogout();
    }, 30 * 60 * 1000);
  };
  const handleUserActivity = () => {
    clearTimeout(logoutTimer);
    startLogoutTimer();
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default AdminPanel;
