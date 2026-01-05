# Google Sheets Structure Guide

## Sheet Template for Dynamic Pages

### Column Layout

| Column | Name | Type | Required | Description | Example |
|--------|------|------|----------|-------------|---------|
| A | ID | Text/Number | Yes | Unique identifier | `1`, `2`, `page-1` |
| B | Title | Text | No | Section heading | `Introduction`, `Our Mission` |
| C | Description | HTML/Text | No | Main content | `<p>Welcome to...</p>` or plain text |
| D | CreatedAt | Date/Text | No | Timestamp for sorting | `2025-01-05T10:00:00.000Z` |
| E | Image | URL(s) | No | Google Drive links (comma-separated) | `https://drive.google.com/file/d/ABC123/view` |
| F | AltText | Text | No | Image alt text | `Campus building` |

### Example Sheet Layout

```
Row 1 (Header):
┌────┬──────────┬──────────────┬─────────────┬──────────────┬──────────┐
│ ID │ Title    │ Description  │ CreatedAt   │ Image        │ AltText  │
├────┼──────────┼──────────────┼─────────────┼──────────────┼──────────┤
│ 1  │ Welcome  │ <p>Hello</p> │ 2025-01-01  │ https://...  │ Logo     │
├────┼──────────┼──────────────┼─────────────┼──────────────┼──────────┤
│ 2  │ Mission  │ We aim to... │ 2025-01-02  │              │          │
└────┴──────────┴──────────────┴─────────────┴──────────────┴──────────┘
```

## Content Formatting

### Plain Text
```
This is a simple paragraph.
```

### HTML Content
```html
<h3>Subheading</h3>
<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### YouTube Videos
```html
<p>Watch our introduction video:</p>
<youtube-video>
  <iframe src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
          width="560" height="315" frameborder="0" 
          allowfullscreen></iframe>
