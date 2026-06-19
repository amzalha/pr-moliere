#!/usr/bin/env bash
set -e

cd "/home/debpc/projets/PR_Molière"

set -a
source .env
set +a

echo "=== CHECK OPENROUTER PR_Molière ==="

if [ -z "$OPENROUTER_API_KEY" ]; then
  echo "OPENROUTER_API_KEY_PRESENT=NO"
  exit 1
fi

MODEL="${OPENROUTER_EVAL_MODEL:-deepseek/deepseek-chat-v3.1}"

echo "OPENROUTER_API_KEY_PRESENT=YES"
echo "OPENROUTER_EVAL_MODEL=$MODEL"

curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -H "HTTP-Referer: http://localhost:3000" \
  -H "X-Title: PR_Molière" \
  -d "{\"model\":\"$MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"Réponds uniquement: OPENROUTER_OK\"}],\"temperature\":0}" \
  | python3 -c 'import sys,json; d=json.load(sys.stdin); print("MODEL_USED="+d.get("model","unknown")); print("ANSWER="+d["choices"][0]["message"]["content"])'

echo "OPENROUTER_CHECK_SCRIPT_OK"
