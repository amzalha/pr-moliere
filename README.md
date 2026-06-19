# PR_Molière

Application pédagogique pour le français au collège.

## Stack

- React / Vite
- Node.js / Express
- OpenRouter côté serveur
- Déploiement Render

## Lancement local

npm ci
npm run build
npm run dev

Adresse locale :

http://localhost:3000

## Variables nécessaires

AI_PROVIDER="openrouter"
OPENROUTER_API_KEY="..."
OPENROUTER_GENERATION_MODEL="z-ai/glm-4.5-air"
OPENROUTER_EVAL_MODEL="deepseek/deepseek-chat-v3.1"
OPENROUTER_JUDGE_MODEL="qwen/qwen3-235b-a22b-2507"
OPENROUTER_CHAT_MODEL="z-ai/glm-4.5-air"

Les clés API ne doivent jamais être publiées dans GitHub.
