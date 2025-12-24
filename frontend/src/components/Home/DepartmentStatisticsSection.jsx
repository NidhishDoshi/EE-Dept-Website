import React from "react";
import { useDepartmentStatistics } from "../../hooks/useDepartmentStatistics";
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

const statItems = [
  { key: "yearsOfService", label: "Years of Excellence" },
  { key: "facultyMembers", label: "Faculty Members" },
  { key: "students", label: "Students" },
  { key: "courses", label: "Courses Offered" },
  { key: "researchLabs", label: "Research Laboratories" },
  { key: "publications", label: "Research Publications" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const StatCard = ({ label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300 group h-full flex flex-col justify-center">
    <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
      {value != null ? `${value}+` : "-"}
    </div>
    <div className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-1">
      {label}
    </div>
  </div>
);

export default function DepartmentStatisticsSection() {
  const { data: stats, isLoading, error } = useDepartmentStatistics();

  if (isLoading)
    return <div className="text-center py-8 text-gray-400">Loading...</div>;

  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading department statistics: {error.message}
      </div>
    );

  // If data is missing but no error, ensure we handle it gracefully
  const safeStats = stats || {};
  if (!stats && !isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        No department statistics available.
      </div>
    );
  }

  const barChartData = [
    { name: "Faculty", value: safeStats.facultyMembers || 0 },
    { name: "Courses", value: safeStats.courses || 0 },
    { name: "Labs", value: safeStats.researchLabs || 0 },
    { name: "Publications", value: safeStats.publications || 0 },
  ];

  const pieChartData = [
    { name: "Faculty", value: safeStats.facultyMembers || 0 },
    { name: "Students", value: safeStats.students || 0 },
  ];

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl font-bold text-gray-900 mb-8 pb-2 inline-block"
          style={{ borderBottom: "2px solid rgba(255, 99, 14, 0.5)" }}
        >
          Department Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {statItems.map(({ key, label }) => (
            <StatCard key={key} label={label} value={safeStats[key]} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Department Overview
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#f97316" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Faculty vs Students Ratio
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
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
