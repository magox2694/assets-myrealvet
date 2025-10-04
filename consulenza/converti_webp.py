import os
from PIL import Image

def convert_folder_to_webp(folder, quality=80):
    for root, _, files in os.walk(folder):
        for file in files:
            if file.lower().endswith((".png", ".jpg", ".jpeg")):
                input_path = os.path.join(root, file)
                output_path = os.path.splitext(input_path)[0] + ".webp"
                try:
                    img = Image.open(input_path).convert("RGB")
                    img.save(output_path, "webp", quality=quality)
                    print(f"✅ {input_path} → {output_path}")
                except Exception as e:
                    print(f"⚠️ Errore su {input_path}: {e}")

# Esempio: converte tutte le immagini sotto img/payhip/
convert_folder_to_webp("img/payhip", quality=80)
