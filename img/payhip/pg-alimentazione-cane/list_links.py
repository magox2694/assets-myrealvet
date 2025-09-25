import os

def list_images_with_links():
    # Nome del repository GitHub
    repo = "magox2694/assets-myrealvet"

    # Percorso relativo dal root del repo alla cartella corrente
    # Ad esempio: img/payhip/pg-alimentazione-cane
    rel_path = "img/payhip/pg-alimentazione-cane"
    
    base_url = f"https://cdn.jsdelivr.net/gh/{repo}/{rel_path}/"

    found = False
    for file in os.listdir("."):
        if file.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg")):
            print(f'"{file}" : "{base_url}{file}",')
            found = True
    
    if not found:
        print("⚠️ Nessuna immagine trovata in questa cartella.")

if __name__ == "__main__":
    list_images_with_links()
