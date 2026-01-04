const googleSheetsNewsService = require("../services/googleSheetsNews");

const getNews = async (req, res) => {
  try {
    const sheetsData = await googleSheetsNewsService.fetchNews();

    res.json({
      success: true,
      count: sheetsData.length,
      data: sheetsData,
    });
  } catch (error) {
    console.error("Error in getNews:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch news data"
    });
  }
};

module.exports = { getNews };
