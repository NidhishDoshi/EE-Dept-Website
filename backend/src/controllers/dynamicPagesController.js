const googleSheetsDynamicService = require("../services/googleSheetsDynamic");

/**
 * Get list of all available dynamic pages
 */
const getDynamicPages = async (req, res) => {
  try {
    const dynamicSheets = await googleSheetsDynamicService.getDynamicSheets();

    res.json({
      success: true,
      count: dynamicSheets.length,
      data: dynamicSheets,
    });
  } catch (error) {
    console.error("Error in getDynamicPages:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch dynamic pages"
    });
  }
};

/**
 * Get content for a specific dynamic page by slug
 */
const getDynamicPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        error: "Slug parameter is required"
      });
    }

    const pageContent = await googleSheetsDynamicService.fetchSheetBySlug(slug);

    res.json({
      success: true,
      data: pageContent,
    });
  } catch (error) {
    console.error(`Error in getDynamicPageBySlug for slug "${req.params.slug}":`, error);
    
    // Return 404 if page not found
    if (error.message.includes("No dynamic page found")) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch dynamic page content"
    });
  }
};

/**
 * Get content for a specific dynamic page by sheet name
 */
const getDynamicPageByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Sheet name parameter is required"
      });
    }

    const pageContent = await googleSheetsDynamicService.fetchSheetContent(name);

    res.json({
      success: true,
      data: pageContent,
    });
  } catch (error) {
    console.error(`Error in getDynamicPageByName for name "${req.params.name}":`, error);
    
    // Return 404 if page not found or is reserved
    if (error.message.includes("reserved")) {
      return res.status(403).json({
        success: false,
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch dynamic page content"
    });
  }
};

module.exports = { 
  getDynamicPages,
  getDynamicPageBySlug,
  getDynamicPageByName
};
