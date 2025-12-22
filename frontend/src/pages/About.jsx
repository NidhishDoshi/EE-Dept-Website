import React from "react";
import useAboutData from "../hooks/useAboutData";

const AboutData = () => {
  const { data: aboutData, isLoading, isError, error } = useAboutData();

  if (isLoading) {
    return (
      <div className="py-6 px-4 md:px-8">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-6 px-4 md:px-8">
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          <p>Error loading content: {error?.message}</p>
          <p className="text-sm mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (!aboutData || aboutData.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No content found. Please add an entry in Strapi.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {aboutData.map((section) => {
        // 1. Safely access attributes
        const attrs = section.attributes || section;

        return (
          <section
            key={section.id}
            className="bg-white p-6 md:p-8 rounded-lg shadow-sm border-l-4 border-primary-500 hover:shadow-md transition-shadow"
          >
            {/* 2. Title */}
            <h2 className="text-2xl font-semibold text-primary-500 mb-4">
              {attrs.Title}
            </h2>

            {/* 3. Description (Simple Text) */}
            {/* 'whitespace-pre-line' ensures line breaks from Strapi are preserved */}
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
              {attrs.Description || (
                <span className="text-gray-400 italic">
                  No description available.
                </span>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        <p className="mt-2 text-sm text-gray-500">
          Learn more about our department and mission.
        </p>
      </div>
      <AboutData />
    </div>
  );
};

export default About;
