# System Architecture Diagram

## High-Level Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       GOOGLE SHEETS                              │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │ HOME         │ ABOUT        │ PEOPLE       │ NEWS         │ │
│  │ (Fixed)      │ (Fixed)      │ (Fixed)      │ (Fixed)      │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │ Alumni       │ Campus Life  │ Resources    │ Events       │ │
│  │ (Dynamic)    │ (Dynamic)    │ (Dynamic)    │ (Dynamic)    │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    Google Sheets API
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Node.js)                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  googleSheetsDynamic.js Service                          │   │
│  │  • getDynamicSheets() → List non-reserved sheets        │   │
│  │  • fetchSheetContent(name) → Get sheet data             │   │
│  │  • fetchSheetBySlug(slug) → Get by URL slug             │   │
│  │  • RESERVED_SHEETS → Protected sheet names              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  dynamicPagesController.js                               │   │
│  │  • getDynamicPages() → List endpoint                    │   │
│  │  • getDynamicPageBySlug() → Content endpoint            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  API Endpoints:                                                 │
│  GET /api/dynamic-pages      → List all pages                  │
│  GET /api/pages/:slug        → Get page content                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                         HTTP/JSON
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  API Layer (api.js)                                      │   │
│  │  • getDynamicPages()                                     │   │
│  │  • getDynamicPageBySlug(slug)                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  React Hooks (useDynamicPages.js)                        │   │
│  │  • useDynamicPages() → Cached list                       │   │
│  │  • useDynamicPageContent(slug) → Cached content          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────────────┬──────────────────────────────────┐   │
│  │  Navbar.jsx          │  DynamicPage.jsx                 │   │
│  │  (Navigation)        │  (Page Display)                  │   │
│  │  • Fetches pages     │  • Fetches content               │   │
│  │  • Builds menu       │  • Renders page                  │   │
│  └──────────────────────┴──────────────────────────────────┘   │
│                              ↓                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  GenericContentRenderer.jsx                              │   │
│  │  • Renders all content types                             │   │
│  │  • HTML, images, videos                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                         User Browser
```

## Route Resolution Flow

```
User visits /pages/alumni-network
        ↓
App.jsx: Route /pages/:slug matches
        ↓
DynamicPage component loads
        ↓
useDynamicPageContent('alumni-network') hook
        ↓
API call: GET /api/pages/alumni-network
        ↓
Backend: dynamicPagesController.getDynamicPageBySlug()
        ↓
Service: googleSheetsDynamic.fetchSheetBySlug('alumni-network')
        ↓
1. Find sheet with slug 'alumni-network' → "Alumni Network"
2. Verify not in RESERVED_SHEETS
3. Fetch content from "Alumni Network" sheet
4. Transform data (images, format)
        ↓
Return JSON response with content
        ↓
Frontend: Cache response (5 min)
        ↓
GenericContentRenderer displays content
        ↓
Page shown to user
```

## Navigation Update Flow

```
App loads
    ↓
Navbar component renders
    ↓
useDynamicPages() hook
    ↓
API: GET /api/dynamic-pages
    ↓
Backend: Get all sheets
    ↓
Filter out RESERVED_SHEETS
    ↓
Return list: [
    { name: "Alumni Network", slug: "alumni-network" },
    { name: "Campus Life", slug: "campus-life" },
    { name: "Resources", slug: "resources" }
]
    ↓
Frontend: Cache list (5 min)
    ↓
Navbar adds "More Pages" dropdown
    ↓
Dropdown populated with links:
    - /pages/alumni-network
    - /pages/campus-life
    - /pages/resources
    ↓
User sees updated menu
```

## Sheet Structure → Page Render

```
Google Sheet: "Alumni Network"
┌────┬─────────┬──────────────────┬────────────┬─────────────┬─────────┐
│ A  │ B       │ C                │ D          │ E           │ F       │
├────┼─────────┼──────────────────┼────────────┼─────────────┼─────────┤
│ ID │ Title   │ Description      │ CreatedAt  │ Image       │ AltText │
├────┼─────────┼──────────────────┼────────────┼─────────────┼─────────┤
│ 1  │ Welcome │ <p>Join our...</p│ 2025-01-01 │ drive.com.. │ Alumni  │
│ 2  │ Stories │ <p>Read...</p>   │ 2025-01-02 │             │         │
└────┴─────────┴──────────────────┴────────────┴─────────────┴─────────┘
                         ↓
              Backend transforms to:
                         ↓
{
  "sheetName": "Alumni Network",
  "slug": "alumni-network",
  "content": [
    {
      "id": "1",
      "title": "Welcome",
      "description": "<p>Join our...</p>",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "images": [
        {
          "id": "0-0",
          "url": "https://lh3.googleusercontent.com/d/...",
          "alternativeText": "Alumni"
        }
      ]
    },
    {
      "id": "2",
      "title": "Stories",
      "description": "<p>Read...</p>",
      "createdAt": "2025-01-02T00:00:00.000Z",
      "images": []
    }
  ]
}
                         ↓
          GenericContentRenderer renders:
                         ↓
