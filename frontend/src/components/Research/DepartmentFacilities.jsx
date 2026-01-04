import React from "react";
import useResearchLabsFromSheets from "../../hooks/useResearchLabsFromSheets";
import GlobalError from "../GlobalError";
import Loading from "../Loading";
import Section from "../Section";

// --- REUSABLE LAB CARD COMPONENT ---
const LabCard = ({ name, description, images }) => {
  const [lightboxImage, setLightboxImage] = React.useState(null);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Close lightbox on ESC key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    if (lightboxImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage]);

  // Create extended array for seamless infinite loop
  const getExtendedImages = () => {
    if (!images || images.length === 0) return [];
    if (images.length === 1) return images;
    // Triple the images to ensure smooth infinite loop
    return [...images, ...images, ...images];
  };

  const extendedImages = getExtendedImages();

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left border-l-4 border-secondary-500 hover:border-primary-500 hover:-translate-y-1">
        {/* 1. Name - Clickable to toggle view */}
        <h3 
          className="text-xl font-semibold text-gray-800 mb-4 cursor-pointer hover:text-primary-500 transition-colors flex items-center justify-between group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{name}</span>
          <svg 
            className={`w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </h3>

        {/* 2. Image Gallery - Toggle between Carousel and Grid */}
        <div className="overflow-hidden transition-all duration-500 ease-in-out">
          {isExpanded ? (
            // Grid View
            <div className="w-full mb-4 animate-fadeIn">
              {images && images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div 
                      key={`img-${index}`} 
                      className="relative overflow-hidden rounded-lg border border-gray-200 cursor-pointer group aspect-video bg-gray-50 transform transition-all duration-300"
                      style={{ 
                        animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                      }}
                      onClick={() => setLightboxImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${name} - Image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-400 text-sm">No Image Available</span>
                </div>
              )}
            </div>
          ) : (
            // Carousel View
            <div className="w-full h-80 bg-gray-50 rounded-lg mb-4 relative overflow-hidden border border-gray-200 group animate-fadeIn">
              {images && images.length > 0 ? (
                <>
                  <div 
                    className="flex h-full gap-3"
                    style={{
                      width: `${extendedImages.length * (100 / 3)}%`,
                      animation: images.length > 1 ? 'continuousScroll 25s linear infinite' : 'none'
                    }}
                  >
                    {extendedImages.map((img, index) => (
                      <div 
                        key={`img-${index}`} 
                        className="h-full relative overflow-hidden flex-shrink-0 cursor-pointer rounded-lg"
                        style={{ width: `calc(${100 / extendedImages.length}% - 0.75rem)` }}
                        onClick={() => setLightboxImage(img)}
                      >
                        <img
                          src={img}
                          alt={`${name} - Image ${(index % images.length) + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <style>{`
                    @keyframes continuousScroll {
                      0% {
                        transform: translateX(0);
                      }
                      100% {
                        transform: translateX(-${100 / 3}%);
                      }
                    }
                    
                    @keyframes fadeIn {
                      from {
                        opacity: 0;
                      }
                      to {
                        opacity: 1;
                      }
                    }
                    
                    @keyframes slideIn {
                      from {
                        opacity: 0;
                        transform: translateY(10px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                    
                    .animate-fadeIn {
                      animation: fadeIn 0.4s ease-out;
                    }
                    
                    .group:hover [style*="continuousScroll"] {
                      animation-play-state: paused;
                    }
                  `}</style>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-400 text-sm">No Image Available</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Description */}
        <div className="text-gray-700 text-sm flex-grow leading-relaxed">
          {description || (
            <span className="text-gray-400 italic">No description provided.</span>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightboxImage}
            alt={name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

function DepartmentFacilitiesData() {
  const { data: researchLabs, isLoading, isError, error } = useResearchLabsFromSheets();

  if (isLoading) return <Loading />;
  if (isError) return <GlobalError error={error} />;

  // --- HELPER 1: Universal Data Accessor ---
  const getAttrs = (item) => item?.attributes || item || {};

  // --- HELPER 2: Robust Filter ---
  const filterLabs = (types) => {
    if (!Array.isArray(researchLabs)) return [];
    const targetTypes = types.map(t => t.toLowerCase());
    return researchLabs.filter((item) => {
      const attrs = getAttrs(item);
      const itemType = attrs?.Type?.trim().toLowerCase();
      return targetTypes.includes(itemType);
    });
  };

  const instructionalLabs = filterLabs(["Teaching Lab", "Instructional Lab", "Teaching Facility", "Instructional Facility"]);
  const rndLabs = filterLabs(["Research Lab", "Research Facility", "Research Facilities", "R&D Lab"]);

  // --- HELPER 3: Data Processor for Cards ---
  const processLabData = (item) => {
    const attrs = getAttrs(item);

    // Image Logic - Handle multiple images from 'Picture' field (Google Sheets format)
    const pictureData = attrs.Picture || [];
    let imageUrls = [];

    if (Array.isArray(pictureData)) {
      imageUrls = pictureData.map((img) => img?.url).filter(Boolean);
    }

    return {
      id: item.documentId || item.id,
      name: attrs.Name,
      description: attrs.description,
      images: imageUrls,
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
          <div className="grid grid-cols-1 gap-6">
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
          <div className="grid grid-cols-1 gap-6">
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
