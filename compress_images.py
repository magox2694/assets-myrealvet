#!/usr/bin/env python3
import os
import shutil
import subprocess
from pathlib import Path

# === CONFIGURAZIONE ===
QUALITY = 70  # qualità di compressione (0–100)
VALID_EXT = (".png", ".jpg", ".jpeg", ".webp", ".gif")
REPO_DIR = Path(__file__).resolve().parent
LOG_FILE = REPO_DIR / "compression_log.txt"
BACKUP_DIR = REPO_DIR / "_backup_originali"
BACKUP_DIR.mkdir(exist_ok=True)

# === FUNZIONI ===
def backup_file(path):
    """Salva una copia dell'immagine originale la prima volta che viene compressa."""
    backup_path = BACKUP_DIR / path.relative_to(REPO_DIR)
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    if not backup_path.exists():
        shutil.copy2(path, backup_path)
        print(f"💾 Backup creato: {backup_path.relative_to(REPO_DIR)}")

def compress_image(path: Path):
    """Comprimi un'immagine sovrascrivendo il file originale."""
    ext = path.suffix.lower()
    try:
        backup_file(path)
        temp_out = path.with_suffix(".webp")

        if ext == ".webp":
            subprocess.run(["cwebp", "-quiet", "-q", str(QUALITY), str(path), "-o", str(path)], check=True)

        elif ext in [".jpg", ".jpeg"]:
            subprocess.run(["cwebp", "-quiet", "-q", str(QUALITY), str(path), "-o", str(temp_out)], check=True)
            if temp_out.exists():
                os.remove(path)
                os.rename(temp_out, path)
            else:
                print(f"⚠️ Nessun file creato per {path.name}, saltato.")
                return False

        elif ext == ".png":
            subprocess.run(["cwebp", "-quiet", "-lossless", str(path), "-o", str(temp_out)], check=True)
            if temp_out.exists():
                os.remove(path)
                os.rename(temp_out, path)
            else:
                print(f"⚠️ Nessun file creato per {path.name}, saltato.")
                return False

        elif ext == ".gif":
            subprocess.run(["cwebp", "-quiet", "-q", str(QUALITY), str(path), "-o", str(path)], check=True)

        else:
            return None

        if not path.exists():
            print(f"⚠️ File non trovato dopo compressione: {path}")
            return False

        return True

    except Exception as e:
        with open(LOG_FILE, "a", encoding="utf-8") as log:
            log.write(f"❌ Errore su {path}: {e}\n")
        print(f"❌ Errore su {path.name}: {e}")
        return False


# === MAIN ===
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
    print(f"💾 Backup originali in: {BACKUP_DIR}")


if __name__ == "__main__":
    main()
