from pathlib import Path
import re

# Read the gallery file
gallery_path = Path(r'c:\Users\jlyn1\Documents\GitHub\CastleCustomHomes\pages\gallery.html')

with open(gallery_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add loading="lazy" to all gallery images
# Find all <img src= tags that don't already have loading attribute
pattern = r'<img src="([^"]+)"'
replacement = r'<img loading="lazy" src="\1"'

# Replace all occurrences
updated_content = re.sub(pattern, replacement, content)

# Count how many replacements were made
original_count = content.count('<img src="')
updated_count = updated_content.count('<img loading="lazy" src="')

print(f"Added lazy loading to {updated_count} images")

# Save the updated file
with open(gallery_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Gallery optimized with lazy loading!")
