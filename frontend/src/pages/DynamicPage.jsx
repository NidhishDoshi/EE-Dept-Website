import React from "react";
import { useParams } from "react-router-dom";
import { useDynamicPageContent } from "../hooks/useDynamicPages";
import GenericContentRenderer from "../components/GenericContentRenderer";

/**
 * DynamicPage Component
 * Renders any dynamic page created from a Google Sheet tab
 * Route: /pages/:slug
 */
const DynamicPage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useDynamicPageContent(slug);

  // Loading state
  if (isLoading) {
    return (
      <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          {/* Page title skeleton */}
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
          
          {/* Content sections skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-red-500 p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Error Loading Page</h2>
          <p>{error?.message || "Failed to load page content"}</p>
          <p className="text-sm mt-2">Please try refreshing the page or check if the page exists.</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center py-10 text-gray-500">
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p>The requested page could not be found.</p>
        </div>
      </div>
    );
  }

  // Format page title from sheet name, removing layout suffixes
  const cleanSheetName = (data.sheetName || slug)
    .replace(/_image$/i, '')
    .replace(/_folder$/i, '')
    .replace(/_table$/i, '');
  
  const pageTitle = cleanSheetName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
          {pageTitle}
        </h1>
        <div className="h-1 w-20 bg-primary-500 rounded"></div>
      </div>

      {/* Render Content */}
      <GenericContentRenderer 
        content={data.content} 
        layoutType={data.layoutType}
        headers={data.headers}
      />

      {/* Metadata Footer */}
      {data.lastUpdated && (
        <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500 text-right">
          Last updated: {new Date(data.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}
    </div>
  );
};

export default DynamicPage;
