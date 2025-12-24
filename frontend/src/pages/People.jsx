import { lazy, Suspense, useMemo } from "react";

import GlobalError from "../components/GlobalError";
import Loading from "../components/Loading";
import usePeopleInfo from "../hooks/usePeopleInfo";
import { constant } from "../constant/constant";

const STRAPI_ROOT = constant.baseURL.replace("/api", "");

// Lazy load People section components
const NavCard = lazy(() => import("../components/Academics/NavCard"));
// const DepartmentLeadership = lazy(() =>
//   import("../components/People/DepartmentLeadership")
// );
const FacultySection = lazy(() =>
  import("../components/People/FacultySection")
);
const StaffSection = lazy(() => import("../components/People/StaffSection"));
const MSStudentSection = lazy(() =>
  import("../components/People/MSStudentSection")
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
        title="MS Students"
        icon={<i className="fas fa-user-graduate"></i>}
        targetId="ms-students"
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
    let role = person.Role;

    // Normalize roles to handle variations in data entry
    if (role === "Faculty") role = "Faculty Members";
    if (role === "Staff") role = "Staff Members";

    let imageUrl = null;
    if (person.Image) {
        // Handle both flattened and nested structures just in case
        const imgData = person.Image.data ? person.Image.data.attributes : person.Image;
        if (imgData && imgData.url) {
             imageUrl = imgData.url.startsWith("http") 
            ? imgData.url 
            : `${STRAPI_ROOT}${imgData.url}`;
        }
    }

    const base = {
      id: person.documentId,
      name: person.Name,
      title: person.Designation,
      email: person.Email,
      phone: person.Contact,
      website: person.Website,
      image: imageUrl,
      role: role,
      education: person.Education,
    };

    switch (role) {
      case "Faculty Members":
      case "Department Leadership":
      case "PhD Scholars":
      case "Graduated Scholars":
      case "MS":
        return { ...base, expertise: person.Domain };
      case "Staff Members":
        return { ...base, office: person.Domain };
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
  const msStudents = filterByRole("MS");
  const phdScholars = filterByRole("PHD");
  const GraduatedScholars = filterByRole("Graduated Scholars");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div id="people-top" className="mb-10">
        <h1 className="text-3xl font-bold text-primary-500 mb-3">People</h1>
        <p className="text-gray-600 text-lg">
          Meet the faculty, staff, and students of the Department of
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
      {/* MS Students Section */}
      <Suspense fallback={fallback}>
        <MSStudentSection msStudents={msStudents} />
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
