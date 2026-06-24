export interface LessonTopic {
 id: string;
 title: string;
 level: "1AC" | "2AC" | "3AC";
 category: "Lecture/Genre" | "Langue" | "Média/Communication" | "Écrit/Correspondance";
 description: string;
 defaultPrompt: string;
 keyRule: string;
}

export const LESSONS: LessonTopic[] = [
 // 1AC
 {
  id: "1ac-structure-conte",
  title: "La structure du conte & formules d'ouverture",
  level: "1AC",
  category: "Lecture/Genre",
  description: "Apprendre à identifier les formules du conte (Il était une fois, jadis...) et son univers magique.",
  defaultPrompt: "Génère un exercice sur l'identification des formules d'ouverture et le début d'un conte merveilleux se déroulant dans un village marocain.",
  keyRule: "Le conte commence par une formule d'ouverture imagée suivie d'une situation initiale stable souvent à l'imparfait."
 },
 {
  id: "1ac-schema-narratif",
  title: "Le schéma narratif",
  level: "1AC",
  category: "Lecture/Genre",
  description: "Les 5 étapes du récit : Situation initiale, élément modificateur, péripéties, dénouement, situation finale.",
  defaultPrompt: "Génère un exercice textuel où l'élève doit identifier l'étape du schéma narratif (par exemple, l'élément perturbateur déclenché par une tempête à Essaouira).",
  keyRule: "Le schéma narratif organise les actions du récit en cinq étapes chronologiques indispensables."
 },
 {
  id: "1ac-portrait-moral",
  title: "Le portrait physique et moral",
  level: "1AC",
  category: "Lecture/Genre",
  description: "Savoir caractériser un personnage de manière voir ou dévalorisante.",
  defaultPrompt: "Génère un exercice de caractérisation : compléter le portrait physique et moral d'un vieux artisan de Marrakech (Youssef, le tisserand).",
  keyRule: "Le portrait utilise des adjectifs qualificatifs et des métaphores pour peindre les traits physiques et le tempérament de quelqu'un."
 },
 {
  id: "1ac-indicateurs-spatiotemporels",
  title: "Les indicateurs de temps et de lieu",
  level: "1AC",
  category: "Langue",
  description: "Maîtriser l'usage des marqueurs spatio-temporels pour situer les événements du récit.",
  defaultPrompt: "Génère un exercice consistant à placer des marqueurs (soudain, jadis, au milieu de la ruelle de Fès, alors) pour organiser un petit récit fluide.",
  keyRule: "Les indicateurs structurent le temps (chronologie) et le lieu (espace) pour donner des repères visuels au lecteur."
 },
 {
  id: "1ac-caracterisation",
  title: "La caractérisation : Adjectif, comparaison",
  level: "1AC",
  category: "Langue",
  description: "Enrichir la description avec des adjectifs qualificatifs épithètes/attributs et des comparaisons.",
  defaultPrompt: "Génère un exercice facile sur les comparaisons et les adjectifs qualificatifs décrivant un magnifique cheval arabe de la fantasia à Oujda.",
  keyRule: "L'adjectif s'accorde avec le nom qu'il qualifie, tandis que la comparaison utilise un outil comparatif (comme, pareil à) pour lier le comparé au comparant."
 },,

 {
  id: "1ac-dialogue-recit",
  title: "Le dialogue dans le récit",
  level: "1AC",
  category: "Lecture/Genre",
  description: "Identifier les paroles des personnages, les verbes de parole et la ponctuation du dialogue dans un récit.",
  defaultPrompt: "Génère un exercice où l'élève repère les paroles de deux personnages dans un conte marocain et identifie les verbes de parole.",
  keyRule: "Le dialogue rapporte les paroles des personnages ; il utilise souvent des tirets, des guillemets et des verbes comme dire, répondre, demander."
 },
 {
  id: "1ac-situation-initiale",
  title: "La situation initiale",
  level: "1AC",
  category: "Lecture/Genre",
  description: "Reconnaître le début d'un récit : personnages, lieu, temps et situation stable avant l'événement perturbateur.",
  defaultPrompt: "Génère un exercice où l'élève identifie les éléments de la situation initiale dans un court récit situé dans un village de l'Atlas.",
  keyRule: "La situation initiale présente le cadre du récit avant le changement : qui, où, quand et dans quelle situation."
 },
 {
  id: "1ac-connecteurs-chronologiques",
  title: "Les connecteurs chronologiques",
  level: "1AC",
  category: "Langue",
  description: "Organiser les événements d'un récit avec des connecteurs comme d'abord, ensuite, puis, enfin.",
  defaultPrompt: "Génère un exercice où l'élève remet en ordre un court récit à l'aide de connecteurs chronologiques.",
  keyRule: "Les connecteurs chronologiques indiquent l'ordre des actions et rendent le récit plus clair pour le lecteur."
 },
 {
  id: "1ac-production-courte-conte",
  title: "Produire le début d'un conte",
  level: "1AC",
  category: "Écrit/Correspondance",
  description: "Rédiger un court début de conte avec une formule d'ouverture, un lieu, un personnage et une situation initiale.",
  defaultPrompt: "Génère une consigne de production écrite où l'élève rédige le début d'un conte merveilleux situé au Maroc.",
  keyRule: "Un bon début de conte contient une formule d'ouverture, un cadre imaginaire, un personnage principal et une situation stable."
 },


 // 2AC
 {
  id: "2ac-structure-piece",
  title: "La structure de la pièce et le lexique théâtral",
  level: "2AC",
  category: "Lecture/Genre",
  description: "Comprendre comment s'organise une pièce de théâtre (actes, scènes, exposition, dénouement).",
  defaultPrompt: "Génère une activité sur la structure dramatique et le lexique du théâtre (exposition, réplique, coup de théâtre) dans le contexte d'une troupe de théâtre scolaire.",
  keyRule: "Une œuvre de théâtre se découpe en Actes (qui marquent les étapes temporelles) et en Scènes (liées aux entrées/sorties de personnages)."
 },
 {
  id: "2ac-didascalies",
  title: "Les didascalies & répliques",
  level: "2AC",
  category: "Lecture/Genre",
  description: "Distinguer le texte prononcé (répliques) des indications scéniques de l'auteur (didascalies).",
  defaultPrompt: "Génère un exercice où l'élève doit analyser l'intention ou le ton exprimé dans des didascalies (ex: *Mehdi hausse les épaules en souriant sous le soleil de Rabat*).",
  keyRule: "Les didascalies, souvent écrites en italique, décrivent les actions, décors, mimiques et intonations sans être prononcées à voix haute."
 },
 {
  id: "2ac-une-journal",
  title: "La structure de la 'Une' d'un journal",
  level: "2AC",
  category: "Média/Communication",
  description: "Anatomie de la page d'accueil d'un journal : bandeau, manchette, tribune, éditorial, ventre.",
  defaultPrompt: "Génère un exercice interactif pour tester les connaissances sur la 'Une' d'un journal des lycées de Casablanca.",
  keyRule: "La Une est la vitrine d'un journal ; elle doit capter l'attention par des titres chocs disposés méthodiquement."
 },
 {
  id: "2ac-fait-divers",
  title: "Le fait divers et le récit journalistique",
  level: "2AC",
  category: "Média/Communication",
  description: "Rédiger ou analyser un fait divers en répondant aux questions : Qui ? Quoi ? Où ? Quand ? Comment ? Pourquoi ?",
  defaultPrompt: "Génère un exercice d'analyse sur un court fait divers relatant le sauvetage intrépide d'un chaton bloqué sur un minaret à Meknès.",
  keyRule: "Un fait divers est un événement réel, insolite ou dramatique, rédigé à la troisième personne de façon concise."
 },,

 {
  id: "2ac-discours-direct-indirect",
  title: "Le discours direct et indirect",
  level: "2AC",
  category: "Langue",
  description: "Transformer une parole rapportée directement en discours indirect en respectant les changements de pronoms, de temps et de ponctuation.",
  defaultPrompt: "Génère un exercice où l'élève transforme des répliques de théâtre en discours indirect dans un contexte de club scolaire à Rabat.",
  keyRule: "Au discours indirect, les guillemets disparaissent et la parole est introduite par un verbe de parole suivi d'une subordonnée."
 },
 {
  id: "2ac-phrase-complexe",
  title: "La phrase complexe",
  level: "2AC",
  category: "Langue",
  description: "Reconnaître les propositions dans une phrase complexe et distinguer juxtaposition, coordination et subordination.",
  defaultPrompt: "Génère un exercice d'analyse de phrases complexes autour d'une sortie scolaire à Volubilis.",
  keyRule: "Une phrase complexe contient plusieurs verbes conjugués et donc plusieurs propositions reliées par juxtaposition, coordination ou subordination."
 },
 {
  id: "2ac-valeurs-temps-recit",
  title: "Les valeurs des temps du récit",
  level: "2AC",
  category: "Langue",
  description: "Comprendre les valeurs de l'imparfait, du passé simple et du présent dans un récit ou un article.",
  defaultPrompt: "Génère un exercice où l'élève justifie l'emploi de l'imparfait et du passé simple dans un court récit marocain.",
  keyRule: "L'imparfait décrit le cadre ou une action durable, tandis que le passé simple marque une action brève et importante."
 },
 {
  id: "2ac-vocabulaire-theatre",
  title: "Le vocabulaire du théâtre",
  level: "2AC",
  category: "Lecture/Genre",
  description: "Maîtriser les mots essentiels du théâtre : scène, acte, réplique, monologue, dialogue, aparté, décor.",
  defaultPrompt: "Génère un exercice d'association entre termes théâtraux et définitions pour une troupe de collège à Casablanca.",
  keyRule: "Le vocabulaire théâtral permet de comprendre l'organisation de la pièce, le jeu des personnages et les indications de mise en scène."
 },
 {
  id: "2ac-article-presse",
  title: "L'article de presse",
  level: "2AC",
  category: "Média/Communication",
  description: "Identifier le titre, le chapeau, les informations essentielles et l'organisation d'un article de presse.",
  defaultPrompt: "Génère un exercice d'analyse d'un article de presse scolaire sur une action écologique dans un collège marocain.",
  keyRule: "Un article de presse informe clairement le lecteur en répondant aux questions essentielles : qui, quoi, où, quand, comment et pourquoi."
 },
 {
  id: "2ac-expression-opinion",
  title: "Exprimer une opinion argumentée",
  level: "2AC",
  category: "Écrit/Correspondance",
  description: "Formuler une opinion personnelle avec des arguments simples, des exemples et des connecteurs logiques.",
  defaultPrompt: "Génère un exercice où l'élève donne son avis sur l'usage du téléphone au collège avec deux arguments et un exemple.",
  keyRule: "Une opinion argumentée doit présenter une idée claire, des arguments organisés et des connecteurs comme d'abord, ensuite, enfin."
 },


 // 3AC
 {
  id: "3ac-nouvelle-policiere",
  title: "La nouvelle policière & champ lexical",
  level: "3AC",
  category: "Lecture/Genre",
  description: "Le schéma de l'enquête : délit, indices, suspect, mobile. Vocabulaire du mystère.",
  defaultPrompt: "Génère un exercice exigeant d'identifier le vocabulaire de l'enquête et du mystère dans une affaire se déroulant dans la médina de Tanger.",
  keyRule: "La nouvelle policière repose sur le suspense, l'indice révélateur, le suspect, le mobile et la déduction rationnelle de l'enquêteur."
 },
 {
  id: "3ac-correspondance-administrative",
  title: "La lettre administrative officielle",
  level: "3AC",
  category: "Écrit/Correspondance",
  description: "Mettre en forme une lettre officielle. Formules de politesse et structure d'en-tête.",
  defaultPrompt: "Génère une activité sur les formules d'appel et de politesse appropriées lorsqu'on écrit au Directeur de l'Académie Régionale de Rabat.",
  keyRule: "Une lettre administrative exclut la familiarité ; elle requiert une structure normée (émetteur, destinataire, objet) et l'usage de 'Veuillez agréer, Monsieur, l'expression de...'."
 },
 {
  id: "3ac-invitation-voeux",
  title: "La lettre d'invitation et de vœux",
  level: "3AC",
  category: "Écrit/Correspondance",
  description: "Inviter officiellement ou personnellement et féliciter pour une réussite ou fête nationale.",
  defaultPrompt: "Génère une révision de la correspondance d'invitation pour l'inauguration d'un club de journal scolaire à Marrakech.",
  keyRule: "La lettre d'invitation contient des précisions indispensables (date, lieu, motif) et propose parfois un coupon de réponse."
 },
 {
  id: "3ac-hypothese-si",
  title: "L'expression de l'hypothèse avec 'SI'",
  level: "3AC",
  category: "Langue",
  description: "Concordance des temps obligatoire : SI + présent = futur; SI + imparfait = conditionnel présent.",
  defaultPrompt: "Génère un exercice de conjugaison de niveau 3AC où l'élève doit former des phrases d'hypothèse sur le fait de réussir l'examen régional.",
  keyRule: "La concordance classique de l'hypothèse est : 'Si + Présent -> Futur Simple' ou 'Si + Imparfait -> Conditionnel Présent'."
 },
 {
  id: "3ac-cause-consequence",
  title: "La cause et la conséquence",
  level: "3AC",
  category: "Langue",
  description: "Exprimer la cause (parce que, puisque, comme) et la conséquence (donc, si bien que, tellement... que).",
  defaultPrompt: "Génère un exercice de transformation de phrase pour relier deux propositions exprimant la cause et la conséquence à propos des ressources d'eau au Maroc.",
  keyRule: "La cause explique la raison (parce que, en raison de), tandis que la conséquence en exprime le résultat logique (donc, par conséquent)."
 },
 {
  id: "3ac-concession-opposition",
  title: "La concession et l'opposition",
  level: "3AC",
  category: "Langue",
  description: "Savoir opposer des idées (mais, pourtant, cependant) et exprimer une concession (bien que, même si).",
  defaultPrompt: "Génère un exercice de niveau 3AC exigeant de compléter des phrases de concession avec 'Bien que' ou 'Quoique' suivi du subjonctif.",
  keyRule: "La concession exprime l'absence d'effet d'une cause attendue (bien que + subjonctif, pourtant, malgré + nom)."
 },
 {
  id: "3ac-but-moyen",
  title: "L'expression du but",
  level: "3AC",
  category: "Langue",
  description: "Exprimer l'objectif à atteindre positivement ou négativement (pour que, afin que + subjonctif, de peur de).",
  defaultPrompt: "Génère un exercice de grammaire sur l'expression du but dans un projet écologique mené au collège de Casablanca.",
  keyRule: "On utilise 'pour que' ou 'afin que' suivis du subjonctif lorsque les sujets des deux propositions sont différents, et l'infinitif ('pour', 'afin de') si le sujet est le même."
 },

 {
  id: "3ac-argumentation-simple",
  title: "L'argumentation simple",
  level: "3AC",
  category: "Écrit/Correspondance",
  description: "Construire un paragraphe argumentatif avec une thèse, deux arguments et un exemple.",
  defaultPrompt: "Génère un exercice où l'élève rédige un paragraphe argumentatif sur l'importance de la lecture au collège.",
  keyRule: "Un paragraphe argumentatif défend une idée à l'aide d'arguments organisés et d'exemples précis."
 },
 {
  id: "3ac-connecteurs-logiques",
  title: "Les connecteurs logiques",
  level: "3AC",
  category: "Langue",
  description: "Utiliser les connecteurs pour organiser une argumentation : d'abord, en effet, cependant, donc, enfin.",
  defaultPrompt: "Génère un exercice de classement et d'emploi des connecteurs logiques dans un texte argumentatif.",
  keyRule: "Les connecteurs logiques indiquent les relations entre les idées : addition, cause, conséquence, opposition ou conclusion."
 },
 {
  id: "3ac-preparation-regional",
  title: "Préparer l'examen régional",
  level: "3AC",
  category: "Lecture/Genre",
  description: "S'entraîner à lire un texte, répondre avec précision, justifier ses réponses et préparer une production écrite.",
  defaultPrompt: "Génère un entraînement court de type examen régional avec lecture, langue et production écrite.",
  keyRule: "Pour réussir l'examen régional, il faut lire attentivement, justifier ses réponses et respecter la consigne de production écrite."
 },

];
