const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsFAQService {
  constructor() {
    const keyFilePath = path.resolve(__dirname, '../../secure.json');
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
  }

  async fetchFAQ(range = "FAQ!A2:B100") {
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      return rows.map((row, index) => ({
        id: index + 1,
        Question: row[0] || '',
        Answer: row[1] || ''
      }));
    } catch (error) {
      console.error('Error fetching FAQ from Google Sheets:', error);
      throw error;
    }
  }
}

module.exports = GoogleSheetsFAQService;
