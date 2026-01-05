# Dynamic Layout Types Guide

## Overview

The system now supports **automatic layout detection** based on your sheet name suffix. Simply name your sheet with a specific suffix to get a different page layout optimized for that content type.

## Layout Types

### 1. Default Layout (no suffix)

**Best for:** Text-heavy content, blog posts, documentation

**Sheet Name Examples:**
- `About Us`
- `Our Mission`
- `Company History`

**Features:**
- Text content on left
- Images/videos on right sidebar
- Supports HTML, YouTube videos
- Standard card layout

**Column Structure:**
```
A: ID
B: Title
C: Description (HTML)
D: CreatedAt
E: Image (comma-separated URLs)
F: AltText
```

---

### 2. Image Layout (`_image` suffix)

**Best for:** Photo showcases, featured images, visual highlights

**Sheet Name Examples:**
- `Campus Photos_image`
- `Faculty Highlights_image`
- `Achievement Gallery_image`

**Features:**
- Large, prominent image display
- Image fills top of card (h-96)
- Title and description below image
- Perfect for photo-centric content
- Hover effects for engagement

**Column Structure:**
```
Flexible - system detects columns by name:
- Columns with "image" in name → Image URL
- Columns with "title" or "name" → Title
- Columns with "desc" → Description  
- Columns with "alt" → Alt text
```

**Example:**
```
| ID | ImageURL | Title | Description | AltText |
|----|----------|-------|-------------|---------|
| 1  | drive... | Main Hall | Beautiful campus | Campus |
```

---

### 3. Folder Layout (`_folder` suffix)

**Best for:** Image galleries, photo albums, collections

**Sheet Name Examples:**
- `Event Photos_folder`
- `Lab Equipment_folder`
- `Student Activities_folder`

**Features:**
- Grid gallery layout (responsive)
- Multiple images per section
- Hover zoom effect
- Caption overlay on hover
- 1-4 columns (responsive)
- Optimized for many images

**Column Structure:**
```
Flexible - system detects columns:
- Columns with "image" → Comma-separated image URLs
- Columns with "title" → Section title
- Columns with "desc" → Section description
- Columns with "alt" → Alt text for images
```

**Example:**
```
| ID | Title | Description | Images | AltText |
|----|-------|-------------|--------|---------|
| 1  | Event Day 1 | Opening ceremony | url1,url2,url3,url4 | Event photos |
```

**Visual Result:**
```
┌─────────────────────────────────────────┐
│  Event Day 1                            │
│  Opening ceremony photos                │
│                                         │
│  [img1] [img2] [img3] [img4]           │
│  [img5] [img6] [img7] [img8]           │
└─────────────────────────────────────────┘
```

---

### 4. Table Layout (`_table` suffix)

**Best for:** Data tables, schedules, lists, structured data

**Sheet Name Examples:**
- `Course Schedule_table`
- `Faculty Directory_table`
- `Placement Statistics_table`

**Features:**
- Professional table display
- Auto-detects all columns
- Striped rows for readability
- Header row styling
- Responsive/scrollable
- Supports HTML in cells

**Column Structure:**
```
FULLY DYNAMIC - Any columns you add!
- First row = Headers (automatically styled)
- All subsequent rows = Data
- System preserves all columns
```

**Example:**
```
| ID | Course Code | Course Name | Credits | Instructor | Room |
|----|-------------|-------------|---------|------------|------|
| 1  | EE101       | Circuits    | 4       | Dr. Smith  | A301 |
| 2  | EE102       | Electronics | 3       | Dr. Jones  | B202 |
```

**Visual Result:**
```
┌────────────┬─────────────┬─────────┬────────────┬──────┐
│ COURSE CODE│ COURSE NAME │ CREDITS │ INSTRUCTOR │ ROOM │
├────────────┼─────────────┼─────────┼────────────┼──────┤
│ EE101      │ Circuits    │ 4       │ Dr. Smith  │ A301 │
│ EE102      │ Electronics │ 3       │ Dr. Jones  │ B202 │
└────────────┴─────────────┴─────────┴────────────┴──────┘
```

---

## Quick Comparison

| Layout | Suffix | Best For | Column Flexibility |
|--------|--------|----------|-------------------|
| Default | (none) | Articles, content | Fixed (A-F) |
| Image | `_image` | Photo highlights | Flexible by name |
| Folder | `_folder` | Galleries | Flexible by name |
| Table | `_table` | Data/schedules | Fully dynamic |

---

## Usage Examples

### Example 1: Event Gallery

**Sheet Name:** `Annual Fest 2025_folder`

**Columns:**
```
A: ID
B: Event
C: Description  
D: Photos (comma-separated URLs)
E: Photo Credits
```

**Result:** Beautiful grid gallery with hover effects

---

### Example 2: Faculty Directory

**Sheet Name:** `Faculty List_table`

**Columns:**
```
A: ID
B: Name
C: Designation
D: Department
E: Email
F: Phone
G: Research Interests
```

**Result:** Professional sortable table

---

### Example 3: Featured Researchers

**Sheet Name:** `Research Highlights_image`

**Columns:**
```
A: ID
B: Researcher Name
C: ProfilePhoto
D: Research Area
E: Achievements
```

**Result:** Large profile photos with details

---

## Migration Guide

### Converting Existing Sheets

