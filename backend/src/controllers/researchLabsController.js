const GoogleSheetsResearchLabsService = require('../services/googleSheetsResearchLabs');

const getResearchLabs = async (req, res) => {
  try {
    const service = new GoogleSheetsResearchLabsService();
    const data = await service.fetchResearchLabs();
    
    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error in getResearchLabs:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch research labs data"
    });
  }
};

module.exports = { getResearchLabs };
