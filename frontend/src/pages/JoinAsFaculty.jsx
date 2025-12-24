import { Link } from "react-router-dom";

const JoinAsFaculty = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Faculty Positions Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-secondary-500 mb-6">
          Faculty Positions
        </h1>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          The department is actively looking for candidates for prospective faculty applicants. If you are looking for a faculty position at the Dept of EECE, please use the link below:
        </p>
        <a
          href="https://www.iitdh.ac.in/faculty-recruitment"
          className="inline-block bg-secondary-500 text-white px-8 py-3 rounded-lg hover:bg-secondary-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Faculty Recruitment
        </a>
      </section>

      {/* Research Positions Section */}
      <section>
        <h2 className="text-4xl font-bold text-secondary-500 mb-6">
          Research Positions
        </h2>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          From time to time we have openings for Research Associates (RA), JRF, Project Staff positions etc. The appointments for these positions are against advertisements announced on the institute website at the following link:
        </p>
        <a
          href="https://www.iitdh.ac.in/other-recruitments"
          className="inline-block bg-secondary-500 text-white px-8 py-3 rounded-lg hover:bg-secondary-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-lg mb-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Research Staff Positions
        </a>
        <p className="text-gray-700 text-lg leading-relaxed">
          In addition, faculty may sometimes have ad-hoc positions. For this please reach out to the faculty members directly over email. The details of faculty members can be found{" "}
          <Link 
            to="/people" 
            className="text-secondary-500 hover:text-secondary-600 font-semibold hover:underline"
          >
            here
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default JoinAsFaculty;
