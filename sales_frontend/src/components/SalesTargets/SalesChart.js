import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const SalesChart = ({ data }) => {
  // Filter unique categories
  const categories = Array.from(new Set(data.map((item) => item.category)));

  // Group data by category
  const groupedData = categories.map((category) => ({
    category,
    target: data
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.target, 0),
  }));

  // Find the category with the highest sales target
  const highestCategory = groupedData.reduce((prev, current) =>
    prev.target > current.target ? prev : current
  );

  return (
    <div>
      <p className="text-center text-sm mb-2">
        Highest Sales Category: {highestCategory.category} with{" "}
        {highestCategory.target}
      </p>
      <Bar
        data={{
          labels: groupedData.map((item) => item.category),
          datasets: [
            {
              label: "Sales Target",
              data: groupedData.map((item) => item.target),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              ticks: { fontSize: 8 },
              grid: { display: true },
            },
            y: {
              ticks: { fontSize: 8 },
              grid: { display: true },
            },
          },
          width: 200, // Reduced size
          height: 100, // Reduced size
        }}
      />
    </div>
  );
};

export default SalesChart;
