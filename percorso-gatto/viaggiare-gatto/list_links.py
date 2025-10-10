import os

def list_images_with_links():
    repo = "magox2694/assets-myrealvet"

    # Cartella dove si trova lo script
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Cartella root del repo = vai su fino a trovare "assets-myrealvet"
    parts = script_dir.split("assets-myrealvet")
    if len(parts) < 2:
        print("❌ Non trovo la cartella 'assets-myrealvet' nel path")
        return

    rel_path = parts[1].lstrip("/")

    base_url = f"https://cdn.jsdelivr.net/gh/{repo}/{rel_path}/"

    found = False
    for file in os.listdir(script_dir):
        if file.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg")):
            print(f'"{file}" : "{base_url}{file}",')
            found = True

    if not found:
        print("⚠️ Nessuna immagine trovata in questa cartella.")

if __name__ == "__main__":
    list_images_with_links()
