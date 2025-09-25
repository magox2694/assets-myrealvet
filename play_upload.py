import subprocess
import tkinter as tk
from tkinter import simpledialog, messagebox

# Configura i parametri del repo
GITHUB_USER = "magox2694"
REPO_NAME = "assets-myrealvet"
IMG_DIR = "img/payhip/pg-alimentazione-cane/"

def run_git_command(cmd):
    """Esegue un comando git e ritorna l'output"""
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.stderr:
        print("⚠️", result.stderr.strip())
    return result.stdout.strip()

def main():
    # Finestra tkinter
    root = tk.Tk()
    root.withdraw()

    # Chiede il messaggio di commit
    msg = simpledialog.askstring("Commit", "Inserisci il messaggio per il commit:")
    if not msg:
        msg = "Aggiornate immagini"

    # Aggiunge solo la cartella immagini
    run_git_command(["git", "add", IMG_DIR])

    # Recupera la lista dei file aggiunti/modificati
    files = run_git_command(["git", "diff", "--cached", "--name-only"]).splitlines()

    if not files:
        messagebox.showinfo("Info", "⚠️ Nessuna nuova immagine trovata da caricare.")
        return

    # Commit + push
    run_git_command(["git", "commit", "-m", msg])
    run_git_command(["git", "push", "origin", "main"])

    # Costruisce i link jsDelivr
    links = []
    for file in files:
        links.append(f"https://cdn.jsdelivr.net/gh/{GITHUB_USER}/{REPO_NAME}/{file}")

    # Mostra popup con i link
    messagebox.showinfo("Upload completato ✅", "\n".join(links))

if __name__ == "__main__":
    main()
