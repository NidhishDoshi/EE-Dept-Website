import useJoinAsFacultyData from "../hooks/useJoinAsFacultyData";
import GlobalError from "../components/GlobalError";
import Loading from "../components/Loading";

// Static "How to Apply" card data
const howToApplyCard = {
  id: "how-to-apply",
  title: "How to Apply",
  description:
    "Click on the button below to get updated application instructions and application form",
};

const JoinAsFacultyData = () => {
  const { data: apiData, isLoading, isError, error } = useJoinAsFacultyData();

  if (isLoading) return <Loading />;
  if (isError) return <GlobalError error={error} />;

  // Combine API data with the static "How to Apply" card
  const allData = [...(apiData || []), howToApplyCard];

  return (
    <div className="space-y-6">
      {allData.map((section) => (
        <section
          key={section.id || section.documentId}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500"
        >
          <h2 className="text-2xl font-semibold text-primary-500 mb-4">
            {section.Title || section.title}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {section.Description || section.description}
            </p>
            {(section.title === "How to Apply" ||
              section.Title === "How to Apply") && (
              <div className="text-center mt-6">
                <a
                  href="https://www.iitdh.ac.in/faculty-recruitment"
                  className="inline-block bg-secondary-500 text-white px-8 py-3 rounded-lg hover:bg-secondary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now →
                </a>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

const JoinAsFaculty = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-500 mb-4">
        Join as Faculty
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        Build your academic career at IIT DHARWAD's Department of Computer
        Science and Engineering
      </p>
      <JoinAsFacultyData />
    </div>
  );
};

export default JoinAsFaculty;
