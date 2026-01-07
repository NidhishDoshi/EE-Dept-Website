import React from "react";
import useAboutDataFromSheets from "../hooks/useAboutDataFromSheets";

const AboutPageData = () => {
  const { data: aboutData, isLoading, isError, error } = useAboutDataFromSheets();

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
        No content found. Please add data to Google Sheets.
      </div>
    );
  }

  // Sort data by createdAt
  const sortedData = [...aboutData].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateA - dateB;
  });

  return (
    <div className="space-y-8">
      {sortedData.map((section) => {
        // Extract video content from description
        let description = section.Description || "";
        let videoContent = null;
        const videoRegex = /<youtube-video>(.*?)<\/youtube-video>/s;
        const match = description.match(videoRegex);

        if (match) {
          videoContent = match[1];
          // Fix YouTube URLs to use embed format
          videoContent = videoContent.replace(
            /src=["'](?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^"&?\/]+)(?:[&?][^"']*)?["']/g,
            'src="https://www.youtube.com/embed/$1"'
          );
          description = description.replace(videoRegex, "");
        }

        const images = section.Image || [];
        const hasImages = images.length > 0;
        const hasVideo = !!videoContent;

        return (
          <section
            key={section.id}
            className="bg-white p-6 md:p-8 rounded-lg shadow-sm border-l-4 border-primary-500 hover:shadow-md transition-shadow"
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold text-primary-500 mb-4">
              {section.Title}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
              {/* Description (HTML Content) */}
              <div
                className="flex-1 sm:w-3/4 text-gray-600 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html:
                    description ||
                    '<span class="text-gray-400 italic">No description available.</span>',
                }}
              />

              {/* Right Side: Video & Images */}
              {(hasImages || hasVideo) && (
                <div className="w-full sm:w-1/4 flex-shrink-0 flex flex-col gap-3">
                  {/* Video */}
                  {hasVideo && (
                    <div
                      className="w-full rounded-lg overflow-hidden shadow-md [&_iframe]:w-full [&_iframe]:aspect-video"
                      dangerouslySetInnerHTML={{ __html: videoContent }}
                    />
                  )}

                  {/* Images */}
                  {hasImages && (
                    <div className="flex flex-col gap-3">
                      {images.map((img) => (
                        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
                          <img
                            key={img.id}
                            src={img.url}
                            alt={img.alternativeText || section.Title}
                            className="w-full h-full object-contain bg-gray-100"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">About EECE, IIT Dharwad</h1>
        <p className="mt-2 text-sm text-gray-500">
          Learn more about our department and mission (powered by Google Sheets).
        </p>
      </div>
      <AboutPageData />
    </div>
  );
};

export default AboutPage;
