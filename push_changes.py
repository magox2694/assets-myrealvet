import os
import subprocess

def git_push():
    # Chiede un messaggio di commit all'utente
    commit_msg = "Modifiche generali"
  

    try:
        # Aggiunge tutte le modifiche (nuovi file, modifiche, eliminazioni)
        subprocess.run(["git", "add", "-A"], check=True)

        # Commit con messaggio
        subprocess.run(["git", "commit", "-m", commit_msg], check=True)

        # Push su main
        subprocess.run(["git", "push", "origin", "main"], check=True)

        print("✅ Push completato con successo!")

    except subprocess.CalledProcessError as e:
        print("❌ Errore durante il push:", e)

if __name__ == "__main__":
    git_push()
