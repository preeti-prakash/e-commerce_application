import React from "react";

const Header = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center p-6 bg-[#f0f2f5] text-black">
      <h1 className="text-2xl font-bold">Order Management System</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
