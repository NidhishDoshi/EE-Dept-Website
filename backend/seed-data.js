/**
 * Seed Script for EE Department Website
 * Run this after Strapi is running: node seed-data.js
 */

const axios = require("axios");

const API_URL = "http://localhost:1337/api";

// You need to get an API token from Strapi Admin
// Settings -> API Tokens -> Create new API Token (Full Access)
const API_TOKEN = "YOUR_API_TOKEN_HERE";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};

// ============ DUMMY DATA ============

const peopleData = [
  {
    Name: "Dr. Rajesh Kumar",
    Designation: "Professor & Head",
    Role: "Department Leadership",
    Email: "rajesh.kumar@iitdh.ac.in",
    Phone: "+91-836-2212345",
    Domain: "Power Systems, Smart Grids",
    Website: "https://iitdh.ac.in/~rajesh",
    Education: "Ph.D. IIT Bombay, M.Tech IIT Delhi, B.Tech NIT Trichy",
  },
  {
    Name: "Dr. Priya Sharma",
    Designation: "Associate Professor",
    Role: "Faculty Members",
    Email: "priya.sharma@iitdh.ac.in",
    Phone: "+91-836-2212346",
    Domain: "Control Systems, Robotics",
    Website: "https://iitdh.ac.in/~priya",
  },
  {
    Name: "Dr. Amit Patel",
    Designation: "Assistant Professor",
    Role: "Faculty Members",
    Email: "amit.patel@iitdh.ac.in",
    Phone: "+91-836-2212347",
    Domain: "VLSI Design, Embedded Systems",
    Website: "https://iitdh.ac.in/~amit",
  },
  {
    Name: "Dr. Sneha Reddy",
    Designation: "Assistant Professor",
    Role: "Faculty Members",
    Email: "sneha.reddy@iitdh.ac.in",
    Phone: "+91-836-2212348",
    Domain: "Signal Processing, Machine Learning",
    Website: "https://iitdh.ac.in/~sneha",
  },
  {
    Name: "Dr. Vikram Singh",
    Designation: "Associate Professor",
    Role: "Faculty Members",
    Email: "vikram.singh@iitdh.ac.in",
    Phone: "+91-836-2212349",
    Domain: "Communication Systems, 5G Networks",
    Website: "https://iitdh.ac.in/~vikram",
  },
  {
    Name: "Dr. Ananya Gupta",
    Designation: "Assistant Professor",
    Role: "Faculty Members",
    Email: "ananya.gupta@iitdh.ac.in",
    Phone: "+91-836-2212350",
    Domain: "Power Electronics, Renewable Energy",
    Website: "https://iitdh.ac.in/~ananya",
  },
  {
    Name: "Mr. Suresh Babu",
    Designation: "Technical Officer",
    Role: "Staff Members",
    Email: "suresh.babu@iitdh.ac.in",
    Phone: "+91-836-2212360",
  },
  {
    Name: "Ms. Lakshmi Devi",
    Designation: "Administrative Assistant",
    Role: "Staff Members",
    Email: "lakshmi.devi@iitdh.ac.in",
    Phone: "+91-836-2212361",
  },
  {
    Name: "Rahul Verma",
    Designation: "PhD Scholar",
    Role: "PHD",
    Email: "rahul.phd@iitdh.ac.in",
    Domain: "Power Systems",
  },
  {
    Name: "Meera Krishnan",
    Designation: "PhD Scholar",
    Role: "PHD",
    Email: "meera.phd@iitdh.ac.in",
    Domain: "VLSI Design",
  },
];

const newsData = [
  {
    Title: "Prof. Rajesh Kumar receives Best Paper Award at IEEE Conference",
    Description:
      "Our Head of Department, Prof. Rajesh Kumar, has been honored with the Best Paper Award at the IEEE International Conference on Power Systems held in Singapore.",
    Date: "2025-12-01",
  },
  {
    Title: "EE Department inaugurates new Power Electronics Lab",
    Description:
      "The state-of-the-art Power Electronics Laboratory was inaugurated by the Director. The lab features advanced equipment for research in electric vehicles and renewable energy.",
    Date: "2025-11-15",
  },
  {
    Title: "Student team wins Smart India Hackathon 2025",
    Description:
      "A team of EE students won first prize at SIH 2025 for their innovative solution on smart grid management using AI/ML techniques.",
    Date: "2025-11-10",
  },
  {
    Title: "Workshop on 5G and Beyond Communications",
    Description:
      "The department organized a two-day workshop on next-generation communication systems with participation from industry experts and researchers.",
    Date: "2025-10-25",
  },
  {
    Title: "New M.Tech program in VLSI Design approved",
    Description:
      "IIT Dharwad has approved a new M.Tech specialization in VLSI Design and Embedded Systems starting from academic year 2026-27.",
    Date: "2025-10-15",
  },
];

