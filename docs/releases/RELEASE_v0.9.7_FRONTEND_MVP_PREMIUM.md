# PR Molière — Release v0.9.7 Frontend MVP Premium

## Objectif

La version v0.9.7 améliore la force de démonstration du MVP PR Molière sans remplacer l’application existante.

Elle conserve les acquis de v0.9.6 :

- corpus de 90 sujets collège ;
- couverture 1AC, 2AC et 3AC ;
- vérification du vouvoiement ;
- tuteur IA ;
- interface React/Vite/TypeScript ;
- compatibilité build Railway ;
- validation locale par scripts qualité.

## Ajouts frontend v0.9.7

### 1. Hero premium MVP

Fichier ajouté :

- `src/components/MvpPremiumHero.tsx`

Rôle :

- présenter clairement la promesse pédagogique ;
- mettre en avant la progression ;
- donner un accès direct aux examens ;
- renforcer l’effet démonstration produit.

### 2. Cartes d’accès rapide

Fichier ajouté :

- `src/components/MvpQuickAccessCards.tsx`

Rôle :

- accès rapide aux examens structurés ;
- accès au tuteur IA ;
- accès à la progression ;
- préparation à une démonstration brevet / partenaire.

### 3. Bandeau de preuve MVP

Fichier ajouté :

- `src/components/MvpAudienceProof.tsx`

Rôle :

- montrer la valeur pour les enseignants ;
- montrer la valeur pour les élèves ;
- montrer la valeur pour les partenaires ;
- rendre le MVP plus convaincant visuellement.

## Intégration

Les composants suivants sont intégrés dans `src/App.tsx` :

- `MvpPremiumHero`
- `MvpQuickAccessCards`
- `MvpAudienceProof`

Ils sont placés avant la zone principale du tuteur IA afin de renforcer l’impact de la page d’accueil.

## Commits principaux

- `1da471f` — Add premium MVP hero to v0.9.7 frontend
- `09fbde6` — Add quick access MVP cards to v0.9.7 frontend
- `6b6f675` — Add MVP audience proof section to v0.9.7 frontend

## Validation qualité

Contrôles validés :

- `npm run validate:exam-corpus`
- `npm run check:vouvoiement`
- `npm run lint`
- `npm run build`

Résultats attendus et obtenus :

- `CORPUS_VALIDATION=OK`
- `VOUVOIEMENT_CHECK_OK`
- build production OK

## État final

La version v0.9.7 est prête pour validation finale, merge vers `main`, tag de release et déploiement Railway.
