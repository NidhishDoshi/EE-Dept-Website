import { v4 } from "uuid";
import { useNews } from "../../hooks/useNews";
import { Link } from "react-router-dom"; // ← make sure this is imported

const NewsCard = ({ title, date, description, link }) => (
  <button
    type="button"
    onClick={() => {
      if (link) window.open(link, "_blank");
    }}
    className="w-full cursor-pointer bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left border-l-4 border-secondary-500 hover:border-primary-500 hover:-translate-y-1"
  >
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-secondary-500 font-medium mt-1">{date}</p>
    <p className="text-gray-600 text-sm mt-2 flex-grow">{description}</p>
  </button>
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
  const topNews = news?.slice(0, 3); // show only top 3

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
      <div className="space-y-4">
        {newsLoading ? (
          <NewsLoading />
        ) : newsError ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">
            <p>Error loading news: {newsError?.message}</p>
            <p className="text-sm mt-2">Please try refreshing the page.</p>
          </div>
        ) : topNews?.length > 0 ? (
          topNews.map((item) => (
            <NewsCard key={`news-${item?.id || v4()}`} {...item} />
          ))
        ) : (
          <p className="text-gray-500">No news available at the moment.</p>
        )}
      </div>
    </div>
  );
}
