const GoogleSheetsFAQService = require('../services/googleSheetsFAQ');

const getFAQ = async (req, res) => {
  try {
    const service = new GoogleSheetsFAQService();
    const data = await service.fetchFAQ();
    
    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error in getFAQ:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch FAQ data"
    });
  }
};

module.exports = { getFAQ };
