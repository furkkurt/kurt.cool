#!/usr/bin/env python3
"""
Script to extract base64 images from resume.html back to separate files.
Use this if you need to edit the HTML and want it to be more navigable.
"""
import re
import base64
import os
from pathlib import Path

def extract_images_from_html(input_file='resume.html'):
    """Extract base64 images from HTML and save as separate files."""
    # Read the HTML
    with open(input_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Create images directory if it doesn't exist
    images_dir = Path('images')
    images_dir.mkdir(exist_ok=True)
    
    # Find all base64 data URIs
    pattern = r'data:([^;]+);base64,([^"]+)'
    matches = re.finditer(pattern, html)
    
    image_counter = 1
    replacements = []
    
    for match in matches:
        mime_type = match.group(1)
        base64_data = match.group(2)
        full_match = match.group(0)
        
        # Determine file extension from MIME type
        if 'png' in mime_type:
            ext = 'png'
        elif 'svg+xml' in mime_type:
            ext = 'svg'
        elif 'jpeg' in mime_type or 'jpg' in mime_type:
            ext = 'jpg'
        elif 'gif' in mime_type:
            ext = 'gif'
        else:
            ext = 'png'  # default
        
        # Generate filename
        filename = f'image_{image_counter}.{ext}'
        filepath = images_dir / filename
        
        # Decode and save the image
        try:
            image_data = base64.b64decode(base64_data)
            with open(filepath, 'wb') as img_file:
                img_file.write(image_data)
            
            # Store replacement info
            replacements.append({
                'old': full_match,
                'new': f'./images/{filename}'
            })
            
            print(f"  ✓ Extracted {filename}")
            image_counter += 1
        except Exception as e:
            print(f"  ✗ Error extracting image {image_counter}: {e}")
    
    if not replacements:
        print("No base64 images found in HTML file.")
        return
    
    # Replace all base64 URIs with file paths
    new_html = html
    for replacement in replacements:
        new_html = new_html.replace(replacement['old'], replacement['new'])
    
    # Write the updated HTML
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"\n✓ Extracted {len(replacements)} images to {images_dir}/")
    print(f"✓ Updated {input_file} with file references")

if __name__ == '__main__':
    print("Extracting base64 images to separate files...")
    extract_images_from_html()
