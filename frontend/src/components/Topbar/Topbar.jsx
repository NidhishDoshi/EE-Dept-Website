// src/components/Topbar.jsx
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";

function Topbar({ toggleMobileMenu, isMobileMenuOpen }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between h-[70px]">
        {/* Mobile menu button and Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden flex items-center justify-center p-2 rounded-md text-primary-500 hover:text-primary-700 hover:bg-primary-50 focus:outline-none transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
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
                className="h-6 w-6"
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
            className="flex items-center gap-3"
          >
            <img
              loading="lazy"
              src={"/images/logo.png"}
              alt="IIT DH"
              className="hidden sm:block cursor-pointer h-[45px] md:h-[55px] w-auto transition-transform duration-200 hover:scale-[1.02]"
            />
            {/* Mobile Logo */}
            <img
              loading="lazy"
              src="/institute_favicon.png"
              alt="IIT DH"
              className="sm:hidden cursor-pointer h-[45px] w-auto transition-transform duration-200 hover:scale-[1.02]"
            />
          </button>
        </div>

        {/* Department name - centered */}
        <div className="flex-1 hidden md:flex justify-center items-center px-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer text-center bg-transparent border-none p-0 group"
            style={{ outline: "none" }}
          >
            <h1 className="text-base lg:text-lg xl:text-xl font-semibold text-primary-500 group-hover:text-primary-700 transition-colors tracking-wide">
              Department of Electrical, Electronics and Communication
              Engineering
            </h1>
          </button>
        </div>

        {/* Mobile department name - abbreviated */}
        <div className="md:hidden flex-1 mx-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer text-center bg-transparent border-none p-0 w-full"
            style={{ outline: "none" }}
          >
            <h1 className="text-xs sm:text-sm font-semibold text-primary-500 leading-tight">
              Dept. of EE, ECE
            </h1>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
