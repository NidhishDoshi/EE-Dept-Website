const { google } = require("googleapis");
const path = require("path");

class GoogleSheetsPeopleService {
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

  async fetchPeople(range = "People!A2:J100") {
    // A2 starts from row 2, skipping headers
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      // Transform rows to match structure
      // ID, Role, Name, Designation, Domain, Email, Website, Contact, Education, Image
      return rows.map((row, index) => ({
        documentId: row[0] || `people-${index + 1}`,
        id: row[0] || index + 1,
        Role: row[1] || "",
        Name: row[2] || "",
        Designation: row[3] || "",
        Domain: row[4] || "",
        Email: row[5] || "",
        Website: row[6] || "",
        Contact: row[7] || "",
        Education: row[8] || "",
        Image: row[9] ? {
          url: this.convertGoogleDriveUrl(row[9])
        } : null,
      }));
    } catch (error) {
      console.error("Error fetching People from Google Sheets:", error.message);
      throw error;
    }
  }
}

module.exports = new GoogleSheetsPeopleService();
