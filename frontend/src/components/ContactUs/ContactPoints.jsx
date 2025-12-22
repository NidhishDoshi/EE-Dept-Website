export default function ContactPoints() {
  return (
    <div className="md:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 h-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Contact Points
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Department Office
            </h3>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:ee.office@iitdh.ac.in"
                className="text-indigo-600 hover:underline"
              >
                ee.office@iitdh.ac.in
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Head EE</h3>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:head.ee@iitdh.ac.in"
                className="text-indigo-600 hover:underline"
              >
                head.ee@iitdh.ac.in
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              PG Admissions (EE)
            </h3>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:pgadmissions.ee@iitdh.ac.in"
                className="text-indigo-600 hover:underline"
              >
                pgadmissions.ee@iitdh.ac.in
              </a>
            </p>
          </div>

          <h3 className="font-semibold text-gray-800 mb-2">
            Training and Placement Officer (TPO)
          </h3>

          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto:tpo@iitdh.ac.in"
              className="text-indigo-600 hover:underline"
            >
              tpo@iitdh.ac.in
            </a>
            <br />
            <span className="ml-[3.2rem]">
              <a
                href="mailto:sameerjoshi@iitdh.ac.in"
                className="text-indigo-600 hover:underline"
              >
                sameerjoshi@iitdh.ac.in
              </a>
            </span>
          </p>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Associate Dean R&D, Projects
            </h3>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:adean.rnd@iitdh.ac.in"
                className="text-indigo-600 hover:underline"
              >
                adean.rnd@iitdh.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
