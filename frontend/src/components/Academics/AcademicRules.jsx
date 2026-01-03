import Section from "../Section";

export default function AcademicRules() {
  return (
    <Section id="rules" title="Academic Rules">
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-700 text-lg mb-6">
          View the complete academic rules and regulations for the department.
        </p>
        <a
          href="https://res.cloudinary.com/dncpxsaxa/image/upload/v1753990375/UG_Rulebook_23Jul24_ibzl9c.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-secondary-500 text-white px-8 py-3 rounded-lg hover:bg-secondary-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-lg"
        >
          View Academic Rules (PDF)
        </a>
      </div>
    </Section>
  );
}
