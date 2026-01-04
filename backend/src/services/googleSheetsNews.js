const { google } = require("googleapis");
const path = require("path");

class GoogleSheetsNewsService {
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
    
    const patterns = [
      /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    }

    return url.trim();
  }

  async fetchNews(range = "news!A2:Z100") {
    // A2 starts from row 2, skipping headers
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      // Transform rows to match structure: Title, description, link
      return rows.map((row, index) => ({
        id: row[0] || index + 1,
        documentId: row[0] || `news-${index + 1}`,
        Title: row[0] || "",
        Description: row[1] || "",
        Link: row[2] || "",
        Date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching News from Google Sheets:", error.message);
      throw error;
    }
  }
}

module.exports = new GoogleSheetsNewsService();
