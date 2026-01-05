import React from "react";
import PropTypes from "prop-types";

/**
 * Generic Content Renderer
 * Renders content from any Google Sheet in a consistent, reusable format
 * Supports multiple layout types: default, image, folder, table
 * Supports text, HTML, images, and embedded YouTube videos
 */
const GenericContentRenderer = ({ content, layoutType = 'default', headers = [] }) => {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No content available. Please add data to the corresponding Google Sheet.
      </div>
    );
  }

  // Render based on layout type
  if (layoutType === 'table') {
    return <TableLayout content={content} headers={headers} />;
  }
  
  if (layoutType === 'image') {
    return <ImageLayout content={content} />;
  }
  
  if (layoutType === 'folder') {
    return <FolderLayout content={content} />;
  }
  
  // Default layout
  return <DefaultLayout content={content} />;
};

/**
 * Default Layout Component
 */
const DefaultLayout = ({ content }) => {

  // Sort content by createdAt
  const sortedContent = [...content].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateA - dateB;
  });

  return (
    <div className="space-y-8">
      {sortedContent.map((section) => {
        // Extract video content from description
        let description = section.description || "";
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

        const images = section.images || [];
        const hasImages = images.length > 0;
        const hasVideo = !!videoContent;

        return (
          <section
            key={section.id}
            className="bg-white p-6 md:p-8 rounded-lg shadow-sm border-l-4 border-primary-500 hover:shadow-md transition-shadow"
          >
            {/* Title */}
            {section.title && (
              <h2 className="text-2xl font-semibold text-primary-500 mb-4">
                {section.title}
              </h2>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Description (HTML Content) */}
              <div
                className="flex-1 text-gray-600 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html:
                    description ||
                    '<span class="text-gray-400 italic">No description available.</span>',
                }}
              />

              {/* Right Side: Video & Images */}
              {(hasImages || hasVideo) && (
                <div className="lg:w-1/4 flex-shrink-0 flex flex-col gap-6">
                  {/* Video */}
                  {hasVideo && (
                    <div
                      className="w-full rounded-lg overflow-hidden shadow-md [&_iframe]:w-full [&_iframe]:aspect-video"
                      dangerouslySetInnerHTML={{ __html: videoContent }}
                    />
                  )}

                  {/* Images */}
                  {hasImages && (
                    <div className="flex flex-col gap-4">
                      {images.map((image, idx) => (
                        <div
                          key={image.id || idx}
                          className="w-full rounded-lg overflow-hidden shadow-md"
                        >
                          <img
                            src={image.url}
                            alt={image.alternativeText || section.title || "Image"}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23e5e7eb' width='300' height='200'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' dy='50%25' dx='50%25' text-anchor='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                            }}
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

/**
 * Image Layout - Images/videos on right side (like About page)
 */
const ImageLayout = ({ content }) => {
  const sortedContent = [...content].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateA - dateB;
  });

  return (
    <div className="space-y-8">
      {sortedContent.map((section) => {
        // Extract video content from description
        let description = section.description || "";
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

        const hasImage = !!section.imageUrl;
        const hasVideo = !!videoContent;

        return (
          <section
            key={section.id}
            className="bg-white p-6 md:p-8 rounded-lg shadow-sm border-l-4 border-primary-500 hover:shadow-md transition-shadow"
          >
            {/* Title */}
            {section.title && (
              <h2 className="text-2xl font-semibold text-primary-500 mb-4">
                {section.title}
              </h2>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Description (HTML Content) */}
              <div
                className="flex-1 text-gray-600 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html:
                    description ||
                    '<span class="text-gray-400 italic">No description available.</span>',
                }}
              />

              {/* Right Side: Video & Image */}
              {(hasImage || hasVideo) && (
                <div className="lg:w-1/4 flex-shrink-0 flex flex-col gap-6">
                  {/* Video */}
                  {hasVideo && (
                    <div
                      className="w-full rounded-lg overflow-hidden shadow-md [&_iframe]:w-full [&_iframe]:aspect-video"
                      dangerouslySetInnerHTML={{ __html: videoContent }}
                    />
                  )}

                  {/* Image */}
                  {hasImage && (
                    <div className="w-full rounded-lg overflow-hidden shadow-md">
                      <img
                        src={section.imageUrl}
                        alt={section.alternativeText || section.title || "Image"}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23e5e7eb' width='300' height='200'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' dy='50%25' dx='50%25' text-anchor='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                        }}
                      />
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

/**
 * Folder Layout - Gallery of multiple images
 */
const FolderLayout = ({ content }) => {
  const sortedContent = [...content].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateA - dateB;
  });

  return (
    <div className="space-y-12">
      {sortedContent.map((section) => (
        <section key={section.id} className="bg-white p-6 rounded-lg shadow-md">
          {section.title && (
            <h2 className="text-2xl font-bold text-primary-600 mb-4">
              {section.title}
            </h2>
          )}
          {section.description && (
            <div
              className="text-gray-600 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          )}
          {section.images && section.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {section.images.map((image, idx) => (
                <div
                  key={image.id || idx}
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={image.url}
                    alt={image.alternativeText || `Image ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23e5e7eb' width='300' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' dy='50%25' dx='50%25' text-anchor='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">{image.alternativeText}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

/**
 * Table Layout - Tabular data display
 */
const TableLayout = ({ content, headers }) => {
  if (content.length === 0) return null;

  // Get dynamic column headers from first row
  const firstRow = content[0];
  const columns = Object.keys(firstRow)
    .filter(key => key !== 'id' && key !== '_headers')
    .map(key => ({
      key,
      header: firstRow._headers?.[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-500">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {content.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    <div dangerouslySetInnerHTML={{ __html: row[col.key] || '-' }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

GenericContentRenderer.propTypes = {
  content: PropTypes.array.isRequired,
  layoutType: PropTypes.oneOf(['default', 'image', 'folder', 'table']),
  headers: PropTypes.array,
};

export default GenericContentRenderer;
