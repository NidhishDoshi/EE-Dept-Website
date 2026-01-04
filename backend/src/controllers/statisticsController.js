const GoogleSheetsStatisticsService = require('../services/googleSheetsStatistics');

const getStatistics = async (req, res) => {
  try {
    const service = new GoogleSheetsStatisticsService();
    const data = await service.fetchStatistics();
    
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error in getStatistics:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch statistics data"
    });
  }
};

module.exports = { getStatistics };
