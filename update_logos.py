from pathlib import Path

# List of page files to update
pages_dir = Path(r'c:\Users\jlyn1\Documents\GitHub\CastleCustomHomes\pages')
page_files = [
    'about.html',
    'commercial.html',
    'community.html',
    'contact.html',
    'financing.html',
    'for-sale.html',
    'gallery.html',
    'lots.html',
    'our-story.html',
    'partners.html',
    'residential.html',
    'your-lot.html'
]

# Text to find and replace
old_text = '''<a href="../index.html" class="nav-logo">Castle<span class="apostrophe">'</span>s Custom Homes</a>'''
new_text = '''<a href="../index.html" class="nav-logo"><img src="../assets/images/LogoWhite.png" alt="Castle's Custom Homes Logo"></a>'''

updated_count = 0

for filename in page_files:
    file_path = pages_dir / filename

    if not file_path.exists():
        print(f"Skipping {filename} - file not found")
        continue

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if old_text in content:
            content = content.replace(old_text, new_text)

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"Updated {filename}")
            updated_count += 1
        else:
            print(f"Skipped {filename} - pattern not found")

    except Exception as e:
        print(f"Error processing {filename}: {e}")

print(f"\nTotal files updated: {updated_count}")
