# ==========================================================
# Script Git automatico – Pull se necessario, poi Push
# ==========================================================
import subprocess
import sys

def run_cmd(cmd, description=None):
    """Esegue un comando shell e mostra log dettagliati"""
    if description:
        print(f"\n🔹 {description}...")
    print(f"📜 Comando: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.stdout:
        print(f"🟢 Output:\n{result.stdout.strip()}")
    if result.stderr:
        print(f"⚠️ Stderr:\n{result.stderr.strip()}")
    if result.returncode != 0:
        print(f"❌ Errore durante '{' '.join(cmd)}'")
        sys.exit(1)
    return result.stdout.strip()

def git_push():
    commit_msg = "Modifiche generali"

    print("\n🚀 Avvio procedura automatica Git")
    print("=================================")

    # 1️⃣ Fetch per controllare aggiornamenti remoti
    run_cmd(["git", "fetch"], "Controllo aggiornamenti remoti")

    # 2️⃣ Verifica se ci sono differenze con il remoto
    local_hash = run_cmd(["git", "rev-parse", "@"])
    remote_hash = run_cmd(["git", "rev-parse", "@{u}"])
    base_hash = run_cmd(["git", "merge-base", "@", "@{u}"])

    if local_hash == remote_hash:
        print("✅ Il repository locale è già aggiornato con il remoto.")
    elif local_hash == base_hash:
        print("⬇️ Ci sono aggiornamenti remoti: eseguo git pull...")
        run_cmd(["git", "pull"], "Download e merge modifiche remote")
    elif remote_hash == base_hash:
        print("⬆️ Ci sono modifiche locali da pushare.")
    else:
        print("⚠️ I rami locale e remoto sono divergenti. È necessario un merge manuale.")
        sys.exit(1)

    # 3️⃣ Aggiunta e commit delle modifiche locali
    run_cmd(["git", "add", "-A"], "Aggiunta di tutti i file modificati")
    run_cmd(["git", "commit", "-m", commit_msg], "Creazione del commit")

    # 4️⃣ Push verso il branch main
    run_cmd(["git", "push", "origin", "main"], "Invio modifiche su GitHub")

    print("\n🎉 Operazione completata con successo!")

if __name__ == "__main__":
    git_push()
