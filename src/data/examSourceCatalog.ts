export type ExamSourceCatalogItem = {
  id: string;
  nom: string;
  niveau: "1AC" | "2AC" | "3AC";
  typeEvaluation: "controle_continu" | "examen_local" | "examen_regional" | "cours_revision";
  source: "AlloSchool" | "Moutamadris" | "Attarbia";
  url: string;
  statutIntegration: "lien_reference" | "a_structurer_manuellement" | "contenu_autorise_requis";
  usageAutoriseDansPRMoliere: string;
};

export const examSourceCatalog: ExamSourceCatalogItem[] = [
  {
    id: "alloschool-francais-1ac",
    nom: "Français 1AC — cours et devoirs",
    niveau: "1AC",
    typeEvaluation: "controle_continu",
    source: "AlloSchool",
    url: "https://www.alloschool.com/course/francais-1ere-annee-college",
    statutIntegration: "lien_reference",
    usageAutoriseDansPRMoliere:
      "Référence externe pour orienter l'élève. Ne pas copier automatiquement les sujets ou corrections."
  },
  {
    id: "moutamadris-francais-1ac",
    nom: "Français 1AC — فروض اللغة الفرنسية",
    niveau: "1AC",
    typeEvaluation: "controle_continu",
    source: "Moutamadris",
    url: "https://moutamadris.ma/%D9%81%D8%B1%D9%88%D8%B6-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D9%81%D8%B1%D9%86%D8%B3%D9%8A%D8%A9-%D8%A7%D9%84%D8%A7%D9%88%D9%84%D9%89-%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A-%D9%85%D8%B9-%D8%A7/",
    statutIntegration: "lien_reference",
    usageAutoriseDansPRMoliere:
      "Référence externe. Utiliser seulement comme lien ou comme inspiration pédagogique reformulée."
  },
  {
    id: "moutamadris-francais-2ac",
    nom: "Français 2AC — فروض السنة الثانية إعدادي",
    niveau: "2AC",
    typeEvaluation: "controle_continu",
    source: "Moutamadris",
    url: "https://moutamadris.ma/%D9%81%D8%B1%D9%88%D8%B6-%D9%84%D9%84%D8%B3%D9%86%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%D8%A9-%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A/",
    statutIntegration: "lien_reference",
    usageAutoriseDansPRMoliere:
      "Référence externe. Ne pas intégrer de contenu sans autorisation ou reformulation originale."
  },
  {
    id: "alloschool-francais-3ac",
    nom: "Français 3AC — cours et préparation",
    niveau: "3AC",
    typeEvaluation: "cours_revision",
    source: "AlloSchool",
    url: "https://www.alloschool.com/course/francais-3eme-annee-college",
    statutIntegration: "lien_reference",
    usageAutoriseDansPRMoliere:
      "Référence externe pour orienter l'élève vers les ressources 3AC."
  },
  {
    id: "alloschool-examens-regionaux-3ac",
    nom: "Examens régionaux 3AC — toutes régions",
    niveau: "3AC",
    typeEvaluation: "examen_regional",
    source: "AlloSchool",
    url: "https://www.alloschool.com/section/5891",
    statutIntegration: "a_structurer_manuellement",
    usageAutoriseDansPRMoliere:
      "Créer une fiche de métadonnées et un sujet original ou autorisé. Ne pas copier automatiquement les PDF."
  },
  {
    id: "moutamadris-examens-regionaux-francais-3ac",
    nom: "Examens régionaux français 3AC",
    niveau: "3AC",
    typeEvaluation: "examen_regional",
    source: "Moutamadris",
    url: "https://moutamadris.ma/%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA-%D8%AC%D9%87%D9%88%D9%8A%D8%A9-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D9%81%D8%B1%D9%86%D8%B3%D9%8A%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB/",
    statutIntegration: "a_structurer_manuellement",
    usageAutoriseDansPRMoliere:
      "Référence externe pour repérer les examens régionaux. Intégration directe seulement si droit confirmé."
  }
];

export function getExamSourceCatalogByLevel(niveau: "1AC" | "2AC" | "3AC") {
  return examSourceCatalog.filter((item) => item.niveau === niveau);
}

export function getRegionalExamSources3AC() {
  return examSourceCatalog.filter(
    (item) => item.niveau === "3AC" && item.typeEvaluation === "examen_regional"
  );
}
