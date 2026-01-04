const GoogleSheetsContactPointsService = require('../services/googleSheetsContactPoints');

const getContactPoints = async (req, res) => {
  try {
    const service = new GoogleSheetsContactPointsService();
    const data = await service.fetchContactPoints();
    
    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error in getContactPoints:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch contact points data"
    });
  }
};

module.exports = { getContactPoints };
