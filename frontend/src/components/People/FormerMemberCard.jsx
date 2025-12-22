const FormerMemberCard = ({ name, title, period, currentAffiliation }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-indigo-600 text-sm">{title}</p>
      {period && <p className="text-sm text-gray-600 mt-1">Period: {period}</p>}
      {currentAffiliation && (
        <div className="mt-2 text-sm">
          <p className="text-gray-700 font-medium">Current Affiliation</p>
          <p className="text-gray-600">{currentAffiliation}</p>
        </div>
      )}
    </div>
  );
};

export default FormerMemberCard;
