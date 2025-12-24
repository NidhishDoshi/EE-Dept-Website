import Section from "../Section";
import FacultyCard from "./FacultyCard";

export default function MSStudentSection({ msStudents }) {
  return (
    <Section id="ms-students" title="MS Students">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {msStudents.map((member) => (
          <FacultyCard key={member?.id} {...member} />
        ))}
      </div>
    </Section>
  );
}
