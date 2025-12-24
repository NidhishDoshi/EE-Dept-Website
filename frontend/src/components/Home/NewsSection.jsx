import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useNews } from "../../hooks/useNews";
import { Link } from "react-router-dom"; // ← make sure this is imported

const NewsCard = ({ title, date, description, link }) => (
  <div className="w-full bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left border-l-4 border-secondary-500 hover:border-primary-500 hover:-translate-y-1">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-secondary-500 font-medium mt-1">{date}</p>
    <div
      className="text-gray-600 text-sm mt-2 flex-grow whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: description }}
    />
    {link && (
      <div className="mt-3 text-xs text-gray-600">
        For more details,{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:text-orange-600 font-medium underline decoration-orange-500/30 hover:decoration-orange-600"
        >
          click here
        </a>
      </div>
    )}
  </div>
);

const NewsLoading = () => (
  <div className="animate-pulse space-y-4">
    {["skeleton-1", "skeleton-2", "skeleton-3"].map((i) => (
      <div key={i} className="bg-gray-200 rounded-lg p-4 h-32"></div>
    ))}
  </div>
);

export default function NewsSection() {
  const { data: news, isLoading: newsLoading, error: newsError } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);

  const shouldAnimate = news && news.length > 3;
  // Create buffer: [...news, ...first 3 items]
  const extendedNews = shouldAnimate
    ? [...news, ...news.slice(0, 3)]
    : news || [];

  useEffect(() => {
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate) return;

    // If we reached the end of the original list (start of buffer)
    if (currentIndex === news.length) {
      // Wait for the transition to finish (e.g., 500ms)
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false); // Disable transition for instant snap
        setCurrentIndex(0); // Snap back to 0
      }, 500); // Match CSS duration
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, news?.length, shouldAnimate]);

  return (
    <div>
      {/* Header with button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">News</h2>
        <Link
          to="/allnews"
          className="text-sm bg-primary-500 text-white px-5 py-2.5 rounded-lg hover:bg-primary-600 transition-all font-medium shadow-md hover:shadow-lg"
        >
          View All News
        </Link>
      </div>

      {/* News Content */}
      <div className="min-h-[400px]">
        {newsLoading ? (
          <NewsLoading />
        ) : newsError ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">
            <p>Error loading news: {newsError?.message}</p>
            <p className="text-sm mt-2">Please try refreshing the page.</p>
          </div>
        ) : extendedNews.length > 0 ? (
          <div className="flex flex-col">
            {extendedNews.map((item, index) => {
              // Only render items up to the visible window
              if (index > currentIndex + 2) return null;

              const isCollapsed = index < currentIndex;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className={`grid transition-all ease-in-out ${
                    isTransitioning ? "duration-500" : "duration-0"
                  }`}
                  style={{
                    gridTemplateRows: isCollapsed ? "0fr" : "1fr",
                    opacity: isCollapsed ? 0 : 1,
                    marginBottom: isCollapsed ? 0 : "1rem",
                  }}
                >
                  <div className="overflow-hidden">
                    <NewsCard {...item} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No news available at the moment.</p>
        )}
      </div>
    </div>
  );
}
