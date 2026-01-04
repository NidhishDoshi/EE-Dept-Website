import React from "react";
import useContactPointsFromSheets from "../../hooks/useContactPointsFromSheets";

export default function ContactPoints() {
  const { data: contactPoints, isLoading, error } = useContactPointsFromSheets();

  // Function to render emails with proper styling and line breaks
  const renderEmails = (emailString) => {
    if (!emailString) return null;
    
    // Split by newlines or commas
    const emails = emailString
      .split(/[\n,]+/)
      .map(e => e.trim())
      .filter(Boolean);
    
    return emails.map((email, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && (
          <>
            <br />
            <span className="ml-[3.4rem]">
              <a
                href={`mailto:${email}`}
                className="text-indigo-600 hover:underline"
              >
                {email}
              </a>
            </span>
          </>
        )}
        {idx === 0 && (
          <a
            href={`mailto:${email}`}
            className="text-indigo-600 hover:underline"
          >
            {email}
          </a>
        )}
      </React.Fragment>
    ));
  };

  if (isLoading) {
    return (
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6 h-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Contact Points
          </h2>
          <p className="text-gray-600">Loading contact points...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6 h-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Contact Points
          </h2>
          <p className="text-red-600">Error loading contact points.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 h-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Contact Points
        </h2>
        <div className="space-y-4">
          {contactPoints && contactPoints.length > 0 ? (
            contactPoints.map((contact) => (
              <div key={contact.id}>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {contact.Name}
                </h3>
                {contact.Email && (
                  <p className="text-gray-700">
                    Email: {renderEmails(contact.Email)}
                  </p>
                )}
                {contact.Number && (
                  <p className="text-gray-700 mt-1">
                    Phone:{" "}
                    <a
                      href={`tel:${contact.Number}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {contact.Number}
                    </a>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No contact points available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