**From Default to Table:**
1. Rename sheet: `Faculty List` → `Faculty List_table`
2. Add more columns if needed
3. Page automatically renders as table

**From Default to Gallery:**
1. Rename sheet: `Photos` → `Photos_folder`
2. Combine image URLs with commas in one column
3. Page automatically renders as gallery

---

## Column Name Detection

For `_image` and `_folder` layouts, the system intelligently detects columns:

### Image Column Detection (case-insensitive):
- Looks for: `image`, `img`, `photo`, `picture`, `url`
- Examples: `ImageURL`, `Photo`, `profile_image`

### Title Column Detection:
- Looks for: `title`, `name`, `heading`
- Examples: `Title`, `Name`, `StudentName`

### Description Column Detection:
- Looks for: `desc`, `description`, `details`, `info`
- Examples: `Description`, `Details`, `Info`

### Alt Text Column Detection:
- Looks for: `alt`, `alttext`, `caption`
- Examples: `AltText`, `Caption`, `ImageCaption`

---

## Layout-Specific Tips

### Default Layout
- Keep descriptions concise
- Use HTML for formatting
- Embed YouTube with `<youtube-video>` tags
- Images appear in right sidebar

### Image Layout
- Use high-quality images (min 1200px wide)
- Keep titles short (1-2 lines)
- Descriptions support HTML
- Images automatically cropped to h-96

### Folder Layout
- Optimal: 4-12 images per section
- Square images work best
- Captions show on hover
- Grid is responsive (1-4 columns)

### Table Layout
- Keep column headers concise
- Use HTML for links: `<a href="url">text</a>`
- Table is scrollable on mobile
- Striped rows for readability
- Cells support HTML content

---

## Advanced Features

### Mixed Content in Table
You can use HTML in table cells:

```
| Name | Profile | Email |
|------|---------|-------|
| John | <img src="..." width="50"> | <a href="mailto:...">Email</a> |
```

### Responsive Folder Grid
- Desktop: 4 columns
- Tablet: 3 columns
- Mobile: 1-2 columns

### Image Hover Effects
- **Folder:** Zoom + caption overlay
- **Image:** Shadow enhancement
- **Default:** Consistent hover states

---

## Error Handling

### Image Loading Failures
All layouts show fallback placeholder if image fails:
```
[Image unavailable]
```

### Empty Data
All layouts show:
```
No content available. Please add data to the corresponding Google Sheet.
```

### Invalid Layout
Falls back to default layout if suffix not recognized

---

## API Response Structure

Each layout returns data optimized for its type:

### Default Layout Response:
```json
{
  "layoutType": "default",
  "content": [
    {
      "id": "1",
      "title": "...",
      "description": "...",
      "images": [...]
    }
  ]
}
```

### Image Layout Response:
```json
{
  "layoutType": "image",
  "content": [
    {
      "id": "1",
      "title": "...",
      "imageUrl": "...",
      "alternativeText": "..."
    }
  ]
}
```

### Folder Layout Response:
```json
{
  "layoutType": "folder",
  "content": [
    {
      "id": "1",
      "title": "...",
      "images": [
        {"url": "...", "alternativeText": "..."}
      ]
    }
  ]
}
```

### Table Layout Response:
```json
{
  "layoutType": "table",
  "headers": ["Column1", "Column2"],
  "content": [
    {
      "id": "1",
      "column1": "...",
      "column2": "...",
      "_headers": {"column1": "Column1"}
    }
  ]
}
```

---

## Best Practices

1. **Choose the Right Layout:**
   - Text-heavy → Default
   - Single featured image → Image
   - Multiple photos → Folder
   - Structured data → Table

2. **Naming Conventions:**
   - Descriptive sheet names
   - Suffix at the very end
   - Example: `Research Publications 2025_table`

3. **Content Organization:**
   - One layout type per sheet
   - Consistent column structure
   - Use headers in row 1

4. **Performance:**
   - Optimize images before upload
   - Limit rows to ~100 per sheet
   - Use pagination for very large datasets

5. **Accessibility:**
   - Always provide alt text
   - Use semantic HTML
   - Keep color contrast high

---

## Testing Your Layouts

### Test Checklist:

- [ ] Sheet name ends with correct suffix
- [ ] Headers in row 1
- [ ] Data starts from row 2
- [ ] Images are publicly accessible
- [ ] HTML is valid (no unclosed tags)
- [ ] Page loads without errors
- [ ] Mobile responsive
- [ ] Images load correctly
- [ ] Hover effects work

---

## Troubleshooting

### Layout Not Applying
- Check sheet name ends with exact suffix: `_image`, `_folder`, `_table`
- Refresh browser cache
- Check browser console for errors

### Images Not Showing
- Verify Google Drive links are public
- Check column name detection
- Test image URL directly in browser

### Table Not Formatting
- Ensure row 1 has headers
- Check data starts from row 2
- Verify no empty headers

### Columns Not Detected
- Use standard column names
- Check spelling (case-insensitive)
- Review detection keywords above

---

## Examples Repository

### Complete Examples:

1. **Default:** `Company History`
2. **Image:** `Campus Highlights_image`
3. **Folder:** `Event Gallery 2025_folder`
4. **Table:** `Course Catalog_table`

Access these sheets in your Google Sheet to see working examples!

---

**Last Updated:** January 5, 2026  
**Version:** 2.0.0 (Dynamic Layouts)
