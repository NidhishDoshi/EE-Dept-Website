const googleSheetsAboutService = require("../services/googleSheetsAbout");

const getAboutData = async (req, res) => {
  try {
    const sheetsData = await googleSheetsAboutService.fetchAboutData();

    res.json({
      success: true,
      count: sheetsData.length,
      data: sheetsData,
    });
  } catch (error) {
    console.error("Error in getAboutData:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch about data"
    });
  }
};

module.exports = { getAboutData };
