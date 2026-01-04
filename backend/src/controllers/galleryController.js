const GoogleSheetsGalleryService = require('../services/googleSheetsGallery');

const getGallery = async (req, res) => {
  try {
    const service = new GoogleSheetsGalleryService();
    const data = await service.fetchGallery();
    
    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error in getGallery:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch gallery data"
    });
  }
};

module.exports = { getGallery };
