# PR_Molière — Corpus examens français collège Maroc

## Objectif

La Phase 4 transforme PR_Molière en plateforme d’entraînement réellement alignée avec les évaluations du collège marocain.

Le corpus doit couvrir :

- 1AC : contrôles continus ;
- 2AC : contrôles continus ;
- 3AC : contrôles continus, examen local, examen régional ;
- lecture ;
- langue ;
- production écrite ;
- barèmes ;
- corrections modèles ;
- réponses élèves justes, partielles et fausses.

## 1. Sources prioritaires

### AlloSchool

Utilisation :

- cours ;
- devoirs ;
- examens régionaux ;
- supports classés par niveau.

Pages utiles :

- Français 1AC ;
- Français 3AC ;
- Examens régionaux 3AC.

### Moutamadris

Utilisation :

- devoirs surveillés ;
- examens régionaux ;
- documents classés par année et niveau.

### Attarbia

Utilisation secondaire :

- devoirs ;
- contrôles ;
- documents complémentaires.

## 2. Sources à éviter comme base principale

Facebook, Scribd et documents non vérifiés ne doivent pas être utilisés comme base officielle du corpus.

Ils peuvent servir uniquement pour repérage manuel, jamais comme source principale.

## 3. Structure cible d’un sujet

Chaque sujet doit être transformé en format structuré.

Exemple de structure :

{
  "niveau": "3AC",
  "type_evaluation": "examen_regional",
  "region": "Rabat-Sale-Kenitra",
  "annee": "2024",
  "matiere": "francais",
  "competence": "lecture",
  "theme": "texte narratif",
  "consigne": "Reponds aux questions suivantes...",
  "reponse_attendue": "Reponse modele...",
  "bareme": "2 points",
  "source": "AlloSchool",
  "url": "..."
}

## 4. Modules futurs dans PR_Molière

### Banque de sujets

Filtres :

- niveau ;
- semestre ;
- type d’évaluation ;
- région ;
- année ;
- compétence.

### Mode examen

Fonctions :

- afficher un sujet ;
- recevoir la réponse élève ;
- corriger avec barème ;
- donner un score ;
- sauvegarder dans Supabase ;
- recommander les révisions.

### Corpus qualité IA

Objectif :

- tester si l’IA corrige bien ;
- comparer plusieurs modèles ;
- mesurer les erreurs ;
- améliorer les prompts ;
- créer un benchmark interne.

## 5. Priorité immédiate

Priorité de développement :

1. créer une structure locale de corpus ;
2. ajouter quelques sujets manuels 3AC ;
3. ajouter des réponses modèles ;
4. créer un mode “Examen régional 3AC” ;
5. connecter les résultats au dashboard.

## 6. Conclusion

La Phase 4 doit donner à PR_Molière une base pédagogique solide.

Le projet ne sera plus seulement un tuteur IA, mais une plateforme de préparation aux examens du collège marocain.
