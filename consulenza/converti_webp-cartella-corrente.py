from PIL import Image
import os

def convert_to_webp_preserve_alpha(input_path, output_path=None, quality=90):
    img = Image.open(input_path)

    # Mantiene trasparenza (RGBA o LA)
    if img.mode in ("RGBA", "LA"):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")

    if not output_path:
        base, _ = os.path.splitext(input_path)
        output_path = base + ".webp"

    # Salva come WebP (lossless se ha trasparenza)
    img.save(output_path, "webp", lossless=True, quality=quality)
    print(f"✅ {os.path.basename(input_path)} → {os.path.basename(output_path)} (trasparenza preservata)")

def convert_current_folder_to_webp(quality=90):
    current_folder = os.path.dirname(os.path.abspath(__file__))
    print(f"📁 Conversione immagini nella cartella: {current_folder}")

    for file in os.listdir(current_folder):
        if file.lower().endswith((".png", ".jpg", ".jpeg")):
            input_path = os.path.join(current_folder, file)
            convert_to_webp_preserve_alpha(input_path, quality=quality)

# Esegui solo nella cartella in cui si trova lo script
convert_current_folder_to_webp(quality=90)
