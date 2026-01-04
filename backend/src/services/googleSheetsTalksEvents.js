const { google } = require("googleapis");
const path = require("path");

class GoogleSheetsTalksEventsService {
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

  async fetchTalksEvents(range = "Talk and event!A2:L100") {
    // A2 starts from row 2, skipping headers
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      // Transform rows to match structure
      // ID, Title, Speaker, Designation, Venue, Time, Date, Description, Link, imageURL, posterURL, status
      return rows.map((row, index) => ({
        documentId: row[0] || `talk-${index + 1}`,
        id: row[0] || index + 1,
        Title: row[1] || "",
        Speaker: row[2] || "",
        Designation: row[3] || "",
        Venue: row[4] || "",
        Time: row[5] || "",
        Date: row[6] || "",
        Description: row[7] || "",
        Link: row[8] || "",
        Image: row[9] ? {
          url: this.convertGoogleDriveUrl(row[9])
        } : null,
        Poster: row[10] ? {
          url: this.convertGoogleDriveUrl(row[10])
        } : null,
        Status: row[11] || "upcoming",
      }));
    } catch (error) {
      console.error("Error fetching Talks & Events from Google Sheets:", error.message);
      throw error;
    }
  }
}

module.exports = new GoogleSheetsTalksEventsService();
