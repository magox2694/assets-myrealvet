#!/usr/bin/env python3
import os
import subprocess
import shutil
from pathlib import Path
import time

# === CONFIGURAZIONE ===
QUALITY = 70  # qualità per webp
VALID_EXT = (".png", ".webp")
REPO_DIR = Path(__file__).resolve().parent
BACKUP_DIR = REPO_DIR / "_backup_originali"
LOG_FILE = REPO_DIR / "compression_log.txt"


def compress_image(path: Path):
    """Comprimi un'immagine .png o .webp senza cambiare estensione."""
    ext = path.suffix.lower()
    try:
        # Percorso backup
        backup_path = BACKUP_DIR / path.relative_to(REPO_DIR)
        backup_path.parent.mkdir(parents=True, exist_ok=True)

        # Se non esiste backup, crealo
        if not backup_path.exists():
            shutil.copy2(path, backup_path)

        temp_out = path.with_suffix(".temp.webp")

        # Comando compressione
        if ext == ".png":
            cmd = ["cwebp", "-quiet", "-lossless", str(path), "-o", str(temp_out)]
        else:  # .webp
            cmd = ["cwebp", "-quiet", "-q", str(QUALITY), str(path), "-o", str(temp_out)]

        subprocess.run(cmd, check=True)

        # Attesa di sicurezza per I/O su Windows
        time.sleep(0.1)

        # Sovrascrivi l'originale
        os.replace(temp_out, path)

        return True

    except Exception as e:
        with open(LOG_FILE, "a", encoding="utf-8") as log:
            log.write(f"❌ Errore su {path}: {e}\n")
        # Elimina eventuale file temporaneo lasciato
        if Path(temp_out).exists():
            Path(temp_out).unlink(missing_ok=True)
        return False


def main():
    print("🔍 Ricerca immagini PNG e WEBP da comprimere...")
    total, compressed = 0, 0

    with open(LOG_FILE, "w", encoding="utf-8") as log:
        log.write("=== Log compressione immagini MyRealVet ===\n")

    for root, _, files in os.walk(REPO_DIR):
        # salta la cartella backup
        if "_backup_originali" in root:
            continue

        for file in files:
            if file.lower().endswith(VALID_EXT):
                total += 1
                path = Path(root) / file
                try:
                    old_size = path.stat().st_size / 1024
                    if compress_image(path):
                        new_size = path.stat().st_size / 1024
                        perc = 100 - (new_size / old_size * 100)
                        compressed += 1
                        print(f"✅ {path.relative_to(REPO_DIR)} ({old_size:.1f} → {new_size:.1f} KiB, -{perc:.1f}%)")
                        with open(LOG_FILE, "a", encoding="utf-8") as log:
                            log.write(f"✅ {path} ridotto del {perc:.1f}%\n")
                except FileNotFoundError:
                    with open(LOG_FILE, "a", encoding="utf-8") as log:
                        log.write(f"⚠️ File non trovato: {path}\n")

    print(f"\n🏁 Completato: {compressed}/{total} immagini compresse.")
    print(f"📄 Log salvato in: {LOG_FILE}")
    print(f"💾 Backup creato in: {BACKUP_DIR}")


if __name__ == "__main__":
    main()
