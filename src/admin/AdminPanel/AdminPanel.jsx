// src/App.js
import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Notification from "../../Notification/Notification";

function AdminPanel() {
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
    setIsLoggedIn(false);
    setNotificationMessage("Logout successful!");
    setNotificationSeverity("success");
    setNotificationOpen(true);
  };

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
