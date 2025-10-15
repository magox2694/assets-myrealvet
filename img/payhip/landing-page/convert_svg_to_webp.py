import os
import subprocess

# Percorso relativo alla cartella del tuo repo
BASE_DIR = "img/payhip/landing-page"

# Qualità di conversione
QUALITY = "90"

# Comando base per cwebp (deve essere installato)
CWEBP_CMD = "cwebp"

def convert_svg_to_webp():
    # Conta conversioni
    converted = 0

    if not os.path.exists(BASE_DIR):
        print(f"❌ Cartella non trovata: {BASE_DIR}")
        return

    for file in os.listdir(BASE_DIR):
        if file.lower().endswith(".svg"):
            svg_path = os.path.join(BASE_DIR, file)
            webp_path = svg_path.replace(".svg", ".webp")

            try:
                # Esegui conversione
                subprocess.run(
                    [CWEBP_CMD, "-q", QUALITY, svg_path, "-o", webp_path],
                    check=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                )
                print(f"✅ Convertito: {file} → {os.path.basename(webp_path)}")
                converted += 1
            except subprocess.CalledProcessError as e:
                print(f"⚠️ Errore su {file}: {e.stderr.decode()}")

    if converted == 0:
        print("ℹ️ Nessun file SVG trovato.")
    else:
        print(f"\n🎉 Conversione completata ({converted} file convertiti).")


if __name__ == "__main__":
    convert_svg_to_webp()
