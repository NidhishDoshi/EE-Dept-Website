import useFAQFromSheets from "../../hooks/useFAQFromSheets";

const formatAnswerWithEmails = (text) => {
  if (!text) return '';
  
  // Regular expression to match email addresses
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  
  // Replace emails with mailto links
  const formattedText = text.replace(emailRegex, (email) => {
    return `<a href="mailto:${email}" class="text-indigo-600 hover:underline">${email}</a>`;
  });
  
  return formattedText;
};

export default function ContactUsFaq() {
  const { data: faqs, isLoading, isError } = useFAQFromSheets();

  return (
    <div className="mt-10 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Frequently Asked Questions
      </h2>
      
      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-500">Loading FAQs...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-4">
          <p className="text-red-500">Error loading FAQs. Please try again later.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq.id}>
                <h3 className="font-semibold text-gray-800">
                  {faq.Question}
                </h3>
                <p 
                  className="text-gray-700 mt-1" 
                  dangerouslySetInnerHTML={{ __html: formatAnswerWithEmails(faq.Answer) }} 
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No FAQs available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
}
