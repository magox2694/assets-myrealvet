#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path

# === CONFIGURAZIONE ===
QUALITY = 70  # qualità di compressione (0–100)
VALID_EXT = (".png", ".jpg", ".jpeg", ".webp", ".gif")
REPO_DIR = Path(__file__).resolve().parent
LOG_FILE = REPO_DIR / "compression_log.txt"

def compress_image(path: Path):
    """Comprimi un'immagine sovrascrivendo il file originale."""
    ext = path.suffix.lower()
    try:
        if ext == ".webp":
            subprocess.run(["cwebp", "-quiet", "-q", str(QUALITY), str(path), "-o", str(path)], check=True)
        elif ext in [".jpg", ".jpeg"]:
            subprocess.run(["cwebp", "-quiet", "-q", str(QUALITY), str(path), "-o", str(path.with_suffix(".webp"))], check=True)
            os.remove(path)
            os.rename(path.with_suffix(".webp"), path)
        elif ext == ".png":
            subprocess.run(["cwebp", "-quiet", "-lossless", str(path), "-o", str(path.with_suffix(".webp"))], check=True)
            os.remove(path)
            os.rename(path.with_suffix(".webp"), path)
        elif ext == ".gif":
            subprocess.run(["cwebp", "-quiet", "-q", str(QUALITY), str(path), "-o", str(path)], check=True)
        else:
            return None
        return True
    except Exception as e:
        with open(LOG_FILE, "a", encoding="utf-8") as log:
            log.write(f"❌ Errore su {path}: {e}\n")
        return False

def main():
    print("🔍 Ricerca immagini da comprimere...")
    total, compressed = 0, 0
    with open(LOG_FILE, "w", encoding="utf-8") as log:
        log.write("=== Log compressione immagini MyRealVet ===\n")

    for root, _, files in os.walk(REPO_DIR):
        for file in files:
            if file.lower().endswith(VALID_EXT):
                total += 1
                path = Path(root) / file
                old_size = path.stat().st_size / 1024
                if compress_image(path):
                    new_size = path.stat().st_size / 1024
                    compressed += 1
                    perc = 100 - (new_size / old_size * 100)
                    print(f"✅ {path.relative_to(REPO_DIR)}  ({old_size:.1f} → {new_size:.1f} KiB, -{perc:.1f}%)")
                    with open(LOG_FILE, "a", encoding="utf-8") as log:
                        log.write(f"✅ {path} ridotto del {perc:.1f}%\n")

    print(f"\n🏁 Completato: {compressed}/{total} immagini compresse.")
    print(f"📄 Log salvato in: {LOG_FILE}")

if __name__ == "__main__":
    #main()
    # Test di compressione su un'immagine specifica
    test_image = Path("img/payhip/landing-page/fotoprofilo.webp")
    compress_image(test_image)
    print("✅ Compressione test completata.")

