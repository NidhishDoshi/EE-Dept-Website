import { useCallback } from "react";

export default function BackToTopButton({ to }) {
  // Scroll to the top or to a specific element by id
  const handleBackToTop = useCallback(() => {
    if (to) {
      const el = document.getElementById(to);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [to]);

  return (
    <div className="text-center mt-10">
      <button
        type="button"
        onClick={handleBackToTop}
        className="inline-flex items-center gap-2 cursor-pointer bg-primary-500 text-white px-5 py-2.5 rounded-md hover:bg-primary-600 transition duration-300 shadow-md hover:shadow-lg"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        Back to Top
      </button>
    </div>
  );
}
