import useResearchProjectsFromSheets from "../../hooks/useResearchProjectsFromSheets";
import GlobalError from "../GlobalError";
import Loading from "../Loading";

function ResearchProjectsData() {
  const {
    data: researchProjectData,
    isLoading: isLoadingResearchProject,
    isError: isErrorResearchProject,
    error: errorResearchProject,
  } = useResearchProjectsFromSheets();

  if (isLoadingResearchProject) return <Loading />;
  if (isErrorResearchProject)
    return <GlobalError error={errorResearchProject} />;

  const filterType = (types, rawData) =>
    rawData?.filter((item) =>
      types.some((type) => item?.Type?.toLowerCase() === type?.toLowerCase())
    );

  // Filter for Sponsored/RnD/Industry projects
  const sponsoredProjects = filterType(
    ["Sponsored", "RnD", "Industry"],
    researchProjectData
  );
  // Filter for Consultancy projects
  const consultancyProjects = filterType(
    ["Consultancy", "Consultancy/Testing"],
    researchProjectData
  );

  return (
    <>
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8 text-center">
          <h2 className="section-title mt-6">
            R&D Sponsored Projects
          </h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-bordered table-striped table-hover min-w-full">
          <thead className="thead-dark">
            <tr>
              <th className="border border-gray-400 px-4 py-2">S. No.</th>
              <th className="border border-gray-400 px-4 py-2">Project Title</th>
              <th className="border border-gray-400 px-4 py-2">Duration</th>
              <th className="border border-gray-400 px-4 py-2">Investigator(s)</th>
              <th className="border border-gray-400 px-4 py-2">Funding Agency</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sponsoredProjects.map((project, idx) => (
              <tr key={project.id}>
                <td className="border border-gray-400 px-4 py-2">{idx + 1}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.Title}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.Duration}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.PI || "-"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.CoPI || "-"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.CurrentStatus || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-8 text-center">
          <h2 className="section-title mt-14 ">
            Consultancy/Testing Projects
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-bordered table-striped min-w-full">
          <thead className="thead-dark">
            <tr>
              <th className="border border-gray-400 px-4 py-2">S. No.</th>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Duration</th>
              <th className="border border-gray-400 px-4 py-2">PI</th>
              <th className="border border-gray-400 px-4 py-2">Co-PI</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {consultancyProjects.map((project, idx) => (
              <tr key={project.id}>
                <td className="border border-gray-400 px-4 py-2">{idx + 1}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.Title}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.Duration}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.PI || "-"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.CoPI || "-"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.CurrentStatus || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ResearchProjects() {
  return (
    <section id="research-projects" title="Research-Projects">
      <div className="mb-8">
        {/* <h3 className="text-xl font-bold text-gray-800 mb-4">
          Research-Projects
        </h3> */}

        <ResearchProjectsData />
      </div>
    </section>
  );
}
