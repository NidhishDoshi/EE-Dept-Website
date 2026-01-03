import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useDebounce } from "../../hooks/useDebounce.js";
// import useSearchResult from "../../hooks/useSearchResult.js";
import useClientSideSearch from "../../hooks/useClientSideSearch.js";
// Configure where each search category should navigate.
// Set useSlug=true only if a real detail route exists; otherwise go to the list page.
export const searchRouteMap = {
  navigation: { basePath: "/", useSlug: false, getPath: (item) => item.link || "/" },
  peoples: { 
    basePath: "/people", 
    useSlug: false, 
    getPath: (item) => {
      const name = item?.attributes?.Name || item?.Name || item?.name || item?.title || "";
      return name ? `/people?search=${encodeURIComponent(name)}` : "/people";
    }
  },
  news: { basePath: "/allnews", useSlug: false },
  events: { basePath: "/allTalksEvents", useSlug: false },
  research: { basePath: "/research/labs", useSlug: false },
  projects: { basePath: "/research/projects", useSlug: false },
  "about-pages": { basePath: "/about", useSlug: false },
  admission: { basePath: "/admissions", useSlug: false },
  admissions: { basePath: "/admissions", useSlug: false },
  contact: { basePath: "/contact", useSlug: false },
  "join-as-faculty": { basePath: "/join-as-faculty", useSlug: false },
};

// Build the safest available target URL for a search hit.
export function buildResultPath(category, item) {
  const config = searchRouteMap[category];

  if (config?.getPath) {
    return config.getPath(item);
  }

  if (config) {
    if (config.useSlug) {
      const slug = item?.slug || item?.Slug || item?.documentId || item?.id;
      return slug ? `${config.basePath}/${slug}` : config.basePath;
    }
    return config.basePath;
  }

  // Fallback: best effort using category and slug
  const slug = item?.slug || item?.Slug || item?.documentId || item?.id;
  return slug ? `/${category}/${slug}` : `/${category}`;
}

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 250); // Faster response time
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useClientSideSearch(
    debouncedQuery.trim()
  );

  // Calculate total results for display
  const totalResults = searchResults 
    ? Object.values(searchResults).reduce((sum, items) => sum + (items?.length || 0), 0)
    : 0;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      handleCloseSearch();
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && searchResults) {
      setShowResults(true);
    }
  };

  const handleCloseSearch = () => {
    // Optional: Only clear if you want the input to empty on navigation
    setShowResults(false);
  };

  const handleResultClick = (fullPath) => {
    navigate(fullPath);
    handleCloseSearch();
  };

  const handleInputBlur = () => {
    // Small delay to allow click events on dropdown items to fire
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  return (
    <div className="relative z-50">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="py-2 pl-9 pr-4 border border-gray-200 rounded-full text-sm bg-gray-50 w-[160px] md:w-[200px] transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:bg-white focus:w-[220px] md:focus:w-[250px]"
        />
      </div>

      {showResults && (
        <SearchResultDropdown
          debouncedQuery={debouncedQuery}
          isLoading={isLoading}
          searchQuery={searchQuery}
          searchResults={searchResults}
          totalResults={totalResults}
          handleResultClick={handleResultClick}
        />
      )}
    </div>
  );
}

function SearchResultDropdown({
  debouncedQuery,
  isLoading,
  searchQuery,
  searchResults,
  totalResults,
  handleResultClick,
}) {
  const resultsRef = useRef(null);

  // FIX 2: Corrected useEffect variables (Removed typos)
  useEffect(() => {
    if (searchResults) {
      console.log("Results updated:", searchResults);
    }
  }, [searchResults]);

  if (!debouncedQuery?.trim()) return null;

  // Loading State
  if (isLoading) {
    return (
      <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-200 rounded-xl shadow-xl w-[320px] p-8 flex flex-col items-center justify-center">
        <svg
          className="animate-spin w-8 h-8 text-primary-500 mb-2"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="text-sm text-gray-500">Searching...</span>
      </div>
    );
  }

  // No Results State
  if (!searchResults || Object.keys(searchResults).length === 0) {
    return (
      <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-200 rounded-xl shadow-xl w-[320px] p-6 text-center">
        <div className="text-gray-400 mb-2">
          <svg
            className="w-10 h-10 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">No results found</p>
        <p className="text-xs text-gray-400 mt-1">
          Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={resultsRef}
      className="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-100 rounded-lg shadow-xl w-[320px] max-h-[400px] overflow-hidden flex flex-col"
    >
      <div className="px-4 py-2 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Search Results
          </span>
          <span className="text-[10px] text-gray-400 ml-2">
            (Typo-tolerant)
          </span>
        </div>
        {totalResults > 0 && (
          <span className="text-xs font-semibold text-primary-600">
            {totalResults} found
          </span>
        )}
      </div>

      <div className="overflow-y-auto">
        {Object.entries(searchResults).map(([category, items]) => {
          // If a category is empty, don't render it
          if (!items || items.length === 0) return null;

          return (
            <div
              key={category}
              className="border-b border-gray-50 last:border-b-0"
            >
              <div className="px-4 py-1.5 bg-gray-50/30">
                <h4 className="text-[10px] font-bold text-primary-600 uppercase tracking-wide flex items-center gap-1">
                  {category.replace(/_/g, " ")}
                  <span className="text-gray-400 font-normal">
                    ({items.length})
                  </span>
                </h4>
              </div>

              <div>
                {items.slice(0, 4).map((item, index) => {
                  // Construct the target path using known routes
                  let fullPath;
                  let displayTitle;
                  let displaySubtitle = null;

                  fullPath = buildResultPath(category, item);

                  // Determine display title based on category and data structure
                  // Handle both direct properties and nested attributes
                  if (category === "peoples") {
                    displayTitle = item.attributes?.Name || item.Name || "Untitled";
                    displaySubtitle = item.attributes?.Designation || item.Designation || null;
                  } else if (category === "navigation") {
                    displayTitle = item.title || "Untitled";
                    displaySubtitle = item.page || null;
                  } else {
                    // For other categories (news, events, research, etc.)
                    displayTitle = item.attributes?.Title || item.attributes?.Name || 
                                   item.Title || item.Name || item.title || "Untitled";
                  }

                  return (
                    <button
                      key={item.id || v4()}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent blur
                        handleResultClick(fullPath);
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors duration-150 group block relative"
                    >
                      {/* Relevance indicator - top results get a badge */}
                      {index === 0 && (
                        <div className="absolute top-2 right-2">
                          <span className="text-[9px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-full font-semibold">
                            Best Match
                          </span>
                        </div>
                      )}
                      <div className="text-sm font-medium text-gray-700 group-hover:text-primary-700 truncate pr-16">
                        {displayTitle}
                      </div>
                      {/* Show subtitle if available */}
                      {displaySubtitle && (
                        <div className="text-xs text-gray-400 truncate">
                          {displaySubtitle}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-2 border-t border-gray-100 bg-gray-50">
        <button
          type="button"
          onMouseDown={(e) => {
            // Prevent the input blur from cancelling navigation
            e.preventDefault();
            const trimmedQuery = searchQuery.trim();
            if (!trimmedQuery) return;
            handleResultClick(`/search?q=${encodeURIComponent(trimmedQuery)}`);
          }}
          className="w-full text-xs font-medium text-center text-primary-600 hover:text-primary-700 py-1"
        >
          View all results
        </button>
      </div>
    </div>
  );
}
