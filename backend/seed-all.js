// Strapi Database Seeder - All Collection Types
// Run with: node seed-all.js
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
      Name: "Lorem Ipsum",
      Designation: "Professor",
      Role: "Department Leadership",
      Email: "lorem.ipsum@lorem.edu",
      Domain: "Lorem ipsum dolor sit amet",
    },
    {
      Name: "Dolor Sit",
      Designation: "Associate Professor",
      Role: "Faculty Members",
      Email: "dolor.sit@lorem.edu",
      Domain: "Consectetur adipiscing elit",
    },
    {
      Name: "Amet Consectetur",
      Designation: "Assistant Professor",
      Role: "Faculty Members",
      Email: "amet.cons@lorem.edu",
      Domain: "Sed do eiusmod tempor",
    },
    {
      Name: "Adipiscing Elit",
      Designation: "Assistant Professor",
      Role: "Faculty Members",
      Email: "adipiscing@lorem.edu",
      Domain: "Incididunt ut labore",
    },
    {
      Name: "Eiusmod Tempor",
      Designation: "Associate Professor",
      Role: "Faculty Members",
      Email: "eiusmod@lorem.edu",
      Domain: "Dolore magna aliqua",
    },
    {
      Name: "Incididunt Labore",
      Designation: "Assistant Professor",
      Role: "Faculty Members",
      Email: "incididunt@lorem.edu",
      Domain: "Ut enim ad minim veniam",
    },
    {
      Name: "Magna Aliqua",
      Designation: "Technical Officer",
      Role: "Staff Members",
      Email: "magna@lorem.edu",
      Domain: "",
    },
    {
      Name: "Minim Veniam",
      Designation: "Administrative Assistant",
      Role: "Staff Members",
      Email: "minim@lorem.edu",
      Domain: "",
    },
    {
      Name: "Nostrud Exercitation",
      Designation: "PhD Scholar",
      Role: "PHD",
      Email: "nostrud@lorem.edu",
      Domain: "Quis nostrud exercitation",
    },
    {
      Name: "Ullamco Laboris",
      Designation: "PhD Scholar",
      Role: "PHD",
      Email: "ullamco@lorem.edu",
      Domain: "Ullamco laboris nisi",
    },
  ];

  for (const person of people) {
    try {
      await strapi
        .documents("api::people.people")
        .create({ data: person, status: "published" });
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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "2025-12-01",
    },
    {
      Title: "Adipiscing elit sed do eiusmod tempor",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      date: "2025-11-15",
    },
    {
      Title: "Incididunt ut labore et dolore magna",
      description:
        "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.",
      date: "2025-11-10",
    },
    {
      Title: "Ut enim ad minim veniam quis nostrud",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      date: "2025-10-25",
    },
    {
      Title: "Quis nostrud exercitation ullamco laboris",
      description:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      date: "2025-10-15",
    },
  ];

  for (const item of news) {
    try {
      await strapi
        .documents("api::news.news")
        .create({ data: item, status: "published" });
      console.log(`  ✓ Added: ${item.Title.substring(0, 40)}...`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== RESEARCH LABS ==========
  console.log("\nAdding Research Labs...");
  const labs = [
    { Name: "Lorem Ipsum Laboratory", Type: "Research Lab" },
    { Name: "Dolor Sit Amet Lab", Type: "Research Lab" },
    { Name: "Consectetur Adipiscing Laboratory", Type: "Research Lab" },
    { Name: "Eiusmod Tempor Lab", Type: "Research Lab" },
    { Name: "Incididunt Labore Laboratory", Type: "Teaching Lab" },
    { Name: "Magna Aliqua Lab", Type: "Teaching Lab" },
  ];

  for (const lab of labs) {
    try {
      await strapi
        .documents("api::research-lab.research-lab")
        .create({ data: lab, status: "published" });
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
      PI: "Lorem Ipsum",
      CoPI: "Dolor Sit",
      Type: "Sponsored",
      Duration: "2024-2027",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Sed do eiusmod tempor incididunt ut labore",
      Area: "Ipsum Area",
      PI: "Amet Consectetur",
      Type: "Sponsored",
      Duration: "2023-2026",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Dolore magna aliqua ut enim ad minim",
      Area: "Dolor Area",
      PI: "Lorem Ipsum",
      Type: "Consultancy",
      Duration: "2024-2025",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Quis nostrud exercitation ullamco laboris nisi",
      Area: "Sit Area",
      PI: "Adipiscing Elit",
      Type: "Sponsored",
      Duration: "2023-2026",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Duis aute irure dolor in reprehenderit",
      Area: "Amet Area",
      PI: "Eiusmod Tempor",
      Type: "Industry",
      Duration: "2024-2025",
      CurrentStatus: "Ongoing",
    },
  ];

  for (const project of projects) {
    try {
      await strapi
        .documents("api::research-project.research-project")
        .create({ data: project, status: "published" });
      console.log(`  ✓ Added: ${project.Title.substring(0, 40)}...`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== TALKS AND EVENTS ==========
  console.log("\nAdding Talks and Events...");
  const events = [
    {
      Title: "Lorem Ipsum Dolor Sit Amet",
      Speaker: "Lorem Ipsum",
      designation: "Professor",
      venue: "Lorem Auditorium",
      date: "2025-12-15",
    },
    {
      Title: "Consectetur Adipiscing Workshop",
      Speaker: "Dolor Sit",
      designation: "Lorem Expert",
      venue: "Ipsum Hall",
      date: "2025-12-20",
    },
    {
      Title: "Eiusmod Tempor Seminar",
      Speaker: "Amet Consectetur",
      designation: "Lorem Director",
      venue: "Dolor Room",
      date: "2025-12-22",
    },
    {
      Title: "Incididunt Labore Conference",
      Speaker: "Adipiscing Elit",
      designation: "Professor",
      venue: "Sit Venue",
      date: "2026-01-10",
    },
  ];

  for (const event of events) {
    try {
      await strapi
        .documents("api::talk-and-event.talk-and-event")
        .create({ data: event, status: "published" });
      console.log(`  ✓ Added: ${event.Title}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== COURSES ==========
  console.log("\nAdding Courses...");
  const courses = [
    {
      CourseCode: "LI101",
      CourseName: "Lorem Ipsum Fundamentals",
      Credits: "4",
      Semester: "1",
    },
    {
      CourseCode: "DS201",
      CourseName: "Dolor Sit Analysis",
      Credits: "3",
      Semester: "2",
    },
    {
      CourseCode: "CA301",
      CourseName: "Consectetur Adipiscing Systems",
      Credits: "4",
      Semester: "3",
    },
    {
      CourseCode: "ET401",
      CourseName: "Eiusmod Tempor Design",
      Credits: "3",
      Semester: "4",
    },
    {
      CourseCode: "MA501",
      CourseName: "Magna Aliqua Methods",
      Credits: "4",
      Semester: "5",
    },
  ];

  for (const course of courses) {
    try {
      await strapi
        .documents("api::course.course")
        .create({ data: course, status: "published" });
      console.log(`  ✓ Added: ${course.CourseCode} - ${course.CourseName}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== ABOUT PAGE ==========
  console.log("\nAdding About Page...");
  const aboutPages = [
    {
      Title: "Lorem Ipsum Dolor",
      Description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
          ],
        },
      ],
    },
    {
      Title: "Consectetur Adipiscing",
      Description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
          ],
        },
      ],
    },
  ];

  for (const page of aboutPages) {
    try {
      await strapi
        .documents("api::about-page.about-page")
        .create({ data: page, status: "published" });
      console.log(`  ✓ Added: ${page.Title}`);
    } catch (e) {
      console.log(`  ✗ Failed: ${page.Title} - ${e.message}`);
    }
  }

  // ========== ACAD FAQ ==========
  console.log("\nAdding Academic FAQs...");
  const acadFaqs = [
    {
      Question: "Lorem ipsum dolor sit amet?",
      Answer:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      Question: "Ut enim ad minim veniam?",
      Answer:
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      Question: "Duis aute irure dolor?",
      Answer:
        "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      Question: "Excepteur sint occaecat?",
      Answer:
        "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  for (const faq of acadFaqs) {
    try {
      await strapi
        .documents("api::acad-faq.acad-faq")
        .create({ data: faq, status: "published" });
      console.log(`  ✓ Added: ${faq.Question.substring(0, 30)}...`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== ACADEMIC RULES ==========
  console.log("\nAdding Academic Rules...");
  const academicRules = [
    {
      Rules: {
        title: "Lorem Ipsum Rules",
        items: [
          "Lorem ipsum dolor sit amet",
          "Consectetur adipiscing elit",
          "Sed do eiusmod tempor",
        ],
      },
    },
  ];

  for (const rule of academicRules) {
    try {
      await strapi
        .documents("api::academic-rules.academic-rules")
        .create({ data: rule, status: "published" });
      console.log(`  ✓ Added academic rules`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== ACADEMICRULE ==========
  console.log("\nAdding Academicrule...");
  const academicrules = [
    {
      Title: "Lorem Ipsum Guidelines",
      description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
          ],
        },
      ],
      grading: "Lorem: A+\nIpsum: A\nDolor: B+\nSit: B\nAmet: C",
    },
    {
      Title: "Dolor Sit Amet Policies",
      description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
          ],
        },
      ],
      grading: "Consectetur: 90-100\nAdipiscing: 80-89\nElit: 70-79",
    },
  ];

  for (const rule of academicrules) {
    try {
      await strapi
        .documents("api::academicrule.academicrule")
        .create({ data: rule, status: "published" });
      console.log(`  ✓ Added: ${rule.Title}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== ADMISSION ==========
  console.log("\nAdding Admissions...");
  const admissions = [
    {
      Title: "Lorem Ipsum Admission",
      description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
          ],
        },
      ],
    },
    {
      Title: "Dolor Sit Amet Program",
      description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
          ],
        },
      ],
    },
    {
      Title: "Consectetur Adipiscing Entry",
      description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            },
          ],
        },
      ],
    },
  ];

  for (const admission of admissions) {
    try {
      await strapi
        .documents("api::admission.admission")
        .create({ data: admission, status: "published" });
      console.log(`  ✓ Added: ${admission.Title}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== ADMISSIONS PAGE ==========
  console.log("\nAdding Admissions Page...");
  const admissionsPages = [
    {
      allData: {
        sections: [
          { title: "Lorem Ipsum", content: "Dolor sit amet" },
          { title: "Consectetur", content: "Adipiscing elit" },
        ],
      },
    },
  ];

  for (const page of admissionsPages) {
    try {
      await strapi
        .documents("api::admissions-page.admissions-page")
        .create({ data: page, status: "published" });
      console.log(`  ✓ Added admissions page`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== CAROUSEL IMAGES ==========
  console.log("\nAdding Carousel Images...");
  const carouselImages = [
    { Description: "Lorem ipsum dolor sit amet" },
    { Description: "Consectetur adipiscing elit" },
    { Description: "Sed do eiusmod tempor" },
    { Description: "Incididunt ut labore" },
  ];

  for (const img of carouselImages) {
    try {
      await strapi
        .documents("api::carousel-images.carousel-images")
        .create({ data: img, status: "published" });
      console.log(`  ✓ Added: ${img.Description}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== CONTACT ==========
  console.log("\nAdding Contact...");
  const contacts = [
    {
      Title: "Lorem Ipsum Contact",
      description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Address: Lorem Building, Ipsum Street, Dolor City - 123456",
            },
          ],
        },
      ],
    },
  ];

  for (const contact of contacts) {
    try {
      await strapi
        .documents("api::contact.contact")
        .create({ data: contact, status: "published" });
      console.log(`  ✓ Added: ${contact.Title}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== CONTACT POINTS ==========
  console.log("\nAdding Contact Points...");
  const contactPoints = [
    { Title: "Lorem Ipsum Inquiries", Email: "lorem@ipsum.edu" },
    { Title: "Dolor Sit Amet Support", Email: "dolor@sit.edu" },
    {
      Title: "Consectetur Adipiscing Help",
      Email: "consectetur@adipiscing.edu",
    },
  ];

  for (const cp of contactPoints) {
    try {
      await strapi
        .documents("api::contact-point.contact-point")
        .create({ data: cp, status: "published" });
      console.log(`  ✓ Added: ${cp.Title}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== ELECTIVE COURSES ==========
  console.log("\nAdding Elective Courses...");
  const electiveCourses = [
    {
      coursename: "Lorem Ipsum Elective",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      coursename: "Dolor Sit Amet Course",
      about:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      coursename: "Consectetur Advanced",
      about:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      coursename: "Adipiscing Studies",
      about:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    },
  ];

  for (const course of electiveCourses) {
    try {
      await strapi
        .documents("api::electivecourse.electivecourse")
        .create({ data: course, status: "published" });
      console.log(`  ✓ Added: ${course.coursename}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== FAQ ==========
  console.log("\nAdding FAQs...");
  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      question: "Quis nostrud exercitation ullamco?",
      answer:
        "Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    },
    {
      question: "Voluptate velit esse cillum?",
      answer:
        "Dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      question: "Sunt in culpa qui officia?",
      answer:
        "Deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    },
    {
      question: "Nemo enim ipsam voluptatem?",
      answer:
        "Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
    },
  ];

  for (const faq of faqs) {
    try {
      await strapi
        .documents("api::faq.faq")
        .create({ data: faq, status: "published" });
      console.log(`  ✓ Added: ${faq.question.substring(0, 30)}...`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== GALLERY IMAGES ==========
  console.log("\nAdding Gallery Images...");
  const galleryImages = [
    { Description: "Lorem ipsum dolor sit amet" },
    { Description: "Consectetur adipiscing elit" },
    { Description: "Sed do eiusmod tempor incididunt" },
    { Description: "Ut labore et dolore magna aliqua" },
    { Description: "Ut enim ad minim veniam" },
  ];

  for (const img of galleryImages) {
    try {
      await strapi
        .documents("api::gallery-image.gallery-image")
        .create({ data: img, status: "published" });
      console.log(`  ✓ Added: ${img.Description}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== JOIN AS FACULTY PAGE ==========
  console.log("\nAdding Join As Faculty Pages...");
  const joinFacultyPages = [
    {
      Level: 1,
      Title: "Lorem Ipsum Position",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      Level: 2,
      Title: "Dolor Sit Amet Role",
      Description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      Level: 3,
      Title: "Consectetur Adipiscing Opening",
      Description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];

  for (const page of joinFacultyPages) {
    try {
      await strapi
        .documents("api::join-as-faculty-page.join-as-faculty-page")
        .create({ data: page, status: "published" });
      console.log(`  ✓ Added: ${page.Title}`);
    } catch (e) {
      console.log(`  ✗ Failed - ${e.message}`);
    }
  }

  // ========== DONE ==========
  console.log("\n========================================");
  console.log("  SEEDING COMPLETE!");
  console.log("========================================");
  console.log(
    "\nAll collection types have been populated with lorem ipsum data."
  );
  console.log("You can now start Strapi: npm run develop");

  await strapi.destroy();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
