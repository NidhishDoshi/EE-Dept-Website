import Section from "../Section";
import FacultyCard from "./FacultyCard";

export default function GraduatedScholarSection({ GraduatedScholars }) {
  return (
    <Section id="graduated-scholars" title="Graduated Scholars">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GraduatedScholars.map((member) => (
          <FacultyCard key={member?.id} {...member} />
        ))}
      </div>
    </Section>
  );
}
