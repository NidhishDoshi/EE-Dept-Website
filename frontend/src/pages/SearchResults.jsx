import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import Loading from "../components/Loading";
import { buildResultPath } from "../components/Topbar/SearchInput";
import useSearchResult from "../hooks/useSearchResult";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const { data: results, isLoading, isError, error } = useSearchResult(query);

  const navigate = useNavigate();

  const handleResultClick = (category, item) => {
    const fullPath = buildResultPath(category, item);
    navigate(fullPath);
  };

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md flex flex-col items-center">
          <svg
            className="w-12 h-12 mb-2 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <title>Error</title>
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01"
            />
          </svg>
          <h2 className="text-xl font-bold mb-1">
            Oops! Something went wrong.
          </h2>
          <p className="mb-2 text-center">
            We couldn't fetch your search results. Please try again later.
          </p>
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer">Show error details</summary>
            <pre className="whitespace-pre-wrap">
              {error?.message || String(error)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">
          Search Results for: "{query}"
        </h1>
        <p className="text-sm text-gray-500">
          Using advanced fuzzy matching - typos and similar terms included
        </p>
      </div>

      {!results || Object.keys(results).length === 0 ? (
        <NoResultFound query={query} />
      ) : (
        <div>
          {Object.entries(results).map(([category, items]) => {
            // Skip empty categories
            if (!items || items.length === 0) return null;
            
            return (
              <div key={category} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold capitalize text-gray-800">
                    {category.replace(/_/g, " ")}
                  </h2>
                  <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                    {items.length} {items.length === 1 ? 'result' : 'results'}
                  </span>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, index) => {
                  // Determine what to display based on category
                  let title, subtitle, description;
                  
                  if (category === "peoples") {
                    title = item.Name || item.title || "Unnamed";
                    subtitle = item.Designation || item.Role || "";
                    description = item.Email || "";
                  } else if (category === "news" || category === "events") {
                    title = item.Title || item.title || "Untitled";
                    subtitle = "";
                    description = item.description?.substring(0, 100) || "";
                  } else if (category === "research" || category === "projects") {
                    title = item.Name || item.Title || item.title || "Untitled";
                    subtitle = item.Type || "";
                    description = item.description?.substring(0, 100) || "";
                  } else {
                    title = item.Title || item.Name || item.title || "Untitled";
                    subtitle = "";
                    description = "";
                  }

                  return (
                    <div
                      key={v4()}
                      className="bg-white p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-200 relative"
                    >
                      {/* Top match indicator */}
                      {index === 0 && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            TOP MATCH
                          </span>
                        </div>
                      )}
                      
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 pr-20">
                        {title}
                      </h3>
                      {subtitle && (
                        <p className="text-gray-600 text-sm mb-2 font-medium">{subtitle}</p>
                      )}
                      {description && (
                        <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                          {description}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => handleResultClick(category, item)}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:gap-2 text-sm font-medium focus:outline-none transition-all"
                      >
                        View details 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NoResultFound({ query }) {
  const suggestions = [
    "Check your spelling",
    "Try different keywords",
    "Use more general terms",
    "Try searching for: people, research, news, or events",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <svg
        className="w-20 h-20 text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <title>No results found</title>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <line
          x1="21"
          y1="21"
          x2="16.65"
          y2="16.65"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="8.5"
          y1="10.5"
          x2="13.5"
          y2="10.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-2xl font-semibold text-gray-700 mb-2">
        No results found
      </span>
      <span className="text-md text-gray-500 mb-4 text-center max-w-md">
        We couldn't find any results for{" "}
        <span className="font-medium text-gray-800">"{query}"</span>
      </span>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Search Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          {suggestions.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <p className="text-xs text-gray-400 text-center mt-6 max-w-lg">
        Our search uses advanced fuzzy matching and can handle typos and similar terms. 
        If you still can't find what you're looking for, try browsing the navigation menu.
      </p>
    </div>
  );
}

export default SearchResults;
