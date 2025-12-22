import React from "react";
import useResearchData from "../../hooks/useResearchData";
import GlobalError from "../GlobalError";
import Loading from "../Loading";
import Section from "../Section";

// ADJUST THIS: Your Strapi Backend URL (usually port 1337)
const STRAPI_BASE_URL = "http://localhost:1337";

// --- REUSABLE LAB CARD COMPONENT ---
const LabCard = ({ name, description, imageUrl }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left border-l-4 border-secondary-500 hover:border-primary-500 hover:-translate-y-1">
      {/* 1. Name */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{name}</h3>

      {/* 2. Image (Picture) */}
      {/* Fixed height container to keep cards consistent even if images vary in size */}
      <div className="w-full h-48 bg-gray-50 rounded mb-3 flex items-center justify-center overflow-hidden border border-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-contain p-2"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400 text-xs">No Image Available</span>
        )}
      </div>

      {/* 3. Description */}
      <div className="text-gray-600 text-sm flex-grow leading-relaxed">
        {description || (
          <span className="text-gray-400 italic">No description provided.</span>
        )}
      </div>
    </div>
  );
};

function DepartmentFacilitiesData() {
  const { data: researchLabs, isLoading, isError, error } = useResearchData();

  if (isLoading) return <Loading />;
  if (isError) return <GlobalError error={error} />;

  // --- HELPER 1: Universal Data Accessor ---
  const getAttrs = (item) => item?.attributes || item || {};

  // --- HELPER 2: Robust Filter ---
  const filterLabs = (type) => {
    if (!Array.isArray(researchLabs)) return [];
    return researchLabs.filter((item) => {
      const attrs = getAttrs(item);
      // Filter based on your schema's 'Type' field
      return attrs?.Type?.trim().toLowerCase() === type.toLowerCase();
    });
  };

  const instructionalLabs = filterLabs("Teaching Lab");
  const rndLabs = filterLabs("Research Lab");

  // --- HELPER 3: Data Processor for Cards ---
  const processLabData = (item) => {
    const attrs = getAttrs(item);

    // Image Logic (Extracting from 'Picture' schema field)
    const picObj = attrs.Picture?.data?.attributes || attrs.Picture;
    let imgUrl = picObj?.url;

    // Prepend Base URL if it's a relative path
    if (imgUrl && imgUrl.startsWith("/")) {
      imgUrl = `${STRAPI_BASE_URL}${imgUrl}`;
    }

    return {
      id: item.id,
      name: attrs.Name, // Schema: Name
      description: attrs.description, // Schema: description (lowercase)
      imageUrl: imgUrl, // Schema: Picture
    };
  };

  return (
    <div className="space-y-12">
      {/* 1. Instructional Labs Section */}
      {instructionalLabs.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">
            Instructional Labs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructionalLabs.map((item) => (
              <LabCard key={item.id} {...processLabData(item)} />
            ))}
          </div>
        </div>
      )}

      {/* 2. Research & Development Labs Section */}
      {rndLabs.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">
            Research & Development Labs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rndLabs.map((item) => (
              <LabCard key={item.id} {...processLabData(item)} />
            ))}
          </div>
        </div>
      )}

      {/* 3. Empty State */}
      {researchLabs &&
        instructionalLabs.length === 0 &&
        rndLabs.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">
              No labs found. Please check your Strapi content entries.
            </p>
          </div>
        )}
    </div>
  );
}

export default function DepartmentFacilities() {
  return (
    <Section id="labs" title="Department Facilities">
      <DepartmentFacilitiesData />
    </Section>
  );
}
