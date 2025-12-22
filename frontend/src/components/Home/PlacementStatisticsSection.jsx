import React from "react";
import { usePlacementStatistics } from "../../hooks/usePlacementStatistics";

const placementItems = [
  { key: "totalStudentsPlaced", label: "Total Students Placed" },
  { key: "totalOffers", label: "Total Offers" },
  { key: "highestCTC", label: "Highest CTC" },
  { key: "averageCTC", label: "Average CTC" },
  { key: "medianCTC", label: "Median CTC" },
  { key: "placementPercentage", label: "Placement %" },
];

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

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl font-bold text-gray-900 mb-8 pb-2 inline-block"
          style={{ borderBottom: "2px solid rgba(255, 99, 14, 0.5)" }}
        >
          Placement Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}
