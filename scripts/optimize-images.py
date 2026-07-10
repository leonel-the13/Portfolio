import os
from PIL import Image, ImageOps

def optimize_image(filepath):
    try:
        orig_size = os.path.getsize(filepath)
        # Skip files under 50KB to avoid re-compressing already optimized assets
        if orig_size < 50 * 1024:
            return

        with Image.open(filepath) as img:
            # Handle EXIF orientation if present
            try:
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass

            ext = os.path.splitext(filepath)[1].lower()
            
            # Resize if dimensions are larger than 1200px
            max_size = 1200
            w, h = img.size
            if w > max_size or h > max_size:
                if w > h:
                    new_w = max_size
                    new_h = int(h * (max_size / w))
                else:
                    new_h = max_size
                    new_w = int(w * (max_size / h))
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                print(f"Resized {filepath}: {w}x{h} -> {new_w}x{new_h}")

            if ext in ['.jpg', '.jpeg']:
                if img.mode == 'RGBA':
                    img = img.convert('RGB')
                img.save(filepath, 'JPEG', quality=80, optimize=True)
            elif ext == '.png':
                img.save(filepath, 'PNG', optimize=True)

        new_size = os.path.getsize(filepath)
        reduction = (orig_size - new_size) / orig_size * 100
        print(f"Optimized {filepath}: {orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({reduction:.1f}% reduction)")
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")

def main():
    public_dir = 'public'
    for root, _, files in os.walk(public_dir):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.jpg', '.jpeg', '.png']:
                filepath = os.path.join(root, file)
                optimize_image(filepath)

if __name__ == '__main__':
    main()
