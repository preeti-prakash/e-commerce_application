import React, { useState, useEffect } from "react";
import OrdersTable from "../components/Orders/OrdersTables";
import axios from "axios";

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching order details:", error));
  }, []);

  console.log(orders);

  // Ensure orders are wrapped in an array if there's only one order
  const ordersArray = Array.isArray(orders) ? orders : [orders];

  return (
    <div className="p-8">
      {/* <h1 className="text-xl font-bold">Order Details</h1> */}
      <OrdersTable details={ordersArray} />
    </div>
  );
};

export default OrderDetailsPage;
