import React, { useState, useEffect } from "react";
import OrderDetailsTable from "../components/OrderDetails/OrderDetailsTable";
import axios from "axios";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/details")
      .then((response) => {
        // Assuming response.data.data contains the array of order details
        setOrderDetails(response.data.data);
      })
      .catch((error) => console.error("Error fetching order details:", error));
  }, []);

  return (
    <div className="p-8">
      <OrderDetailsTable orderDetails={orderDetails} />
    </div>
  );
};

export default OrderDetails;
