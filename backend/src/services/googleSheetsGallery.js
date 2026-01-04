const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsGalleryService {
  constructor() {
    const keyFilePath = path.resolve(__dirname, '../../secure.json');
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
  }

  convertGoogleDriveUrl(url) {
    if (!url) return null;
    
    const patterns = [
      /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    }

    return url;
  }

  async fetchGallery(range = "Gallery!A2:B100") {
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      return rows.map((row, index) => ({
        id: index + 1,
        Description: row[0] || '',
        Image: {
          url: this.convertGoogleDriveUrl(row[1]) || ''
        }
      }));
    } catch (error) {
      console.error('Error fetching gallery from Google Sheets:', error);
      throw error;
    }
  }
}

module.exports = GoogleSheetsGalleryService;