const researchLabsData = [
  {
    Name: "Power Electronics and Drives Laboratory",
    Type: "Research Lab",
    Description:
      "Research on power converters, motor drives, electric vehicles, and renewable energy integration.",
    Link: "https://iitdh.ac.in/labs/power-electronics",
  },
  {
    Name: "Control Systems Laboratory",
    Type: "Research Lab",
    Description:
      "Advanced control theory, robotics, autonomous systems, and industrial automation research.",
    Link: "https://iitdh.ac.in/labs/control",
  },
  {
    Name: "VLSI Design Laboratory",
    Type: "Research Lab",
    Description:
      "Digital and analog IC design, FPGA prototyping, and SoC development.",
    Link: "https://iitdh.ac.in/labs/vlsi",
  },
  {
    Name: "Signal Processing Laboratory",
    Type: "Research Lab",
    Description:
      "Image processing, audio/speech processing, biomedical signal analysis, and ML applications.",
    Link: "https://iitdh.ac.in/labs/signal-processing",
  },
  {
    Name: "Communication Systems Laboratory",
    Type: "Research Lab",
    Description:
      "Wireless communications, 5G/6G networks, IoT, and antenna design.",
    Link: "https://iitdh.ac.in/labs/communication",
  },
  {
    Name: "High Voltage Laboratory",
    Type: "Teaching Lab",
    Description:
      "High voltage testing, insulation studies, and power system protection.",
    Link: "https://iitdh.ac.in/labs/high-voltage",
  },
];

const researchProjectsData = [
  {
    Title: "Smart Grid Integration of Distributed Renewable Energy Sources",
    Area: "Power Systems",
    PI: "Dr. Rajesh Kumar",
    CoPI: "Dr. Ananya Gupta",
    Type: "Sponsored",
    Duration: "2024-2027",
    FundingAgency: "DST",
    CurrentStatus: "Ongoing",
    Amount: "85 Lakhs",
  },
  {
    Title: "Development of Indigenous 5G Base Station",
    Area: "Communication Systems",
    PI: "Dr. Vikram Singh",
    Type: "Sponsored",
    Duration: "2023-2026",
    FundingAgency: "DoT",
    CurrentStatus: "Ongoing",
    Amount: "1.2 Crores",
  },
  {
    Title: "AI-based Fault Detection in Power Distribution Networks",
    Area: "Power Systems",
    PI: "Dr. Rajesh Kumar",
    CoPI: "Dr. Sneha Reddy",
    Type: "Consultancy",
    Duration: "2024-2025",
    FundingAgency: "KPTCL",
    CurrentStatus: "Ongoing",
    Amount: "25 Lakhs",
  },
  {
    Title: "Low-Power VLSI Design for IoT Applications",
    Area: "VLSI",
    PI: "Dr. Amit Patel",
    Type: "Sponsored",
    Duration: "2023-2026",
    FundingAgency: "SERB",
    CurrentStatus: "Ongoing",
    Amount: "45 Lakhs",
  },
  {
    Title: "Autonomous Mobile Robot for Warehouse Management",
    Area: "Control Systems",
    PI: "Dr. Priya Sharma",
    Type: "Industry",
    Duration: "2024-2025",
    FundingAgency: "Flipkart",
    CurrentStatus: "Ongoing",
    Amount: "35 Lakhs",
  },
];

const coursesData = [
  {
    CourseCode: "EE101",
    CourseName: "Basic Electrical Engineering",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE201",
    CourseName: "Circuit Theory",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE202",
    CourseName: "Electronic Devices and Circuits",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE203",
    CourseName: "Signals and Systems",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE204",
    CourseName: "Electromagnetic Theory",
    Credits: 3,
    Type: "Core",
  },
  {
    CourseCode: "EE301",
    CourseName: "Control Systems",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE302",
    CourseName: "Power Electronics",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE303",
    CourseName: "Digital Signal Processing",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE304",
    CourseName: "Communication Systems",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE305",
    CourseName: "Electrical Machines",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE401",
    CourseName: "Power Systems",
    Credits: 4,
    Type: "Core",
  },
  {
    CourseCode: "EE402",
    CourseName: "VLSI Design",
    Credits: 4,
    Type: "Elective",
  },
  {
    CourseCode: "EE403",
    CourseName: "Renewable Energy Systems",
    Credits: 3,
    Type: "Elective",
  },
  {
    CourseCode: "EE404",
    CourseName: "Robotics and Automation",
    Credits: 3,
    Type: "Elective",
  },
  {
    CourseCode: "EE405",
    CourseName: "Machine Learning for Engineers",
    Credits: 3,
    Type: "Elective",
  },
];

