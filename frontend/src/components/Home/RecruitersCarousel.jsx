import React from "react";
import { useRecruiters } from "../../hooks/useRecruiters";

const STRAPI_BASE_URL = "http://localhost:1337";

export default function RecruitersCarousel() {
  const { data: recruiters, isLoading, error } = useRecruiters();

  if (isLoading)
    return <div className="text-center py-8 text-gray-400">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading recruiters.
      </div>
    );
  if (!Array.isArray(recruiters) || recruiters.length === 0) return null;

  // --- AUTO-SCROLL ANIMATION ---
  const marqueeStyle = {
    display: "flex",
    width: "max-content",
    // Slow speed (60s)
    animation: "scroll 60s linear infinite",
  };

  const keyframes = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  // Duplication ensures continuous flow
  const seamlessList = [...recruiters, ...recruiters];

  return (
    <section className="bg-white py-8 border-t border-gray-100 overflow-hidden">
      <style>{keyframes}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2
          className="text-2xl font-bold text-gray-900 pb-2 inline-block"
          style={{ borderBottom: "2px solid rgba(255, 99, 14, 0.5)" }}
        >
          Our Recruiters
        </h2>
      </div>

      {/* Container constrained to 80% width (10% space on each side) */}
      <div className="w-[80%] mx-auto overflow-hidden relative border-r border-gray-100">
        {/* --- REMOVED LEFT GRADIENT DIV FROM HERE --- */}

        {/* Right Fade Gradient (Kept as requested) */}
        <div className="absolute top-0 right-0 z-10 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

        {/* Reduced gap to gap-6 */}
        <div className="flex items-center gap-6" style={marqueeStyle}>
          {seamlessList.map((rec, index) => {
            const attributes = rec.attributes || rec;
            const logoData =
              attributes.logo?.data?.attributes || attributes.logo;
            let logoUrl = logoData?.url;

            if (!logoUrl) return null;

            if (logoUrl.startsWith("/")) {
              logoUrl = `${STRAPI_BASE_URL}${logoUrl}`;
            }

            return (
              <div
                key={`${rec.id}-${index}`}
                className="flex-shrink-0 w-40 h-24 bg-white flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={logoUrl}
                  alt={attributes.name || "Recruiter Logo"}
                  className="max-h-20 max-w-full object-contain p-2"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
