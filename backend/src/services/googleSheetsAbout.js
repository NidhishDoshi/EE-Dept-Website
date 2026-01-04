const { google } = require("googleapis");
const path = require("path");

class GoogleSheetsAboutService {
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "../../secure.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    this.sheets = google.sheets({ version: "v4", auth: this.auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
  }

  // Convert Google Drive links to direct image URLs
  convertGoogleDriveUrl(url) {
    if (!url) return url;
    
    // Match various Google Drive URL formats
    const patterns = [
      /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        // Use direct download link which works better for embedding
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    }

    // If not a Google Drive link, return as is
    return url.trim();
  }

  async fetchAboutData(range = "AboutPage!A2:F100") {
    // A2 starts from row 2, skipping headers
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      // Transform rows to match Strapi structure
      return rows.map((row, index) => ({
        id: row[0] || index + 1,
        Title: row[1] || "",
        Description: row[2] || "", // HTML content with <youtube-video> tags
        createdAt: row[3] || new Date().toISOString(),
        Image: row[4] ? row[4].split(",").map((url, idx) => ({
          id: `${index}-${idx}`,
          url: this.convertGoogleDriveUrl(url),
          alternativeText: row[5] || "Image"
        })) : []
      }));
    } catch (error) {
      console.error("Error fetching About data from Google Sheets:", error.message);
      throw error;
    }
  }
}

module.exports = new GoogleSheetsAboutService();
