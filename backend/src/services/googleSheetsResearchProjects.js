const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsResearchProjectsService {
  constructor() {
    const keyFilePath = path.resolve(__dirname, '../../secure.json');
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
  }

  async fetchResearchProjects(range = "ResearchProjects!A2:F100") {
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      return rows.map((row, index) => ({
        id: index + 1,
        Type: row[0] || '',
        Title: row[1] || '',
        Duration: row[2] || '',
        PI: row[3] || '',
        CoPI: row[4] || '',
        CurrentStatus: row[5] || '',
      }));
    } catch (error) {
      console.error('Error fetching research projects from Google Sheets:', error);
      throw error;
    }
  }
}

module.exports = GoogleSheetsResearchProjectsService;
