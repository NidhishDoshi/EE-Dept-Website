import Section from "../Section";
import FormerMemberCard from "./FormerMemberCard";

export default function FormerMemberSection({ formerMembers }) {
  return (
    <Section id="former-members" title="Former Members">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formerMembers.map((member) => (
          <FormerMemberCard key={member?.id} {...member} />
        ))}
      </div>
    </Section>
  );
}
