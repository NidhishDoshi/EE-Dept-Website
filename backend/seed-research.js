// Research Projects Seeder - Lorem Ipsum Data
// Run with: node seed-research.js

const { createStrapi } = require("@strapi/strapi");

async function seed() {
  console.log("Starting Strapi for seeding research projects...");

  const strapi = await createStrapi().load();

  console.log("Strapi loaded. Seeding research projects...\n");

  // ========== SPONSORED RESEARCH PROJECTS ==========
  console.log("Adding Sponsored Research Projects...");
  const sponsoredProjects = [
    {
      Title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      Area: "Lorem Ipsum",
      Duration: "2021-24",
      PI: "Lorem Ipsum",
      CoPI: "Dolor Sit",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
    {
      Title: "Sed do eiusmod tempor incididunt ut labore et dolore",
      Area: "Dolor Sit Amet",
      Duration: "2022-23",
      PI: "Amet Consectetur",
      CoPI: "Adipiscing Elit",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
    {
      Title: "Ut enim ad minim veniam quis nostrud exercitation",
      Area: "Consectetur Adipiscing",
      Duration: "2021-24",
      PI: "Eiusmod Tempor",
      CoPI: "Incididunt Labore",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
    {
      Title: "Duis aute irure dolor in reprehenderit in voluptate",
      Area: "Eiusmod Tempor",
      Duration: "2023-26",
      PI: "Magna Aliqua",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Excepteur sint occaecat cupidatat non proident sunt",
      Area: "Incididunt Labore",
      Duration: "2023-26",
      PI: "Minim Veniam",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Sunt in culpa qui officia deserunt mollit anim id est",
      Area: "Magna Aliqua",
      Duration: "2019-22",
      PI: "Nostrud Exercitation",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
    {
      Title: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur",
      Area: "Ut Enim Veniam",
      Duration: "3 Years",
      PI: "Ullamco Laboris",
      CoPI: "Commodo Consequat",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Neque porro quisquam est qui dolorem ipsum quia dolor",
      Area: "Quis Nostrud",
      Duration: "3 Years",
      PI: "Duis Aute",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Quis autem vel eum iure reprehenderit qui in ea voluptate",
      Area: "Exercitation Ullamco",
      Duration: "15 months",
      PI: "Irure Dolor",
      CoPI: "Multiple Co-PIs",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
    {
      Title: "At vero eos et accusamus et iusto odio dignissimos ducimus",
      Area: "Laboris Nisi",
      Duration: "3 Years",
      PI: "Reprehenderit Voluptate",
      CoPI: "Velit Esse",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Nam libero tempore cum soluta nobis est eligendi optio",
      Area: "Aliquip Commodo",
      Duration: "3 Years",
      PI: "Cillum Dolore",
      CoPI: "Fugiat Nulla",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Temporibus autem quibusdam et aut officiis debitis aut",
      Area: "Consequat Duis",
      Duration: "2 Years",
      PI: "Pariatur Excepteur",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Et harum quidem rerum facilis est et expedita distinctio",
      Area: "Aute Irure",
      Duration: "1.5 Years",
      PI: "Sint Occaecat",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Itaque earum rerum hic tenetur a sapiente delectus",
      Area: "Dolor Reprehenderit",
      Duration: "2025-28",
      PI: "Cupidatat Non",
      CoPI: "Proident Sunt",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Ut aut reiciendis voluptatibus maiores alias consequatur",
      Area: "Voluptate Velit",
      Duration: "3 Years",
      PI: "Culpa Qui",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Similique sunt in culpa qui officia deserunt mollitia",
      Area: "Esse Cillum",
      Duration: "2024-27",
      PI: "Officia Deserunt",
      CoPI: "Mollit Anim",
      Type: "Sponsored",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Sed ut perspiciatis unde omnis iste natus error sit",
      Area: "Dolore Fugiat",
      Duration: "2021-23",
      PI: "Id Est Laborum",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
    {
      Title: "Nisi ut aliquid ex ea commodi consequatur quis autem",
      Area: "Nulla Pariatur",
      Duration: "2021-23",
      PI: "Sed Quia",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
    {
      Title: "Voluptatem accusantium doloremque laudantium totam rem",
      Area: "Excepteur Sint",
      Duration: "2 Years",
      PI: "Consequuntur Magni",
      CoPI: "Multiple Co-PIs",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
    {
      Title: "Aperiam eaque ipsa quae ab illo inventore veritatis",
      Area: "Occaecat Cupidatat",
      Duration: "2 Years",
      PI: "Dolores Eos",
      CoPI: "-",
      Type: "Sponsored",
      CurrentStatus: "Completed",
    },
  ];

  for (const project of sponsoredProjects) {
    try {
      await strapi
        .documents("api::research-project.research-project")
        .create({ data: project, status: "published" });
      console.log(`  ✓ Added: ${project.Title.substring(0, 50)}...`);
    } catch (e) {
      console.log(
        `  ✗ Failed: ${project.Title.substring(0, 30)}... - ${e.message}`
      );
    }
  }

  // ========== CONSULTANCY PROJECTS ==========
  console.log("\nAdding Consultancy/Testing Projects...");
  const consultancyProjects = [
    {
      Title: "Lorem ipsum dolor sit amet consectetur adipiscing",
      Area: "Lorem Ipsum",
      Duration: "6 Months",
      PI: "Dolor Sit Amet",
      CoPI: "Consectetur Adipiscing",
      Type: "Consultancy",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Adipiscing elit sed do eiusmod tempor incididunt",
      Area: "Dolor Sit",
      Duration: "2023-2025",
      PI: "Eiusmod Tempor",
      CoPI: "-",
      Type: "Consultancy",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Ut labore et dolore magna aliqua ut enim ad minim",
      Area: "Amet Consectetur",
      Duration: "Sep 2024 - Apr 2025",
      PI: "Incididunt Labore",
      CoPI: "-",
      Type: "Consultancy",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Veniam quis nostrud exercitation ullamco laboris",
      Area: "Adipiscing Elit",
      Duration: "Apr 2025 - July 2025",
      PI: "Magna Aliqua",
      CoPI: "-",
      Type: "Consultancy",
      CurrentStatus: "Ongoing",
    },
    {
      Title: "Nisi ut aliquip ex ea commodo consequat duis aute",
      Area: "Eiusmod Tempor",
      Duration: "Aug - Oct 2020",
      PI: "Minim Veniam",
      CoPI: "Nostrud Exercitation",
      Type: "Consultancy",
      CurrentStatus: "Completed",
    },
  ];

  for (const project of consultancyProjects) {
    try {
      await strapi
        .documents("api::research-project.research-project")
        .create({ data: project, status: "published" });
      console.log(`  ✓ Added: ${project.Title.substring(0, 50)}...`);
    } catch (e) {
      console.log(
        `  ✗ Failed: ${project.Title.substring(0, 30)}... - ${e.message}`
      );
    }
  }

  console.log("\n========================================");
  console.log("  RESEARCH PROJECTS SEEDING COMPLETE!");
  console.log("========================================");
  console.log(
    `\nTotal: ${sponsoredProjects.length} Sponsored + ${consultancyProjects.length} Consultancy = ${sponsoredProjects.length + consultancyProjects.length} projects`
  );

  await strapi.destroy();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
