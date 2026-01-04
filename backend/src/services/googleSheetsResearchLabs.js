const { google } = require('googleapis');
const path = require('path');

class GoogleSheetsResearchLabsService {
  constructor() {
    const keyFilePath = path.resolve(__dirname, '../../secure.json');
    this.auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets.readonly',
        'https://www.googleapis.com/auth/drive.readonly'
      ],
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    this.drive = google.drive({ version: 'v3', auth: this.auth });
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

  async fetchImagesFromFolder(folderUrl) {
    if (!folderUrl) {
      return [];
    }

    
    // Extract folder ID from various Google Drive folder URL formats
    const folderIdPatterns = [
      /drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/drive\/u\/\d+\/folders\/([a-zA-Z0-9_-]+)/,
      /folders\/([a-zA-Z0-9_-]+)/,
    ];

    let folderId = null;
    for (const pattern of folderIdPatterns) {
      const match = folderUrl.match(pattern);
      if (match && match[1]) {
        folderId = match[1];
        break;
      }
    }

    if (!folderId) {
      return [];
    }

    try {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
        fields: 'files(id, name, mimeType)',
        orderBy: 'name',
      });

      const files = response.data.files || [];
      
      return files.map(file => `https://lh3.googleusercontent.com/d/${file.id}`);
    } catch (error) {
      console.error('Error fetching images from folder:', folderUrl);
      console.error('Error details:', error.message);
      if (error.code) {
        console.error('Error code:', error.code);
      }
      return [];
    }
  }

  async fetchResearchLabs(range = "ResearchLab!A2:D100") {
    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = res.data.values || [];
      
      // Process each lab and fetch images from folder
      const labsWithImages = await Promise.all(
        rows.map(async (row, index) => {
          const folderUrl = row[2] || '';
          const images = await this.fetchImagesFromFolder(folderUrl);
          
          const lab = {
            id: index + 1,
            documentId: `lab-${index + 1}`,
            Type: row[0] || '',
            Name: row[1] || '',
            description: row[3] || '',
            Picture: images.length > 0 ? images.map(url => ({ url })) : [],
          };
          
          
          return lab;
        })
      );

      return labsWithImages;
    } catch (error) {
      console.error('Error fetching research labs from Google Sheets:', error);
      throw error;
    }
  }
}

module.exports = GoogleSheetsResearchLabsService;
