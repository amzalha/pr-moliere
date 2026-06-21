# PR_Molière — QA Phase 4.9

## Validation du mode Examens avec sauvegarde Historique

## Objectif

Vérifier que le parcours suivant fonctionne réellement :

1. ouvrir l’onglet Examens ;
2. cliquer sur S’entraîner ;
3. charger un sujet d’examen ;
4. saisir une réponse d’élève ;
5. valider la réponse ;
6. obtenir une correction IA ;
7. vérifier la sauvegarde dans l’Historique Supabase.

## Résultat observé

Le test utilisateur est validé.

La capture montre :

- sujet d’examen chargé dans la zone principale ;
- réponse d’élève saisie ;
- correction IA affichée ;
- onglet Historique ouvert ;
- dernière réponse visible ;
- statistiques mises à jour.

## Statut

VALIDÉ

## Version concernée

PR_Molière v0.4.1 — Exam training

## Conclusion

Le module Examens est utilisable en parcours réel.

PR_Molière permet maintenant de sélectionner un sujet d’examen, de s’entraîner, de recevoir une correction IA et d’enregistrer le résultat dans l’historique élève.
