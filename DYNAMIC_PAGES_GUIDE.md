# Google Sheets CMS - Dynamic Pages Implementation

## Overview

This implementation provides a complete Google Sheets-based CMS solution where new pages can be created dynamically by adding new sheets (tabs) to your Google Sheet, without requiring code changes or redeployment.

## Architecture

### Backend (Node.js/Express)

**Location:** `backend/`

#### Key Files Created:

1. **`src/services/googleSheetsDynamic.js`**
   - Fetches all sheet metadata from Google Sheets
   - Filters out reserved sheets (fixed routes)
   - Converts sheet names to URL-friendly slugs
   - Fetches content from any sheet

2. **`src/controllers/dynamicPagesController.js`**
   - Handles API requests for dynamic pages
   - Provides endpoints for listing pages and fetching content

3. **Backend Routes Added:**
   ```
   GET /api/dynamic-pages         - List all dynamic pages
   GET /api/pages/:slug            - Get page content by slug
   GET /api/dynamic-pages/:slug    - Alternative endpoint
   ```

### Frontend (React)

**Location:** `frontend/`

#### Key Files Created:

1. **`src/hooks/useDynamicPages.js`**
   - Custom React hooks for fetching dynamic pages
   - `useDynamicPages()` - List all pages
   - `useDynamicPageContent(slug)` - Get specific page content

2. **`src/components/GenericContentRenderer.jsx`**
   - Reusable component for rendering any sheet content
   - Supports HTML, images, and embedded YouTube videos
   - Consistent styling across all pages

3. **`src/pages/DynamicPage.jsx`**
   - Main page component for dynamic routes
   - Handles loading, error states
   - Uses GenericContentRenderer

4. **`src/api/api.js`** (Updated)
   - Added API functions for dynamic pages

5. **`src/components/Navbar/Navbar.jsx`** (Updated)
   - Automatically fetches and displays dynamic pages
   - Adds "More Pages" dropdown when dynamic pages exist

6. **`src/App.jsx`** (Updated)
   - Added route: `/pages/:slug`

## How to Use

### 1. Creating Fixed Pages

Fixed pages have guaranteed routes and use reserved sheet names:

| Sheet Name | Route | Description |
|------------|-------|-------------|
| HOME | `/` | Homepage |
| ABOUT, AboutPage | `/about` | About page |
| CONTACT, ContactPoints | `/contact` | Contact page |
| PEOPLE, Peoples | `/people` | People page |
| NEWS, Newss | `/news` | News page |
| ResearchLabs | `/research/labs` | Research labs |
| ResearchProjects | `/research/projects` | Research projects |
| TalksEvents | `/talks-events` | Talks and events |
| Gallery | `/gallery` | Gallery |
| Carousel | (Homepage carousel) | Carousel |
| FAQ, Faq | `/faq` | FAQ |
| Statistics | `/statistics` | Statistics |

### 2. Creating Dynamic Pages

**To create a new page:**

1. Open your Google Sheet (ID in `.env` file)
2. Add a new sheet (tab) with any name **except** reserved names above
3. Use this column structure:

   | Column A | Column B | Column C | Column D | Column E | Column F |
   |----------|----------|----------|----------|----------|----------|
   | ID | Title | Description | CreatedAt | Image | AltText |

4. The page will automatically appear at: `/pages/{sheet-name-slug}`

**Example:**

- Sheet Name: `Student Resources`
- URL: `/pages/student-resources`
- Navigation: Appears in "More Pages" dropdown

### 3. Sheet Content Format

**Description Column (Column C):**
Supports:
- Plain text
- HTML formatting
- Embedded YouTube videos using `<youtube-video>` tags

**Example with YouTube:**
```html
<p>This is some content.</p>
<youtube-video>
  <iframe src="https://www.youtube.com/watch?v=VIDEO_ID" 
          width="560" height="315" frameborder="0" 
          allowfullscreen></iframe>
</youtube-video>
<p>More content here.</p>
```

**Images (Column E):**
- Comma-separated Google Drive links
- Automatically converted to direct display URLs
- Example: `https://drive.google.com/file/d/FILE_ID1/view,https://drive.google.com/file/d/FILE_ID2/view`

## API Endpoints

### Backend API

