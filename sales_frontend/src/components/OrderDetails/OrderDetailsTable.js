import React from "react";

const OrderDetailsTable = ({ orders }) => (
  <table className="table-auto w-full">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Amount</th>
        <th>Profit</th>
        <th>Quantity</th>
        <th>Category</th>
        <th>Sub-Category</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr
          key={order.id}
          className={order.profit > 0 ? "bg-green-100" : "bg-red-100"}
        >
          <td>{order.order_id}</td>
          <td>{order.amount}</td>
          <td>{order.profit}</td>
          <td>{order.quantity}</td>
          <td>{order.category}</td>
          <td>{order.sub_category}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default OrderDetailsTable;
