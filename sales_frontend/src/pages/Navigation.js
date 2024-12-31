import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
