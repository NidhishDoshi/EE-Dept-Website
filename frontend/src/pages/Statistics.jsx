import { useState, useEffect } from "react";
import { useStatisticsData } from "../hooks/useStatisticsData";
import Loading from "../components/Loading";

// Default fallback data
const defaultStats = {
  yearsOfService: 0,
  facultyMembers: 0,
  students: 0,
  courses: 0,
  researchLabs: 0,
  publications: 0,
  placementYear: new Date().getFullYear(),
  totalStudentsPlaced: 0,
  totalOffers: 0,
  highestCTC: "N/A",
  averageCTC: "N/A",
  medianCTC: "N/A",
  placementPercentage: "0%",
  topRecruiters: [],
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// Stat Card Component
const StatCard = ({ icon, value, label, suffix = "+", bgColor }) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-4xl font-bold mb-2">
        <AnimatedCounter end={parseInt(value)} suffix={suffix} />
      </div>
      <div className="text-lg font-medium opacity-90">{label}</div>
    </div>
  );
};

// Placement Stat Card
const PlacementStatCard = ({ value, label, icon }) => (
  <div
    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center"
    style={{ borderBottom: "4px solid #ff630e" }}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-3xl font-bold mb-1" style={{ color: "#550886" }}>
      {value}
    </div>
    <div className="text-gray-600 font-medium">{label}</div>
  </div>
);

// Circular Progress Component
const CircularProgress = ({ percentage, label, size = 150 }) => {
  const numericPercentage = parseFloat(percentage);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset =
    circumference - (numericPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke="#550886"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: "#550886" }}>
            {percentage}
          </span>
        </div>
      </div>
      <p className="mt-2 text-gray-700 font-semibold">{label}</p>
    </div>
  );
};

const Statistics = () => {
  const {
    data: statisticsData,
    isLoading,
    isError,
    error,
  } = useStatisticsData();

  // Merge fetched data with defaults
  const stats = { ...defaultStats, ...statisticsData };

  // Parse topRecruiters if it's a string (JSON)
  const topRecruiters = Array.isArray(stats.topRecruiters)
    ? stats.topRecruiters
    : typeof stats.topRecruiters === "string"
    ? JSON.parse(stats.topRecruiters)
    : [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Statistics
          </h2>
          <p className="text-red-600">
            {error?.message ||
              "Failed to load department statistics. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3" style={{ color: "#550886" }}>
          Department Statistics
        </h1>
        <p className="text-gray-600 text-lg">
          Key metrics and achievements of the Department of Electrical,
          Electronics and Communication Engineering at IIT Dharwad.
        </p>
      </div>

      {/* Department Overview Stats */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold text-gray-800 mb-6 pb-2"
          style={{ borderBottom: "2px solid rgba(255, 99, 14, 0.5)" }}
        >
          Department Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="🎓"
            value={stats.yearsOfService}
            label="Years of Excellence"
            bgColor="#550886"
          />
          <StatCard
            icon="👨‍🏫"
            value={stats.facultyMembers}
            label="Faculty Members"
            bgColor="#ff630e"
          />
          <StatCard
            icon="👨‍🎓"
            value={stats.students}
            label="Students"
            bgColor="#550886"
          />
          <StatCard
            icon="📚"
            value={stats.courses}
            label="Courses Offered"
            bgColor="#ff630e"
          />
        </div>
      </section>

      {/* Additional Stats */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            className="rounded-xl p-8 text-white shadow-lg"
            style={{
              background: "linear-gradient(to right, #550886, #3d0562)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">🔬</div>
              <div>
                <div className="text-4xl font-bold">{stats.researchLabs}+</div>
                <div className="text-lg opacity-90">Research Laboratories</div>
              </div>
            </div>
          </div>
          <div
            className="rounded-xl p-8 text-white shadow-lg"
            style={{
              background: "linear-gradient(to right, #ff630e, #e55a0c)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">📄</div>
              <div>
                <div className="text-4xl font-bold">{stats.publications}+</div>
                <div className="text-lg opacity-90">Research Publications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Statistics */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold text-gray-800 mb-6 pb-2"
          style={{ borderBottom: "2px solid rgba(255, 99, 14, 0.5)" }}
        >
          Placement Statistics
        </h2>

        {/* Main Placement Stats */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(85, 8, 134, 0.1) 0%, rgba(255, 99, 14, 0.1) 100%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Placement Percentage Circle */}
            <div className="flex flex-col items-center justify-center relative">
              <CircularProgress
                percentage={stats.placementPercentage}
                label="Placement Rate"
              />
            </div>

            {/* Total Offers */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-lg"
                style={{ backgroundColor: "#ff630e" }}
              >
                <span className="text-3xl font-bold">{stats.totalOffers}</span>
                <span className="text-sm">OFFERS</span>
              </div>
              <p className="mt-3 text-gray-700 font-semibold">Total Offers</p>
            </div>

            {/* Students Placed */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-lg"
                style={{ backgroundColor: "#550886" }}
              >
                <span className="text-3xl font-bold">
                  {stats.totalStudentsPlaced}
                </span>
                <span className="text-sm">PLACED</span>
              </div>
              <p className="mt-3 text-gray-700 font-semibold">
                Students Placed
              </p>
            </div>
          </div>

          {/* CTC Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <PlacementStatCard
              icon="🏆"
              value={stats.highestCTC}
              label="Highest CTC"
            />
            <PlacementStatCard
              icon="📊"
              value={stats.averageCTC}
              label="Average CTC"
            />
            <PlacementStatCard
              icon="📈"
              value={stats.medianCTC}
              label="Median CTC"
            />
          </div>
        </div>

        {/* Top Recruiters */}
        {topRecruiters.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🏢 Top Recruiters
            </h3>
            <div className="flex flex-wrap gap-3">
              {topRecruiters.map((company, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full font-medium transition-colors cursor-default"
                  style={{
                    backgroundColor: "rgba(85, 8, 134, 0.15)",
                    color: "#550886",
                  }}
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section
        className="rounded-2xl p-8 text-white text-center"
        style={{ background: "linear-gradient(to right, #550886, #3d0562)" }}
      >
        <h2 className="text-2xl font-bold mb-4">
          Interested in Joining Our Department?
        </h2>
        <p className="mb-6 text-white/90 max-w-2xl mx-auto">
          Be a part of our growing community of scholars, researchers, and
          innovators. Explore our academic programs and career opportunities.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/academics"
            className="bg-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
            style={{ color: "#550886" }}
          >
            View Academics
          </a>
          <a
            href="/join-as-faculty"
            className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors shadow-md"
            style={{ backgroundColor: "#ff630e" }}
          >
            Join as Faculty
          </a>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
