# PDF Conversion Guide

This resume uses **Playwright (Headless Chromium)** for PDF conversion, which provides pixel-perfect rendering with full CSS support.

## Quick Start

```bash
npm run pdf
```

Or directly:
```bash
node convert-to-pdf.js
```

## Requirements

- Node.js (v14+)
- Playwright installed: `npx playwright install chromium`

## How It Works

1. Starts a local HTTP server on port 3000
2. Loads `resume.html` in headless Chromium
3. Waits for all resources (including base64 images) to load
4. Generates PDF with A4 format and print backgrounds enabled
5. Respects CSS `@page` margins defined in the HTML

## Image Handling

The HTML file contains **base64-embedded images** to ensure they appear correctly in the PDF. This is necessary because PDF converters often can't resolve relative file paths.

### Workflow Scripts

- **`prepare_for_pdf.py`** - Embeds images as base64 (if you extracted them)
- **`extract_images.py`** - Extracts images to separate files (for easier HTML editing)

### To Edit HTML with Separate Image Files

```bash
python3 extract_images.py
# Edit resume.html (now uses ./images/ references)
# Before PDF conversion, embed images again:
python3 prepare_for_pdf.py
npm run pdf
```

## Output

- **File**: `resume.pdf`
- **Format**: A4
- **Margins**: Controlled by CSS `@page` rules (3.5cm top/bottom, 1.5cm left/right)
- **Print Background**: Enabled (colors and backgrounds will appear)

## Troubleshooting

- **Images not showing**: Make sure images are embedded as base64 (`python3 prepare_for_pdf.py`)
- **Port already in use**: Change port 3000 in `convert-to-pdf.js`
- **Playwright not found**: Run `npx playwright install chromium`
