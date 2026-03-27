import json
import re
from pathlib import Path

# Load the mapping
with open('image_rename_mapping.json', 'r') as f:
    name_mapping = json.load(f)

# Find all HTML files
project_root = Path(r'c:\Users\jlyn1\Documents\GitHub\CastleCustomHomes')
html_files = list(project_root.glob('**/*.html'))

print(f"Found {len(html_files)} HTML files")
print(f"Processing {len(name_mapping)} image mappings\n")

total_replacements = 0

for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        replacements_in_file = 0

        # Replace each old name with new name
        for old_name, new_name in name_mapping.items():
            if old_name != new_name:
                # Count occurrences before replacement
                count = content.count(old_name)
                if count > 0:
                    content = content.replace(old_name, new_name)
                    replacements_in_file += count

        # Write back if changes were made
        if content != original_content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {html_file.relative_to(project_root)}: {replacements_in_file} replacements")
            total_replacements += replacements_in_file

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\nTotal replacements: {total_replacements}")
print("Done!")
