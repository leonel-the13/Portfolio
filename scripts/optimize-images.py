"""
Prepara as fotos de public/images para a web. Uso: npm run images

Só mexe no que precisa (pode correr-se várias vezes sem perder qualidade):
- HEIC/HEIF (fotos do iPhone) -> JPG
- lado maior acima de 1600px -> redimensiona
- rotação EXIF -> aplicada aos píxeis
- metadados (incluindo localização GPS) -> removidos

O original de cada ficheiro alterado é guardado em originals/ (fora do site e do git).
Requer Pillow (pip install pillow). HEIC usa o `sips` do macOS ou, se instalado, pillow-heif.
"""

import os
import shutil
import subprocess
import sys
import tempfile

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, "public", "images")
ORIGINALS = os.path.join(ROOT, "originals")
MAX_SIDE = 1600
WEB = {".jpg", ".jpeg", ".png", ".webp"}
HEIC = {".heic", ".heif"}

try:
    from pillow_heif import register_heif_opener  # type: ignore

    register_heif_opener()
    HEIF_NATIVE = True
except ImportError:
    HEIF_NATIVE = False


def backup(path):
    rel = os.path.relpath(path, os.path.join(ROOT, "public"))
    dest = os.path.join(ORIGINALS, rel)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if not os.path.exists(dest):
        shutil.copy2(path, dest)


def open_any(path):
    """Abre a imagem; HEIC sem pillow-heif passa por um JPG temporário via sips."""
    ext = os.path.splitext(path)[1].lower()
    if ext in HEIC and not HEIF_NATIVE:
        if not shutil.which("sips"):
            raise RuntimeError("HEIC precisa do macOS (sips) ou de: pip install pillow-heif")
        tmp = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False).name
        subprocess.run(["sips", "-s", "format", "jpeg", path, "--out", tmp], check=True, capture_output=True)
        img = Image.open(tmp)
        img.load()
        os.unlink(tmp)
        return img
    img = Image.open(path)
    img.load()
    return img


def free_name(folder, base, ext):
    """Evita sobrescrever: foto.jpg, foto-1.jpg, foto-2.jpg…"""
    name, i = f"{base}{ext}", 1
    while os.path.exists(os.path.join(folder, name)):
        name, i = f"{base}-{i}{ext}", i + 1
    return name


def process(path):
    folder, file = os.path.split(path)
    base, ext = os.path.splitext(file)
    ext = ext.lower()
    if ext not in WEB | HEIC:
        return None

    img = open_any(path)
    exif = img.getexif()
    too_big = max(img.size) > MAX_SIDE
    # Só reprocessa por causa dos metadados se houver GPS ou uma rotação por aplicar
    sensitive = 0x8825 in exif or exif.get(0x0112, 1) != 1
    if ext in WEB and not too_big and not sensitive:
        return None  # já está pronta

    backup(path)
    img = ImageOps.exif_transpose(img)
    if too_big:
        img.thumbnail((MAX_SIDE, MAX_SIDE), Image.Resampling.LANCZOS)

    if ext == ".png" and img.mode in ("RGBA", "LA", "P"):
        out_name, fmt, opts = file, "PNG", {"optimize": True}
    else:
        img = img.convert("RGB")
        out_ext = ".jpg" if ext in HEIC else ext
        out_name = file if ext not in HEIC else free_name(folder, base, out_ext)
        fmt = "WEBP" if out_ext == ".webp" else "JPEG"
        opts = {"quality": 80, "optimize": True, "progressive": True} if fmt == "JPEG" else {"quality": 80}

    before = os.path.getsize(path)
    out_path = os.path.join(folder, out_name)
    img.save(out_path, fmt, **opts)  # guardar sem exif remove GPS e outros metadados
    if ext in HEIC:
        os.remove(path)
    after = os.path.getsize(out_path)
    return f"{os.path.relpath(path, ROOT)} -> {out_name}  {before // 1024}KB -> {after // 1024}KB"


def main():
    changed = 0
    for root, _, files in os.walk(IMAGES):
        for file in sorted(files):
            if file.startswith("."):
                continue
            try:
                result = process(os.path.join(root, file))
            except Exception as e:  # noqa: BLE001
                print(f"ERRO {os.path.join(root, file)}: {e}", file=sys.stderr)
                continue
            if result:
                changed += 1
                print(result)
    print(f"\n{changed} imagem(ns) preparada(s)." + (" Originais em originals/." if changed else " Nada a fazer."))


if __name__ == "__main__":
    main()
