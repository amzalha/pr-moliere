#!/usr/bin/env bash
set -e

cd "/home/debpc/projets/PR_Molière"

if ! curl -s http://localhost:3000 >/dev/null; then
  echo "Serveur non actif, démarrage..."
  nohup npm run dev > /tmp/pr_moliere_openrouter.log 2>&1 &
  sleep 3
fi

echo "=== TEST 1 : REPONSE JUSTE ==="

JUSTE_JSON="$(curl -s http://localhost:3000/api/pedagogie/evaluer \
  -H "Content-Type: application/json" \
  -d '{
    "niveau": "1AC",
    "theme": "La structure du conte et formules d’ouverture",
    "exercice_consigne": "Identifie la formule d’ouverture dans : Jadis, un vieux pêcheur marocain nommé Youssef habitait près de Larache.",
    "reponse_eleve": "Jadis"
  }')"

echo "$JUSTE_JSON" | python3 -m json.tool

echo "$JUSTE_JSON" | python3 - <<'PY'
import sys, json
data = json.load(sys.stdin)
assert data.get("statut") == "[CORRECTION_JUSTE]", data
assert data.get("contenu_pedagogique"), data
assert data.get("rappel_cours"), data
print("TEST_REPONSE_JUSTE_OK")
PY

echo ""
echo "=== TEST 2 : REPONSE FAUSSE SECURISEE ==="

FAUSSE_JSON="$(curl -s http://localhost:3000/api/pedagogie/evaluer \
  -H "Content-Type: application/json" \
  -d '{
    "niveau": "1AC",
    "theme": "La structure du conte et formules d’ouverture",
    "exercice_consigne": "Identifie la formule d’ouverture dans : Jadis, un vieux pêcheur marocain nommé Youssef habitait près de Larache.",
    "reponse_eleve": "Youssef"
  }')"

echo "$FAUSSE_JSON" | python3 -m json.tool

echo "$FAUSSE_JSON" | python3 - <<'PY'
import sys, json
data = json.load(sys.stdin)
texte = (data.get("contenu_pedagogique", "") + " " + data.get("rappel_cours", "")).lower()
interdits = [
    "la bonne réponse est",
    "il fallait répondre",
    "réponse correcte :",
    "tu devais écrire",
]
assert data.get("statut") == "[CORRECTION_FAUSSE]", data
assert data.get("contenu_pedagogique"), data
assert data.get("rappel_cours"), data
assert not any(x in texte for x in interdits), data
print("TEST_REPONSE_FAUSSE_SECURISEE_OK")
PY

echo ""
echo "PR_MOLIERE_REGRESSION_TESTS_OK"
