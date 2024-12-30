import React, { useState, useEffect } from "react";

const OrderDetailsTable = ({ orderDetails = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    order_id: "",
    category: "",
    sub_category: "",
  });
  const recordsPerPage = 20;

  // Filter logic
  const applyFilters = (records) =>
    records.filter((order) =>
      ["order_id", "category", "sub_category"].every((key) =>
        filters[key]
          ? order[key]
              ?.toString()
              .toLowerCase()
              .includes(filters[key].trim().toLowerCase())
          : true
      )
    );

  const filteredRecords = applyFilters(orderDetails);

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filteredRecords.length, totalPages]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg shadow-lg">
      <div className="flex justify-between gap-2 mb-4">
        <input
          type="text"
          placeholder="Order ID"
          className="border px-4 py-2 rounded text-black"
          value={filters.order_id}
          onChange={(e) => handleFilterChange("order_id", e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="border px-4 py-2 rounded text-black"
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        />
        <input
          type="text"
          placeholder="Sub-Category"
          className="border px-4 py-2 rounded text-black"
          value={filters.sub_category}
          onChange={(e) => handleFilterChange("sub_category", e.target.value)}
        />
      </div>

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-green-200">
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Profit</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Sub-Category</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((order, index) => (
              <tr
                key={index}
                className={`border-t border-gray-300 ${
                  order.profit > 0 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <td className="px-4 py-2">{order.order_id}</td>
                <td className="px-4 py-2">{order.amount}</td>
                <td className="px-4 py-2">{order.profit}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">{order.category}</td>
                <td className="px-4 py-2">{order.sub_category}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            className="bg-light-blue-200 text-black px-4 py-2 rounded-l-lg disabled:bg-green-100"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="text-black font-bold">{currentPage}</span>
          <button
            className="bg-light-blue-200 text-black px-4 py-2 rounded-r-lg disabled:bg-green-100"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTable;
