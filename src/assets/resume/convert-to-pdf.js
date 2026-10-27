const { chromium } = require('playwright');
const http = require('http');
const path = require('path');
const fs = require('fs');

async function convertToPDF() {
  const htmlPath = path.resolve(__dirname, 'resume.html');
  const pdfPath = path.resolve(__dirname, 'resume.pdf');
  const port = 3000;
  
  console.log(`Converting ${path.basename(htmlPath)} to PDF...`);
  
  // Start a simple HTTP server
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);
    let filePath = url.pathname === '/' ? htmlPath : path.join(__dirname, url.pathname);
    
    // Security: only serve files from the current directory
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      
      // Set appropriate content type
      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.gif': 'image/gif'
      };
      
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
  
  // Start server
  await new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`📡 Local server started on http://localhost:${port}`);
      resolve();
    });
  });
  
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Load the HTML via HTTP server
    const htmlUrl = `http://localhost:${port}/`;
    console.log(`Loading: ${htmlUrl}`);
    
    await page.goto(htmlUrl, {
      waitUntil: 'networkidle'
    });
    
    // Wait a bit more for any dynamic content or images to fully load
    await page.waitForTimeout(1000);
    
    // Generate PDF with A4 format and print background
    // Note: CSS @page rules in the HTML will be respected
    console.log('📄 Generating PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      // Let CSS @page margins handle the margins (3.5cm top/bottom, 1.5cm left/right)
      // Setting margin to 'none' allows CSS @page to control it
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      preferCSSPageSize: true  // Use CSS @page size if defined
    });
    
    await browser.close();
    
    // Close server
    server.close();
    
    const fileSize = (fs.statSync(pdfPath).size / 1024).toFixed(2);
    console.log(`✅ PDF created successfully: ${pdfPath}`);
    console.log(`📊 File size: ${fileSize} KB`);
  } catch (error) {
    server.close();
    throw error;
  }
}

convertToPDF().catch(error => {
  console.error('❌ Error converting to PDF:', error);
  process.exit(1);
});
