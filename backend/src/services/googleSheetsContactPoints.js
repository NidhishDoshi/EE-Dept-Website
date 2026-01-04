const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsContactPointsService {
  constructor() {
    const keyFilePath = path.resolve(__dirname, '../../secure.json');
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
  }

  async fetchContactPoints(range = "Contact Points!A2:C100") {
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      return rows.map((row, index) => ({
        id: index + 1,
        Name: row[0] || '',
        Email: row[1] || '',
        Number: row[2] || ''
      }));
    } catch (error) {
      console.error('Error fetching contact points from Google Sheets:', error);
      throw error;
    }
  }
}

module.exports = GoogleSheetsContactPointsService;
