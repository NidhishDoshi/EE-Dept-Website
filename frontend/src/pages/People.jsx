import { lazy, Suspense, useMemo } from "react";

import GlobalError from "../components/GlobalError";
import Loading from "../components/Loading";
import usePeopleInfo from "../hooks/usePeopleInfo";

// Lazy load People section components
const NavCard = lazy(() => import("../components/Academics/NavCard"));
// const DepartmentLeadership = lazy(() =>
//   import("../components/People/DepartmentLeadership")
// );
const FacultySection = lazy(() =>
  import("../components/People/FacultySection")
);
const StaffSection = lazy(() => import("../components/People/StaffSection"));
const FormerMemberSection = lazy(() =>
  import("../components/People/FormerMemberSection")
);
const PhDScholarSection = lazy(() =>
  import("../components/People/PhDScholarSection")
);
const GraduatedScholarSection = lazy(() =>
  import("../components/People/GraduatedScholarSection")
);
const BackToTopButton = lazy(() => import("../components/BackToTopButton"));

function QuickNavigation() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
      {/* <NavCard
        title="Department Leadership"
        icon={<i className="fas fa-user-tie"></i>}
        targetId="leadership"
        viewText={"View Members"}
      /> */}
      <NavCard
        title="Faculty"
        icon={<i className="fas fa-chalkboard-teacher"></i>}
        targetId="faculty"
        viewText={"View Members"}
      />
      <NavCard
        title="Staff"
        icon={<i className="fas fa-users"></i>}
        targetId="staff"
        viewText={"View Members"}
      />
      <NavCard
        title="Former Members"
        icon={<i className="fas fa-user-graduate"></i>}
        targetId="former-members"
        viewText={"View Members"}
      />
      <NavCard
        title="PhD Scholars"
        icon={<i className="fas fa-user-graduate"></i>}
        targetId="phd-scholars"
        viewText={"View Members"}
      />
      <NavCard
        title="Graduated Scholars"
        icon={<i className="fas fa-history"></i>}
        targetId="graduated-scholars"
        viewText={"View Members"}
      />
    </div>
  );
}

const getPeopleData = (data) => {
  return data.map((person) => {
    const base = {
      id: person.documentId,
      name: person.Name,
      title: person.Designation,
      email: person.Email,
      phone: person.Contact,
      website: person.Website,
      image: person.Image,
      role: person.Role,
    };

    switch (person.Role) {
      case "Faculty Members":
      case "Department Leadership":
      case "PhD Scholars":
      case "Graduated Scholars":
        return { ...base, expertise: person.Domain };
      case "Staff Members":
        return { ...base, office: person.Domain };
      case "Former Members":
        return {
          ...base,
          period: person.Period,
          currentAffiliation: person.CurrentAffiliation,
        };
      default:
        return base;
    }
  });
};

const fallback = (
  <div className="text-center py-8 text-gray-400">Loading...</div>
);

// People Page Component
const People = () => {
  const { data, isLoading, isError, error } = usePeopleInfo();

  const people = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return getPeopleData(data);
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <GlobalError error={error} />;

  const filterByRole = (role) =>
    people.filter((person) => person.role === role);

  const leadership = filterByRole("Department Leadership");
  const facultyMembers = [...leadership, ...filterByRole("Faculty Members")];
  const staffMembers = filterByRole("Staff Members");
  const formerMembers = filterByRole("Former Members");
  const phdScholars = filterByRole("PHD");
  const GraduatedScholars = filterByRole("Graduated Scholars");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div id="people-top" className="mb-10">
        <h1 className="text-3xl font-bold text-primary-500 mb-3">People</h1>
        <p className="text-gray-600 text-lg">
          Meet the faculty, staff, and former members of the Department of
          Electrical Engineering.
        </p>
      </div>
      {/* Navigation Cards */}
      <QuickNavigation />
      {/* Leadership Section */}
      {/* <Suspense fallback={fallback}>
        <DepartmentLeadership leadership={leadership} />
      </Suspense> */}
      {/* Faculty Section */}
      <Suspense fallback={fallback}>
        <FacultySection facultyMembers={facultyMembers} />
      </Suspense>
      {/* Staff Section */}
      <Suspense fallback={fallback}>
        <StaffSection staffMembers={staffMembers} />
      </Suspense>
      {/* Former Members Section */}
      <Suspense fallback={fallback}>
        <FormerMemberSection formerMembers={formerMembers} />
      </Suspense>
      {/* PHD Scholars Section */}
      <Suspense fallback={fallback}>
        <PhDScholarSection phdScholars={phdScholars} />
      </Suspense>
      {/* Graduated Scholars */}
      <Suspense fallback={fallback}>
        <GraduatedScholarSection GraduatedScholars={GraduatedScholars} />
      </Suspense>
      {/* Back to Top Button */}
      <Suspense fallback={null}>
        <BackToTopButton to={"people-top"} />
      </Suspense>
    </div>
  );
};

export default People;
