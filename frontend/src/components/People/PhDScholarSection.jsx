import Section from "../Section";
import FacultyCard from "./FacultyCard";

export default function PhDScholarSection({ phdScholars }) {
  return (
    <Section id="phd-scholars" title="PhD Scholars">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phdScholars.map((member) => (
          <FacultyCard key={member?.id} {...member} />
        ))}
      </div>
    </Section>
  );
}
