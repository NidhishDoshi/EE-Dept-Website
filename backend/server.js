const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import all controllers
const aboutController = require("./src/controllers/aboutController");
const newsController = require("./src/controllers/newsController");
const peopleController = require("./src/controllers/peopleController");
const talksEventsController = require("./src/controllers/talksEventsController");
const researchProjectsController = require("./src/controllers/researchProjectsController");
const researchLabsController = require("./src/controllers/researchLabsController");
const galleryController = require("./src/controllers/galleryController");
const carouselController = require("./src/controllers/carouselController");
const faqController = require("./src/controllers/faqController");
const contactPointsController = require("./src/controllers/contactPointsController");
const statisticsController = require("./src/controllers/statisticsController");

const app = express();
const PORT = process.env.PORT || 1337;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "EE Department API Server",
    status: "Running with Google Sheets",
    timestamp: new Date().toISOString()
  });
});

// Debug: Check if controllers are loaded properly
console.log("Controllers loaded:", {
  about: typeof aboutController.getAboutData,
  news: typeof newsController.getNews,
  people: typeof peopleController.getPeople,
  talksEvents: typeof talksEventsController.getTalksEvents,
  researchProjects: typeof researchProjectsController.getResearchProjects,
  researchLabs: typeof researchLabsController.getResearchLabs,
  gallery: typeof galleryController.getGallery,
  carousel: typeof carouselController.getCarousel,
  faq: typeof faqController.getFAQ,
  contactPoints: typeof contactPointsController.getContactPoints,
  statistics: typeof statisticsController.getStatistics
});

// API Routes
app.get("/api/about", aboutController.getAboutData);

// Routes with -sheets suffix (original)
app.get("/api/news-sheets", newsController.getNews);
app.get("/api/people-sheets", peopleController.getPeople);
app.get("/api/talks-events-sheets", talksEventsController.getTalksEvents);
app.get("/api/research-projects-sheets", researchProjectsController.getResearchProjects);
app.get("/api/research-labs-sheets", researchLabsController.getResearchLabs);
app.get("/api/gallery-sheets", galleryController.getGallery);
app.get("/api/carousel-sheets", carouselController.getCarousel);
app.get("/api/faq-sheets", faqController.getFAQ);
app.get("/api/contact-points-sheets", contactPointsController.getContactPoints);
app.get("/api/statistics-sheets", statisticsController.getStatistics);

// Alternative routes without -sheets suffix (for frontend compatibility)
app.get("/api/newss", newsController.getNews);
app.get("/api/news", newsController.getNews);
app.get("/api/peoples", peopleController.getPeople);
app.get("/api/people", peopleController.getPeople);
app.get("/api/talk-and-events", talksEventsController.getTalksEvents);
app.get("/api/talks-events", talksEventsController.getTalksEvents);
app.get("/api/research-projects", researchProjectsController.getResearchProjects);
app.get("/api/research-labs", researchLabsController.getResearchLabs);
app.get("/api/gallery", galleryController.getGallery);
app.get("/api/carousel", carouselController.getCarousel);
app.get("/api/faq", faqController.getFAQ);
app.get("/api/contact-points", contactPointsController.getContactPoints);
app.get("/api/statistics", statisticsController.getStatistics);

// Recruiters endpoint (returns empty array for now)
app.get("/api/recruiters", (req, res) => {
  res.json({ success: true, data: [] });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Using Google Sheets as data source`);
  console.log(`📝 API endpoints available at http://localhost:${PORT}/api\n`);
});

module.exports = app;