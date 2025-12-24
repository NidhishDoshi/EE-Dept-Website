import React from "react";
import useResearchData from "../../hooks/useResearchData";
import GlobalError from "../GlobalError";
import Loading from "../Loading";
import Section from "../Section";

// ADJUST THIS: Your Strapi Backend URL (usually port 1337)
const STRAPI_BASE_URL = "http://localhost:1337";

// --- REUSABLE LAB CARD COMPONENT ---
const LabCard = ({ name, description, images }) => {
  const [lightboxImage, setLightboxImage] = React.useState(null);

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
      <div className="w-full bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left border-l-4 border-secondary-500 hover:border-primary-500 hover:-translate-y-1">
        {/* 1. Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{name}</h3>

        {/* 2. Image Gallery (Picture) */}
        <div className="w-full h-96 bg-gray-50 rounded mb-3 relative overflow-hidden border border-gray-100 group">
          {images && images.length > 0 ? (
            <>
              <div 
                className="flex h-full"
                style={{
                  width: `${extendedImages.length * (100 / 3)}%`,
                  animation: images.length > 1 ? 'continuousScroll 20s linear infinite' : 'none'
                }}
              >
                {extendedImages.map((img, index) => (
                  <div 
                    key={`img-${index}`} 
                    className="h-full relative overflow-hidden flex-shrink-0 cursor-pointer"
                    style={{ width: `${100 / extendedImages.length}%` }}
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
                
                .group:hover [style*="continuousScroll"] {
                  animation-play-state: paused;
                }
              `}</style>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400 text-xs">No Image Available</span>
            </div>
          )}
        </div>

        {/* 3. Description */}
        <div className="text-gray-600 text-sm flex-grow leading-relaxed">
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
  const { data: researchLabs, isLoading, isError, error } = useResearchData();

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

    // Image Logic - Handle multiple images from 'Picture' field
    const pictureData = attrs.Picture?.data || attrs.Picture || [];
    let imageUrls = [];

    if (Array.isArray(pictureData)) {
      // Multiple images
      imageUrls = pictureData.map((img) => {
        const imgAttrs = img?.attributes || img;
        const url = imgAttrs?.url;
        return url && url.startsWith("/") ? `${STRAPI_BASE_URL}${url}` : url;
      }).filter(Boolean);
    } else if (pictureData && typeof pictureData === 'object') {
      // Single image wrapped in data object
      const imgAttrs = pictureData?.attributes || pictureData;
      const url = imgAttrs?.url;
      if (url) {
        imageUrls = [url.startsWith("/") ? `${STRAPI_BASE_URL}${url}` : url];
      }
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
