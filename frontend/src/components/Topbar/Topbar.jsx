// src/components/Topbar.jsx
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";

function Topbar({ toggleMobileMenu, isMobileMenuOpen }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 h-[60px] sm:h-[70px]">
        {/* Mobile menu button and Logo */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            className="lg:hidden flex items-center justify-center p-1.5 sm:p-2 rounded-md text-primary-500 hover:text-primary-700 hover:bg-primary-50 focus:outline-none transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Open menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Logo */}
          <button
            type="button"
            onClick={() => window.open("https://www.iitdh.ac.in/", "_blank")}
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
          >
            <img
              loading="lazy"
              src={"/images/logo.png"}
              alt="IIT DH"
              className="hidden sm:block cursor-pointer h-[40px] md:h-[50px] lg:h-[55px] w-auto transition-transform duration-200 hover:scale-[1.02]"
            />
            {/* Mobile Logo */}
            <img
              loading="lazy"
              src="/institute_favicon.png"
              alt="IIT DH"
              className="sm:hidden cursor-pointer h-[35px] w-auto transition-transform duration-200 hover:scale-[1.02]"
            />
          </button>
        </div>

        {/* Department name - centered */}
        <div className="flex-1 hidden lg:flex justify-center items-center px-4 min-w-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer text-center bg-transparent border-none p-0 group w-full"
            style={{ outline: "none" }}
          >
            <h1 className="text-sm xl:text-base 2xl:text-lg font-semibold text-primary-500 group-hover:text-primary-700 transition-colors tracking-wide truncate">
              Department of Electrical, Electronics and Communication
              Engineering
            </h1>
          </button>
        </div>

        {/* Tablet department name - shortened */}
        <div className="hidden md:flex lg:hidden flex-1 justify-center px-2 min-w-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer text-center bg-transparent border-none p-0 w-full"
            style={{ outline: "none" }}
          >
            <h1 className="text-xs font-semibold text-primary-500 leading-tight truncate">
              Dept. of Electrical, Electronics & Communication Engg.
            </h1>
          </button>
        </div>

        {/* Mobile department name - abbreviated */}
        <div className="md:hidden flex-1 px-1 min-w-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer text-center bg-transparent border-none p-0 w-full"
            style={{ outline: "none" }}
          >
            <h1 className="text-[10px] xs:text-xs font-semibold text-primary-500 leading-tight truncate">
              Dept. of EECE
            </h1>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center flex-shrink-0">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
