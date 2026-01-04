const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsCarouselService {
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
    if (!url) {
      return null;
    }
    
    const patterns = [
      /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        const convertedUrl = `https://lh3.googleusercontent.com/d/${match[1]}`;
        return convertedUrl;
      }
    }

    return url;
  }

  async fetchCarousel(range = "Carousel Images!A2:G100") {
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      const carouselData = rows.map((row, index) => {
        const imageUrl = row[6] || '';
        
        const convertedUrl = this.convertGoogleDriveUrl(imageUrl);
        return {
          documentId: `carousel-${index + 1}`,
          Heading: row[0] || '',
          Description: row[1] || '',
          Button1Label: row[2] || '',
          Button1Link: row[3] || '',
          Button2Label: row[4] || '',
          Button2Link: row[5] || '',
          Image: {
            url: convertedUrl || ''
          }
        };
      });
      
      return carouselData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GoogleSheetsCarouselService;
