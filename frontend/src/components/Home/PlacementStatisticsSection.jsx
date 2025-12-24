import React from "react";
import { usePlacementStatistics } from "../../hooks/usePlacementStatistics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const placementItems = [
  { key: "totalStudentsPlaced", label: "Total Students Placed" },
  { key: "totalOffers", label: "Total Offers" },
  { key: "highestCTC", label: "Highest CTC" },
  { key: "averageCTC", label: "Average CTC" },
  { key: "medianCTC", label: "Median CTC" },
  { key: "placementPercentage", label: "Placement %" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PlacementCard = ({ label, value, isHighlight }) => (
  <div
    className={`
      bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center h-full text-center
      hover:shadow-md transition-all duration-300 group
      ${isHighlight ? "border-l-4 border-l-secondary-500" : ""}
    `}
  >
    {/* Use gray-800 for placement numbers to differentiate slightly, or keep primary-600 */}
    <div className="text-3xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
      {value ?? "-"}
    </div>
    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </div>
  </div>
);

export default function PlacementStatisticsSection() {
  const { data: placement, isLoading, error } = usePlacementStatistics();

  if (isLoading)
    return <div className="text-center py-8 text-gray-400">Loading...</div>;

  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading placement statistics.
      </div>
    );

  const safePlacement = placement || {};

  // Helper to parse numeric values from strings (e.g., "45 LPA" -> 45)
  const parseValue = (val) => {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const ctcData = [
    { name: "Highest", value: parseValue(safePlacement.highestCTC) },
    { name: "Average", value: parseValue(safePlacement.averageCTC) },
    { name: "Median", value: parseValue(safePlacement.medianCTC) },
  ];

  const placementRate = parseValue(safePlacement.placementPercentage);
  const placementPieData = [
    { name: "Placed", value: placementRate },
    { name: "Remaining", value: 100 - placementRate },
  ];

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl font-bold text-gray-900 mb-8 pb-2 inline-block"
          style={{ borderBottom: "2px solid rgba(255, 99, 14, 0.5)" }}
        >
          Placement Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {placementItems.map(({ key, label }) => {
            // Automatically highlight cards related to Money/CTC
            const isHighlight = key.toLowerCase().includes("ctc");

            return (
              <PlacementCard
                key={key}
                label={label}
                value={safePlacement[key]}
                isHighlight={isHighlight}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CTC Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              CTC Analysis (LPA)
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ctcData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} LPA`} />
                  <Legend />
                  <Bar dataKey="value" fill="#0ea5e9" name="CTC (LPA)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Placement Percentage Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Placement Success Rate
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={placementPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      name === "Placed"
                        ? `${(percent * 100).toFixed(0)}%`
                        : ""
                    }
                  >
                    <Cell fill="#22c55e" /> {/* Green for Placed */}
                    <Cell fill="#e5e7eb" /> {/* Gray for Remaining */}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
