import React, { useState } from "react";

const OrdersTable = ({ details }) => {
  // console.log("details", details);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    order_id: "",
    date: "",
    state: "",
    city: "",
  });
  const recordsPerPage = 20;

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = details.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(details.length / recordsPerPage);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredRecords = currentRecords.filter(
    (order) =>
      (!filters.order_id || order.order_id.includes(filters.order_id)) &&
      (!filters.date || order.order_date.includes(filters.date)) &&
      (!filters.state || order.state.includes(filters.state)) &&
      (!filters.city || order.city.includes(filters.city))
  );

  return (
    <div className="p-2 sm:p-4 bg-blue-100 rounded-lg shadow-lg">
      <div>
        <div className="flex justify-between mb-4">
          <div>
            <input
              type="text"
              placeholder="Order ID"
              className="border border-transparent px-4 py-2 rounded text-black"
              value={filters.order_id}
              onChange={(e) => handleFilterChange("order_id", e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Date"
              className="border border-transparent px-4 py-2 rounded text-black"
              value={filters.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="State"
              className="border border-transparent px-4 py-2 rounded text-black"
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="City"
              className="border border-transparent px-4 py-2 rounded text-black"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            />
          </div>
        </div>

        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-light-blue-100">
            <tr>
              <th className="px-4 py-2 font-bold">Order ID</th>
              <th className="px-4 py-2 font-bold">Date</th>
              <th className="px-4 py-2 font-bold">Customer Name</th>
              <th className="px-4 py-2 font-bold">State</th>
              <th className="px-4 py-2 font-bold">City</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((order, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{order.order_id}</td>
                <td className="px-4 py-2">{order.order_date}</td>
                <td className="px-4 py-2">{order.customer_name}</td>
                <td className="px-4 py-2">{order.state}</td>
                <td className="px-4 py-2">{order.city}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2">
            <button
              className="bg-light-blue-200 text-black px-4 py-2 rounded-l-lg disabled:bg-blue-100"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span className="text-black font-bold">{currentPage}</span>
            <button
              className="bg-light-blue-200 text-black px-4 py-2 rounded-r-lg disabled:bg-blue-100"
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
    </div>
  );
};

export default OrdersTable;
