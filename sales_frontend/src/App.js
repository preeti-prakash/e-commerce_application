import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OrdersList from "./pages/OrdersList";
import OrderDetails from "./pages/OrderDetails";
import Sales from "./pages/Sales";

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Header Section */}
        <div className="p-6 bg-[#f0f2f5] text-black text-center">
          <h1 className="text-2xl font-bold">Order Management System</h1>
        </div>

        {/* Navigation Section */}
        <div className="flex justify-around p-4">
          <Link
            to="/orders"
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold p-6 rounded-lg shadow-md cursor-pointer w-1/6 h-40 flex items-center justify-center"
          >
            List of Orders
          </Link>
          <Link
            to="/details"
            className="bg-green-100 hover:bg-green-200 text-green-800 font-bold p-6 rounded-lg shadow-md cursor-pointer w-1/6 h-40 flex items-center justify-center"
          >
            Order Details
          </Link>
          <Link
            to="/sales"
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-bold p-6 rounded-lg shadow-md cursor-pointer w-1/6 h-40 flex items-center justify-center"
          >
            Sales Targets
          </Link>
        </div>

        {/* Main Content Section */}
        <div className="p-6 mt-4 bg-white shadow-lg rounded-lg">
          <Routes>
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/details" element={<OrderDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route
              path="/"
              element={
                <div className="text-center text-gray-500">
                  Welcome to Order Management
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
