# Quick Setup Guide - Dynamic Google Sheets CMS

## 🚀 5-Minute Setup

### Step 1: Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server starts at `http://localhost:1337`

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend starts at `http://localhost:5173`

### Step 3: Verify Setup

1. **Check Backend API:**
   ```bash
   curl http://localhost:1337/api/dynamic-pages
   ```
   Should return list of dynamic pages.

2. **Check Frontend:**
   - Open `http://localhost:5173`
   - Look for "More Pages" in navigation (if dynamic sheets exist)

## 📝 Create Your First Dynamic Page

### 1. Open Google Sheet
Find your sheet ID in `backend/.env`:
```env
GOOGLE_SHEET_ID=1Bnmp7ReRpDEC28q_huS7hJXcbjjOOrd39F22GC5cxnA
```

### 2. Create New Sheet
- Click "+" to add new sheet
- Name it: `Test Page`
- **Important:** Don't use reserved names (HOME, ABOUT, etc.)

### 3. Add Column Headers (Row 1)
```
A: ID
B: Title  
C: Description
D: CreatedAt
E: Image
F: AltText
```

### 4. Add Content (Row 2+)
Example row:
```
A2: 1
B2: Welcome
C2: <p>This is my test page!</p>
D2: 2025-01-05
E2: (leave empty or add Google Drive link)
F2: (leave empty)
```

### 5. Access Your Page
Navigate to: `http://localhost:5173/pages/test-page`

The page should appear in the "More Pages" dropdown!

## 🔍 Testing Checklist

- [ ] Backend running on port 1337
- [ ] Frontend running on port 5173
- [ ] API returns dynamic pages: `/api/dynamic-pages`
- [ ] New sheet created with non-reserved name
- [ ] Content added to sheet (starting row 2)
- [ ] Page accessible at `/pages/{slug}`
- [ ] Page appears in navigation dropdown

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── dynamicPagesController.js    # ← New
│   └── services/
│       └── googleSheetsDynamic.js       # ← New
└── server.js                             # ← Updated

frontend/
├── src/
│   ├── api/
│   │   └── api.js                        # ← Updated
│   ├── components/
│   │   ├── GenericContentRenderer.jsx    # ← New
│   │   └── Navbar/Navbar.jsx             # ← Updated
│   ├── hooks/
│   │   └── useDynamicPages.js            # ← New
│   ├── pages/
│   │   └── DynamicPage.jsx               # ← New
│   └── App.jsx                           # ← Updated
```

## 🎯 Key Features

✅ **No Redeployment:** Add sheets = instant new pages
✅ **Auto-Navigation:** Pages appear in menu automatically  
✅ **Generic Rendering:** Same renderer for all pages
✅ **Secure:** API keys stay on backend
✅ **Flexible Content:** Supports text, HTML, images, videos

## 🔗 Important URLs

### Development
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:1337
- **API Docs:** http://localhost:1337/api

### API Endpoints
```
GET /api/dynamic-pages           # List all pages
GET /api/pages/:slug             # Get page content
```

### Example Routes
```
Fixed Routes:
  /                               # Home
  /about                          # About
  /contact                        # Contact
  /people                         # People

Dynamic Routes:
  /pages/test-page                # Test Page sheet
  /pages/student-resources        # Student Resources sheet
  /pages/any-sheet-name           # Any Sheet Name sheet
```

## ⚠️ Reserved Sheet Names

**DO NOT use these for dynamic pages:**
- HOME, ABOUT, AboutPage
- CONTACT, ContactPoints
- PEOPLE, Peoples
- NEWS, Newss
- ResearchLabs, ResearchProjects
- TalksEvents, Gallery, Carousel
- FAQ, Faq, Statistics

## 🐛 Troubleshooting

### Page Not Showing?
1. Check sheet name is not reserved
2. Verify sheet is not hidden
3. Check browser console for errors
4. Refresh page (clear cache)

### API Not Working?
1. Verify backend is running
2. Check `GOOGLE_SHEET_ID` in `.env`
3. Verify `secure.json` exists
4. Check Google Sheets API permissions

### Images Not Loading?
1. Make Drive links public ("Anyone with link")
2. Use correct URL format
3. Check browser console for CORS errors

## 📚 Documentation

- **Complete Guide:** `DYNAMIC_PAGES_GUIDE.md`
- **Sheet Structure:** `SHEETS_STRUCTURE_GUIDE.md`
- **API Reference:** See DYNAMIC_PAGES_GUIDE.md

## 💡 Next Steps

1. ✅ Complete setup above
2. ✅ Create test page
3. ✅ Verify it appears in navigation
4. 📝 Create real content pages
5. 🎨 Customize styling if needed
6. 🚀 Deploy to production

## 🎓 Example Use Cases

- **Student Resources:** Course materials, guides
- **Alumni Network:** Alumni profiles, stories
- **Events Calendar:** Upcoming events
- **Research Publications:** Papers, publications
- **Industry Partners:** Company collaborations
- **Campus Facilities:** Building tours, facilities
- **Career Services:** Placement info, opportunities

## 🔧 Configuration

### Add More Reserved Sheets
Edit `backend/src/services/googleSheetsDynamic.js`:
```javascript
this.RESERVED_SHEETS = new Set([
  'HOME',
  'ABOUT',
  'YourNewReservedSheet',  // ← Add here
  // ... existing sheets
]);
```

### Customize Page Layout
Edit `frontend/src/pages/DynamicPage.jsx`

### Customize Content Rendering
Edit `frontend/src/components/GenericContentRenderer.jsx`

## ✅ Production Checklist

Before deploying:

- [ ] Update `.env` with production values
- [ ] Secure `secure.json` (not in git)
- [ ] Set proper CORS origins
- [ ] Configure caching headers
- [ ] Test all dynamic pages
- [ ] Verify navigation works
- [ ] Check mobile responsiveness
- [ ] Test error handling
- [ ] Set up monitoring/logging

## 🆘 Support

Having issues? Check:
1. Console errors (browser + backend)
2. API response in network tab
3. Google Sheets permissions
4. Environment variables
5. Documentation files

---

**Ready to go!** 🎉

Start by creating a test page following Step 3 above.
