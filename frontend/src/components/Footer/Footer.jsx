import React from "react";

const Footer = () => {
  // Automatically updated during build time
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-500 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Department Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-secondary-400">
              Department of EE & ECE
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Indian Institute of Technology Dharwad
              <br />
              WALMI Campus, Belur Industrial Area
              <br />
              Dharwad - 580011, Karnataka, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-secondary-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/academics"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Academics
                </a>
              </li>
              <li>
                <a
                  href="/research"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Research
                </a>
              </li>
              <li>
                <a
                  href="/people"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  People
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-secondary-400">
              Connect With Us
            </h3>
            <p className="text-white/80 text-sm mb-3">
              Stay updated with the latest news and events from our department.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.iitdh.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              &copy; {currentYear} Department of EE & ECE, IIT Dharwad. All
              rights reserved.
            </p>
            <p className="text-white/50 text-xs">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
