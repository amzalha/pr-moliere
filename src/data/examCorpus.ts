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
