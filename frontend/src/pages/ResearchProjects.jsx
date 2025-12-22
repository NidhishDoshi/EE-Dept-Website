import ResearchProjects from "../components/Research/ResearchProjects";
import BackToTopButton from "../components/BackToTopButton";

export default function ResearchProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2
        className="text-2xl font-bold text-gray-800 mb-6 pb-2"
        style={{ borderBottom: "2px solid rgba(255, 99, 14, 0.5)" }}
      >
        Research Projects
      </h2>
      <ResearchProjects />
      <BackToTopButton />
    </div>
  );
}
