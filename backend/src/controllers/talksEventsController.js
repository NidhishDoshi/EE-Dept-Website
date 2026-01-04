const googleSheetsTalksEventsService = require("../services/googleSheetsTalksEvents");

const getTalksEvents = async (req, res) => {
  try {
    const sheetsData = await googleSheetsTalksEventsService.fetchTalksEvents();

    res.json({
      success: true,
      count: sheetsData.length,
      data: sheetsData,
    });
  } catch (error) {
    console.error("Error in getTalksEvents:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch talks and events data"
    });
  }
};

module.exports = { getTalksEvents };
