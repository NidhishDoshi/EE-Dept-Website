import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ closeMenu, isMobile = false }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLinkClick = () => {
    if (closeMenu) closeMenu();
    setOpenDropdown(null);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/academics", label: "Academics" },
    { to: "/people", label: "People" },
    {
      label: "Research",
      to: "/research",
      dropdown: [
        { to: "/research/labs", label: "Labs" },
        { to: "/research/projects", label: "Projects" },
        { to: "https://eecelabs.iitdh.ac.in/", label: "Teaching Labs", external: true },
      ],
    },
    {
      href: "https://iitdh.ac.in/admissions",
      label: "Admissions",
      external: true,
    },
    { to: "/join-as-faculty", label: "Join Us" },
    { to: "/contact", label: "Contact" },
    {
      href: "http://localhost:1337/admin",
      label: "Internal",
      external: true,
    },
  ];

  // Mobile navigation
  if (isMobile) {
    return (
      <nav className="h-full w-full bg-white overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="font-semibold text-primary-500">Menu</h2>
          <button
            onClick={closeMenu}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="py-2">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.external ? (
                <a
                  href={item.href}
                  className="block px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-500 font-medium transition-colors duration-200 border-l-4 border-transparent hover:border-primary-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-6 py-3 font-medium transition-colors duration-200 border-l-4 ${
                      isActive
                        ? "bg-primary-50 text-primary-500 border-primary-500"
                        : "text-gray-700 border-transparent hover:bg-primary-50 hover:text-primary-500 hover:border-primary-500"
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // Desktop horizontal navigation
  return (
    <nav className="hidden lg:block bg-primary-500">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-center space-x-1">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              {item.dropdown ? (
                <>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-3 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "text-white bg-primary-700 border-b-2 border-secondary-500"
                          : "text-white/90 hover:text-white hover:bg-primary-600"
                      }`
                    }
                  >
                    {item.label}
                    <svg
                      className="ml-2 h-3 w-3 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </NavLink>
                  <div className="absolute left-0 top-full z-10 hidden group-hover:block bg-white shadow-lg rounded-b min-w-[160px]">
                    <ul>
                      {item.dropdown.map((subitem, subidx) => (
                        <li key={subidx}>
                          <NavLink
                            to={subitem.to}
                            className="block px-6 py-2 text-gray-700 hover:bg-primary-100 hover:text-primary-700 text-sm font-medium rounded transition-colors duration-150 whitespace-nowrap"
                          >
                            {subitem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : item.external ? (
                <a
                  href={item.href}
                  className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-primary-600 font-medium text-sm transition-all duration-200 whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                  <svg
                    className="ml-1 h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-4 py-3 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-white bg-primary-700 border-b-2 border-secondary-500"
                        : "text-white/90 hover:text-white hover:bg-primary-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
