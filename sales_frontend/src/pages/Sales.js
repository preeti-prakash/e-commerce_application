import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesChart from "../components/SalesTargets/SalesChart";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/sales/")
      .then((response) => setSalesData(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Sales Chart</h1>
      {salesData.length > 0 ? (
        <SalesChart data={salesData} />
      ) : (
        <p>Loading sales data...</p>
      )}
    </div>
  );
};

export default Sales;
