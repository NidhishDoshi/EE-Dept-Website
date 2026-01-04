const GoogleSheetsResearchProjectsService = require('../services/googleSheetsResearchProjects');

const getResearchProjects = async (req, res) => {
  try {
    const service = new GoogleSheetsResearchProjectsService();
    const data = await service.fetchResearchProjects();
    
    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error in getResearchProjects:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch research projects data"
    });
  }
};

module.exports = { getResearchProjects };
