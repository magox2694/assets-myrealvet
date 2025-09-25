import os

def list_images_with_links():
    # Nome del repository GitHub
    repo = "magox2694/assets-myrealvet"
    
    # Percorso relativo della cartella attuale nel repo
    # (esempio: img/payhip/pg-alimentazione-cane)
    rel_path = os.path.relpath(os.getcwd(), start=os.path.dirname(os.getcwd()))
    
    base_url = f"https://cdn.jsdelivr.net/gh/{repo}/{rel_path}/"
    
    # Filtra solo immagini
    for file in os.listdir("."):
        if file.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg")):
            print(f'"{file}" : "{base_url}{file}",')

if __name__ == "__main__":
    list_images_with_links()
