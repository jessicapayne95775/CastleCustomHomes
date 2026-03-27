import os
import re
import json
from pathlib import Path
from collections import defaultdict

# Directory containing images
img_dir = Path(r'c:\Users\jlyn1\Documents\GitHub\CastleCustomHomes\assets\images\customWork')

# Get all image files
all_files = sorted([f for f in os.listdir(img_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.avif', '.webp'))])

def generate_new_name(old_name):
    """Generate a cleaner, descriptive name"""
    name = old_name

    # Remove file extension temporarily
    ext = Path(name).suffix
    name = Path(name).stem

    # Remove "Copy of Copy of " prefix
    name = re.sub(r'^Copy of Copy of ', '', name, flags=re.IGNORECASE)
    name = re.sub(r'^Copy of ', '', name, flags=re.IGNORECASE)

    # Replace special patterns
    name = name.replace(' - ', '-')
    name = name.replace('_', '-')

    # Remove parentheses and their contents for duplicates like "(1)", "(2)"
    name = re.sub(r'\s*\(\d+\)', '', name)

    # Replace spaces with hyphens
    name = name.replace(' ', '-')

    # Remove extra hyphens
    name = re.sub(r'-+', '-', name)

    # Remove leading/trailing hyphens
    name = name.strip('-')

    # Lowercase for consistency
    name = name.lower()

    return name + ext

# Generate mapping
name_mapping = {}
name_counts = defaultdict(int)

for old_name in all_files:
    base_new_name = generate_new_name(old_name)

    # Handle duplicates by adding numbers
    if base_new_name in name_counts:
        name_counts[base_new_name] += 1
        # Insert number before extension
        ext = Path(base_new_name).suffix
        stem = Path(base_new_name).stem
        new_name = f"{stem}-{name_counts[base_new_name]}{ext}"
    else:
        name_counts[base_new_name] = 1
        new_name = base_new_name

    name_mapping[old_name] = new_name

# Save mapping to JSON for reference
with open('image_rename_mapping.json', 'w') as f:
    json.dump(name_mapping, f, indent=2)

print(f"Generated mapping for {len(name_mapping)} files")
print("\nSample mappings:")
for i, (old, new) in enumerate(list(name_mapping.items())[:10]):
    print(f"  {old}")
    print(f"  -> {new}")
    print()

# Perform the actual renaming
print("\nRenaming files...")
renamed_count = 0
for old_name, new_name in name_mapping.items():
    old_path = img_dir / old_name
    new_path = img_dir / new_name

    if old_path.exists() and old_name != new_name:
        try:
            old_path.rename(new_path)
            renamed_count += 1
            if renamed_count <= 5:
                print(f"OK {old_name} -> {new_name}")
        except Exception as e:
            print(f"ERROR renaming {old_name}: {e}")

print(f"\nRenamed {renamed_count} files successfully")
