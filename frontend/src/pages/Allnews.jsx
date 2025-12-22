import { v4 } from "uuid";
import { useNews } from "../hooks/useNews";

const NewsCard = ({ title, date, description, link }) => (
  <button
    type="button"
    onClick={() => {
      if (link) window.open(link, "_blank");
    }}
    className="
      w-full
      cursor-pointer bg-white rounded-xl p-6 transition-all duration-300
      transform hover:-translate-y-2 shadow-md hover:shadow-xl
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      text-left flex flex-col h-full border-l-4 border-secondary-500 hover:border-primary-500
    "
  >
    {/* The 'line-clamp-2' class has been removed to prevent trimming the title */}
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-secondary-500 font-medium mt-2">{date}</p>
    <p className="text-gray-600 text-base mt-4 flex-grow">{description}</p>
  </button>
);

const NewsLoading = () => (
  <div className="space-y-4 animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-gray-200 rounded-xl h-40 w-full"></div>
    ))}
  </div>
);

export default function NewsPage() {
  const { data: news, isLoading: newsLoading, error: newsError } = useNews();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* The title styling is now more subtle and left-aligned */}
        <h1 className="text-3xl font-bold text-primary-500 mb-8">All News</h1>

        {newsLoading ? (
          <NewsLoading />
        ) : newsError ? (
          <div className="text-red-600 bg-red-50 p-6 rounded-xl text-center border border-red-200">
            <p className="font-semibold text-lg">Oops, something went wrong!</p>
            <p className="text-sm mt-2">
              There was an error loading the news. Please try refreshing the
              page.
            </p>
          </div>
        ) : news && news.length > 0 ? (
          <div className="space-y-6">
            {/* Map directly over the 'news' data which is already sorted by the hook */}
            {news.map((item) => (
              <NewsCard key={`news-${item?.id || v4()}`} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-20">
            <p className="text-lg">No news found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
