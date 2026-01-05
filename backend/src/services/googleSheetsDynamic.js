const { google } = require("googleapis");
const path = require("path");

/**
 * Google Sheets Dynamic Pages Service
 * Handles fetching sheet metadata and content for dynamically generated pages
 */
class GoogleSheetsDynamicService {
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "../../secure.json"),
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets.readonly",
        "https://www.googleapis.com/auth/drive.readonly"
      ],
    });

    this.sheets = google.sheets({ version: "v4", auth: this.auth });
    this.drive = google.drive({ version: "v3", auth: this.auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Define reserved sheet names that map to fixed routes
    this.RESERVED_SHEETS = new Set([
      'HOME',
      'ABOUT', 
      'AboutPage',
      'Contact Points',
      'People',
      'news',
      'LABS',
      'ResearchLab',
      'ResearchProjects',
      'Talk and event',
      'Gallery',
      'Carousel Images',
      'FAQ',
      'Statistics'
    ]);
  }

  /**
   * Get all sheet names (tabs) from the Google Sheet
   * Filters out reserved sheets to return only dynamic pages
   * @returns {Promise<Array>} List of dynamic sheet metadata
   */
  async getDynamicSheets() {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
        fields: 'sheets.properties'
      });

      const allSheets = response.data.sheets || [];
      
      // Filter out reserved sheets and hidden sheets
      const dynamicSheets = allSheets
        .filter(sheet => {
          const properties = sheet.properties;
          const sheetName = properties.title;
          
          // Exclude reserved sheets and hidden sheets
          return !this.RESERVED_SHEETS.has(sheetName) && !properties.hidden;
        })
        .map(sheet => {
          const properties = sheet.properties;
          return {
            id: properties.sheetId,
            name: properties.title,
            slug: this.generateSlug(properties.title),
            index: properties.index
          };
        })
        .sort((a, b) => a.index - b.index); // Sort by sheet order

      return dynamicSheets;
    } catch (error) {
      console.error("Error fetching dynamic sheets:", error.message);
      throw error;
    }
  }

  /**
   * Generate URL-friendly slug from sheet name
   * @param {string} sheetName - The sheet name
   * @returns {string} URL-friendly slug
   */
  generateSlug(sheetName) {
    return sheetName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  }

  /**
   * Check if URL is a Google Drive folder link
   */
  isGoogleDriveFolder(url) {
    if (!url) return false;
    return url.includes('drive.google.com/drive/folders/') || 
           (url.includes('drive.google.com') && url.includes('folders'));
  }

  /**
   * Extract folder ID from Google Drive folder URL
   */
  extractFolderId(url) {
    const patterns = [
      /drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/drive\/u\/\d+\/folders\/([a-zA-Z0-9_-]+)/,
      /folders\/([a-zA-Z0-9_-]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  }

  /**
   * Fetch all image files from a Google Drive folder
   */
  async getImagesFromFolder(folderId) {
    try {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
        fields: 'files(id, name, mimeType)',
        orderBy: 'name'
      });

      const files = response.data.files || [];
      return files.map(file => ({
        id: file.id,
        url: `https://lh3.googleusercontent.com/d/${file.id}`,
        alternativeText: file.name.replace(/\.[^/.]+$/, '') // Remove extension
      }));
    } catch (error) {
      console.error(`Error fetching images from folder ${folderId}:`, error.message);
      if (error.code) {
        console.error('Error code:', error.code);
      }
      return [];
    }
  }

  /**
   * Convert Google Drive links to direct image URLs
   */
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

  /**
   * Detect layout type based on sheet name suffix
   * @param {string} sheetName - The sheet name
   * @returns {string} Layout type: 'default', 'image', 'folder', 'table'
   */
  detectLayoutType(sheetName) {
    const lowerName = sheetName.toLowerCase();
    if (lowerName.endsWith('_image')) return 'image';
    if (lowerName.endsWith('_folder')) return 'folder';
    if (lowerName.endsWith('_table')) return 'table';
    return 'default';
  }

  /**
   * Fetch content from a specific sheet by name
   * @param {string} sheetName - The name of the sheet to fetch
   * @returns {Promise<Object>} Sheet content and metadata
   */
  async fetchSheetContent(sheetName) {
    try {
      // First verify this is not a reserved sheet
      if (this.RESERVED_SHEETS.has(sheetName)) {
        throw new Error(`Sheet "${sheetName}" is reserved and cannot be accessed as a dynamic page`);
      }

      // Detect layout type
      const layoutType = this.detectLayoutType(sheetName);

      // Fetch headers (row 1) and data (from row 2)
      const headerRange = `${sheetName}!A1:Z1`;
      const dataRange = `${sheetName}!A2:Z100`;
      
      const [headerRes, dataRes] = await Promise.all([
        this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: headerRange,
        }),
        this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: dataRange,
        })
      ]);

      const headers = headerRes.data.values?.[0] || [];
      const rows = dataRes.data.values || [];

      // Handle different layout types
      let content;
      if (layoutType === 'table') {
        // For table layout, preserve all columns dynamically
        content = this.transformToTableData(headers, rows);
      } else if (layoutType === 'image') {
        // For image layout, focus on single image display
        content = this.transformToImageData(headers, rows);
      } else if (layoutType === 'folder') {
        // For folder layout, optimize for gallery/multiple images (supports folder links)
        content = await this.transformToFolderData(headers, rows);
      } else {
        // Default layout with standard columns
        content = this.transformToDefaultData(headers, rows);
      }

      return {
        sheetName,
        slug: this.generateSlug(sheetName),
        layoutType,
        headers,
        content,
        count: content.length,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching sheet content for "${sheetName}":`, error.message);
      throw error;
    }
  }

  /**
   * Transform data for default layout
   */
  transformToDefaultData(headers, rows) {
    return rows
      .filter(row => row.length > 0 && row.some(cell => cell && cell.trim()))
      .map((row, index) => ({
        id: row[0] || `${index + 1}`,
        title: row[1] || "",
        description: row[2] || "",
        createdAt: row[3] || new Date().toISOString(),
        images: row[4] ? row[4].split(",").map((url, idx) => ({
          id: `${index}-${idx}`,
          url: this.convertGoogleDriveUrl(url),
          alternativeText: row[5] || "Image"
        })) : []
      }));
  }

  /**
   * Transform data for image layout (single prominent image)
   */
  transformToImageData(headers, rows) {
    return rows
      .filter(row => row.length > 0 && row.some(cell => cell && cell.trim()))
      .map((row, index) => {
        const imageCol = headers.findIndex(h => h && h.toLowerCase().includes('image'));
        const titleCol = headers.findIndex(h => h && (h.toLowerCase().includes('title') || h.toLowerCase().includes('name')));
        const descCol = headers.findIndex(h => h && h.toLowerCase().includes('desc'));
        const altCol = headers.findIndex(h => h && h.toLowerCase().includes('alt'));

        const imageUrl = row[imageCol >= 0 ? imageCol : 4] || '';

        return {
          id: row[0] || `${index + 1}`,
          title: row[titleCol >= 0 ? titleCol : 1] || "",
          description: row[descCol >= 0 ? descCol : 2] || "",
          imageUrl: imageUrl ? this.convertGoogleDriveUrl(imageUrl.trim()) : null,
          alternativeText: row[altCol >= 0 ? altCol : 5] || "Image"
        };
      });
  }

  /**
   * Transform data for folder layout (multiple images gallery)
   * Supports both comma-separated image URLs and Google Drive folder links
   */
  async transformToFolderData(headers, rows) {
    const promises = rows
      .filter(row => row.length > 0 && row.some(cell => cell && cell.trim()))
      .map(async (row, index) => {
        const imageCol = headers.findIndex(h => h && h.toLowerCase().includes('image'));
        const titleCol = headers.findIndex(h => h && (h.toLowerCase().includes('title') || h.toLowerCase().includes('name')));
        const descCol = headers.findIndex(h => h && h.toLowerCase().includes('desc'));
        const altCol = headers.findIndex(h => h && h.toLowerCase().includes('alt'));

        const imageUrls = row[imageCol >= 0 ? imageCol : 4] || "";
        const trimmedUrl = imageUrls.trim();
        
        let images = [];
        
        // Check if it's a Google Drive folder link
        if (this.isGoogleDriveFolder(trimmedUrl)) {
          const folderId = this.extractFolderId(trimmedUrl);
          if (folderId) {
            console.log(`Fetching images from Google Drive folder: ${folderId}`);
            images = await this.getImagesFromFolder(folderId);
          }
        } else {
          // Handle comma-separated individual image URLs
          images = imageUrls.split(",").filter(url => url.trim()).map((url, idx) => ({
            id: `${index}-${idx}`,
            url: this.convertGoogleDriveUrl(url.trim()),
            alternativeText: row[altCol >= 0 ? altCol : 5] || `Image ${idx + 1}`
          }));
        }
        
        return {
          id: row[0] || `${index + 1}`,
          title: row[titleCol >= 0 ? titleCol : 1] || "",
          description: row[descCol >= 0 ? descCol : 2] || "",
          images
        };
      });

    return await Promise.all(promises);
  }

  /**
   * Transform data for table layout (preserve all columns)
   */
  transformToTableData(headers, rows) {
    return rows
      .filter(row => row.length > 0 && row.some(cell => cell && cell.trim()))
      .map((row, index) => {
        const rowData = { id: row[0] || `${index + 1}` };
        
        headers.forEach((header, idx) => {
          if (header && idx > 0) { // Skip first column (ID)
            const key = header.trim().replace(/\s+/g, '_').toLowerCase();
            rowData[key] = row[idx] || "";
            
            // Store original header for display
            if (!rowData._headers) rowData._headers = {};
            rowData._headers[key] = header;
          }
        });
        
        return rowData;
      });
  }

  /**
   * Fetch content by slug
   * @param {string} slug - The URL slug
   * @returns {Promise<Object>} Sheet content
   */
  async fetchSheetBySlug(slug) {
    try {
      // Get all dynamic sheets to find matching slug
      const dynamicSheets = await this.getDynamicSheets();
      const matchedSheet = dynamicSheets.find(sheet => sheet.slug === slug);

      if (!matchedSheet) {
        throw new Error(`No dynamic page found with slug: ${slug}`);
      }

      return await this.fetchSheetContent(matchedSheet.name);
    } catch (error) {
      console.error(`Error fetching sheet by slug "${slug}":`, error.message);
      throw error;
    }
  }
}

module.exports = new GoogleSheetsDynamicService();
