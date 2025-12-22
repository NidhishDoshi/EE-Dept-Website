import { Link } from "react-scroll";

// Navigation Card Component
export default function NavCard({ title, icon, targetId, viewText }) {
  return (
    <Link
      to={targetId}
      spy={targetId.toString()}
      smooth={targetId.toString()}
      offset={-140}
      duration={500}
      className="cursor-pointer"
    >
      <div className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center justify-center border-b-4 border-secondary-500 hover:border-primary-500 hover:-translate-y-1">
        <div className="text-primary-500 mb-3 text-3xl">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-secondary-500 mt-2 font-medium">
          {viewText}
        </p>
      </div>
    </Link>
  );
}
