import { v4 } from "uuid";
import { useTalksAndEvents } from "../hooks/useTalksAndEvents";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const STRAPI_BASE_URL = "http://localhost:1337";

const TalkCard = ({
  id,
  title,
  speaker,
  designation,
  venue,
  time,
  date,
  description,
  link,
  imageUrl,
  posterUrl,
}) => (
  <div
    id={`event-${id}`}
    className="
    bg-white rounded-xl p-6 transition-all duration-300
    transform hover:-translate-y-2 shadow-md hover:shadow-xl
    text-left border-l-4 border-primary-500 hover:border-secondary-500
  "
  >
    <div className={`flex ${posterUrl ? 'gap-6' : 'flex-col'}`}>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="italic hover:text-primary-500 transition-colors hover:underline">
          {title} <span className="text-sm">🔗</span>
        </a>
      ) : (
        <span className="italic">{title}</span>
      )}
    </h3>
    
    {imageUrl && (
      <div className="mb-4 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-contain"
          loading="lazy"
        />
      </div>
    )}
    {speaker && (
      <div className="mb-2">
        <strong className="font-semibold text-gray-800">Speaker:</strong>{" "}
        {speaker}
        {designation && (
          <div className="text-sm text-gray-600">{designation}</div>
        )}
      </div>
    )}
    {venue && (
      <div className="mt-2 text-primary-500">
        <strong>Venue:</strong> {venue}
      </div>
    )}
    {time && (
      <div className="mt-1 text-secondary-500">
        <strong>Date:</strong> {time}
      </div>
    )}
    {date && <div className="mt-1 text-gray-600">{date}</div>}
    {description && (
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">Description:</h4>
        <div 
          className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    )}
      </div>
      {posterUrl && (
        <div className="flex-shrink-0 w-64">
          <div className="rounded-lg overflow-hidden h-full flex items-center justify-center">
            <img 
              src={posterUrl} 
              alt={`${title} poster`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

const TalksLoading = () => (
  <div className="space-y-6 animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-gray-200 rounded-xl h-48 w-full"></div>
    ))}
  </div>
);

export default function AllTalksEventsPage() {
  const { data: talks, isLoading, error } = useTalksAndEvents();
  const location = useLocation();

  useEffect(() => {
    if (location.hash && talks && talks.length > 0) {
      // Wait for content to render, then scroll
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a highlight effect
          element.classList.add('ring-2', 'ring-primary-500');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-primary-500');
          }, 2000);
        }
      }, 300);
    }
  }, [location.hash, talks]);

  // Group talks by eventStatus
  const ongoingTalks = talks?.filter(talk => talk.eventStatus === "Ongoing") || [];
  const pastTalks = talks?.filter(talk => talk.eventStatus === "Past") || [];

  const renderTalks = (talksList) => {
    return talksList.map((item) => {
      const imageData = item.image?.data || item.image;
      const imageAttrs = imageData?.attributes || imageData;
      const imageUrl = imageAttrs?.url ? 
        (imageAttrs.url.startsWith('/') ? `${STRAPI_BASE_URL}${imageAttrs.url}` : imageAttrs.url) : 
        null;
      
      const posterData = item.poster?.data || item.poster;
      const posterAttrs = posterData?.attributes || posterData;
      const posterUrl = posterAttrs?.url ? 
        (posterAttrs.url.startsWith('/') ? `${STRAPI_BASE_URL}${posterAttrs.url}` : posterAttrs.url) : 
        null;
      
      return (
        <TalkCard 
          key={`talk-${item.id || v4()}`} 
          {...item} 
          imageUrl={imageUrl}
          posterUrl={posterUrl}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-500 mb-8">
          All Talks and Events
        </h1>

        {isLoading ? (
          <TalksLoading />
        ) : error ? (
          <div className="text-red-600 bg-red-50 p-6 rounded-xl text-center border border-red-200">
            <p className="font-semibold text-lg">Oops, something went wrong!</p>
            <p className="text-sm mt-2">
              There was an error loading the events. Please try refreshing the
              page.
            </p>
          </div>
        ) : talks && talks.length > 0 ? (
          <>
            {/* Ongoing Events Section */}
            {ongoingTalks.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-primary-500 pb-2">
                  Ongoing
                </h2>
                <div className="space-y-8">
                  {renderTalks(ongoingTalks)}
                </div>
              </div>
            )}

            {/* Past Events Section */}
            {pastTalks.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-400 pb-2">
                  Past
                </h2>
                <div className="space-y-8">
                  {renderTalks(pastTalks)}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500 text-center mt-20">
            <p className="text-lg">No talks or events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
