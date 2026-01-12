const express = require("express");
const cors = require("cors");
const path = require("path");
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
const dynamicPagesController = require("./src/controllers/dynamicPagesController");

const app = express();
const PORT = parseInt(process.env.PORT) || 1337;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for VM deployment
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

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

// Dynamic pages endpoints
app.get("/api/dynamic-pages", dynamicPagesController.getDynamicPages);
app.get("/api/dynamic-pages/:slug", dynamicPagesController.getDynamicPageBySlug);
app.get("/api/pages/:slug", dynamicPagesController.getDynamicPageBySlug); // Alternative shorter route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Serve frontend for all non-API routes (SPA fallback)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Export app before starting server
module.exports = app;

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});