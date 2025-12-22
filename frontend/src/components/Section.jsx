export default function Section({ id, title, children }) {
  // Section Component
  return (
    <div id={id} className="py-10 scroll-mt-[140px]">
      <h2 className="text-2xl font-bold text-primary-500 mb-6 pb-2 border-b-2 border-secondary-500/50">
        {title}
      </h2>
      {children}
    </div>
  );
}
