import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const SalesChart = ({ data }) => (
  <Bar
    data={{
      labels: data.map((item) => item.month),
      datasets: [
        {
          label: "Sales Target",
          data: data.map((item) => item.target),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    }}
    options={{
      responsive: true,
      maintainAspectRatio: false,
    }}
  />
);

export default SalesChart;
