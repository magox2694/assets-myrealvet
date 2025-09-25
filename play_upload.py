# -------Questo script legge le immagini nuove aggiunte e restituisce i link diretti tramite jsdelivr.net-------
import subprocess
import os

def main():
    repo = "magox2694/assets-myrealvet"
    branch = "main"

    comment = input("Messaggio di commit: ")

    # Git add & commit
    subprocess.run(["git", "add", "."])
    subprocess.run(["git", "commit", "-m", comment])
    subprocess.run(["git", "push", "origin", branch])

    # Trova le immagini aggiunte
    res = subprocess.run(["git", "diff", "--name-only", "HEAD~1"], capture_output=True, text=True)
    files = [f for f in res.stdout.splitlines() if f.endswith((".png",".jpg",".jpeg",".gif"))]

    print("\n✅ Push completato. Ecco i link diretti:\n")
    for f in files:
        print(f"https://cdn.jsdelivr.net/gh/{repo}/{f}")
        print(" ")
        print(" ")

if __name__ == "__main__":
    main()
