# Phase 2 — Supabase + Dashboard élève

Objectif : ajouter l'historique des réponses élèves, les scores, les erreurs fréquentes et un tableau de bord de progression.

## Socle créé

- Client Supabase : `src/lib/supabase.ts`
- Types : `src/types/supabase.ts`
- Service historique : `src/services/studentHistory.ts`
- Schéma SQL : `db/supabase_schema.sql`

## Variables nécessaires plus tard

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Prochaine étape

Créer le projet Supabase, exécuter le schéma SQL, puis relier l'historique au bouton de correction.
