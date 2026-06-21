# PR_Molière — Workflow propre d’intégration des sujets web

## Objectif

Transformer une ressource externe éducative en sujet exploitable dans PR_Molière sans copier directement les contenus protégés.

## Règle principale

PR_Molière ne doit pas importer automatiquement les PDF, les corrections ou les textes complets provenant de sites externes.

Les sites comme AlloSchool, Moutamadris ou Attarbia sont utilisés comme :

- sources de repérage ;
- références externes ;
- catalogue de liens ;
- inspiration pédagogique générale ;
- point de départ pour créer des sujets originaux.

## Processus d’intégration

### 1. Repérer la source

Noter :

- site ;
- lien ;
- niveau ;
- type d’évaluation ;
- année si disponible ;
- région si disponible ;
- thème général.

### 2. Vérifier les droits

Classer la source :

- lien externe seulement ;
- contenu autorisé ;
- sujet à reformuler ;
- contenu à ne pas intégrer.

### 3. Créer un sujet original

Le sujet PR_Molière doit être rédigé de façon originale :

- nouveau texte support ;
- nouvelles questions ;
- barème adapté ;
- correction modèle originale ;
- critères pédagogiques clairs.

### 4. Conserver la traçabilité

Chaque sujet doit garder :

- source d’inspiration ;
- date de création ;
- statut juridique ;
- auteur interne ;
- version du corpus.

### 5. Valider avant intégration

Avant commit :

- vérifier le barème sur 20 ;
- vérifier les critères ;
- vérifier l’absence de copie directe ;
- lancer npm run validate:exam-corpus ;
- lancer npm run lint ;
- lancer npm run build.

## Conclusion

La Phase 5 permet d’enrichir PR_Molière à partir du web de manière propre, traçable et défendable.
