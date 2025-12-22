import { v4 } from "uuid";
import { useTalksAndEvents } from "../hooks/useTalksAndEvents";

const TalkCard = ({
  title,
  speaker,
  designation,
  venue,
  time,
  date,
  description,
}) => (
  <div
    className="
    bg-white rounded-xl p-6 transition-all duration-300
    transform hover:-translate-y-2 shadow-md hover:shadow-xl
    text-left flex flex-col h-full border-l-4 border-primary-500 hover:border-secondary-500
  "
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-2 italic">{title}</h3>
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
        <strong>📍 Venue:</strong> {venue}
      </div>
    )}
    {time && (
      <div className="mt-1 text-secondary-500">
        <strong>⏰ Time:</strong> {time}
      </div>
    )}
    {date && <div className="mt-1 text-gray-600">{date}</div>}
    {description && (
      <p className="mt-4 font-medium text-gray-700">{description}</p>
    )}
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
          <div className="space-y-8">
            {talks.map((item) => (
              <TalkCard key={`talk-${item.id || v4()}`} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-20">
            <p className="text-lg">No talks or events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
