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
    consigne: 'Lis le texte puis réponds aux questions.',
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
      'Rédige le portrait physique et moral d’un personnage courageux que tu admires.',
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
      'Rédige une lettre officielle au directeur de ton établissement pour demander l’organisation d’une activité culturelle.',
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
      'Lis le texte narratif puis réponds aux questions de compréhension, de langue et de production écrite.',
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
    consigne: 'Lis le dialogue puis réponds aux questions.',
    texteSupport:
      'Dans la cour du collège, Salma demande à son camarade : « Peux-tu me prêter ton cahier, s’il te plaît ? » Yassine répond : « Bien sûr, mais rends-le-moi après la séance. » Salma sourit et dit : « Merci beaucoup. »',
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
        enonce: 'Écris un court dialogue de quatre répliques entre deux élèves.',
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
    consigne: 'Lis le texte descriptif puis réponds aux questions.',
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
        enonce: 'Décris en six lignes un lieu de ton collège.',
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
    consigne: 'Lis la situation puis réponds aux questions.',
    texteSupport:
      'Ton ami a changé de collège. Tu veux lui écrire une lettre pour lui raconter ta nouvelle classe et lui demander de ses nouvelles.',
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
    consigne: 'Lis le texte puis réponds aux questions.',
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
    consigne: 'Lis la situation puis réponds aux questions.',
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
    consigne: 'Lis les phrases puis réponds aux questions.',
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
        enonce: 'Écris quatre phrases simples sur ta journée au collège.',
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
    consigne: 'Lis le texte puis réponds aux questions.',
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
    consigne: 'Lis le texte puis réponds aux questions.',
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
    consigne: 'Lis le texte puis réponds aux questions.',
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
    consigne: 'Lis le texte puis réponds aux questions.',
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
