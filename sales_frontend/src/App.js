import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./pages/Navigation";
import MainContent from "./pages/MainContent";
import Authentication from "./pages/Authentication";

const App = () => {
  return (
    <Router>
      <Authentication />
      <Navigation />
      <MainContent />
    </Router>
  );
};

export default App;
