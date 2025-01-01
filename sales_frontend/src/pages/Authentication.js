import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Header from "./Header";
import RegistrationForm from "./RegistrationForm";

const Authentication = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setIsAuthenticated(!!token);

    if (token) {
      const timeoutId = setTimeout(() => {
        sessionStorage.removeItem("access_token");
        setIsAuthenticated(false);
      }, 10 * 60 * 1000); // 10 minutes
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      {children}
    </>
  );
};

export default Authentication;
