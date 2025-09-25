import os
import subprocess

def list_images_with_links():
    repo = "magox2694/assets-myrealvet"

    # Trova la root del repo con git
    repo_root = subprocess.check_output(
        ["git", "rev-parse", "--show-toplevel"], text=True
    ).strip()

    # Path relativo dal repo root alla cartella corrente
    rel_path = os.path.relpath(os.getcwd(), repo_root)

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