┌────────────────────────────────────────────┐
│  Alumni Network                            │
│  ─────────                                 │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ Welcome                            │   │
│  │ Join our...                        │   │
│  │                        [Image]     │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ Stories                            │   │
│  │ Read...                            │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

## Security Flow

```
Client Browser
      ↓
  (NO API KEY - secure!)
      ↓
Frontend React App
      ↓
HTTP Request to Backend
      ↓
Backend Server
      ↓
secure.json (service account)
      ↓
Google Sheets API
      ↓
Sheet Data
      ↓
Backend (filters, validates)
      ↓
JSON Response
      ↓
Frontend (displays)
```

## Caching Strategy

```
┌─────────────────────────────────────┐
│  First Visit                        │
│  User → /pages/alumni-network       │
│                                     │
│  API Call → Backend → Google Sheets│
│  Time: ~500ms                       │
│  Cache: Store for 5 minutes        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Subsequent Visits (within 5 min)  │
│  User → /pages/alumni-network       │
│                                     │
│  Cache Hit → No API call            │
│  Time: ~50ms (instant)              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  After 5 minutes                    │
│  Cache Stale                        │
│  Next visit triggers new fetch      │
└─────────────────────────────────────┘
```

## Error Handling Flow

```
User visits /pages/nonexistent-page
        ↓
API: GET /api/pages/nonexistent-page
        ↓
Backend: Try to find sheet
        ↓
Not found!
        ↓
Return 404 with error message
        ↓
Frontend catches error
        ↓
Display user-friendly message:
"Page Not Found
The requested page could not be found."
```

## Reserved vs Dynamic Sheet Logic

```
All Sheets in Google Sheets:
┌──────────────────────────────────────┐
│ HOME (Reserved)                      │
│ ABOUT (Reserved)                     │
│ Alumni Network (Dynamic)   ←─┐      │
│ Campus Life (Dynamic)      ←─┤      │
│ PEOPLE (Reserved)             │      │
│ Resources (Dynamic)        ←─┤      │
│ NEWS (Reserved)               │      │
└──────────────────────────────────────┘
                                │
        Filter by                │
        RESERVED_SHEETS         │
                                │
Only Dynamic Sheets: ────────────┘
┌──────────────────────────────────────┐
│ Alumni Network                       │
│ Campus Life                          │
│ Resources                            │
└──────────────────────────────────────┘
                ↓
        Generate slugs
                ↓
┌──────────────────────────────────────┐
│ alumni-network → /pages/alumni-net..│
│ campus-life → /pages/campus-life    │
│ resources → /pages/resources        │
└──────────────────────────────────────┘
```

## Component Hierarchy

```
App.jsx
└── Routes
    ├── / (Home - Fixed)
    ├── /about (About - Fixed)
    ├── /contact (Contact - Fixed)
    └── /pages/:slug (Dynamic)
        └── DynamicPage.jsx
            ├── useDynamicPageContent(slug)
            │   └── API call
            └── GenericContentRenderer
                ├── Content sections
                ├── Images
                └── Videos

Navbar.jsx
├── useDynamicPages()
│   └── API call
├── Fixed nav items
└── Dynamic "More Pages" dropdown
    ├── /pages/alumni-network
    ├── /pages/campus-life
    └── /pages/resources
```

## Data Transformation Pipeline

```
Google Sheets Raw Data:
["1", "Title", "<p>Text</p>", "2025-01-01", "drive.com/ABC", "Alt"]
                    ↓
Backend Service Transform:
{
  id: "1",
  title: "Title",
  description: "<p>Text</p>",
  createdAt: "2025-01-01T00:00:00.000Z",
  images: [{
    id: "0-0",
    url: "https://lh3.googleusercontent.com/d/ABC",
    alternativeText: "Alt"
  }]
}
                    ↓
Frontend Component Render:
<section>
  <h2>Title</h2>
  <div dangerouslySetInnerHTML={description} />
  <img src={url} alt={alternativeText} />
</section>
```

## Request/Response Example

**Request:**
```http
GET /api/pages/alumni-network HTTP/1.1
Host: localhost:1337
```

**Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "sheetName": "Alumni Network",
    "slug": "alumni-network",
    "content": [...],
    "count": 3,
    "lastUpdated": "2025-01-05T12:00:00.000Z"
  }
}
```

## Legend

```
┌─────────────────────────────────────────┐
│ Symbol Guide                            │
├─────────────────────────────────────────┤
│ ↓        Data flow direction            │
│ →        Transform/Convert              │
│ ←        Filter/Select                  │
│ ┌─┐      Component/Module               │
│ │ │      Container/Boundary             │
│ • Item   List item                      │
└─────────────────────────────────────────┘
```

---

This architecture provides:
- **Separation of concerns** (Backend handles data, Frontend handles UI)
- **Caching** (Reduced API calls)
- **Security** (Credentials protected)
- **Scalability** (Add unlimited pages)
- **Maintainability** (Generic, reusable components)
