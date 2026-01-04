const GoogleSheetsCarouselService = require('../services/googleSheetsCarousel');

const getCarousel = async (req, res) => {
  try {
    const service = new GoogleSheetsCarouselService();
    const data = await service.fetchCarousel();
    
    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error in getCarousel:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch carousel data"
    });
  }
};

module.exports = { getCarousel };
