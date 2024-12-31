import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import Header from "./Header";

const Authentication = () => {
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
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Header onLogout={handleLogout} />;
};

export default Authentication;
