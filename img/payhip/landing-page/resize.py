# ...existing code...
"""
Script: resize_images.py
- Cerca tutte le immagini nella cartella corrente.
- Mostra un elenco numerato e permette di selezionare singoli elementi, range o 'all'.
- Chiede le dimensioni desiderate (es. 343x343).
- Salva i file ridimensionati con suffisso -{LxA} prima dell'estensione.
- Qualità preimpostata: 80 (applicata per JPEG/WebP). Mantiene trasparenza se il formato lo supporta.
Requisiti: Pillow (pip install pillow)
"""
import os
import sys
import glob

try:
    from PIL import Image
except Exception:
    print("Pillow non è installato. Esegui: pip install pillow")
    sys.exit(1)

IMAGE_EXTS = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp", ".ico")

def find_images():
    images = []
    for ext in IMAGE_EXTS:
        images.extend(glob.glob(f"*{ext}"))
        images.extend(glob.glob(f"*{ext.upper()}"))
    # rimuove duplicati mantenendo ordine
    seen = set()
    out = []
    for p in images:
        if p not in seen:
            seen.add(p)
            out.append(p)
    return out

def parse_selection(s, max_idx):
    s = s.strip().lower()
    if s == "all":
        return list(range(1, max_idx+1))
    nums = set()
    parts = [p.strip() for p in s.split(",") if p.strip()]
    for p in parts:
        if "-" in p:
            a,b = p.split("-",1)
            try:
                a=int(a); b=int(b)
                if a<=b:
                    for i in range(a,b+1):
                        if 1<=i<=max_idx:
                            nums.add(i)
            except:
                continue
        else:
            try:
                v=int(p)
                if 1<=v<=max_idx:
                    nums.add(v)
            except:
                continue
    return sorted(nums)

def has_transparency(img):
    if img.mode in ("RGBA","LA"):
        return True
    if img.info.get("transparency") is not None:
        return True
    if img.mode == "P":
        return "transparency" in img.info
    return False

def resize_and_save(path, width, height, quality=80):
    try:
        img = Image.open(path)
    except Exception as e:
        print(f"[ERRORE] Impossibile aprire {path}: {e}")
        return False

    # Ridimensiona esattamente alle dimensioni richieste
    resized = img.resize((width, height), Image.Resampling.LANCZOS)

    base, ext = os.path.splitext(path)
    ext_lower = ext.lower()
    new_name = f"{base}-{width}x{height}{ext_lower}"

    transparency = has_transparency(img)

    # Se il formato è JPEG e c'è alpha, composita su bianco
    if ext_lower in (".jpg", ".jpeg"):
        if transparency:
            bg = Image.new("RGB", (width, height), (255,255,255))
            if resized.mode in ("RGBA","LA","P"):
                alpha = resized.convert("RGBA").split()[-1]
                bg.paste(resized.convert("RGBA").convert("RGB"), mask=alpha)
            else:
                bg.paste(resized.convert("RGB"))
            try:
                bg.save(new_name, quality=quality, optimize=True)
            except TypeError:
                bg.save(new_name, quality=quality)
        else:
            try:
                resized.convert("RGB").save(new_name, quality=quality, optimize=True)
            except TypeError:
                resized.convert("RGB").save(new_name, quality=quality)
    elif ext_lower == ".webp":
        # WebP supporta trasparenza
        try:
            resized.save(new_name, "WEBP", quality=quality, method=6)
        except TypeError:
            resized.save(new_name, "WEBP", quality=quality)
    elif ext_lower == ".png":
        # PNG: qualità non applicabile; usiamo compress_level/optimize
        try:
            resized.save(new_name, optimize=True, compress_level=6)
        except TypeError:
            resized.save(new_name)
    else:
        # Altri formati: proviamo a salvare mantenendo payload
        try:
            resized.save(new_name)
        except Exception as e:
            print(f"[ERRORE] Salvataggio fallito per {new_name}: {e}")
            return False

    print(f"[OK] {path} -> {new_name}")
    return True

def main():
    images = find_images()
    if not images:
        print("Nessuna immagine trovata nella cartella corrente.")
        return

    print("Immagini trovate:")
    for i,p in enumerate(images, start=1):
        print(f"{i}. {p}")

    sel = input("\nSeleziona immagini da ridimensionare (es. 1,3-5 oppure 'all'): ").strip()
    indices = parse_selection(sel, len(images))
    if not indices:
        print("Nessuna selezione valida. Esco.")
        return

    dim = input("Inserisci dimensioni (es. 343x343): ").strip().lower()
    try:
        if "x" in dim:
            w,h = dim.split("x",1)
        else:
            parts = dim.split()
            w,h = parts[0], parts[1]
        width = int(w)
        height = int(h)
        if width<=0 or height<=0:
            raise ValueError()
    except Exception:
        print("Dimensioni non valide. Usa formato WIDTHxHEIGHT (es. 343x343).")
        return

    q_in = input("Qualità (1-100) per JPEG/WebP [default 80]: ").strip()
    if q_in == "":
        quality = 80
    else:
        try:
            quality = int(q_in)
            if quality < 1 or quality > 100:
                quality = 80
        except:
            quality = 80

    print(f"\nAvvio ridimensionamento a {width}x{height} (quality={quality})...\n")
    success = 0
    for idx in indices:
        path = images[idx-1]
        if resize_and_save(path, width, height, quality=quality):
            success += 1

    print(f"\nCompletato: {success}/{len(indices)} immagini ridimensionate.")

if __name__ == "__main__":
    main()
# ...existing code...