import re
from pathlib import Path

# Manual corrections for files that were referenced incorrectly in HTML
corrections = {
    # Master Bathroom -> Primary Bathroom
    "Copy of Copy of 1266 Crestview Master Bathroom 1.jpg": "1266-crestview-primary-bathroom-1.jpg",

    # Living Room files that exist
    "Copy of Copy of 1266 Crestview Living Room 1.jpg": "1266-crestview-living-room-3.jpg",  # Use closest available
    "Copy of Copy of 1266 Crestview Living Room 2.jpg": "1266-crestview-living-room-4.jpg",

    # Dining Area -> Dining Room
    "Copy of Copy of 1266 Crestview Dining Area 1.jpg": "1266-crestview-dining-room-1.jpg",
    "Copy of Copy of 1266 Crestview Dining Area 2.jpg": "1266-crestview-dining-room-2.jpg",

    # Main Living Room -> Living Room
    "Copy of Copy of 503 Rosewood Main Living Room 1.jpg": "503-rosewood-living-room-1.jpg",
    "Copy of Copy of 503 Rosewood Main Living Room 2.jpg": "503-rosewood-living-room-2.jpg",
    "Copy of Copy of 503 Rosewood Main Living Room 3.jpg": "503-rosewood-living-room-3.jpg",
    "Copy of Copy of 503 Rosewood Main Living Room 4.jpg": "503-rosewood-living-room-4.jpg",

    # Built-in Cabinetry -> Use a living room or appropriate substitute
    "Copy of Copy of 503 Rosewood Built-in Cabinetry 1.jpg": "503-rosewood-living-room-5.jpg",

    # 1423 Sierra Exterior 1 Twilight (doesn't exist, use 2)
    "Copy of Copy of 1423 Sierra Exterior 1 Twilight.jpg": "1423-sierra-exterior-2-twilight.jpg",
}

# Find all HTML files
project_root = Path(r'c:\Users\jlyn1\Documents\GitHub\CastleCustomHomes')
html_files = [
    project_root / 'index.html',
    project_root / 'pages' / 'residential.html',
    project_root / 'pages' / 'remodel.html',
    project_root / 'pages' / 'your-lot.html',
    project_root / 'pages' / 'financing.html',
    project_root / 'pages' / 'contact.html',
    project_root / 'pages' / 'partners.html',
    project_root / 'pages' / 'our-story.html',
    project_root / 'pages' / 'commercial.html',
    project_root / 'pages' / 'gallery.html',
    project_root / 'pages' / 'for-sale.html',
    project_root / 'pages' / 'community.html',
]

print(f"Fixing {len(corrections)} image references\n")

total_replacements = 0

for html_file in html_files:
    if not html_file.exists():
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        replacements_in_file = 0

        # Apply corrections
        for old_name, new_name in corrections.items():
            count = content.count(old_name)
            if count > 0:
                content = content.replace(old_name, new_name)
                replacements_in_file += count
                print(f"  {html_file.name}: {old_name} -> {new_name} ({count}x)")

        # Write back if changes were made
        if content != original_content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            total_replacements += replacements_in_file

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\nTotal replacements: {total_replacements}")
print("\nNow checking for any remaining 'Copy of' references...")

# Check for remaining issues
for html_file in html_files:
    if not html_file.exists():
        continue
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        if "Copy of" in content:
            lines_with_copy = [i+1 for i, line in enumerate(content.split('\n')) if 'Copy of' in line]
            print(f"\nWARNING: {html_file.name} still has 'Copy of' on lines: {lines_with_copy}")
    except:
        pass

print("\nDone!")
