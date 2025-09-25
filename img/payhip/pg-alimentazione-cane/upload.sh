#!/bin/bash

# Se non passi un messaggio al commit, usa uno di default
MESSAGE=${1:-"Aggiornate immagini"}

# Aggiunge SOLO i file dentro la cartella immagini
git add img/payhip/pg-alimentazione-cane/

# Ottiene la lista dei file modificati/aggiunti
FILES=$(git diff --cached --name-only)

# Crea il commit
git commit -m "$MESSAGE"

# Push su main
git push origin main

# Stampa i link jsDelivr per i file aggiornati
echo "✅ Immagini aggiornate!"
echo "🔗 Link jsDelivr:"
for FILE in $FILES; do
  echo "https://cdn.jsdelivr.net/gh/magox2694/assets-myrealvet/$FILE"
done
