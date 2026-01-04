const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsStatisticsService {
  constructor() {
    const keyFilePath = path.resolve(__dirname, '../../secure.json');
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
  }

  async fetchStatistics(range = "Statistics!A2:M2") {
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      if (rows.length === 0) {
        return null;
      }

      const row = rows[0];
      
      return {
        yearsOfService: row[0] || '',
        facultyMembers: row[1] || '',
        students: row[2] || '',
        courses: row[3] || '',
        researchLabs: row[4] || '',
        publications: row[5] || '',
        placementYear: row[6] || '',
        totalStudentsPlaced: row[7] || '',
        totalOffers: row[8] || '',
        highestCTC: row[9] || '',
        averageCTC: row[10] || '',
        medianCTC: row[11] || '',
        placementPercentage: row[12] || ''
      };
    } catch (error) {
      console.error('Error fetching statistics from Google Sheets:', error);
      throw error;
    }
  }
}

module.exports = GoogleSheetsStatisticsService;
