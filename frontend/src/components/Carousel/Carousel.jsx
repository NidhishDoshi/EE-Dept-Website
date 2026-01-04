import { useEffect, useState } from "react";
import useCarouselFromSheets from "../../hooks/useCarouselFromSheets";
import GlobalError from "../GlobalError";

// Import Google Fonts
if (typeof document !== 'undefined') {
  const link1 = document.createElement('link');
  link1.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap';
  link1.rel = 'stylesheet';
  document.head.appendChild(link1);
  
  const link2 = document.createElement('link');
  link2.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap';
  link2.rel = 'stylesheet';
  document.head.appendChild(link2);
}

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const { data: images, isLoading, isError, error } = useCarouselFromSheets();

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!images || images.length === 0) return; // Don't start the timer if there are no images
    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, images]);

  // Use the 3:1 aspect ratio for the loading skeleton to prevent layout shift.
  if (isLoading) {
    return (
      <div className="relative w-full rounded-lg shadow-md max-w-full aspect-[3/1] bg-gray-200 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading Images...</p>
      </div>
    );
  }

  if (isError) return <GlobalError error={error} />;

  const length = images.length;

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  // Handle touch events for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      goToNext(); // Swipe left
    }

    if (touchStart - touchEnd < -50) {
      goToPrev(); // Swipe right
    }
  };

  if (length === 0) {
    return null; // Or a placeholder indicating no images
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-md max-w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel wrapper with a 3:1 aspect ratio */}
      <div className="relative w-full aspect-[3/1] overflow-hidden">
        {images.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.url}
              alt={slide.heading || `Slide ${index + 1}`}
              className="absolute w-full h-full object-fill"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent flex flex-col justify-center items-start px-12 sm:px-20">
              {slide.heading && (
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-4 drop-shadow-lg text-orange-600 tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {slide.heading}
                </h2>
              )}
              {slide.description && (
                <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-8 max-w-xl drop-shadow-md text-gray-900 font-normal bg-white/40 p-4 rounded-lg backdrop-blur-sm whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {slide.description}
                </p>
              )}
              <div className="flex gap-3 md:gap-4">
                {slide.button1?.label && (
                  <a
                    href={slide.button1.link}
                    className="bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold transition-colors shadow-lg"
                  >
                    {slide.button1.label}
                  </a>
                )}
                {slide.button2?.label && (
                  <a
                    href={slide.button2.link}
                    className="bg-orange-600 hover:bg-orange-700 text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold transition-colors shadow-lg"
                  >
                    {slide.button2.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-2 sm:space-x-3 rtl:space-x-reverse bottom-4 left-1/2">
        {images.map((slide, index) => (
          <button
            key={`indicator-${slide.id}`}
            type="button"
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-300"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="hidden sm:flex absolute top-0 left-0 z-30 items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrev}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-white">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Previous slide"
          >
            <title>Previous slide</title>
            <path
              d="M5 1L1 5l4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="hidden sm:flex absolute top-0 right-0 z-30 items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none"
        onClick={goToNext}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-white">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Next slide"
          >
            <title>Next slide</title>
            <path
              d="M1 9l4-4-4-4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default CustomCarousel;