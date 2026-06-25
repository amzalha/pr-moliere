export type ExamLevel = '1AC' | '2AC' | '3AC';

export type ExamEvaluationType =
  | 'controle_continu'
  | 'examen_local'
  | 'examen_regional';

export type ExamCompetence =
  | 'lecture'
  | 'langue'
  | 'production_ecrite';

export type ExamCorpusItem = {
  id: string;
  niveau: ExamLevel;
  typeEvaluation: ExamEvaluationType;
  competence: ExamCompetence;
  titre: string;
  theme: string;
  region?: string;
  annee?: string;
  semestre?: 'S1' | 'S2';
  dureeMinutes?: number;
  baremeTotal: number;
  sourceType: 'modele_original' | 'source_a_integrer';
  sourceNom: string;
  sourceUrl?: string;
  consigne: string;
  texteSupport?: string;
  questions: {
    id: string;
    competence: ExamCompetence;
    enonce: string;
    bareme: number;
    reponseModele: string;
    criteresCorrection: string[];
  }[];
  objectifsPedagogiques: string[];
  tags: string[];
};

export const examCorpus: ExamCorpusItem[] = [
  {
    id: 'modele-1ac-controle-s1-conte-ouverture',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'lecture',
    titre: 'Contrôle continu 1AC — La formule d’ouverture du conte',
    theme: 'conte merveilleux',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le texte puis répondez aux questions.',
    texteSupport:
      'Il était une fois, dans un petit village au pied des montagnes, un jeune berger qui gardait ses chèvres près d’une source claire. Chaque soir, il entendait une voix douce sortir de la forêt.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Relève la formule d’ouverture du conte.',
        bareme: 2,
        reponseModele: 'La formule d’ouverture est : Il était une fois.',
        criteresCorrection: [
          'Identifier correctement la formule d’ouverture.',
          'Recopier la formule sans changer son sens.'
        ]
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Où se déroule le début de l’histoire ?',
        bareme: 2,
        reponseModele: 'Le début de l’histoire se déroule dans un petit village au pied des montagnes.',
        criteresCorrection: [
          'Repérer le lieu principal.',
          'Répondre par une phrase claire.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Identifier les caractéristiques du conte.',
      'Comprendre un texte narratif simple.',
      'Répondre avec une phrase complète.'
    ],
    tags: ['1AC', 'conte', 'lecture', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s2-portrait',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 2AC — Rédiger un portrait',
    theme: 'portrait physique et moral',
    semestre: 'S2',
    dureeMinutes: 60,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne:
      'Rédige le portrait physique et moral d’un personnage courageux que vous admirez.',
    questions: [
      {
        id: 'q1',
        competence: 'production_ecrite',
        enonce: 'Rédige un portrait organisé en deux paragraphes.',
        bareme: 10,
        reponseModele:
          'La réponse attendue décrit d’abord l’apparence du personnage, puis ses qualités morales avec des adjectifs précis et des exemples.',
        criteresCorrection: [
          'Respecter la consigne.',
          'Organiser le texte en paragraphes.',
          'Utiliser des adjectifs qualificatifs.',
          'Éviter les répétitions.',
          'Soigner l’orthographe et la ponctuation.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Décrire un personnage.',
      'Employer des adjectifs qualificatifs.',
      'Structurer une production écrite.'
    ],
    tags: ['2AC', 'portrait', 'production-ecrite', 'controle-continu']
  },
  {
    id: 'modele-3ac-local-lettre-demande',
    niveau: '3AC',
    typeEvaluation: 'examen_local',
    competence: 'production_ecrite',
    titre: 'Examen local 3AC — Lettre de demande',
    theme: 'lettre officielle',
    annee: 'modele',
    dureeMinutes: 90,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne:
      'Rédige une lettre officielle au directeur de votre établissement pour demander l’organisation d’une activité culturelle.',
    questions: [
      {
        id: 'q1',
        competence: 'production_ecrite',
        enonce: 'Produis une lettre officielle complète.',
        bareme: 10,
        reponseModele:
          'La lettre doit contenir le lieu et la date, la formule d’appel, l’objet, le corps de la demande, une formule de politesse et la signature.',
        criteresCorrection: [
          'Respecter la forme de la lettre officielle.',
          'Présenter clairement la demande.',
          'Utiliser un registre poli.',
          'Organiser les idées.',
          'Respecter la langue.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Maîtriser la lettre officielle.',
      'S’exprimer avec politesse.',
      'Préparer l’examen local.'
    ],
    tags: ['3AC', 'examen-local', 'lettre-officielle']
  },
  {
    id: 'modele-3ac-regional-texte-narratif',
    niveau: '3AC',
    typeEvaluation: 'examen_regional',
    competence: 'lecture',
    titre: 'Examen régional 3AC — Compréhension d’un texte narratif',
    theme: 'texte narratif',
    region: 'Toutes régions',
    annee: 'modele',
    dureeMinutes: 120,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne:
      'Lis le texte narratif puis répondez aux questions de compréhension, de langue et de production écrite.',
    texteSupport:
      'Le jeune garçon avançait lentement dans la ruelle silencieuse. Il tenait dans sa main une vieille enveloppe jaunie. Au bout de la rue, une lumière brillait derrière une fenêtre entrouverte.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Identifie le personnage principal.',
        bareme: 2,
        reponseModele: 'Le personnage principal est le jeune garçon.',
        criteresCorrection: [
          'Identifier correctement le personnage.',
          'Répondre simplement et clairement.'
        ]
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Relève deux indices qui montrent le mystère.',
        bareme: 3,
        reponseModele:
          'Deux indices sont : la ruelle silencieuse et la vieille enveloppe jaunie.',
        criteresCorrection: [
          'Repérer deux éléments du texte.',
          'Justifier la réponse par des indices précis.'
        ]
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce:
          'Imagine la suite du récit en dix lignes environ.',
        bareme: 8,
        reponseModele:
          'La suite doit respecter le cadre du récit, garder le même personnage et développer l’atmosphère de mystère.',
        criteresCorrection: [
          'Respecter la suite logique du récit.',
          'Employer des temps du récit.',
          'Organiser les idées.',
          'Utiliser un vocabulaire adapté.',
          'Soigner la langue.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Préparer l’examen régional.',
      'Répondre avec des indices du texte.',
      'Produire une suite narrative cohérente.'
    ],
    tags: ['3AC', 'examen-regional', 'lecture', 'production-ecrite']
  },
  {
    id: 'modele-1ac-controle-s2-dialogue-poli',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Le dialogue poli',
    theme: 'dialogue et formules de politesse',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le dialogue puis répondez aux questions.',
    texteSupport:
      'Dans la cour du collège, Salma demande à son camarade : « Pouvez-vous me prêter ton cahier, s’il te plaît ? » Yassine répond : « Bien sûr, mais rends-le-moi après la séance. » Salma sourit et dit : « Merci beaucoup. »',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Qui sont les deux personnages du dialogue ?',
        bareme: 4,
        reponseModele: 'Les deux personnages sont Salma et Yassine.',
        criteresCorrection: [
          'Identifier les deux personnages.',
          'Répondre par une phrase claire.'
        ]
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relève une formule de politesse dans le texte.',
        bareme: 6,
        reponseModele: 'Une formule de politesse est : s’il te plaît, ou merci beaucoup.',
        criteresCorrection: [
          'Repérer une formule de politesse correcte.',
          'Recopier la formule sans changer son sens.'
        ]
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez un court dialogue de quatre répliques entre deux élèves.',
        bareme: 10,
        reponseModele:
          'Le dialogue doit contenir deux personnages, quatre répliques et au moins une formule de politesse.',
        criteresCorrection: [
          'Respecter la forme du dialogue.',
          'Employer des formules de politesse.',
          'Écrire des phrases correctes.',
          'Organiser les répliques clairement.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Identifier les personnages d’un dialogue.',
      'Reconnaître les formules de politesse.',
      'Produire un court dialogue.'
    ],
    tags: ['1AC', 'dialogue', 'langue', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s1-description-lieu',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 2AC — Décrire un lieu',
    theme: 'description',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le texte descriptif puis répondez aux questions.',
    texteSupport:
      'La bibliothèque du collège était calme et lumineuse. De grandes fenêtres laissaient entrer le soleil. Les livres étaient rangés sur des étagères en bois, et quelques élèves lisaient en silence autour d’une table ronde.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel lieu est décrit dans le texte ?',
        bareme: 4,
        reponseModele: 'Le lieu décrit est la bibliothèque du collège.',
        criteresCorrection: [
          'Identifier correctement le lieu.',
          'Formuler une réponse complète.'
        ]
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relève deux adjectifs qualificatifs.',
        bareme: 6,
        reponseModele: 'Deux adjectifs qualificatifs sont : calme et lumineuse.',
        criteresCorrection: [
          'Identifier deux adjectifs.',
          'Ne pas confondre adjectif et nom.'
        ]
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Décrivez en six lignes un lieu de votre collège.',
        bareme: 10,
        reponseModele:
          'La production doit présenter un lieu précis, utiliser des adjectifs et organiser la description.',
        criteresCorrection: [
          'Présenter clairement le lieu.',
          'Utiliser des adjectifs variés.',
          'Organiser les idées.',
          'Respecter la correction de la langue.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Comprendre un texte descriptif.',
      'Identifier des adjectifs qualificatifs.',
      'Produire une description organisée.'
    ],
    tags: ['2AC', 'description', 'production-ecrite', 'controle-continu']
  },
  {
    id: 'modele-3ac-local-article-environnement',
    niveau: '3AC',
    typeEvaluation: 'examen_local',
    competence: 'production_ecrite',
    titre: 'Examen local 3AC — Article sur l’environnement',
    theme: 'environnement',
    region: 'Modèle national',
    annee: 'modele',
    dureeMinutes: 90,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le sujet puis rédige une réponse organisée.',
    texteSupport:
      'Dans plusieurs quartiers, les habitants remarquent que les déchets sont jetés dans la rue malgré la présence de poubelles. Le conseil de l’établissement lance une campagne de sensibilisation à la propreté.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel problème est présenté dans le texte ?',
        bareme: 4,
        reponseModele: 'Le problème présenté est le jet des déchets dans la rue.',
        criteresCorrection: [
          'Identifier le problème principal.',
          'Répondre avec précision.'
        ]
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Transforme cette phrase au futur : Les habitants protègent leur quartier.',
        bareme: 4,
        reponseModele: 'Les habitants protégeront leur quartier.',
        criteresCorrection: [
          'Employer correctement le futur.',
          'Conserver le sens de la phrase.'
        ]
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce:
          'Rédige un article de dix lignes pour sensibiliser les élèves à la propreté du collège.',
        bareme: 12,
        reponseModele:
          'L’article doit présenter le problème, expliquer ses conséquences et proposer des solutions concrètes.',
        criteresCorrection: [
          'Présenter clairement le thème.',
          'Organiser le texte en idées cohérentes.',
          'Proposer des solutions.',
          'Utiliser un vocabulaire adapté.',
          'Respecter la langue.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Préparer l’examen local.',
      'Développer une argumentation simple.',
      'Produire un article de sensibilisation.'
    ],
    tags: ['3AC', 'examen-local', 'environnement', 'production-ecrite']
  },
  {
    id: 'modele-1ac-controle-s2-lettre-amicale',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 1AC — La lettre amicale',
    theme: 'lettre personnelle',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis la situation puis répondez aux questions.',
    texteSupport:
      'Votre ami a changé de collège. Vous voulez lui écrire une lettre pour lui raconter votre nouvelle classe et lui demander de ses nouvelles.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'À qui la lettre doit-elle être adressée ?',
        bareme: 4,
        reponseModele: 'La lettre doit être adressée à un ami.',
        criteresCorrection: [
          'Identifier correctement le destinataire.',
          'Répondre clairement.'
        ]
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Donne deux formules qu’on peut utiliser dans une lettre amicale.',
        bareme: 6,
        reponseModele: 'On peut utiliser : Cher ami, Salut, À bientôt, Ton ami.',
        criteresCorrection: [
          'Proposer des formules adaptées.',
          'Respecter le registre amical.'
        ]
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédige une lettre amicale de huit lignes.',
        bareme: 10,
        reponseModele:
          'La lettre doit contenir une formule d’ouverture, des nouvelles, une question à l’ami et une formule de clôture.',
        criteresCorrection: [
          'Respecter la forme de la lettre.',
          'Organiser les idées.',
          'Employer un ton amical.',
          'Soigner la langue.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Identifier les éléments d’une lettre amicale.',
      'Employer des formules adaptées.',
      'Rédiger une lettre courte.'
    ],
    tags: ['1AC', 'lettre', 'production-ecrite', 'controle-continu']
  },
  {
    id: 'modele-3ac-regional-argumentation-lecture',
    niveau: '3AC',
    typeEvaluation: 'examen_regional',
    competence: 'lecture',
    titre: 'Examen régional 3AC — Lecture argumentative',
    theme: 'solidarité',
    region: 'Modèle national',
    annee: 'modele',
    dureeMinutes: 120,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le texte puis répondez aux questions.',
    texteSupport:
      'Dans un collège, des élèves décident d’aider un camarade malade en organisant une collecte de livres et de cahiers. Cette initiative montre que la solidarité rend la vie scolaire plus humaine.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quelle action les élèves organisent-ils ?',
        bareme: 4,
        reponseModele: 'Les élèves organisent une collecte de livres et de cahiers.',
        criteresCorrection: [
          'Identifier l’action principale.',
          'Répondre avec précision.'
        ]
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Quelle valeur est défendue dans ce texte ?',
        bareme: 4,
        reponseModele: 'La valeur défendue est la solidarité.',
        criteresCorrection: [
          'Identifier la valeur centrale.',
          'Justifier à partir du texte.'
        ]
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédige un paragraphe de dix lignes sur l’importance de la solidarité au collège.',
        bareme: 12,
        reponseModele:
          'Le paragraphe doit expliquer l’importance de la solidarité et donner des exemples concrets.',
        criteresCorrection: [
          'Présenter une idée claire.',
          'Donner des arguments simples.',
          'Utiliser des exemples.',
          'Organiser le paragraphe.',
          'Respecter la langue.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Préparer l’examen régional.',
      'Identifier une valeur dans un texte.',
      'Produire un paragraphe argumentatif.'
    ],
    tags: ['3AC', 'examen-regional', 'argumentation', 'solidarite']
  },
  {
    id: 'modele-2ac-controle-s2-dialogue-argumentatif',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 2AC — Dialogue argumentatif',
    theme: 'dialogue et argumentation',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis la situation puis répondez aux questions.',
    texteSupport:
      'Deux élèves discutent dans la cour. L’un pense que la lecture est inutile, l’autre explique qu’elle aide à mieux parler, mieux écrire et mieux comprendre le monde.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel est le sujet de la discussion ?',
        bareme: 4,
        reponseModele: 'Le sujet de la discussion est l’utilité de la lecture.',
        criteresCorrection: [
          'Identifier le thème principal.',
          'Répondre par une phrase claire.'
        ]
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Donne un argument en faveur de la lecture.',
        bareme: 6,
        reponseModele: 'La lecture aide à mieux parler, mieux écrire et mieux comprendre le monde.',
        criteresCorrection: [
          'Repérer un argument pertinent.',
          'Ne pas confondre argument et exemple.'
        ]
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédige un dialogue de huit répliques dans lequel deux élèves discutent de l’importance de la lecture.',
        bareme: 10,
        reponseModele:
          'Le dialogue doit contenir deux personnages, des arguments simples et une conclusion claire.',
        criteresCorrection: [
          'Respecter la forme du dialogue.',
          'Présenter des arguments.',
          'Organiser les répliques.',
          'Employer une langue correcte.'
        ]
      }
    ],
    objectifsPedagogiques: [
      'Comprendre un échange argumentatif.',
      'Identifier un argument.',
      'Produire un dialogue argumentatif simple.'
    ],
    tags: ['2AC', 'dialogue', 'argumentation', 'controle-continu']
  },
  {
    id: 'modele-1ac-controle-s1-phrase-simple',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — La phrase simple',
    theme: 'grammaire',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis les phrases puis répondez aux questions.',
    texteSupport:
      'Le matin, Sara arrive au collège. Elle salue ses camarades. La classe commence à huit heures.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Qui arrive au collège ?',
        bareme: 4,
        reponseModele: 'Sara arrive au collège.',
        criteresCorrection: ['Identifier le personnage.', 'Répondre par une phrase.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relève une phrase simple du texte.',
        bareme: 6,
        reponseModele: 'Une phrase simple est : Elle salue ses camarades.',
        criteresCorrection: ['Choisir une phrase correcte.', 'Recopier sans erreur.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez quatre phrases simples sur votre journée au collège.',
        bareme: 10,
        reponseModele: 'La réponse doit contenir quatre phrases simples claires.',
        criteresCorrection: ['Écrire quatre phrases.', 'Respecter la ponctuation.', 'Utiliser une langue correcte.']
      }
    ],
    objectifsPedagogiques: ['Comprendre une phrase simple.', 'Repérer une information.', 'Produire des phrases courtes.'],
    tags: ['1AC', 'grammaire', 'phrase-simple', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s2-portrait-moral',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'lecture',
    titre: 'Contrôle continu 2AC — Le portrait moral',
    theme: 'portrait',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le texte puis répondez aux questions.',
    texteSupport:
      'Nabil est un élève sérieux et généreux. Il aide souvent ses camarades à comprendre les leçons difficiles. Il reste calme même quand un problème se présente.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel personnage est présenté dans le texte ?',
        bareme: 4,
        reponseModele: 'Le personnage présenté est Nabil.',
        criteresCorrection: ['Identifier le personnage.', 'Répondre clairement.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relève deux qualités de Nabil.',
        bareme: 6,
        reponseModele: 'Deux qualités de Nabil sont : sérieux et généreux.',
        criteresCorrection: ['Repérer deux qualités.', 'Ne pas citer des actions seulement.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédige en six lignes le portrait moral d’un camarade.',
        bareme: 10,
        reponseModele: 'Le texte doit présenter des qualités morales avec des exemples simples.',
        criteresCorrection: ['Décrire le caractère.', 'Donner des exemples.', 'Organiser les idées.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Comprendre un portrait moral.', 'Identifier des qualités.', 'Produire une description morale.'],
    tags: ['2AC', 'portrait', 'lecture', 'controle-continu']
  },
  {
    id: 'modele-3ac-regional-texte-explicatif-eau',
    niveau: '3AC',
    typeEvaluation: 'examen_regional',
    competence: 'lecture',
    titre: 'Examen régional 3AC — Texte explicatif sur l’eau',
    theme: 'protection de l’eau',
    region: 'Modèle national',
    annee: 'modele',
    dureeMinutes: 120,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le texte puis répondez aux questions.',
    texteSupport:
      'L’eau est une richesse précieuse. Dans certaines régions, elle devient rare à cause du gaspillage et du manque de pluie. Pour la protéger, chacun doit fermer les robinets et éviter les usages inutiles.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel est le thème principal du texte ?',
        bareme: 4,
        reponseModele: 'Le thème principal est la protection de l’eau.',
        criteresCorrection: ['Identifier le thème.', 'Répondre avec précision.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Donne deux causes de la rareté de l’eau citées dans le texte.',
        bareme: 6,
        reponseModele: 'Deux causes sont le gaspillage et le manque de pluie.',
        criteresCorrection: ['Repérer deux causes.', 'S’appuyer sur le texte.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédige un paragraphe de dix lignes pour expliquer comment protéger l’eau.',
        bareme: 10,
        reponseModele: 'Le paragraphe doit expliquer le problème et proposer des gestes concrets.',
        criteresCorrection: ['Présenter le problème.', 'Proposer des solutions.', 'Organiser le paragraphe.', 'Respecter la langue.']
      }
    ],
    objectifsPedagogiques: ['Comprendre un texte explicatif.', 'Identifier des causes.', 'Produire un paragraphe organisé.'],
    tags: ['3AC', 'examen-regional', 'texte-explicatif', 'eau']
  },
  {
    id: 'modele-1ac-controle-s2-description-personnage',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 1AC — Décrire un personnage',
    theme: 'description physique',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le texte puis répondez aux questions.',
    texteSupport:
      'Amine est un garçon souriant. Il a les cheveux noirs, les yeux vifs et porte souvent un cartable bleu. Ses camarades l’aiment parce qu’il est gentil et serviable.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel personnage est décrit dans le texte ?',
        bareme: 4,
        reponseModele: 'Le personnage décrit est Amine.',
        criteresCorrection: ['Identifier le personnage.', 'Répondre clairement.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relève deux adjectifs qualificatifs.',
        bareme: 6,
        reponseModele: 'Deux adjectifs sont : souriant et gentil.',
        criteresCorrection: ['Repérer deux adjectifs.', 'Éviter de citer des noms.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Décris en six lignes un camarade de classe.',
        bareme: 10,
        reponseModele: 'La production doit décrire l’apparence et le caractère du camarade.',
        criteresCorrection: ['Décrire clairement le personnage.', 'Utiliser des adjectifs.', 'Organiser les idées.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Comprendre une description.', 'Identifier des adjectifs.', 'Produire un portrait simple.'],
    tags: ['1AC', 'description', 'portrait', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s1-recit-souvenir',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 2AC — Raconter un souvenir',
    theme: 'récit personnel',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lis le texte puis répondez aux questions.',
    texteSupport:
      'Pendant les vacances, Lina a visité un village près de la mer. Elle se souvient du bruit des vagues, de l’odeur du pain chaud et des longues promenades avec sa famille.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quand Lina a-t-elle visité le village ?',
        bareme: 4,
        reponseModele: 'Lina a visité le village pendant les vacances.',
        criteresCorrection: ['Repérer le moment.', 'Répondre avec précision.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Relève deux souvenirs sensoriels dans le texte.',
        bareme: 6,
        reponseModele: 'Deux souvenirs sensoriels sont le bruit des vagues et l’odeur du pain chaud.',
        criteresCorrection: ['Identifier deux sensations.', 'S’appuyer sur le texte.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Raconte en huit lignes un souvenir agréable.',
        bareme: 10,
        reponseModele: 'Le récit doit raconter un souvenir personnel avec des détails précis.',
        criteresCorrection: ['Respecter la forme du récit.', 'Employer des indicateurs de temps.', 'Ajouter des détails.', 'Respecter la langue.']
      }
    ],
    objectifsPedagogiques: ['Comprendre un récit personnel.', 'Repérer des sensations.', 'Produire un souvenir organisé.'],
    tags: ['2AC', 'recit', 'souvenir', 'controle-continu']
  },
  {
    id: 'modele-1ac-controle-s1-ponctuation-dialogue',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Ponctuation du dialogue',
    theme: 'dialogue',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Dans la cour du collège, Samir demande : « Pouvez-vous m’aider à retrouver mon cahier ? » Nadia répond : « Oui, cherchons ensemble près de la bibliothèque. »',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Où se déroule la scène ?',
        bareme: 4,
        reponseModele: 'La scène se déroule dans la cour du collège.',
        criteresCorrection: ['Repérer le lieu.', 'Répondre par une phrase complète.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux signes de ponctuation utilisés dans le dialogue.',
        bareme: 6,
        reponseModele: 'Deux signes possibles sont les guillemets et le point d’interrogation.',
        criteresCorrection: ['Identifier deux signes.', 'Les nommer correctement.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez un court dialogue de six lignes entre deux élèves.',
        bareme: 10,
        reponseModele: 'Le dialogue doit utiliser les guillemets, des phrases correctes et une situation claire.',
        criteresCorrection: ['Respecter la forme du dialogue.', 'Utiliser une ponctuation correcte.', 'Organiser les répliques.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Comprendre un dialogue.', 'Identifier la ponctuation.', 'Produire un dialogue court.'],
    tags: ['1AC', 'dialogue', 'ponctuation', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s2-comparaison',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 2AC — La comparaison',
    theme: 'description',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Le jardin du collège est calme comme une petite oasis. Ses arbres sont plus hauts que le mur et ses fleurs brillent autant que des lanternes colorées.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel lieu est décrit dans le texte ?',
        bareme: 4,
        reponseModele: 'Le lieu décrit est le jardin du collège.',
        criteresCorrection: ['Identifier le lieu.', 'Répondre clairement.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez une comparaison dans le texte.',
        bareme: 6,
        reponseModele: 'Une comparaison est : calme comme une petite oasis.',
        criteresCorrection: ['Repérer un outil de comparaison.', 'Citer une expression complète.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Décrivez un lieu en huit lignes en utilisant deux comparaisons.',
        bareme: 10,
        reponseModele: 'La production doit décrire un lieu avec deux comparaisons correctes.',
        criteresCorrection: ['Décrire un lieu.', 'Employer deux comparaisons.', 'Organiser les idées.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Comprendre une description.', 'Identifier une comparaison.', 'Produire une description enrichie.'],
    tags: ['2AC', 'comparaison', 'description', 'controle-continu']
  },
  {
    id: 'modele-3ac-local-lettre-reclamation',
    niveau: '3AC',
    typeEvaluation: 'examen_local',
    competence: 'production_ecrite',
    titre: 'Examen local 3AC — Lettre de réclamation',
    theme: 'correspondance officielle',
    region: 'Modèle national',
    annee: 'modele',
    dureeMinutes: 120,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez la situation puis répondez aux questions.',
    texteSupport:
      'Vous avez participé à une activité scolaire, mais l’organisation n’a pas respecté le programme annoncé. Vous décidez d’écrire une lettre de réclamation polie au responsable.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel est le problème présenté dans la situation ?',
        bareme: 4,
        reponseModele: 'Le problème est que l’organisation n’a pas respecté le programme annoncé.',
        criteresCorrection: ['Identifier le problème.', 'Formuler une réponse précise.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Citez une formule de politesse adaptée à une lettre officielle.',
        bareme: 6,
        reponseModele: 'Une formule possible est : Veuillez agréer, Monsieur, l’expression de mes salutations distinguées.',
        criteresCorrection: ['Proposer une formule officielle.', 'Employer un ton respectueux.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez une lettre de réclamation d’environ douze lignes.',
        bareme: 10,
        reponseModele: 'La lettre doit présenter le problème, demander une solution et respecter les formules officielles.',
        criteresCorrection: ['Respecter la forme de la lettre.', 'Expliquer le problème.', 'Demander une solution.', 'Employer une langue correcte.']
      }
    ],
    objectifsPedagogiques: ['Comprendre une situation de communication.', 'Employer un registre officiel.', 'Rédiger une lettre de réclamation.'],
    tags: ['3AC', 'examen-local', 'lettre', 'reclamation']
  },
  {
    id: 'modele-1ac-controle-s2-champ-lexical-ecole',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Le champ lexical de l’école',
    theme: 'vocabulaire',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Dans la salle de classe, les élèves ouvrent leurs cahiers. Le professeur explique la leçon au tableau, puis chacun prépare son exercice avec attention.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Où se déroule la scène ?',
        bareme: 4,
        reponseModele: 'La scène se déroule dans une salle de classe.',
        criteresCorrection: ['Repérer le lieu.', 'Répondre par une phrase complète.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez trois mots appartenant au champ lexical de l’école.',
        bareme: 6,
        reponseModele: 'Trois mots possibles sont : classe, cahiers, professeur, leçon, tableau, exercice.',
        criteresCorrection: ['Identifier trois mots liés à l’école.', 'Ne pas citer des mots hors thème.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez un paragraphe de six lignes sur une journée au collège en utilisant cinq mots du champ lexical de l’école.',
        bareme: 10,
        reponseModele: 'Le paragraphe doit évoquer la vie scolaire et employer au moins cinq mots du champ lexical de l’école.',
        criteresCorrection: ['Respecter le thème scolaire.', 'Employer cinq mots du champ lexical.', 'Organiser les idées.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Identifier un champ lexical.', 'Comprendre un court texte scolaire.', 'Produire un paragraphe thématique.'],
    tags: ['1AC', 'vocabulaire', 'champ-lexical', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s1-discours-direct',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 2AC — Le discours direct',
    theme: 'dialogue',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Le professeur annonce : « Aujourd’hui, nous allons préparer une courte présentation orale. » Les élèves répondent : « Nous sommes prêts à participer. »',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Qui parle en premier dans le texte ?',
        bareme: 4,
        reponseModele: 'Le professeur parle en premier.',
        criteresCorrection: ['Identifier le premier locuteur.', 'Répondre clairement.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez une phrase au discours direct.',
        bareme: 6,
        reponseModele: 'Une phrase au discours direct est : « Aujourd’hui, nous allons préparer une courte présentation orale. »',
        criteresCorrection: ['Repérer les guillemets.', 'Citer une parole directe complète.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez un court échange au discours direct entre un professeur et un élève.',
        bareme: 10,
        reponseModele: 'L’échange doit contenir des paroles rapportées directement avec une ponctuation correcte.',
        criteresCorrection: ['Employer le discours direct.', 'Respecter la ponctuation.', 'Construire un échange cohérent.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Reconnaître le discours direct.', 'Identifier les locuteurs.', 'Produire un échange dialogué.'],
    tags: ['2AC', 'discours-direct', 'dialogue', 'controle-continu']
  },
  {
    id: 'modele-3ac-regional-lecture-citoyenne',
    niveau: '3AC',
    typeEvaluation: 'examen_regional',
    competence: 'lecture',
    titre: 'Examen régional 3AC — Argumenter pour la lecture',
    theme: 'lecture',
    region: 'Modèle national',
    annee: 'modele',
    dureeMinutes: 120,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'La lecture développe l’imagination et enrichit le vocabulaire. Elle permet aussi de mieux comprendre les autres et de découvrir des expériences différentes. C’est pourquoi les collèges encouragent les élèves à lire régulièrement.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quelle est la thèse défendue dans le texte ?',
        bareme: 4,
        reponseModele: 'La thèse défendue est que la lecture est utile et doit être encouragée.',
        criteresCorrection: ['Identifier l’opinion défendue.', 'Formuler une réponse précise.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Relevez deux arguments en faveur de la lecture.',
        bareme: 6,
        reponseModele: 'Deux arguments sont : la lecture développe l’imagination et enrichit le vocabulaire.',
        criteresCorrection: ['Relever deux arguments.', 'S’appuyer sur le texte.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez un paragraphe argumentatif de douze lignes pour encourager la lecture au collège.',
        bareme: 10,
        reponseModele: 'Le paragraphe doit présenter une thèse claire, deux arguments et un exemple.',
        criteresCorrection: ['Présenter une thèse.', 'Développer deux arguments.', 'Ajouter un exemple.', 'Respecter la langue.']
      }
    ],
    objectifsPedagogiques: ['Identifier une thèse.', 'Repérer des arguments.', 'Produire un paragraphe argumentatif.'],
    tags: ['3AC', 'examen-regional', 'argumentation', 'lecture']
  },
  {
    id: 'modele-1ac-controle-s1-adjectif-qualificatif',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — L’adjectif qualificatif',
    theme: 'grammaire',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Dans une grande salle lumineuse, les élèves attentifs écoutent une histoire merveilleuse racontée par leur professeur.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Où se trouvent les élèves ?',
        bareme: 4,
        reponseModele: 'Les élèves se trouvent dans une grande salle lumineuse.',
        criteresCorrection: ['Repérer le lieu.', 'Répondre avec une phrase complète.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez trois adjectifs qualificatifs dans le texte.',
        bareme: 6,
        reponseModele: 'Trois adjectifs sont : grande, lumineuse, attentifs ou merveilleuse.',
        criteresCorrection: ['Identifier trois adjectifs.', 'Ne pas citer de noms communs.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez cinq phrases décrivant une salle de classe en utilisant au moins quatre adjectifs qualificatifs.',
        bareme: 10,
        reponseModele: 'La production doit décrire une salle avec des adjectifs qualificatifs pertinents.',
        criteresCorrection: ['Écrire cinq phrases.', 'Employer quatre adjectifs.', 'Respecter le thème.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Identifier un adjectif qualificatif.', 'Comprendre une description simple.', 'Produire une description courte.'],
    tags: ['1AC', 'grammaire', 'adjectif', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s2-complement-circonstanciel',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 2AC — Le complément circonstanciel',
    theme: 'grammaire',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Chaque matin, les élèves entrent calmement dans la classe. Après la sonnerie, le professeur écrit la date au tableau pour commencer la leçon.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quand les élèves entrent-ils dans la classe ?',
        bareme: 4,
        reponseModele: 'Les élèves entrent dans la classe chaque matin.',
        criteresCorrection: ['Repérer le moment.', 'Répondre par une phrase complète.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux compléments circonstanciels dans le texte.',
        bareme: 6,
        reponseModele: 'Deux compléments circonstanciels possibles sont : chaque matin, dans la classe, après la sonnerie, au tableau.',
        criteresCorrection: ['Identifier deux compléments circonstanciels.', 'Préciser leur valeur si possible.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez un paragraphe de huit lignes sur une journée scolaire en utilisant trois compléments circonstanciels.',
        bareme: 10,
        reponseModele: 'Le paragraphe doit raconter une journée scolaire avec au moins trois compléments circonstanciels.',
        criteresCorrection: ['Respecter le thème scolaire.', 'Employer trois compléments circonstanciels.', 'Organiser les idées.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Identifier un complément circonstanciel.', 'Comprendre les indications de temps et de lieu.', 'Produire un paragraphe organisé.'],
    tags: ['2AC', 'grammaire', 'complement-circonstanciel', 'controle-continu']
  },
  {
    id: 'modele-3ac-local-connecteurs-logiques',
    niveau: '3AC',
    typeEvaluation: 'examen_local',
    competence: 'langue',
    titre: 'Examen local 3AC — Les connecteurs logiques',
    theme: 'argumentation',
    region: 'Modèle national',
    annee: 'modele',
    dureeMinutes: 120,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'La lecture est importante car elle développe la réflexion. Elle enrichit aussi le vocabulaire. Donc, les élèves devraient lire régulièrement pour améliorer leur expression écrite.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel est le thème du texte ?',
        bareme: 4,
        reponseModele: 'Le thème du texte est l’importance de la lecture.',
        criteresCorrection: ['Identifier le thème.', 'Répondre clairement.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux connecteurs logiques dans le texte.',
        bareme: 6,
        reponseModele: 'Deux connecteurs logiques sont : car et donc.',
        criteresCorrection: ['Identifier deux connecteurs.', 'Ne pas confondre connecteur et verbe.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez un paragraphe argumentatif de dix lignes sur l’importance de la lecture en utilisant trois connecteurs logiques.',
        bareme: 10,
        reponseModele: 'Le paragraphe doit défendre l’importance de la lecture avec des arguments et trois connecteurs logiques.',
        criteresCorrection: ['Présenter une opinion claire.', 'Employer trois connecteurs.', 'Développer des arguments.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Identifier les connecteurs logiques.', 'Comprendre un texte argumentatif.', 'Produire un paragraphe argumentatif.'],
    tags: ['3AC', 'examen-local', 'connecteurs-logiques', 'argumentation']
  },
  {
    id: 'modele-1ac-controle-s2-phrase-nominale-verbale',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Phrase nominale et phrase verbale',
    theme: 'grammaire',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Dans la cour du collège, les élèves discutent calmement. Silence complet devant la bibliothèque. Une surveillante organise l’entrée des classes.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Où les élèves discutent-ils ?',
        bareme: 4,
        reponseModele: 'Les élèves discutent dans la cour du collège.',
        criteresCorrection: ['Repérer le lieu.', 'Répondre avec une phrase complète.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez une phrase verbale et une phrase nominale dans le texte.',
        bareme: 6,
        reponseModele: 'Phrase verbale : les élèves discutent calmement. Phrase nominale : silence complet devant la bibliothèque.',
        criteresCorrection: ['Identifier une phrase verbale.', 'Identifier une phrase nominale.', 'Justifier par la présence ou l’absence de verbe conjugué.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez six phrases sur la vie au collège : trois phrases verbales et trois phrases nominales.',
        bareme: 10,
        reponseModele: 'La production doit présenter trois phrases verbales et trois phrases nominales sur la vie au collège.',
        criteresCorrection: ['Respecter le thème.', 'Écrire trois phrases verbales.', 'Écrire trois phrases nominales.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Distinguer phrase nominale et phrase verbale.', 'Identifier le verbe conjugué.', 'Produire des phrases variées.'],
    tags: ['1AC', 'grammaire', 'phrase-nominale', 'phrase-verbale', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s1-proposition-relative',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 2AC — La proposition relative',
    theme: 'grammaire',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Le livre que le professeur présente aux élèves raconte une histoire captivante. Les personnages qui avancent avec courage donnent une belle leçon de solidarité.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Que raconte le livre présenté aux élèves ?',
        bareme: 4,
        reponseModele: 'Le livre raconte une histoire captivante.',
        criteresCorrection: ['Repérer l’information principale.', 'Répondre avec une phrase complète.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux propositions relatives dans le texte.',
        bareme: 6,
        reponseModele: 'Deux propositions relatives sont : que le professeur présente aux élèves ; qui avancent avec courage.',
        criteresCorrection: ['Identifier deux propositions relatives.', 'Repérer le pronom relatif.', 'Ne pas confondre avec une proposition indépendante.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez un paragraphe de huit lignes décrivant un personnage courageux en employant deux propositions relatives.',
        bareme: 10,
        reponseModele: 'Le paragraphe doit décrire un personnage courageux avec deux propositions relatives correctement construites.',
        criteresCorrection: ['Respecter le thème.', 'Employer deux propositions relatives.', 'Organiser la description.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Identifier une proposition relative.', 'Repérer le pronom relatif.', 'Employer une proposition relative dans une production écrite.'],
    tags: ['2AC', 'grammaire', 'proposition-relative', 'controle-continu']
  },
  {
    id: 'modele-3ac-regional-expression-opinion',
    niveau: '3AC',
    typeEvaluation: 'examen_regional',
    competence: 'production_ecrite',
    titre: 'Examen régional 3AC — Exprimer une opinion',
    theme: 'argumentation',
    region: 'Modèle national',
    annee: 'modele',
    dureeMinutes: 120,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Certains élèves pensent que les activités culturelles développent la confiance et l’esprit de groupe. Elles permettent aussi de découvrir des talents et de mieux s’exprimer.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel est le thème du texte ?',
        bareme: 4,
        reponseModele: 'Le thème du texte est l’importance des activités culturelles pour les élèves.',
        criteresCorrection: ['Identifier le thème général.', 'Formuler une réponse claire.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux arguments en faveur des activités culturelles.',
        bareme: 6,
        reponseModele: 'Deux arguments sont : elles développent la confiance et l’esprit de groupe ; elles permettent de découvrir des talents.',
        criteresCorrection: ['Repérer deux arguments.', 'Reformuler correctement les idées du texte.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez un texte argumentatif de douze lignes pour donner votre opinion sur les activités culturelles au collège.',
        bareme: 10,
        reponseModele: 'Le texte doit présenter une opinion claire, des arguments pertinents et une conclusion.',
        criteresCorrection: ['Présenter une opinion claire.', 'Développer au moins deux arguments.', 'Utiliser des connecteurs logiques.', 'Respecter la langue.']
      }
    ],
    objectifsPedagogiques: ['Comprendre un texte argumentatif.', 'Identifier des arguments.', 'Exprimer une opinion organisée.'],
    tags: ['3AC', 'examen-regional', 'argumentation', 'opinion']
  },
  {
    id: 'modele-1ac-controle-s1-complement-du-nom',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Le complément du nom',
    theme: 'grammaire',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Le cahier de français est posé sur la table du professeur. Les élèves de la classe préparent un exercice de grammaire.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Où se trouve le cahier de français ?',
        bareme: 4,
        reponseModele: 'Le cahier de français se trouve sur la table du professeur.',
        criteresCorrection: ['Repérer le lieu.', 'Répondre avec une phrase complète.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez trois compléments du nom dans le texte.',
        bareme: 6,
        reponseModele: 'Trois compléments du nom possibles sont : de français, du professeur, de la classe, de grammaire.',
        criteresCorrection: ['Identifier trois compléments du nom.', 'Repérer le nom complété.', 'Ne pas confondre avec un verbe.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez six phrases sur votre salle de classe en utilisant au moins quatre compléments du nom.',
        bareme: 10,
        reponseModele: 'La production doit présenter une salle de classe avec au moins quatre compléments du nom.',
        criteresCorrection: ['Respecter le thème.', 'Employer quatre compléments du nom.', 'Écrire six phrases.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Identifier un complément du nom.', 'Comprendre le rôle du groupe nominal.', 'Employer des compléments du nom dans une production courte.'],
    tags: ['1AC', 'grammaire', 'complement-du-nom', 'controle-continu']
  },
  {
    id: 'modele-2ac-controle-s2-proposition-subordonnee-circonstancielle',
    niveau: '2AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 2AC — La proposition subordonnée circonstancielle',
    theme: 'grammaire',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Lorsque le club de lecture commence, les élèves s’installent en silence. Ils participent avec sérieux parce que le sujet les intéresse.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Pourquoi les élèves participent-ils avec sérieux ?',
        bareme: 4,
        reponseModele: 'Les élèves participent avec sérieux parce que le sujet les intéresse.',
        criteresCorrection: ['Repérer la cause.', 'Répondre avec une phrase complète.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux propositions subordonnées circonstancielles dans le texte.',
        bareme: 6,
        reponseModele: 'Deux propositions subordonnées circonstancielles sont : lorsque le club de lecture commence ; parce que le sujet les intéresse.',
        criteresCorrection: ['Identifier deux propositions subordonnées.', 'Repérer le mot introducteur.', 'Préciser la valeur de temps ou de cause si possible.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez un paragraphe de huit lignes sur une activité scolaire en utilisant deux propositions subordonnées circonstancielles.',
        bareme: 10,
        reponseModele: 'Le paragraphe doit présenter une activité scolaire avec deux propositions subordonnées circonstancielles correctement construites.',
        criteresCorrection: ['Respecter le thème.', 'Employer deux subordonnées circonstancielles.', 'Organiser les idées.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Identifier une proposition subordonnée circonstancielle.', 'Repérer une valeur de temps ou de cause.', 'Employer une subordonnée dans un paragraphe.'],
    tags: ['2AC', 'grammaire', 'subordonnee-circonstancielle', 'controle-continu']
  },
  {
    id: 'modele-3ac-regional-narration-temps-recit',
    niveau: '3AC',
    typeEvaluation: 'examen_regional',
    competence: 'langue',
    titre: 'Examen régional 3AC — Narration et temps du récit',
    theme: 'narration',
    region: 'Modèle national',
    annee: 'modele',
    dureeMinutes: 120,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Le jeune garçon marchait lentement dans la ruelle silencieuse. Soudain, il aperçut une lumière derrière une vieille porte. Il s’approcha avec prudence et découvrit un petit jardin caché.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel événement change la situation dans le récit ?',
        bareme: 4,
        reponseModele: 'L’événement qui change la situation est l’apparition d’une lumière derrière une vieille porte.',
        criteresCorrection: ['Repérer l’événement important.', 'Formuler une réponse claire.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux verbes à l’imparfait et deux verbes au passé simple.',
        bareme: 6,
        reponseModele: 'Deux verbes à l’imparfait : marchait, était sous-entendu par la description. Deux verbes au passé simple : aperçut, s’approcha, découvrit.',
        criteresCorrection: ['Identifier les temps du récit.', 'Distinguer imparfait et passé simple.', 'Citer des formes verbales exactes.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez la suite du récit en douze lignes en utilisant l’imparfait et le passé simple.',
        bareme: 10,
        reponseModele: 'La suite doit respecter la situation narrative, employer l’imparfait pour la description et le passé simple pour les actions principales.',
        criteresCorrection: ['Respecter la cohérence du récit.', 'Employer l’imparfait.', 'Employer le passé simple.', 'Soigner la langue.']
      }
    ],
    objectifsPedagogiques: ['Comprendre un texte narratif.', 'Identifier les temps du récit.', 'Produire une suite narrative cohérente.'],
    tags: ['3AC', 'examen-regional', 'narration', 'temps-du-recit']
  },
  {
    id: 'modele-v095-1ac-lecture-conte-objet-magique',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'lecture',
    titre: 'Contrôle continu 1AC — L’objet magique dans le conte',
    theme: 'conte merveilleux',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Dans une petite maison au bord de la forêt, un garçon découvrit une lampe ancienne. Lorsqu’il la frotta doucement, une lumière bleue éclaira la pièce et une voix mystérieuse lui proposa son aide.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel objet magique apparaît dans le texte ?',
        bareme: 4,
        reponseModele: 'L’objet magique est une lampe ancienne.',
        criteresCorrection: ['Identifier l’objet merveilleux.', 'Répondre par une phrase claire.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Quel effet produit cet objet dans l’histoire ?',
        bareme: 6,
        reponseModele: 'La lampe produit une lumière bleue et fait apparaître une voix mystérieuse.',
        criteresCorrection: ['Repérer l’effet de l’objet.', 'S’appuyer sur le texte.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Imaginez en six lignes un autre objet magique et son pouvoir.',
        bareme: 10,
        reponseModele: 'La réponse doit présenter un objet merveilleux, son pouvoir et son rôle dans une courte situation.',
        criteresCorrection: ['Présenter un objet clair.', 'Décrire son pouvoir.', 'Respecter le registre merveilleux.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Identifier un objet magique.', 'Comprendre son rôle dans un conte.', 'Imaginer un élément merveilleux.'],
    tags: ['1AC', 'conte', 'objet-magique', 'lecture']
  },
  {
    id: 'modele-v095-1ac-lecture-conte-adjuvant-opposant',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'lecture',
    titre: 'Contrôle continu 1AC — Adjuvant et opposant',
    theme: 'conte merveilleux',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Pour retrouver la bague perdue du roi, Salma reçut l’aide d’un cheval blanc. Mais un sorcier jaloux plaça des pierres sur son chemin pour l’empêcher d’avancer.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel personnage aide Salma ?',
        bareme: 4,
        reponseModele: 'Le cheval blanc aide Salma.',
        criteresCorrection: ['Identifier l’adjuvant.', 'Répondre avec précision.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Quel personnage s’oppose à Salma ?',
        bareme: 6,
        reponseModele: 'Le sorcier jaloux s’oppose à Salma.',
        criteresCorrection: ['Identifier l’opposant.', 'Justifier avec un élément du texte.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Présentez en six lignes un adjuvant et un opposant dans un conte.',
        bareme: 10,
        reponseModele: 'La réponse doit présenter un personnage qui aide et un personnage qui s’oppose au héros.',
        criteresCorrection: ['Présenter deux rôles distincts.', 'Respecter le genre du conte.', 'Organiser les idées.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Reconnaître un adjuvant.', 'Reconnaître un opposant.', 'Comprendre les rôles des personnages.'],
    tags: ['1AC', 'conte', 'adjuvant', 'opposant']
  },
  {
    id: 'modele-v095-1ac-lecture-ordre-evenements',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'lecture',
    titre: 'Contrôle continu 1AC — L’ordre des événements',
    theme: 'récit',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'D’abord, Youssef entra dans la grotte. Ensuite, il trouva une carte cachée sous une pierre. Enfin, il décida de suivre le chemin indiqué vers la vallée.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel événement se produit en premier ?',
        bareme: 4,
        reponseModele: 'Le premier événement est l’entrée de Youssef dans la grotte.',
        criteresCorrection: ['Repérer le premier événement.', 'Utiliser l’indice D’abord.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Relevez deux connecteurs temporels dans le texte.',
        bareme: 6,
        reponseModele: 'Deux connecteurs temporels sont : D’abord et Ensuite.',
        criteresCorrection: ['Identifier des connecteurs temporels.', 'Recopier deux exemples exacts.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez cinq lignes en utilisant D’abord, Ensuite et Enfin.',
        bareme: 10,
        reponseModele: 'La réponse doit organiser trois actions dans un ordre clair avec les connecteurs demandés.',
        criteresCorrection: ['Employer trois connecteurs.', 'Respecter l’ordre chronologique.', 'Produire un court récit cohérent.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Comprendre l’ordre chronologique.', 'Repérer des connecteurs temporels.', 'Organiser un court récit.'],
    tags: ['1AC', 'recit', 'ordre', 'connecteurs']
  },
  {
    id: 'modele-v095-1ac-lecture-portrait-personnage',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'lecture',
    titre: 'Contrôle continu 1AC — Comprendre un portrait',
    theme: 'portrait',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Amine était un garçon calme et généreux. Il portait souvent une veste bleue et gardait toujours un petit carnet dans sa poche pour noter ses idées.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Relevez deux qualités morales du personnage.',
        bareme: 4,
        reponseModele: 'Deux qualités morales sont : calme et généreux.',
        criteresCorrection: ['Identifier des qualités morales.', 'Ne pas confondre qualité et vêtement.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Quel détail physique ou vestimentaire est donné dans le texte ?',
        bareme: 6,
        reponseModele: 'Le texte indique qu’Amine porte souvent une veste bleue.',
        criteresCorrection: ['Repérer un détail concret.', 'Répondre par une phrase complète.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez le portrait d’un personnage en huit lignes.',
        bareme: 10,
        reponseModele: 'La réponse doit présenter l’apparence, les qualités et un détail caractéristique du personnage.',
        criteresCorrection: ['Décrire l’apparence.', 'Présenter des qualités morales.', 'Organiser le portrait.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Distinguer portrait physique et moral.', 'Comprendre une description.', 'Rédiger un portrait simple.'],
    tags: ['1AC', 'portrait', 'lecture', 'description']
  },
  {
    id: 'modele-v095-1ac-langue-sujet-verbe',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Sujet et verbe',
    theme: 'grammaire',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Le jardinier arrose les fleurs. Les oiseaux chantent dans l’arbre. Une petite fille observe le ciel.',
    questions: [
      {
        id: 'q1',
        competence: 'langue',
        enonce: 'Dans la première phrase, relevez le sujet.',
        bareme: 4,
        reponseModele: 'Le sujet est : Le jardinier.',
        criteresCorrection: ['Identifier le groupe sujet.', 'Ne pas relever le verbe.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Dans la deuxième phrase, relevez le verbe conjugué.',
        bareme: 6,
        reponseModele: 'Le verbe conjugué est : chantent.',
        criteresCorrection: ['Identifier le verbe conjugué.', 'Respecter la forme du texte.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez quatre phrases simples en soulignant mentalement le sujet et le verbe.',
        bareme: 10,
        reponseModele: 'La réponse doit contenir quatre phrases simples avec un sujet et un verbe clairement identifiables.',
        criteresCorrection: ['Produire quatre phrases.', 'Respecter l’accord sujet-verbe.', 'Employer des verbes conjugués.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Identifier le sujet.', 'Identifier le verbe.', 'Comprendre l’accord sujet-verbe.'],
    tags: ['1AC', 'grammaire', 'sujet', 'verbe']
  },
  {
    id: 'modele-v095-1ac-langue-accord-sujet-verbe',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — L’accord sujet-verbe',
    theme: 'grammaire',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Le voyageur avance lentement. Les voyageurs avancent lentement. La porte s’ouvre. Les portes s’ouvrent.',
    questions: [
      {
        id: 'q1',
        competence: 'langue',
        enonce: 'Expliquez la différence entre avance et avancent.',
        bareme: 4,
        reponseModele: 'Avance est au singulier, tandis que avancent est au pluriel.',
        criteresCorrection: ['Observer la terminaison.', 'Relier le verbe au sujet.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez une phrase avec un sujet pluriel.',
        bareme: 6,
        reponseModele: 'Une phrase avec un sujet pluriel est : Les voyageurs avancent lentement.',
        criteresCorrection: ['Identifier un sujet pluriel.', 'Recopier la phrase correctement.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez cinq phrases avec des sujets au singulier et au pluriel.',
        bareme: 10,
        reponseModele: 'La réponse doit montrer des accords corrects entre sujets et verbes.',
        criteresCorrection: ['Varier singulier et pluriel.', 'Accorder les verbes.', 'Écrire des phrases claires.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Comprendre l’accord sujet-verbe.', 'Distinguer singulier et pluriel.', 'Produire des phrases correctement accordées.'],
    tags: ['1AC', 'accord', 'sujet-verbe', 'langue']
  },
  {
    id: 'modele-v095-1ac-langue-determinants',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Les déterminants',
    theme: 'groupe nominal',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Un garçon ouvrit la porte. Cette lumière étrange venait du vieux grenier. Des livres étaient posés sur une table.',
    questions: [
      {
        id: 'q1',
        competence: 'langue',
        enonce: 'Relevez deux déterminants dans le texte.',
        bareme: 4,
        reponseModele: 'Deux déterminants sont : un et la.',
        criteresCorrection: ['Identifier deux déterminants.', 'Ne pas confondre déterminant et nom.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Dans le groupe nominal cette lumière étrange, quel est le déterminant ?',
        bareme: 6,
        reponseModele: 'Le déterminant est : cette.',
        criteresCorrection: ['Repérer le mot placé avant le nom.', 'Identifier le déterminant démonstratif.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez cinq groupes nominaux avec des déterminants variés.',
        bareme: 10,
        reponseModele: 'La réponse doit contenir cinq groupes nominaux avec des déterminants différents.',
        criteresCorrection: ['Produire cinq groupes nominaux.', 'Varier les déterminants.', 'Respecter les accords.', 'Soigner l’orthographe.']
      }

    ],
    objectifsPedagogiques: ['Identifier un déterminant.', 'Comprendre le groupe nominal.', 'Employer des déterminants variés.'],
    tags: ['1AC', 'determinants', 'groupe-nominal', 'langue']
  },
  {
    id: 'modele-v095-1ac-langue-complement-nom',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Le complément du nom',
    theme: 'groupe nominal',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'La porte du château était fermée. Un sac de voyage attendait près du mur. Les clés en argent brillaient sur la table.',
    questions: [
      {
        id: 'q1',
        competence: 'langue',
        enonce: 'Relevez un complément du nom dans le texte.',
        bareme: 4,
        reponseModele: 'Un complément du nom est : du château.',
        criteresCorrection: ['Identifier un complément du nom.', 'Le relier au nom complété.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Quel nom est complété par de voyage ?',
        bareme: 6,
        reponseModele: 'Le complément de voyage complète le nom sac.',
        criteresCorrection: ['Identifier le nom complété.', 'Comprendre le rôle du complément.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez cinq groupes nominaux contenant un complément du nom.',
        bareme: 10,
        reponseModele: 'La réponse doit contenir cinq groupes nominaux enrichis par un complément du nom.',
        criteresCorrection: ['Produire cinq groupes nominaux.', 'Employer des compléments du nom.', 'Respecter la construction.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Identifier un complément du nom.', 'Enrichir un groupe nominal.', 'Comprendre la précision apportée au nom.'],
    tags: ['1AC', 'complement-du-nom', 'groupe-nominal', 'langue']
  },
  {
    id: 'modele-v095-1ac-langue-present-indicatif',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Le présent de l’indicatif',
    theme: 'conjugaison',
    semestre: 'S1',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Je marche vers la rivière. Vous observez les oiseaux. Les enfants jouent près du jardin.',
    questions: [
      {
        id: 'q1',
        competence: 'langue',
        enonce: 'Relevez un verbe conjugué au présent.',
        bareme: 4,
        reponseModele: 'Un verbe conjugué au présent est : marche.',
        criteresCorrection: ['Identifier un verbe au présent.', 'Recopier la forme exacte.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Conjuguez le verbe observer avec vous au présent.',
        bareme: 6,
        reponseModele: 'La forme correcte est : vous observez.',
        criteresCorrection: ['Employer la terminaison correcte.', 'Respecter le pronom demandé.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez cinq phrases au présent sur une activité scolaire.',
        bareme: 10,
        reponseModele: 'La réponse doit contenir cinq phrases avec des verbes correctement conjugués au présent.',
        criteresCorrection: ['Employer le présent.', 'Varier les verbes.', 'Respecter le thème scolaire.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Identifier le présent.', 'Conjuguer un verbe courant.', 'Employer le présent dans des phrases.'],
    tags: ['1AC', 'present', 'conjugaison', 'langue']
  },
  {
    id: 'modele-v095-1ac-langue-futur-simple',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Le futur simple',
    theme: 'conjugaison',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Demain, la classe visitera la bibliothèque. Vous choisirez un livre et vous rédigerez une courte fiche de lecture.',
    questions: [
      {
        id: 'q1',
        competence: 'langue',
        enonce: 'Relevez deux verbes au futur simple.',
        bareme: 4,
        reponseModele: 'Deux verbes au futur simple sont : visitera et choisirez.',
        criteresCorrection: ['Identifier deux verbes au futur.', 'Recopier les formes exactes.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Conjuguez le verbe rédiger avec vous au futur simple.',
        bareme: 6,
        reponseModele: 'La forme correcte est : vous rédigerez.',
        criteresCorrection: ['Employer le futur simple.', 'Respecter le pronom vous.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez cinq phrases au futur simple sur vos projets de lecture.',
        bareme: 10,
        reponseModele: 'La réponse doit contenir cinq phrases au futur simple autour de la lecture.',
        criteresCorrection: ['Employer le futur simple.', 'Respecter le thème.', 'Varier les phrases.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Identifier le futur simple.', 'Conjuguer avec vous.', 'Exprimer une action à venir.'],
    tags: ['1AC', 'futur-simple', 'conjugaison', 'langue']
  },
  {
    id: 'modele-v095-1ac-vocabulaire-politesse',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Le vocabulaire de la politesse',
    theme: 'vocabulaire',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Dans la bibliothèque, Sara demanda calmement : « Pourriez-vous m’aider à trouver ce livre, s’il vous plaît ? » Le responsable répondit avec le sourire.',
    questions: [
      {
        id: 'q1',
        competence: 'langue',
        enonce: 'Relevez une formule de politesse dans le texte.',
        bareme: 4,
        reponseModele: 'Une formule de politesse est : s’il vous plaît.',
        criteresCorrection: ['Identifier une formule polie.', 'Recopier correctement.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Pourquoi cette formule convient-elle à la situation ?',
        bareme: 6,
        reponseModele: 'Elle convient car Sara s’adresse respectueusement au responsable de la bibliothèque.',
        criteresCorrection: ['Comprendre la situation.', 'Relier la formule au respect.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez quatre phrases utilisant des formules de politesse.',
        bareme: 10,
        reponseModele: 'La réponse doit employer des formules comme s’il vous plaît, merci, je vous remercie ou pourriez-vous.',
        criteresCorrection: ['Employer quatre formules polies.', 'Respecter le vouvoiement.', 'Produire des phrases claires.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Identifier la politesse dans un échange.', 'Employer le vouvoiement.', 'Adapter le registre à la situation.'],
    tags: ['1AC', 'vocabulaire', 'politesse', 'communication']
  },
  {
    id: 'modele-v095-1ac-vocabulaire-sentiments',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'langue',
    titre: 'Contrôle continu 1AC — Le vocabulaire des sentiments',
    theme: 'vocabulaire',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Nadia ressentait de la joie en entrant dans la salle décorée. Son frère, lui, gardait une légère inquiétude avant de prendre la parole.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Relevez deux sentiments dans le texte.',
        bareme: 4,
        reponseModele: 'Deux sentiments sont : la joie et l’inquiétude.',
        criteresCorrection: ['Identifier deux sentiments.', 'Ne pas confondre sentiment et action.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Associez chaque sentiment au personnage concerné.',
        bareme: 6,
        reponseModele: 'Nadia ressent de la joie et son frère ressent de l’inquiétude.',
        criteresCorrection: ['Relier le sentiment au personnage.', 'Répondre clairement.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Écrivez cinq lignes en exprimant deux sentiments différents.',
        bareme: 10,
        reponseModele: 'La réponse doit employer deux mots de sentiments dans un court paragraphe cohérent.',
        criteresCorrection: ['Employer deux sentiments.', 'Expliquer la situation.', 'Organiser les phrases.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Identifier les sentiments.', 'Relier un sentiment à un personnage.', 'Employer un vocabulaire précis.'],
    tags: ['1AC', 'vocabulaire', 'sentiments', 'lecture']
  },
  {
    id: 'modele-v095-1ac-production-carte-postale',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 1AC — Rédiger une carte postale',
    theme: 'communication écrite',
    semestre: 'S2',
    dureeMinutes: 60,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez la situation puis rédigez une réponse organisée.',
    texteSupport:
      'Vous êtes en sortie scolaire dans une ville historique. Rédigez une carte postale courte adressée à votre famille.',
    questions: [
      {
        id: 'q1',
        competence: 'production_ecrite',
        enonce: 'Rédigez une carte postale de huit lignes.',
        bareme: 12,
        reponseModele: 'La carte doit présenter le lieu, une activité réalisée, une impression personnelle et une formule finale.',
        criteresCorrection: ['Respecter la forme de la carte.', 'Présenter le lieu.', 'Exprimer une impression.', 'Soigner la langue.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez dans votre carte une phrase exclamative.',
        bareme: 4,
        reponseModele: 'La réponse doit relever une phrase exclamative correctement ponctuée.',
        criteresCorrection: ['Identifier une phrase exclamative.', 'Respecter la ponctuation.']
      },
      {
        id: 'q3',
        competence: 'lecture',
        enonce: 'Quel est le destinataire de la carte postale ?',
        bareme: 4,
        reponseModele: 'Le destinataire est la famille.',
        criteresCorrection: ['Comprendre la situation d’écriture.', 'Répondre précisément.']
      }

    ],
    objectifsPedagogiques: ['Rédiger une carte postale.', 'Exprimer une impression.', 'Respecter une situation de communication.'],
    tags: ['1AC', 'carte-postale', 'production-ecrite', 'communication']
  },
  {
    id: 'modele-v095-1ac-production-message-court',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 1AC — Rédiger un message court',
    theme: 'communication écrite',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez la situation puis rédigez une réponse organisée.',
    texteSupport:
      'Vous voulez informer vos camarades du changement d’horaire d’une activité de lecture. Rédigez un message clair et poli.',
    questions: [
      {
        id: 'q1',
        competence: 'production_ecrite',
        enonce: 'Rédigez un message informatif de cinq lignes.',
        bareme: 12,
        reponseModele: 'Le message doit indiquer l’activité, le nouvel horaire, le lieu et une formule polie.',
        criteresCorrection: ['Donner les informations essentielles.', 'Rester clair.', 'Employer une formule polie.', 'Soigner la langue.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Quelles informations doivent apparaître dans le message ?',
        bareme: 4,
        reponseModele: 'Les informations importantes sont l’activité, l’horaire et le lieu.',
        criteresCorrection: ['Identifier les informations utiles.', 'Répondre clairement.']
      },
      {
        id: 'q3',
        competence: 'langue',
        enonce: 'Transformez une phrase du message en phrase interrogative.',
        bareme: 4,
        reponseModele: 'La transformation doit produire une question correcte.',
        criteresCorrection: ['Transformer correctement.', 'Employer le point d’interrogation.']
      }

    ],
    objectifsPedagogiques: ['Rédiger un message clair.', 'Organiser des informations pratiques.', 'Adapter le registre.'],
    tags: ['1AC', 'message', 'communication', 'production-ecrite']
  },
  {
    id: 'modele-v095-1ac-production-recit-court',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 1AC — Rédiger un récit court',
    theme: 'récit',
    semestre: 'S2',
    dureeMinutes: 60,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez la situation puis rédigez une réponse organisée.',
    texteSupport:
      'Racontez en dix lignes une découverte surprenante faite dans la cour de votre établissement.',
    questions: [
      {
        id: 'q1',
        competence: 'production_ecrite',
        enonce: 'Rédigez un récit court organisé.',
        bareme: 12,
        reponseModele: 'Le récit doit présenter le lieu, les personnages, l’événement surprenant et une fin claire.',
        criteresCorrection: ['Présenter le cadre.', 'Raconter un événement.', 'Organiser les actions.', 'Soigner la langue.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux verbes d’action dans votre récit.',
        bareme: 4,
        reponseModele: 'La réponse doit relever deux verbes qui expriment une action.',
        criteresCorrection: ['Identifier deux verbes d’action.', 'Les recopier correctement.']
      },
      {
        id: 'q3',
        competence: 'lecture',
        enonce: 'Quel est l’événement principal de votre récit ?',
        bareme: 4,
        reponseModele: 'La réponse doit résumer l’événement surprenant raconté.',
        criteresCorrection: ['Repérer l’événement central.', 'Répondre clairement.']
      }

    ],
    objectifsPedagogiques: ['Rédiger un récit court.', 'Organiser les actions.', 'Employer des verbes d’action.'],
    tags: ['1AC', 'recit', 'production-ecrite', 'evenement']
  },
  {
    id: 'modele-v095-1ac-production-description-objet',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Contrôle continu 1AC — Décrire un objet',
    theme: 'description',
    semestre: 'S2',
    dureeMinutes: 45,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez la situation puis rédigez une réponse organisée.',
    texteSupport:
      'Choisissez un objet important pour un personnage de conte et décrivez-le avec précision.',
    questions: [
      {
        id: 'q1',
        competence: 'production_ecrite',
        enonce: 'Décrivez l’objet en huit lignes.',
        bareme: 12,
        reponseModele: 'La description doit présenter la forme, la couleur, la matière et l’utilité de l’objet.',
        criteresCorrection: ['Présenter des détails précis.', 'Employer des adjectifs.', 'Organiser la description.', 'Soigner la langue.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez trois adjectifs utilisés dans votre description.',
        bareme: 4,
        reponseModele: 'La réponse doit relever trois adjectifs qualificatifs correctement employés.',
        criteresCorrection: ['Identifier des adjectifs.', 'Respecter les accords.']
      },
      {
        id: 'q3',
        competence: 'lecture',
        enonce: 'Pourquoi cet objet est-il important dans le conte ?',
        bareme: 4,
        reponseModele: 'L’objet est important parce qu’il aide le personnage ou déclenche une action.',
        criteresCorrection: ['Expliquer le rôle de l’objet.', 'Répondre avec cohérence.']
      }

    ],
    objectifsPedagogiques: ['Décrire un objet.', 'Employer des adjectifs.', 'Comprendre le rôle d’un objet dans un récit.'],
    tags: ['1AC', 'description', 'objet', 'production-ecrite']
  },
  {
    id: 'modele-v095-1ac-evaluation-integrée-conte',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'lecture',
    titre: 'Évaluation intégrée 1AC — Conte et langue',
    theme: 'conte merveilleux',
    semestre: 'S2',
    dureeMinutes: 60,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'Il était une fois un enfant curieux qui entra dans une bibliothèque abandonnée. Sur une table poussiéreuse, il trouva un livre ouvert qui brillait doucement.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Relevez la formule d’ouverture et le lieu de l’action.',
        bareme: 4,
        reponseModele: 'La formule d’ouverture est Il était une fois et le lieu est une bibliothèque abandonnée.',
        criteresCorrection: ['Identifier la formule.', 'Repérer le lieu.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux adjectifs qualificatifs dans le texte.',
        bareme: 6,
        reponseModele: 'Deux adjectifs qualificatifs sont : curieux et abandonnée.',
        criteresCorrection: ['Identifier deux adjectifs.', 'Les recopier correctement.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Imaginez la suite du conte en huit lignes.',
        bareme: 10,
        reponseModele: 'La suite doit respecter le début, garder une atmosphère merveilleuse et présenter une action cohérente.',
        criteresCorrection: ['Respecter le début.', 'Créer une suite cohérente.', 'Employer le merveilleux.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Réviser le conte.', 'Identifier des adjectifs.', 'Produire une suite narrative.'],
    tags: ['1AC', 'evaluation-integree', 'conte', 'langue']
  },
  {
    id: 'modele-v095-1ac-evaluation-integrée-bibliotheque',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'lecture',
    titre: 'Évaluation intégrée 1AC — Bibliothèque et lecture',
    theme: 'texte informatif',
    semestre: 'S2',
    dureeMinutes: 60,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez le texte puis répondez aux questions.',
    texteSupport:
      'La bibliothèque du collège accueille les élèves pendant les pauses. Elle propose des contes, des romans courts, des dictionnaires et des revues pour aider chacun à progresser.',
    questions: [
      {
        id: 'q1',
        competence: 'lecture',
        enonce: 'Quel est le thème principal du texte ?',
        bareme: 4,
        reponseModele: 'Le thème principal est la bibliothèque du collège.',
        criteresCorrection: ['Identifier le thème.', 'Répondre brièvement.']
      },
      {
        id: 'q2',
        competence: 'lecture',
        enonce: 'Citez deux documents proposés par la bibliothèque.',
        bareme: 6,
        reponseModele: 'Deux documents proposés sont les contes et les dictionnaires.',
        criteresCorrection: ['Relever deux informations.', 'S’appuyer sur le texte.']
      },
      {
        id: 'q3',
        competence: 'production_ecrite',
        enonce: 'Rédigez six lignes pour expliquer l’utilité d’une bibliothèque scolaire.',
        bareme: 10,
        reponseModele: 'La réponse doit expliquer que la bibliothèque aide à lire, chercher, apprendre et enrichir le vocabulaire.',
        criteresCorrection: ['Respecter le thème.', 'Présenter des idées claires.', 'Organiser les phrases.', 'Soigner la langue.']
      }

    ],
    objectifsPedagogiques: ['Comprendre un texte informatif.', 'Relever des informations.', 'Expliquer une utilité.'],
    tags: ['1AC', 'evaluation-integree', 'bibliotheque', 'lecture']
  },
  {
    id: 'modele-v095-1ac-evaluation-integrée-dialogue',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Évaluation intégrée 1AC — Dialogue et courtoisie',
    theme: 'dialogue',
    semestre: 'S2',
    dureeMinutes: 60,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez la situation puis rédigez une réponse organisée.',
    texteSupport:
      'Dans la cour du collège, un élève demande poliment à un camarade de lui prêter un livre de contes.',
    questions: [
      {
        id: 'q1',
        competence: 'production_ecrite',
        enonce: 'Rédigez un dialogue de six répliques.',
        bareme: 12,
        reponseModele: 'Le dialogue doit présenter une demande polie, une réponse claire et une ponctuation correcte.',
        criteresCorrection: ['Écrire six répliques.', 'Employer une demande polie.', 'Respecter la ponctuation du dialogue.', 'Soigner la langue.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez une formule de politesse dans votre dialogue.',
        bareme: 4,
        reponseModele: 'La réponse doit relever une formule comme s’il vous plaît ou je vous remercie.',
        criteresCorrection: ['Identifier une formule polie.', 'Respecter le vouvoiement si la situation l’exige.']
      },
      {
        id: 'q3',
        competence: 'lecture',
        enonce: 'Quel est l’objet demandé dans la situation ?',
        bareme: 4,
        reponseModele: 'L’objet demandé est un livre de contes.',
        criteresCorrection: ['Comprendre la situation.', 'Répondre précisément.']
      }

    ],
    objectifsPedagogiques: ['Rédiger un dialogue.', 'Employer la courtoisie.', 'Respecter une situation de communication.'],
    tags: ['1AC', 'evaluation-integree', 'dialogue', 'courtoisie']
  },
  {
    id: 'modele-v095-1ac-evaluation-integrée-portrait',
    niveau: '1AC',
    typeEvaluation: 'controle_continu',
    competence: 'production_ecrite',
    titre: 'Évaluation intégrée 1AC — Portrait et description',
    theme: 'portrait',
    semestre: 'S2',
    dureeMinutes: 60,
    baremeTotal: 20,
    sourceType: 'modele_original',
    sourceNom: 'PR_Molière — sujet modèle original',
    consigne: 'Lisez la situation puis rédigez une réponse organisée.',
    texteSupport:
      'Votre classe prépare un recueil de contes. Vous devez présenter le héros ou l’héroïne d’un récit merveilleux.',
    questions: [
      {
        id: 'q1',
        competence: 'production_ecrite',
        enonce: 'Rédigez un portrait organisé en dix lignes.',
        bareme: 12,
        reponseModele: 'Le portrait doit présenter l’apparence, les qualités, les actions possibles et le rôle du personnage.',
        criteresCorrection: ['Présenter l’apparence.', 'Présenter les qualités.', 'Organiser le portrait.', 'Soigner la langue.']
      },
      {
        id: 'q2',
        competence: 'langue',
        enonce: 'Relevez deux groupes nominaux dans votre portrait.',
        bareme: 4,
        reponseModele: 'La réponse doit relever deux groupes nominaux correctement formés.',
        criteresCorrection: ['Identifier deux groupes nominaux.', 'Éviter les phrases complètes.']
      },
      {
        id: 'q3',
        competence: 'lecture',
        enonce: 'Quel rôle ce personnage joue-t-il dans le conte ?',
        bareme: 4,
        reponseModele: 'Le personnage peut être héros, aide, opposant ou personnage merveilleux.',
        criteresCorrection: ['Nommer un rôle clair.', 'Relier le rôle au récit.']
      }

    ],
    objectifsPedagogiques: ['Rédiger un portrait.', 'Employer des groupes nominaux.', 'Comprendre le rôle d’un personnage.'],
    tags: ['1AC', 'evaluation-integree', 'portrait', 'description']
  }
];

export function getExamCorpusByLevel(niveau: ExamLevel): ExamCorpusItem[] {
  return examCorpus.filter((item) => item.niveau === niveau);
}

export function getExamCorpusByEvaluationType(
  typeEvaluation: ExamEvaluationType
): ExamCorpusItem[] {
  return examCorpus.filter((item) => item.typeEvaluation === typeEvaluation);
}

export function getRegionalExamCorpus(): ExamCorpusItem[] {
  return examCorpus.filter((item) => item.typeEvaluation === 'examen_regional');
}