**Base URL:** `http://localhost:1337/api`

#### Get All Dynamic Pages
```http
GET /api/dynamic-pages
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 123456,
      "name": "Student Resources",
      "slug": "student-resources",
      "index": 5
    },
    {
      "id": 123457,
      "name": "Alumni Network",
      "slug": "alumni-network",
      "index": 6
    }
  ]
}
```

#### Get Dynamic Page Content
```http
GET /api/pages/:slug
```

**Example:** `GET /api/pages/student-resources`

**Response:**
```json
{
  "success": true,
  "data": {
    "sheetName": "Student Resources",
    "slug": "student-resources",
    "content": [
      {
        "id": "1",
        "title": "Study Materials",
        "description": "<p>Access course materials...</p>",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "images": [
          {
            "id": "0-0",
            "url": "https://lh3.googleusercontent.com/d/FILE_ID",
            "alternativeText": "Study materials"
          }
        ]
      }
    ],
    "count": 1,
    "lastUpdated": "2025-01-05T12:00:00.000Z"
  }
}
```

## Security Features

✅ **API Keys Protected:** Google service account credentials stored in `backend/secure.json` (never sent to client)

✅ **Reserved Sheet Protection:** Fixed routes cannot be accessed via dynamic endpoints

✅ **Input Validation:** Slug validation and sanitization

✅ **Error Handling:** Graceful error messages for invalid pages

## Navigation Behavior

### Desktop
- Fixed pages in main navigation
- Dynamic pages in "More Pages" dropdown (if any exist)

### Mobile
- All pages in mobile menu
- Dynamic pages in expandable "More Pages" section

## Development

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend `.env`:**
```env
GOOGLE_SHEET_ID=your_sheet_id_here
PORT=1337
```

## Deployment Considerations

1. **No Redeployment Needed:** New sheets automatically create pages
2. **Caching:** Pages cached for 5 minutes on frontend
3. **SEO:** Each dynamic page has proper title and metadata
4. **Performance:** Lazy-loaded components, optimized images

## Troubleshooting

### Page Not Appearing

1. Check sheet name is not reserved
2. Verify sheet is not hidden in Google Sheets
3. Check browser console for API errors
4. Refresh to clear cache

### Content Not Displaying

1. Verify column structure (A-F)
2. Check for empty rows
3. Validate image URLs
4. Ensure Google Sheets API access

### Navigation Issues

1. Clear browser cache
2. Check if `useDynamicPages` hook is loading
3. Verify API endpoint is responding

## Testing

### Test New Dynamic Page

1. **Create Sheet:** Add sheet named "Test Page"
2. **Add Content:** Add row with test data
3. **Verify API:**
   ```bash
   curl http://localhost:1337/api/dynamic-pages
   ```
4. **Access Page:** Navigate to `http://localhost:5173/pages/test-page`
5. **Check Navigation:** "More Pages" should appear with "Test Page"

### Test Reserved Sheet Protection

```bash
curl http://localhost:1337/api/pages/ABOUT
```
Should return 403 error.

## Advanced Usage

### Custom Content Rendering

To customize how content renders, modify:
- `frontend/src/components/GenericContentRenderer.jsx`

### Adding More Fixed Routes

Update `RESERVED_SHEETS` in:
- `backend/src/services/googleSheetsDynamic.js`

### Changing Page Layout

Modify:
- `frontend/src/pages/DynamicPage.jsx`

## Best Practices

1. **Sheet Names:** Use descriptive, URL-friendly names
2. **Content:** Keep descriptions focused and scannable
3. **Images:** Optimize before uploading to Google Drive
4. **Organization:** Arrange sheets in logical order (reflects in navigation)
5. **Testing:** Test new pages before sharing links

## Future Enhancements

Potential improvements:
- [ ] Add search across dynamic pages
- [ ] Custom templates per page type
- [ ] Analytics tracking
- [ ] Comments/feedback system
- [ ] Version history
- [ ] Draft/publish workflow
- [ ] Custom metadata per page

## Support

For issues or questions:
1. Check this documentation
2. Review console errors
3. Verify Google Sheets permissions
4. Check API endpoint responses

---

**Implementation Date:** January 5, 2026
**Version:** 1.0.0
