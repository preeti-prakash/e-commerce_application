import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";
import Sales from "./Sales";

const MainContent = () => {
  return (
    <div className="p-6 mt-4 bg-white shadow-lg rounded-lg">
      <Routes>
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/details" element={<OrderDetails />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/" element={<Navigate to="/orders" />} />
      </Routes>
    </div>
  );
};

export default MainContent;
