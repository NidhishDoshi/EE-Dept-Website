const googleSheetsPeopleService = require("../services/googleSheetsPeople");

const getPeople = async (req, res) => {
  try {
    const sheetsData = await googleSheetsPeopleService.fetchPeople();

    res.json({
      success: true,
      count: sheetsData.length,
      data: sheetsData,
    });
  } catch (error) {
    console.error("Error in getPeople:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch people data"
    });
  }
};

module.exports = { getPeople };
