# Déploiement Render — PR_Molière

Build Command:
npm ci && npm run build

Start Command:
npm start

Variable secrète à ajouter dans Render:
OPENROUTER_API_KEY

Variables déjà prévues dans render.yaml:
AI_PROVIDER=openrouter
OPENROUTER_GENERATION_MODEL=z-ai/glm-4.5-air
OPENROUTER_EVAL_MODEL=deepseek/deepseek-chat-v3.1
OPENROUTER_JUDGE_MODEL=qwen/qwen3-235b-a22b-2507
OPENROUTER_CHAT_MODEL=z-ai/glm-4.5-air
