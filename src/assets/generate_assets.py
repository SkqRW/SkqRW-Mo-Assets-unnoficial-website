import os
import json
import base64
from pathlib import Path

def get_png_files_from_directory(directory_path, base_path=""):
    png_files = []
    
    if not os.path.exists(directory_path):
        print(f"Warning: Directory {directory_path} does not exist")
        return png_files
    
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.lower().endswith('.png'):
                full_path = os.path.join(root, file)
                relative_path = os.path.relpath(full_path, base_path if base_path else directory_path)
                
                web_path = relative_path.replace('\\', '/')
                if base_path:
                    web_path = os.path.relpath(full_path, base_path).replace('\\', '/')
                
                png_files.append({
                    'name': file,
                    'path': relative_path,
                    'url': web_path,
                    'author': 'IN the repo excel, not here (to do it here later)',
                    'type': None,
                    'size': os.path.getsize(full_path)
                })
    
    return png_files

def generate_assets_data():
    # The script is in /src/assets/ but the assets are in the root directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Go up two levels: from /src/assets/ to the project root
    base_path = os.path.dirname(os.path.dirname(script_dir))
    
    categories = {
        'full-renderer': {
            'name': 'Full Renderer',
            'paths': [
                "Mo' Assets/Full Renderer Folders/Graphics",
                "Mo' Assets/Full Renderer Folders/Materials", 
                "Mo' Assets/Full Renderer Folders/Props"
            ]
        },
        'material-packs': {
            'name': 'Material Packs',
            'paths': [
                "Mo' Assets/Modded Asset Packs/Material Packs"
            ]
        },
        'prop-packs': {
            'name': 'Prop Packs', 
            'paths': [
                "Mo' Assets/Modded Asset Packs/Prop Packs"
            ]
        },
        'tile-packs': {
            'name': 'Tile Packs',
            'paths': [
                "Mo' Assets/Modded Asset Packs/Tile Packs"
            ]
        }
    }
    
    assets_data = {}
    
    for category_id, category_info in categories.items():
        print(f"Processing {category_info['name']}...")
        category_files = []
        
        for path in category_info['paths']:
            full_path = os.path.join(base_path, path)
            files = get_png_files_from_directory(full_path, base_path)
            category_files.extend(files)
            print(f"  Found {len(files)} files in {path}")
        
        assets_data[category_id] = {
            'name': category_info['name'],
            'count': len(category_files),
            'files': category_files
        }
        
        print(f"Total for {category_info['name']}: {len(category_files)} files")
    
    return assets_data

def create_assets_js():
    print("Generating assets data...")
    assets_data = generate_assets_data()
    
    js_content = f"""// Auto-generated asset data
// Generated on: {__import__('datetime').datetime.now().isoformat()}

const ASSETS_DATA = {json.dumps(assets_data, indent=2)};

// Function to get assets from a category
function getAssetsForCategory(categoryId) {{
    return ASSETS_DATA[categoryId] || {{ name: 'Unknown', count: 0, files: [] }};
}}

// Function to search assets
function searchAssets(categoryId, searchTerm) {{
    const category = ASSETS_DATA[categoryId];
    if (!category) return [];
    
    if (!searchTerm) return category.files;
    
    const term = searchTerm.toLowerCase();
    return category.files.filter(asset => 
        asset.name.toLowerCase().includes(term) ||
        asset.path.toLowerCase().includes(term)
    );
}}

// Export for use in HTML
if (typeof window !== 'undefined') {{
    window.ASSETS_DATA = ASSETS_DATA;
    window.getAssetsForCategory = getAssetsForCategory;
    window.searchAssets = searchAssets;
}}
"""

    # Generate assets.js in the same src/assets folder where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "assets.js")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("\n=== SUMMARY ===")
    total_files = sum(cat['count'] for cat in assets_data.values())
    print(f"Total PNG files found: {total_files}")
    
    for category_id, category in assets_data.items():
        print(f"  {category['name']}: {category['count']} files")
    
    print(f"\nAssets data saved to: {output_path}")

if __name__ == "__main__":
    create_assets_js()