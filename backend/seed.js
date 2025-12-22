// Strapi Database Seeder - Run with: node seed.js
// Make sure Strapi is NOT running when you run this script

const { createStrapi } = require("@strapi/strapi");

async function seed() {
  console.log("Starting Strapi for seeding...");

  const strapi = await createStrapi().load();

  console.log("Strapi loaded. Seeding data...\n");

  // ========== PEOPLE ==========
  console.log("Adding People...");
  const people = [
    {
      Name: "Dr. Rajesh Kumar",
      Designation: "Professor and Head",
      Role: "Department Leadership",
      Email: "rajesh.kumar@iitdh.ac.in",
      Domain: "Lorem ipsum dolor sit amet",
    },
    {
      Name: "Dr. Priya Sharma",
      Designation: "Associate Professor",
      Role: "Faculty Members",
      Email: "priya.sharma@iitdh.ac.in",
      Domain: "Consectetur adipiscing elit",
    },
    {
      Name: "Dr. Amit Patel",
      Designation: "Assistant Professor",
      Role: "Faculty Members",
      Email: "amit.patel@iitdh.ac.in",
      Domain: "Sed do eiusmod tempor",
    },
    {
      Name: "Dr. Sneha Reddy",
      Designation: "Assistant Professor",
      Role: "Faculty Members",
      Email: "sneha.reddy@iitdh.ac.in",
      Domain: "Incididunt ut labore",
    },
    {
      Name: "Dr. Vikram Singh",
      Designation: "Associate Professor",
      Role: "Faculty Members",
      Email: "vikram.singh@iitdh.ac.in",
      Domain: "Dolore magna aliqua",
    },
    {
      Name: "Dr. Ananya Gupta",
      Designation: "Assistant Professor",
      Role: "Faculty Members",
      Email: "ananya.gupta@iitdh.ac.in",
      Domain: "Ut enim ad minim veniam",
    },
    {
      Name: "Mr. Suresh Babu",
      Designation: "Technical Officer",
      Role: "Staff Members",
      Email: "suresh.babu@iitdh.ac.in",
      Domain: "",
    },
    {
      Name: "Ms. Lakshmi Devi",
      Designation: "Administrative Assistant",
      Role: "Staff Members",
      Email: "lakshmi.devi@iitdh.ac.in",
      Domain: "",
    },
    {
      Name: "Rahul Verma",
      Designation: "PhD Scholar",
      Role: "PHD",
      Email: "rahul.phd@iitdh.ac.in",
      Domain: "Quis nostrud exercitation",
    },
    {
      Name: "Meera Krishnan",
      Designation: "PhD Scholar",
      Role: "PHD",
      Email: "meera.phd@iitdh.ac.in",
      Domain: "Ullamco laboris nisi",
    },
  ];

  for (const person of people) {
    try {
      await strapi.documents("api::people.people").create({
        data: person,
        status: "published",
      });
      console.log(`  ✓ Added: ${person.Name}`);
    } catch (e) {
      console.log(`  ✗ Failed: ${person.Name} - ${e.message}`);
    }
  }

  // ========== NEWS ==========
  console.log("\nAdding News...");
  const news = [
    {
      Title: "Lorem ipsum dolor sit amet consectetur",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      date: "2025-12-01",
    },
    {
      Title: "Adipiscing elit sed do eiusmod tempor",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      date: "2025-11-15",
    },
    {
      Title: "Incididunt ut labore et dolore magna",
      description:
        "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
      date: "2025-11-10",
    },
    {
      Title: "Ut enim ad minim veniam quis nostrud",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      date: "2025-10-25",
    },
    {
      Title: "Quis nostrud exercitation ullamco laboris",
      description:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
      date: "2025-10-15",
    },
  ];

  for (const item of news) {
    try {
      await strapi.documents("api::news.news").create({
        data: item,
        status: "published",
      });
      console.log(`  ✓ Added: ${item.Title.substring(0, 40)}...`);
    } catch (e) {
      console.log(
        `  ✗ Failed: ${item.Title.substring(0, 30)}... - ${e.message}`
      );
    }
  }

  // ========== RESEARCH LABS ==========
  console.log("\nAdding Research Labs...");
  const labs = [
    { Name: "Lorem Ipsum Research Laboratory", Type: "Research Lab" },
    { Name: "Dolor Sit Amet Laboratory", Type: "Research Lab" },
    { Name: "Consectetur Adipiscing Lab", Type: "Research Lab" },
    { Name: "Eiusmod Tempor Laboratory", Type: "Research Lab" },
    { Name: "Incididunt Systems Lab", Type: "Teaching Lab" },
    { Name: "Magna Aliqua Laboratory", Type: "Teaching Lab" },
  ];

  for (const lab of labs) {
    try {
      await strapi.documents("api::research-lab.research-lab").create({
        data: lab,
        status: "published",
      });
      console.log(`  ✓ Added: ${lab.Name}`);
    } catch (e) {
      console.log(`  ✗ Failed: ${lab.Name} - ${e.message}`);
    }
  }

  // ========== RESEARCH PROJECTS ==========
  console.log("\nAdding Research Projects...");
  const projects = [
    {
      Title: "Lorem ipsum dolor sit amet consectetur adipiscing",
      Area: "Lorem Area",
      PI: "Dr. Rajesh Kumar",
      CoPI: "Dr. Ananya Gupta",
      Type: "Sponsored",
      Duration: "2024-2027",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Sed do eiusmod tempor incididunt ut labore",
      Area: "Ipsum Area",
      PI: "Dr. Vikram Singh",
      Type: "Sponsored",
      Duration: "2023-2026",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Dolore magna aliqua ut enim ad minim",
      Area: "Dolor Area",
      PI: "Dr. Rajesh Kumar",
      Type: "Consultancy",
      Duration: "2024-2025",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Quis nostrud exercitation ullamco laboris nisi",
      Area: "Sit Area",
      PI: "Dr. Amit Patel",
      Type: "Sponsored",
      Duration: "2023-2026",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Duis aute irure dolor in reprehenderit",
      Area: "Amet Area",
      PI: "Dr. Priya Sharma",
      Type: "Industry",
      Duration: "2024-2025",
      CurrentStatus: "Ongoing",
    },
  ];

  for (const project of projects) {
    try {
      await strapi.documents("api::research-project.research-project").create({
        data: project,
        status: "published",
      });
      console.log(`  ✓ Added: ${project.Title.substring(0, 40)}...`);
    } catch (e) {
      console.log(
        `  ✗ Failed: ${project.Title.substring(0, 30)}... - ${e.message}`
      );
    }
  }

  // ========== TALKS AND EVENTS ==========
  console.log("\nAdding Talks and Events...");
  const events = [
    {
      Title: "Lorem Ipsum Dolor Sit Amet",
      Speaker: "Dr. Lorem Ipsum",
      designation: "Professor",
      venue: "Main Auditorium",
      date: "2025-12-15",
    },
    {
      Title: "Consectetur Adipiscing Workshop",
      Speaker: "Dr. Dolor Sit",
      designation: "Industry Expert",
      venue: "Seminar Hall",
      date: "2025-12-20",
    },
    {
      Title: "Eiusmod Tempor Seminar",
      Speaker: "Dr. Amet Consectetur",
      designation: "Research Director",
      venue: "Conference Room",
      date: "2025-12-22",
    },
    {
      Title: "Incididunt Labore Industry Visit",
      Speaker: "",
      designation: "",
      venue: "External",
      date: "2026-01-10",
    },
  ];

  for (const event of events) {
    try {
      await strapi.documents("api::talk-and-event.talk-and-event").create({
        data: event,
        status: "published",
      });
      console.log(`  ✓ Added: ${event.Title}`);
    } catch (e) {
      console.log(`  ✗ Failed: ${event.Title} - ${e.message}`);
    }
  }

  // ========== COURSES ==========
  console.log("\nAdding Courses...");
  const courses = [
    {
      CourseCode: "EE101",
      CourseName: "Lorem Ipsum Fundamentals",
      Credits: "4",
      Semester: "1",
    },
    {
      CourseCode: "EE201",
      CourseName: "Dolor Sit Amet Analysis",
      Credits: "3",
      Semester: "2",
    },
    {
      CourseCode: "EE301",
      CourseName: "Consectetur Adipiscing Systems",
      Credits: "4",
      Semester: "3",
    },
    {
      CourseCode: "EE401",
      CourseName: "Eiusmod Tempor Design",
      Credits: "3",
      Semester: "4",
    },
    {
      CourseCode: "EE501",
      CourseName: "Advanced Lorem Ipsum",
      Credits: "4",
      Semester: "5",
    },
  ];

  for (const course of courses) {
    try {
      await strapi.documents("api::course.course").create({
        data: course,
        status: "published",
      });
      console.log(`  ✓ Added: ${course.CourseCode} - ${course.CourseName}`);
    } catch (e) {
      console.log(`  ✗ Failed: ${course.CourseCode} - ${e.message}`);
    }
  }

  console.log("\n========================================");
  console.log("  SEEDING COMPLETE!");
  console.log("========================================");
  console.log("\nYou can now start Strapi: npm run develop");

  await strapi.destroy();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
