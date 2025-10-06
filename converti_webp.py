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

    # Usa compressione lossless per mantenere alpha
    img.save(output_path, "webp", lossless=True, quality=quality)
    print(f"✅ {input_path} → {output_path} (trasparenza preservata)")

def convert_folder_to_webp(folder, quality=90):
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