</youtube-video>
<p>More content after video.</p>
```

### Multiple Images
```
https://drive.google.com/file/d/FILE_ID_1/view,https://drive.google.com/file/d/FILE_ID_2/view,https://drive.google.com/file/d/FILE_ID_3/view
```

## Reserved Sheet Names

**DO NOT use these names for dynamic pages:**

### Primary Pages
- HOME
- ABOUT
- AboutPage
- CONTACT
- ContactPoints
- PEOPLE
- Peoples

### Content Types
- NEWS
- Newss
- TalksEvents
- Gallery
- Carousel
- FAQ
- Faq
- Statistics

### Research
- ResearchLabs
- ResearchProjects

### Academic
- ACADEMICS
- ADMISSIONS
- JOIN_AS_FACULTY
- RESEARCH
- RECRUITERS

## Good Sheet Names for Dynamic Pages

✅ **Good Examples:**
- `Student Resources`
- `Alumni Network`
- `Campus Facilities`
- `Career Opportunities`
- `Placement Statistics`
- `International Collaborations`
- `Events Calendar`
- `Publications`

❌ **Bad Examples:**
- `About` (Reserved)
- `News!!!` (Special characters may cause issues)
- `Page 1` (Not descriptive)
- `temp` (Not professional)

## URL Slug Generation

Sheet names are automatically converted to URL slugs:

| Sheet Name | Generated Slug | URL |
|------------|----------------|-----|
| Student Resources | `student-resources` | `/pages/student-resources` |
| Alumni Network | `alumni-network` | `/pages/alumni-network` |
| R&D Facilities | `rd-facilities` | `/pages/rd-facilities` |
| Industry Connect | `industry-connect` | `/pages/industry-connect` |

## Image URLs

### Supported Formats

✅ **Google Drive (Recommended):**
```
https://drive.google.com/file/d/FILE_ID/view
https://drive.google.com/open?id=FILE_ID
https://drive.google.com/uc?id=FILE_ID
```

✅ **Direct URLs:**
```
https://example.com/image.jpg
https://example.com/photo.png
```

### Making Google Drive Images Public

1. Right-click image in Google Drive
2. Select "Share"
3. Change to "Anyone with the link"
4. Copy the link
5. Paste in "Image" column

## Tips for Better Content

### 1. Structured Content
Use consistent formatting:
```html
<h2>Section Title</h2>
<p>Introduction paragraph.</p>
<h3>Subsection</h3>
<p>Details...</p>
```

### 2. Accessible Images
Always provide alt text in Column F:
```
Column E: https://drive.google.com/file/d/ABC123/view
Column F: Students collaborating in lab
```

### 3. Proper Timestamps
Use ISO format for dates:
```
2025-01-05T10:30:00.000Z
```
Or simple dates:
```
2025-01-05
```

### 4. Multiple Rows for Long Pages
Break content into sections:
```
Row 2: ID=1, Title=Introduction, Description=...
Row 3: ID=2, Title=Features, Description=...
Row 4: ID=3, Title=Benefits, Description=...
```

## Testing Checklist

Before publishing a new sheet:

- [ ] Sheet name is not reserved
- [ ] Column headers match template (A-F)
- [ ] At least one row of content (starting from row 2)
- [ ] IDs are unique within the sheet
- [ ] Images are publicly accessible
- [ ] HTML content is valid (no unclosed tags)
- [ ] YouTube URLs are correctly formatted
- [ ] Alt text provided for all images

## Common Issues

### Issue: Page not showing
**Solution:** Check if sheet name is reserved or sheet is hidden

### Issue: Images not loading
**Solution:** Make sure Google Drive links are set to "Anyone with the link"

### Issue: HTML broken
**Solution:** Validate HTML, check for unclosed tags

### Issue: Content not sorting correctly
**Solution:** Use proper date format in CreatedAt column

## Example: Complete Sheet Setup

**Sheet Name:** `Campus Life`

```
┌────┬────────────────┬─────────────────────────────────────┬──────────────────────┬──────────────────────┬─────────────────┐
│ ID │ Title          │ Description                          │ CreatedAt            │ Image                │ AltText         │
├────┼────────────────┼─────────────────────────────────────┼──────────────────────┼──────────────────────┼─────────────────┤
│ 1  │ Welcome        │ <h2>Life at Campus</h2>              │ 2025-01-01T00:00:00Z │ https://drive.google │ Campus entrance │
│    │                │ <p>Experience vibrant campus life</p>│                      │ .com/file/d/ABC/view │                 │
├────┼────────────────┼─────────────────────────────────────┼──────────────────────┼──────────────────────┼─────────────────┤
│ 2  │ Facilities     │ <ul><li>Library</li><li>Sports</li> │ 2025-01-02T00:00:00Z │ https://drive.google │ Library view    │
│    │                │ <li>Hostels</li></ul>                │                      │ .com/file/d/DEF/view │                 │
├────┼────────────────┼─────────────────────────────────────┼──────────────────────┼──────────────────────┼─────────────────┤
│ 3  │ Student Clubs  │ <p>Join 20+ active clubs...</p>     │ 2025-01-03T00:00:00Z │                      │                 │
└────┴────────────────┴─────────────────────────────────────┴──────────────────────┴──────────────────────┴─────────────────┘
```

**Result:** 
- URL: `/pages/campus-life`
- Navigation: Appears in "More Pages" dropdown
- Content: Renders 3 sections in order

---

**Quick Reference Card**

```
╔══════════════════════════════════════╗
║  DYNAMIC PAGE QUICK REFERENCE        ║
╠══════════════════════════════════════╣
║ 1. Create new sheet (non-reserved)   ║
║ 2. Add columns A-F (see above)       ║
║ 3. Add content starting row 2        ║
║ 4. Page appears at /pages/{slug}     ║
║ 5. Auto-added to navigation          ║
╚══════════════════════════════════════╝
```
