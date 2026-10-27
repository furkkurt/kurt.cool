#!/usr/bin/env python3
"""
Script to convert resume.html from file references to base64-embedded images
for PDF conversion. This ensures images are visible in the PDF.
"""
import base64
import os
import re
from pathlib import Path

def image_to_base64(image_path):
    """Convert an image file to base64 data URI."""
    with open(image_path, 'rb') as img_file:
        img_data = img_file.read()
        # Determine MIME type from extension
        ext = Path(image_path).suffix.lower()
        mime_types = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.svg': 'image/svg+xml',
            '.gif': 'image/gif'
        }
        mime_type = mime_types.get(ext, 'image/png')
        base64_str = base64.b64encode(img_data).decode('utf-8')
        return f"data:{mime_type};base64,{base64_str}"

def embed_images_for_pdf(input_file='resume.html', output_file='resume.html'):
    """Replace file references with base64-embedded images."""
    # Read the HTML
    with open(input_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Find all image references and replace with base64
    pattern = r'src="\.?/?images/([^"]+)"'
    
    def replace_with_base64(match):
        img_filename = match.group(1)
        img_path = f"images/{img_filename}"
        if os.path.exists(img_path):
            try:
                base64_uri = image_to_base64(img_path)
                print(f"  ✓ Embedded {img_filename}")
                return f'src="{base64_uri}"'
            except Exception as e:
                print(f"  ✗ Error embedding {img_filename}: {e}")
                return match.group(0)
        else:
            print(f"  ✗ Image not found: {img_path}")
            return match.group(0)
    
    # Replace all image references with base64
    html_with_base64 = re.sub(pattern, replace_with_base64, html)
    
    # Write the updated HTML
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_with_base64)
    
    print(f"\n✓ Created {output_file} with embedded base64 images")
    print(f"  Use this file for PDF conversion")

if __name__ == '__main__':
    print("Embedding images as base64 for PDF conversion...")
    embed_images_for_pdf()