const talksAndEventsData = [
  {
    Title: "Guest Lecture: Future of Electric Vehicles in India",
    Description:
      "Dr. Arun Mehta from Tata Motors will deliver a talk on EV technology and market trends.",
    Date: "2025-12-15",
    Venue: "Lecture Hall Complex, LH-101",
    Speaker: "Dr. Arun Mehta, Tata Motors",
  },
  {
    Title: "Workshop: FPGA Design using Xilinx Vivado",
    Description:
      "A hands-on workshop on FPGA design and implementation for undergraduate students.",
    Date: "2025-12-20",
    Venue: "VLSI Lab, EE Building",
    Speaker: "Dr. Amit Patel",
  },
  {
    Title: "Seminar: 6G Communications - What to Expect",
    Description:
      "An overview of 6G technology, research directions, and potential applications.",
    Date: "2025-12-22",
    Venue: "Seminar Hall, Admin Building",
    Speaker: "Dr. Vikram Singh",
  },
  {
    Title: "Industry Visit: ISRO Satellite Centre",
    Description:
      "A visit to ISRO Satellite Centre, Bengaluru for final year students.",
    Date: "2026-01-10",
    Venue: "ISRO, Bengaluru",
  },
];

const aboutPageData = [
  {
    Title: "About the Department",
    Description:
      "The Department of Electrical Engineering at IIT Dharwad was established in 2016 as one of the founding departments of the institute. We offer comprehensive programs in B.Tech, M.Tech, and Ph.D. with focus on Power Systems, Control Systems, VLSI, Signal Processing, and Communication Systems.",
    Vision:
      "To be a globally recognized center of excellence in electrical engineering education and research, producing industry-ready engineers and innovative solutions for societal challenges.",
    Mission:
      "To provide quality education, foster cutting-edge research, collaborate with industry, and contribute to the technological advancement of the nation.",
  },
];

const admissionsPageData = [
  {
    BTech: {
      heading: "B.Tech in Electrical Engineering",
      description:
        "4-year undergraduate program with comprehensive curriculum covering all major areas of electrical engineering.",
      eligibility: "JEE Advanced qualified candidates",
      seats: 60,
    },
    MTech: {
      heading: "M.Tech Programs",
      description:
        "2-year postgraduate programs with specializations in Power Systems, VLSI Design, and Communication Systems.",
      eligibility:
        "GATE qualified candidates with B.Tech/BE in relevant disciplines",
      seats: 30,
    },
    PhD: {
      heading: "Ph.D. Program",
      description:
        "Research-focused doctoral program with opportunities in all major areas of electrical engineering.",
      eligibility: "M.Tech/MS degree holders or exceptional B.Tech graduates",
    },
  },
];

const faqData = [
  {
    Question: "What are the research areas in the EE department?",
    Answer:
      "Our department focuses on Power Systems & Smart Grids, Control Systems & Robotics, VLSI Design, Signal Processing, and Communication Systems.",
  },
  {
    Question: "How can I apply for PhD in EE?",
    Answer:
      "PhD admissions are conducted twice a year. Candidates must apply through the institute portal and qualify the written test and interview.",
  },
  {
    Question: "Are there any industry collaborations?",
    Answer:
      "Yes, we have active collaborations with companies like Tata Motors, ISRO, KPTCL, Intel, and Texas Instruments.",
  },
  {
    Question: "What facilities are available for students?",
    Answer:
      "We have well-equipped labs including Power Electronics Lab, VLSI Lab, Control Systems Lab, Communication Lab, and a dedicated project lab.",
  },
];

// ============ SEED FUNCTIONS ============

async function createEntry(endpoint, data) {
  try {
    const response = await axios.post(
      `${API_URL}/${endpoint}`,
      { data },
      { headers }
    );
    console.log(
      `✅ Created ${endpoint}: ${data.Name || data.Title || data.CourseName || "Entry"}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `❌ Error creating ${endpoint}:`,
      error.response?.data?.error?.message || error.message
    );
    return null;
  }
}

async function seedAll() {
  console.log("\n🌱 Starting to seed dummy data...\n");

  // People
  console.log("\n👥 Seeding People...");
  for (const person of peopleData) {
    await createEntry("peoples", person);
  }

  // News
  console.log("\n📰 Seeding News...");
  for (const news of newsData) {
    await createEntry("newss", news);
  }

  // Research Labs
  console.log("\n🔬 Seeding Research Labs...");
  for (const lab of researchLabsData) {
    await createEntry("research-labs", lab);
  }

  // Research Projects
  console.log("\n📊 Seeding Research Projects...");
  for (const project of researchProjectsData) {
    await createEntry("research-projects", project);
  }

  // Courses
  console.log("\n📚 Seeding Courses...");
  for (const course of coursesData) {
    await createEntry("courses", course);
  }

  // Talks and Events
  console.log("\n🎤 Seeding Talks and Events...");
  for (const event of talksAndEventsData) {
    await createEntry("talk-and-events", event);
  }

  // FAQs
  console.log("\n❓ Seeding FAQs...");
  for (const faq of faqData) {
    await createEntry("faqs", faq);
  }

  console.log("\n✅ Seeding complete!\n");
  console.log("⚠️  Remember to PUBLISH all entries in Strapi Admin!");
  console.log(
    "   Go to Content Manager → Select each type → Select All → Publish\n"
  );
}

// Run the seeder
seedAll().catch(console.error);
