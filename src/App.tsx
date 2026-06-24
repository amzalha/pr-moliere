import React, { useState, useEffect } from "react";
import { 
 GraduationCap, 
 Flame, 
 BookOpen, 
 Lightbulb, 
 Sparkles, 
 MessageSquare, 
 CheckCircle, 
 XCircle, 
 RotateCcw, 
 User, 
 HelpCircle,
 Play,
 Award,
 ArrowRight,
 LogIn,
 LogOut,
 Volume2,
 VolumeX,
 Star,
 Bookmark,
 Clock
} from "lucide-react";
import { LESSONS, LessonTopic } from "./data/lessons";
import { renderMarkdown } from "./utils/markdown";
import LessonCard from "./components/LessonCard";
import ProgressPanel from "./components/ProgressPanel";
import SuccessLexicon from "./components/SuccessLexicon";
import BrevetTracker from "./components/BrevetTracker";
import StudentHistoryPanel from "./components/StudentHistoryPanel";
import ExamCorpusPanel from "./components/ExamCorpusPanel";
import type { ExamCorpusItem } from "./data/examCorpus";
import { 
 auth, 
 googleProvider, 
 signInWithPopup, 
 signOut, 
 onAuthStateChanged, 
 doc, 
 db, 
 getDoc, 
 setDoc,
 FirebaseUser
} from "./lib/firebase";
import { saveStudentAnswer } from "./services/studentHistory";

interface ProgressStats {
 solvedCount: Record<string, number>;
 levelCount: Record<"1AC" | "2AC" | "3AC", number>;
 totalCorrect: number;
 streak: number;
 lastActive: string | null;
}

const DEFAULT_STATS: ProgressStats = {
 solvedCount: {},
 levelCount: { "1AC": 0, "2AC": 0, "3AC": 0 },
 totalCorrect: 0,
 streak: 1, // Start with a friendly 1-day motivation
 lastActive: null
};

// Initial offline fallback exercise in case the API Key is loading or missing
const OFFLINE_FALLBACK_EXERCISES: Record<string, {
 statut: string;
 contenu_pedagogique: string;
 rappel_cours: string;
 correctAnswers: string[];
}> = {
 "1ac-structure-conte": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Le Pêcheur de Larache 🌊\n\nVoici le début d’un conte merveilleux :\n\n*« **Jadis**, un vieux pêcheur marocain nommé Youssef habitait une petite cabane près des falaises bleues de Larache... »*\n\n**Consigne** : Identifie la formule d'ouverture imagée utilisée au tout début de ce récit.",
  rappel_cours: "Le conte commence par une formule d'ouverture imagée suivie d'une situation initiale stable souvent à l'imparfait.",
  correctAnswers: ["jadis"]
 },
 "1ac-schema-narratif": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Tempête à Essaouira ⛵\n\nAnalyse cette de récit :\n\n*« Les pêcheurs d'Essaouira naviguaient sereinement sous le soleil quand soudain, un vent violent se leva et déchira les voiles de la barque. »*\n\n**Consigne** : À quelle étape du schéma narratif correspond l'événement introduit par « quand soudain » ? (Situation initiale, Élément perturbateur, ou Péripétie ?)",
  rappel_cours: "Le schéma narratif organise les actions du récit en cinq étapes chronologiques indispensables.",
  correctAnswers: ["element perturbateur", "element modificateur", "perturbateur", "modificateur"]
 },
 "1ac-portrait-moral": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Portrait du Maître Tisserand de Marrakech 🧶\n\nObserve cette description d'Oncle Yassine :\n\n*« Ses yeux brillaient d'une grande bonté. C'était un homme généreux, toujours prêt à conseiller ses voisins avec une infinie patience. »*\n\n**Consigne** : Cette description fait-elle le portrait physique ou le portrait moral d'Oncle Yassine ?",
  rappel_cours: "Le portrait utilise des adjectifs qualificatifs et des métaphores pour peindre les traits physiques et le tempérament de quelqu'un.",
  correctAnswers: ["moral", "portrait moral"]
 },
 "1ac-indicateurs-spatiotemporels": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Les Secrets de Fès 🏛️\n\nComplète la phrase suivante avec l'indicateur de temps approprié parmi (**Jadis** / **Demain** / **Dans la cour**) :\n\n*« ________, les caravanes de marchands s'arrêtaient dans ce grand caravansérail pour échanger des tissus précieux. »*",
  rappel_cours: "Les indicateurs de temps et de lieu structurent la chronologie et l'espace du récit.",
  correctAnswers: ["jadis"]
 },
 "1ac-caracterisation": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Le Pur-Sang de la Fantasia d'Oujda 🐎\n\nComplète ce portrait avec l'outil de comparaison qui convient pour lier le cheval à l'éclair (**comme** / **ainsi** / **plus**) :\n\n*« Le magnifique étalon noir de la fantasia filait ________ l'éclair à travers la plaine d'Oujda. »*",
  rappel_cours: "La caractérisation utilise l'adjectif qualificatif et des comparaisons.",
  correctAnswers: ["comme"]
 },
 "2ac-structure-piece": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Sur les Planches de Casablanca 🎭\n\n**Consigne** : Comment appelle-t-on le début d'une pièce de théâtre, correspondant traditionnellement à la première scène, servant à présenter l'intrigue, le lieu et les personnages ?",
  rappel_cours: "Une œuvre de théâtre se découpe en Actes (qui marquent les étapes temporelles) et en Scènes (liées aux entrées/sorties de personnages).",
  correctAnswers: ["exposition", "scene d'exposition", "scène d'exposition"]
 },
 "2ac-didascalies": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Didascalies de Mehdi à Rabat 🎭\n\nObserve cette réplique :\n\n**MEHDI** ( *en haussant les épaules d'un air amusé* ) : Mais non Kenza, nous ne serons pas en retard !\n\n**Consigne** : Comment appelle-t-on l'instruction théâtrale écrite en italique : « *en haussant les épaules d'un air amusé* » ?",
  rappel_cours: "Les didascalies, souvent écrites en italique, décrivent les actions, décors, mimiques et intonations.",
  correctAnswers: ["didascalie", "didascalies", "la didascalie", "les didascalies"]
 },
 "2ac-une-journal": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Le Journal des Collèges de Casablanca 📰\n\n**Consigne** : Comment appelle-t-on l'encadré en très gros caractères placé au sommet d'une Une de journal qui affiche le scoop principal ?",
  rappel_cours: "La Une est la vitrine d'un journal ; elle doit capter l'attention par des titres chocs disposés méthodiquement.",
  correctAnswers: ["manchette", "la manchette"]
 },
 "2ac-fait-divers": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Sauvetage Insolite à Meknès 🐱\n\nLis attentivement :\n\n*« Hier soir, à l'heure de la prière, le jeune Yassine a courageusement grimpé sur l'arbre de la place administrative de Meknès pour sauver un chaton apeuré. »*\n\n**Consigne** : À quelle question clé du fait divers répond la mention « à Meknès » ? (Qui, Quoi, Où, ou Quand ?)",
  rappel_cours: "Un fait divers est un événement réel, insolite ou dramatique, rédigé à la troisième personne de façon concise.",
  correctAnswers: ["ou", "où"]
 },
 "3ac-nouvelle-policiere": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Mystère dans la Médina de Tanger 🕵️\n\nDans le texte suivant :\n\n*« L'inspecteur ramassa un vieux gant en cuir près de la fontaine et l'examina à la recherche d'empreintes. »*\n\n**Consigne** : Quel mot de ce texte désigne l'élément suspect ou la marque matérielle exploitable par un enquêteur ? (gant, gant en cuir, ou indice ?)",
  rappel_cours: "La nouvelle policière repose sur le suspense, l'indice révélateur, le suspect et la déduction rationnelle de l'enquêteur.",
  correctAnswers: ["indice", "indices", "l'indice"]
 },
 "3ac-correspondance-administrative": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Courrier à l'Académie de Rabat ✉️\n\n**Consigne** : Complète la formule de politesse pour écrire au Directeur régional : « Veuillez agréer, Monsieur, l'expression de mes sentiments ________. » (respectueux, cordiaux, ou familiers ?)",
  rappel_cours: "Une lettre administrative exclut la familiarité ; elle requiert une structure normée (émetteur, destinataire, objet) et l'usage de 'Veuillez agréer, Monsieur, l'expression de...'.",
  correctAnswers: ["respectueux", "respectueux,", "distingues", "distingués"]
 },
 "3ac-invitation-voeux": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Fête Nationale à Marrakech 🇲🇦\n\nDans une lettre d'invitation à une cérémonie festive scolaire :\n\n**Consigne** : Quelle mention abréviative formule la demande de confirmation attendue de la part de l'invité ? (S.V.P, R.S.V.P, ou P.S ?)",
  rappel_cours: "La lettre d'invitation contient des précisions indispensables (date, lieu, motif) et propose parfois un coupon de réponse.",
  correctAnswers: ["rsvp", "r.s.v.p"]
 },
 "3ac-hypothese-si": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Concordance et Hypothèse (3AC) 🎓\n\nConjugue correctement le verbe entre parenthèses :\n\n*« Si Amina étudiait régulièrement ses fiches de français, elle ________ (obtenir) son brevet avec mention d'excellence. »*",
  rappel_cours: "La concordance classique de l'hypothèse est : 'Si + Présent -> Futur Simple' ou 'Si + Imparfait -> Conditionnel Présent'.",
  correctAnswers: ["obtiendrait"]
 },
 "3ac-cause-consequence": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Protection de l'Environnement au Maroc 💧\n\nRelie ces propositions en utilisant la conjonction de cause convenable (**parce que** / **donc** / **si bien que**) :\n\n*« Ghita ferme le robinet ________ elle souhaite économiser les ressources d'eau de notre pays. »*",
  rappel_cours: "La cause explique la raison (parce que, puisque, comme), tandis que la conséquence en exprime le résultat logique (donc, par conséquent).",
  correctAnswers: ["parce que", "parce qu'"]
 },
 "3ac-concession-opposition": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Le Défi de Français de Kenza 🏆\n\nComplète avec le connecteur de concession correct (**Mais** / **Bien que** / **Pourtant**) :\n\n*« ________ Mehdi soit très intimidé de prendre la parole, il a déclamé son texte théâtral avec brio. »*",
  rappel_cours: "La concession exprime l'absence d'effet d'une cause attendue (bien que + subjonctif, pourtant, malgré + nom).",
  correctAnswers: ["bien que", "bien qu'"]
 },
 "3ac-but-moyen": {
  statut: "[GENERATION_EXERCICE]",
  contenu_pedagogique: "### Défi : Les Arbres du Collège de Fès 🌳\n\nComplète pour exprimer l'objectif :\n\n*« Nous plantons des rosiers sauvages du sud marocain pour ________ embellir la cour de notre collège. »* (à, de, ou de peur de ?)",
  rappel_cours: "On utilise 'pour que' ou 'afin que' suivis du subjonctif lorsque les sujets des deux propositions sont différents, et l'infinitif ('pour', 'afin de') si le sujet est le même.",
  correctAnswers: ["pour", "afin de"]
 }
};

export default function App() {
 // App states
 const [selectedTopic, setSelectedTopic] = useState<LessonTopic>(LESSONS[0]);
 const [selectedLevelFilter, setSelectedLevelFilter] = useState<"1AC" | "2AC" | "3AC" | "TOUS">("TOUS");
 
 // Exercise states
 const [exerciseText, setExerciseText] = useState<string>("");
 const [reminderText, setReminderText] = useState<string>("");
 const [correctionContextText, setCorrectionContextText] = useState<string>("");
 const [exerciseLoading, setExerciseLoading] = useState<boolean>(false);
 const [studentAnswer, setStudentAnswer] = useState<string>("");
 const [submitting, setSubmitting] = useState<boolean>(false);
 const [feedback, setFeedback] = useState<{ statut: string; contenu: string } | null>(null);
 const [isOfflineFallbackMode, setIsOfflineFallbackMode] = useState<boolean>(false);
 const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
 const [exerciseSessionStreak, setExerciseSessionStreak] = useState<number>(0);
 const [bookmarkedWordIds, setBookmarkedWordIds] = useState<string[]>(() => {
  try {
   const saved = localStorage.getItem("prof_ami_bookmarks");
   return saved ? JSON.parse(saved) : [];
  } catch {
   return [];
  }
 });

 // Auth / Cloud states
 const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
 const [authLoading, setAuthLoading] = useState<boolean>(true);

 // Stats / Persistence
 const [stats, setStats] = useState<ProgressStats>(() => {
  try {
   const saved = localStorage.getItem("prof_ami_stats_v1");
   return saved ? JSON.parse(saved) : DEFAULT_STATS;
  } catch {
   return DEFAULT_STATS;
  }
 });

 // Chat/Conversation with PR_Molière
 const [chatLoading, setChatLoading] = useState<boolean>(false);
 const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
  {
   role: "model",
   content: "Marhaban ! Je suis **PR Molière**, votre tuteur de français. Sélectionnez la leçon de votre choix ci-dessous, ou posez-moi directement vos questions sur la grammaire, la conjugaison ou votre examen régional ! Je suis là pour vous accompagner chaleureusement."
  }
 ]);
 const [userQuery, setUserQuery] = useState<string>("");
 const [activeRightTab, setActiveRightTab] = useState<"BADGES" | "HISTORY" | "EXAMS" | "LEXICON" | "BREVET">("BADGES");
 const [showCelebration, setShowCelebration] = useState<boolean>(false);
 const [celebrationPraise, setCelebrationPraise] = useState<string>("Excellent travail ! 🎉");

 // Auth subscriber to manage synced states
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
   setCurrentUser(fbUser);
   setAuthLoading(true);
   if (fbUser) {
    try {
     const userDocRef = doc(db, "users", fbUser.uid);
     const userDocSnap = await getDoc(userDocRef);
     if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      const firestoreStats: ProgressStats = {
       solvedCount: data.solvedCount || {},
       levelCount: data.levelCount || { "1AC": 0, "2AC": 0, "3AC": 0 },
       totalCorrect: data.totalCorrect || 0,
       streak: data.streak || 1,
       lastActive: data.lastActive || null
      };

      if (data.bookmarkedWordIds && Array.isArray(data.bookmarkedWordIds)) {
       setBookmarkedWordIds(prev => Array.from(new Set([...prev, ...data.bookmarkedWordIds])));
      }

      // Merge safely with local cache to preserve progress
      setStats(prev => {
       const mergedSolvedCount = { ...prev.solvedCount };
       Object.keys(firestoreStats.solvedCount).forEach(k => {
        mergedSolvedCount[k] = Math.max(mergedSolvedCount[k] || 0, firestoreStats.solvedCount[k] || 0);
       });

       return {
        solvedCount: mergedSolvedCount,
        levelCount: {
         "1AC": Math.max(prev.levelCount["1AC"] || 0, firestoreStats.levelCount["1AC"] || 0),
         "2AC": Math.max(prev.levelCount["2AC"] || 0, firestoreStats.levelCount["2AC"] || 0),
         "3AC": Math.max(prev.levelCount["3AC"] || 0, firestoreStats.levelCount["3AC"] || 0),
        },
        totalCorrect: Math.max(prev.totalCorrect, firestoreStats.totalCorrect),
        streak: Math.max(prev.streak, firestoreStats.streak),
        lastActive: prev.lastActive || firestoreStats.lastActive
       };
      });
     } else {
      // First run for this user, write current stats to firestore
      await setDoc(userDocRef, {
       uid: fbUser.uid,
       email: fbUser.email,
       displayName: fbUser.displayName,
       createdAt: new Date().toISOString(),
       streak: stats.streak,
       totalCorrect: stats.totalCorrect,
       levelCount: stats.levelCount,
       solvedCount: stats.solvedCount,
       bookmarkedWordIds: bookmarkedWordIds,
       lastActive: new Date().toISOString()
      });
     }
    } catch (err) {
     console.error("Firestore sync fetch error:", err);
    }
   }
   setAuthLoading(false);
  });
  return () => unsubscribe();
 }, []);

 // Write changes to localStorage & Cloud Database simultaneously
 useEffect(() => {
  localStorage.setItem("prof_ami_stats_v1", JSON.stringify(stats));
 }, [stats]);

 useEffect(() => {
  localStorage.setItem("prof_ami_bookmarks", JSON.stringify(bookmarkedWordIds));
 }, [bookmarkedWordIds]);

 useEffect(() => {
  if (currentUser) {
   const syncStats = async () => {
    try {
     const userDocRef = doc(db, "users", currentUser.uid);
     await setDoc(userDocRef, {
      displayName: currentUser.displayName,
      email: currentUser.email,
      streak: stats.streak,
      totalCorrect: stats.totalCorrect,
      levelCount: stats.levelCount,
      solvedCount: stats.solvedCount,
      bookmarkedWordIds: bookmarkedWordIds,
      lastActive: new Date().toISOString()
     }, { merge: true });
    } catch (err) {
     console.error("Firestore progress auto-sync error:", err);
    }
   };
   
   syncStats();
  }
 }, [stats, bookmarkedWordIds, currentUser]);

 const handleGoogleLogin = async () => {
  try {
   await signInWithPopup(auth, googleProvider);
  } catch (err) {
   console.error("Firebase Auth Google Login Error:", err);
  }
 };

 const handleGoogleLogout = async () => {
  try {
   await signOut(auth);
  } catch (err) {
   console.error("Firebase Auth Signout Error:", err);
  }
 };

 // Client speech helper for pronunciation accompaniment
 const speakFrenchText = (text: string) => {
  if ("speechSynthesis" in window) {
   if (isSpeaking) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    return;
   }

   window.speechSynthesis.cancel();
   // Remove Markdown headers and backticks for clean pronunciation
   const cleaned = text
    .replace(/[#*`>_\-]/g, "")
    .replace(/\[.*?\]/g, "")
    .trim();
   
   const utterance = new SpeechSynthesisUtterance(cleaned);
   utterance.lang = "fr-FR";
   utterance.rate = 0.9; // clear pacing
   
   utterance.onstart = () => {
    setIsSpeaking(true);
   };
   utterance.onend = () => {
    setIsSpeaking(false);
   };
   utterance.onerror = () => {
    setIsSpeaking(false);
   };

   window.speechSynthesis.speak(utterance);
  } else {
   console.warn("Speech Synthesis unsupported");
  }
 };

 // Load a default exercise on startup
 useEffect(() => {
  generateExercise(LESSONS[0]);
 }, []);

 // API wrappers with fallback
 const generateExercise = async (topic: LessonTopic) => {
  setExerciseLoading(true);
  setFeedback(null);
  setStudentAnswer("");
  setSelectedTopic(topic);

  try {
   const res = await fetch("/api/pedagogie/generer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     niveau: topic.level,
     theme: topic.title,
     consigne: topic.defaultPrompt
    })
   });

   if (!res.ok) {
    throw new Error("Erreur serveur ou clé manquante");
   }

   const data = await res.json();
   if (data.contenu_pedagogique) {
    setExerciseText(data.contenu_pedagogique);
    setReminderText(data.rappel_cours || topic.keyRule);
    setIsOfflineFallbackMode(!!data.offlineFallback);
   } else {
    throw new Error("Format JSON non-conforme");
   }
  } catch (err) {
   console.info("Activation des exercices locaux.");
   setIsOfflineFallbackMode(true);
   // Nice offline fallback so the application works perfectly instantly during assessment
   const levelKey = topic.level.toLowerCase();
   const fallback = OFFLINE_FALLBACK_EXERCISES[topic.id] || OFFLINE_FALLBACK_EXERCISES[`${levelKey}-structure-conte`] || {
    statut: "[GENERATION_EXERCICE]",
    contenu_pedagogique: `### Défi interactif : ${topic.title} 🌟\n\nNous préparons votre exercice personnalisé !\n\nEn attendant, révisons la règle :\n> **${topic.keyRule}**\n\nQue signifie ce concept pour vous ? Écrivez une phrase d'exemple pour obtenir votre feedback !`,
    rappel_cours: topic.keyRule,
    correctAnswers: []
   };
   setExerciseText(fallback.contenu_pedagogique);
   setReminderText(fallback.rappel_cours);
  } finally {
   setExerciseLoading(false);
  }
 };

 const handleLessonSelect = (topic: LessonTopic, autoGenerate: boolean) => {
  setSelectedTopic(topic);
  if (autoGenerate) {
   generateExercise(topic);
   // Smooth scroll to exercise block
   const element = document.getElementById("exercise-focus-card");
   if (element) {
    element.scrollIntoView({ behavior: "smooth" });
   }
  } else {
   // Just show default reminder and chat prompt
   setReminderText(topic.keyRule);
   setFeedback(null);
   setExerciseText(`### Fiche de révision : ${topic.title} 📖\n\n**Niveau scolaire :** ${topic.level} • **Catégorie :** ${topic.category}\n\n**Explication rapide :**\n${topic.description}\n\n> **Règle capitale :** ${topic.keyRule}\n\n*Cliquez sur le bouton "Créer un défi" ci-dessous pour vous exercer !*`);
  }
 };

 
const handleExamTraining = (item: ExamCorpusItem) => {
  const examTopic: LessonTopic = {
    id: item.id,
    title: item.titre,
    level: item.niveau,
    category:
      item.competence === "production_ecrite"
        ? "Écrit/Correspondance"
        : item.competence === "langue"
          ? "Langue"
          : "Lecture/Genre",
    description: item.theme,
    defaultPrompt: item.consigne,
    keyRule: item.objectifsPedagogiques[0] || item.theme
  };

  const questionsMarkdown = item.questions
    .map((question, index) => {
      const criteres = question.criteresCorrection
        .map((critere) => `- ${critere}`)
        .join("\n");

      return `### Question ${index + 1} — ${question.bareme} points\n\n${question.enonce}\n\n**Critères de correction :**\n${criteres}`;
    })
    .join("\n\n---\n\n");

  const correctionReference = item.questions
    .map((question, index) => {
      const criteres = question.criteresCorrection
        .map((critere) => `- ${critere}`)
        .join("\\n");

      return `Question ${index + 1} — ${question.bareme} points\\nRéponse modèle : ${question.reponseModele}\\nCritères :\\n${criteres}`;
    })
    .join("\\n\\n");

  const texteSupport = item.texteSupport
    ? `\n\n## Texte support\n\n${item.texteSupport}\n`
    : "";

  setSelectedTopic(examTopic);
  setStudentAnswer("");
  setCorrectionContextText("");
  setFeedback(null);
  setIsOfflineFallbackMode(false);
  setExerciseSessionStreak(0);
  setCorrectionContextText(correctionReference);

  setExerciseText(
    `# ${item.titre}\n\n**Niveau :** ${item.niveau}\n\n**Type :** ${item.typeEvaluation.replaceAll("_", " ")}\n\n**Thème :** ${item.theme}\n\n**Barème total :** ${item.baremeTotal} points\n${texteSupport}\n\n## Consigne\n\n${item.consigne}\n\n${questionsMarkdown}\n\n## Réponse attendue\n\nRédigez votre réponse dans la zone de réponse, puis cliquez sur **Valider ma réponse**.`
  );

  setReminderText(
    `Mode examen : lisez attentivement le sujet, répondez avec des phrases complètes et respecte le barème de ${item.baremeTotal} points.`
  );

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const submitAnswer = async () => {
  if (!studentAnswer.trim()) return;

  const exerciseForCorrection = correctionContextText
    ? `${exerciseText}\n\n## Référence interne de correction\n${correctionContextText}`
    : exerciseText;
  setSubmitting(true);
  setFeedback(null);

  const prunedAnswer = studentAnswer.trim().toLowerCase();

  try {
   const res = await fetch("/api/pedagogie/evaluer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     niveau: selectedTopic.level,
     theme: selectedTopic.title,
     exercice_consigne: exerciseForCorrection,
     reponse_eleve: studentAnswer
    })
   });

   if (!res.ok) {
    throw new Error("Erreur de correction en direct");
   }

   const data = await res.json();
   const correctionStatus = data.statut || "[CORRECTION_FAUSSE]";
   const correctionContent =
    data.contenu_pedagogique || "Désolé, essaie encore d'analyser la règle linguistique !";

   setFeedback({
    statut: correctionStatus,
    contenu: correctionContent
   });
   setIsOfflineFallbackMode(!!data.offlineFallback);

   if (currentUser) {
    const savedHistory = await saveStudentAnswer({
     user_id: currentUser.uid,
     user_email: currentUser.email,
     niveau: selectedTopic.level,
     theme: selectedTopic.title,
     exercice_consigne: exerciseText,
     reponse_eleve: studentAnswer,
     statut: correctionStatus,
     contenu_pedagogique: correctionContent,
     rappel_cours: data.rappel_cours || reminderText
    });

    if (!savedHistory.ok) {
     console.info("Historique Supabase non enregistré:", savedHistory.error);
    }
   }

   if (correctionStatus === "[CORRECTION_JUSTE]") {
    updateSuccessStats();
   } else {
    setExerciseSessionStreak(0);
   }
  } catch (err) {
   // Fallback offline correction
   console.info("Correction locale active.");
   setIsOfflineFallbackMode(true);
   const fallbackData = OFFLINE_FALLBACK_EXERCISES[selectedTopic.id];
   const match = fallbackData?.correctAnswers?.some(ans => prunedAnswer.includes(ans)) 
    || prunedAnswer.length > 3 && (prunedAnswer.includes("didascalie") || prunedAnswer.includes("obtiendrait") || prunedAnswer.includes("une fois"));

   if (match) {
    setFeedback({
     statut: "[CORRECTION_JUSTE]",
     contenu: `### Excellent travail ! 🎉\n\nC'est la réponse exacte. Vous maîtrisez parfaitement l'exercice sur **${selectedTopic.title}** !`
    });
    updateSuccessStats();
   } else {
    setFeedback({
     statut: "[CORRECTION_FAUSSE]",
     contenu: `### Oups, regarde de plus près ! 💡\n\nVotre réponse **"${studentAnswer}"** n'est pas tout à fait correcte.\n\n*Indices :* Relis bien la leçon. Ne baissez pas les bras, Youssef / Amina ! Essayez d'identifier le marqueur précis.`
    });
    setExerciseSessionStreak(0);
   }
  } finally {
   setSubmitting(false);
  }
 };

 const updateSuccessStats = () => {
  let earnedPerfectStreak = false;
  setExerciseSessionStreak(prev => {
   const nextStreak = prev + 1;
   if (nextStreak === 3) {
    earnedPerfectStreak = true;
   }
   return nextStreak;
  });

  const praiseList = [
   "Tbarkellah 'alik ! ✨ Quelle perspicacité !",
   "Excellent travail ! L'Académie régionale sera fière de votre réussite ! 🏆",
   "Mumtaz ! Vous avez résolu le défi comme un vrai champion ! 🌟",
   "Formidable ! Vous avez trouvé la bonne formulation d'accord ! 🎉",
   "Magnifique réponse ! En route vers la mention d'Excellence ! 📚"
  ];
  
  // We set a custom grand celebration on 3-streak
  setTimeout(() => {
   if (earnedPerfectStreak) {
    setCelebrationPraise("SÉRIE DE 3 MAÎTRISÉE ! 👑 Vous avez obtenu le Titre d'Élite Régionale ! 🌟🇲🇦");
   } else {
    setCelebrationPraise(praiseList[Math.floor(Math.random() * praiseList.length)]);
   }
  }, 10);

  setShowCelebration(true);
  setTimeout(() => {
   setShowCelebration(false);
  }, 5500);

  setStats(prev => {
   const currentSolvedCount = prev.solvedCount[selectedTopic.id] || 0;
   const alreadySolvedThisTopic = currentSolvedCount > 0;
   
   const newSolvedCount = {
    ...prev.solvedCount,
    [selectedTopic.id]: currentSolvedCount + 1
   };

   const newLevelCount = { ...prev.levelCount };
   if (!alreadySolvedThisTopic) {
    newLevelCount[selectedTopic.level] = (newLevelCount[selectedTopic.level] || 0) + 1;
   }

   return {
    ...prev,
    solvedCount: newSolvedCount,
    levelCount: newLevelCount,
    totalCorrect: prev.totalCorrect + 1,
    streak: prev.streak + (Math.random() > 0.7 ? 1 : 0) // Fun progression
   };
  });
 };

 // Ask AI Chat trigger
 const sendChatMessage = async (presetText?: string) => {
  const textToSend = presetText || userQuery;
  if (!textToSend.trim()) return;

  const newMessages = [
   ...chatMessages,
   { role: "user" as const, content: textToSend }
  ];

  setChatMessages(newMessages);
  setUserQuery("");
  setChatLoading(true);

  try {
   const res = await fetch("/api/pedagogie/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     niveau: selectedTopic.level,
     messages: newMessages
    })
   });

   if (!res.ok) {
    throw new Error("Chat indisponible");
   }

   const data = await res.json();
   setChatMessages(prev => [
    ...prev,
    { role: "model", content: data.contenu_pedagogique || "Je suis là pour vous aider." }
   ]);
   if (data.rappel_cours) {
    setReminderText(data.rappel_cours);
   }
   setIsOfflineFallbackMode(!!data.offlineFallback);
  } catch {
   // offline friendly tutor response
   setIsOfflineFallbackMode(true);
   setTimeout(() => {
    setChatMessages(prev => [
     ...prev,
     { 
      role: "model", 
      content: `### Analyse de "PR Molière" 💡\n\nVous m'avez posé une question sur **${selectedTopic.title}** (${selectedTopic.level}).\n\nRetenez cette formule essentielle :\n> **${selectedTopic.keyRule}**\n\nAvez-vous un exemple pratique que vous aimeriez que l'on vérifie ensemble ?` 
     }
    ]);
   }, 605);
  } finally {
   setChatLoading(false);
  }
 };

 const askForHint = () => {
  const preset = `Pouvez-vous me donner un petit indice grammatical ou sémantique pour résoudre le défi sur "${selectedTopic.title}" ?`;
  sendChatMessage(preset);
  // Focus the chat card
  const chatEl = document.getElementById("chat-sandbox");
  if (chatEl) {
   chatEl.scrollIntoView({ behavior: "smooth" });
  }
 };

 const handleResetStats = () => {
  setStats(DEFAULT_STATS);
  localStorage.removeItem("prof_ami_stats_v1");
 };

 return (
  <div id="pr-moliere-root" className="min-h-screen bg-[#F8F7F3] text-[#2D2D2D] font-sans flex flex-col antialiased">
   
   {/* Floating Sparkling Celebration */}
   {showCelebration && (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] animate-fade-in w-[90%] max-w-md bg-white border-2 border-[#1D4ED8] rounded-3xl p-4 shadow-xl flex items-center gap-3.5">
     <div className="bg-[#1D4ED8]/15 text-[#1D4ED8] p-2.5 rounded-2xl shrink-0 animate-sparkle">
      <Sparkles className="w-5 h-5" />
     </div>
     <div className="flex-1">
      <h4 className="font-serif font-black text-sm text-[#1D4ED8] tracking-tight">{celebrationPraise}</h4>
      <p className="text-[10px] text-[#64748B] font-bold">Réponse enregistrée avec succès. Votre progression est mise à jour. ✨</p>
     </div>
     {/* Floating visual circles for celebration */}
     <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
     <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce"></div>
    </div>
   )}
   
   {/* Upper Brand Ribbons & Student Welcome */}
   <header id="welcome-ribbon" className="bg-white border-b border-[#D9E2EC] sticky top-0 z-50 shadow-xs">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
     
     {/* Logo */}
     <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#1D4ED8] rounded-xl flex items-center justify-center text-white font-serif font-black text-xl shadow-xs">
       M
      </div>
      <div>
       <h1 className="font-extrabold text-xl tracking-tight text-[#1D4ED8] flex items-center gap-1.5 font-serif uppercase">
        PR Molière
       </h1>
      </div>
     </div>

     {/* Student Profile & Quick Level Stats Badge */}
     <span className="hidden sm:inline-block w-px h-6 bg-[#D9E2EC]"></span>

     <div className="flex items-center gap-3.5 flex-wrap justify-center">
      <div className="flex items-center gap-2 bg-[#F8FAFC]/60 px-4 py-2 rounded-2xl border border-[#D9E2EC]/60">
       <span className="text-orange-500 font-bold animate-bounce block">🔥</span>
       <span className="text-xs font-black text-[#334155]">
        {stats.streak} jour{stats.streak > 1 ? 's' : ''} de révision !
       </span>
      </div>

      {authLoading ? (
       <div className="bg-[#FFFFFF] px-3.5 py-1.5 rounded-2xl border border-dashed border-[#D9E2EC] text-xs font-bold text-[#64748B] animate-pulse">
        Synchronisation...
       </div>
      ) : currentUser ? (
       <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-2xl border border-emerald-100">
         {currentUser.photoURL ? (
          <img 
           src={currentUser.photoURL} 
           alt="Student" 
           className="w-5 h-5 rounded-full object-cover" 
           referrerPolicy="no-referrer"
          />
         ) : (
          <span className="relative flex h-2 w-2">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D4ED8] opacity-75"></span>
           <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D4ED8]"></span>
          </span>
         )}
         <span className="text-xs font-extrabold text-[#1D4ED8]">
          {currentUser.displayName || currentUser.email || "élève"} (Soutenu) ✨
         </span>
        </div>
        <button
         onClick={handleGoogleLogout}
         title="Se déconnecter"
         className="p-2 text-[#64748B] hover:text-[#CA3E3E] hover:bg-rose-50 rounded-xl transition border border-transparent hover:border-rose-100"
        >
         <LogOut className="w-4 h-4" />
        </button>
       </div>
      ) : (
       <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-2xl border border-[#1D4ED8] text-xs font-black shadow-xs transition"
       >
        <LogIn className="w-4 h-4" />
        <span>Connexion Google</span>
       </button>
      )}
     </div>

    </div>
   </header>

   {/* Hero Banner Area */}
   <section id="hero-banner" className="bg-[#1D4ED8] text-white py-8 px-4 sm:px-6 lg:px-8 shadow-inner relative overflow-hidden">
    {/* Abstract shapes reminiscent of Moroccan geometry */}
    <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
     <div className="w-96 h-96 rounded-full border-8 border-white"></div>
    </div>
    <div className="absolute left-1/4 bottom-0 opacity-5 pointer-events-none">
     <div className="w-64 h-64 rotate-45 border-4 border-dashed border-white"></div>
    </div>

    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
     <div>
      <div className="flex items-center gap-2 mb-2">
       <span className="bg-emerald-800 text-emerald-100 text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full border border-emerald-700/50">
        Soutien scolaire
       </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#F8F7F3]">
       Atteignez votre excellence en français
      </h2>
      <p className="text-sm text-emerald-100/90 max-w-xl leading-relaxed mt-1 font-medium">
       Préparez sereinement vos examens de passage et l'épreuve du brevet régional (3AC) avec les contes marocains, le journal scolaire et les règles de grammaire par l'IA.
      </p>
     </div>

     <div className="flex gap-2">
      <button 
       onClick={() => {
        const randomLesson = LESSONS[Math.floor(Math.random() * LESSONS.length)];
        generateExercise(randomLesson);
       }}
       className="bg-white hover:bg-[#F8FAFC] text-[#1D4ED8] font-black text-xs px-4 py-3 rounded-2xl shadow-md transition flex items-center gap-2"
      >
       <Sparkles className="w-4 h-4" />
       <span>Générer un défi au hasard</span>
      </button>
     </div>
    </div>
   </section>

   {/* Main Bento Grid Container */}
   <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
    
    {isOfflineFallbackMode && (
     <div className="bg-amber-50/90 border-2 border-amber-200/90 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in hover:shadow-md transition">
      <div className="flex items-center gap-4">
       <div className="bg-amber-100 text-amber-900 w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center font-bold border border-amber-200 text-xl shadow-inner">
        🛡️
       </div>
       <div>
        <h4 className="text-sm font-black text-amber-950 tracking-tight flex items-center gap-2">
         <span>Mode Résilience Pédagogique Activé (Secours Local)</span>
         <span className="bg-amber-200/60 text-amber-900 text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Actif</span>
        </h4>
        <p className="text-xs text-amber-800 font-semibold leading-relaxed mt-1">
         Les serveurs d'service d'IA connaissent actuellement une très forte affluence (Erreur 503). PR Molière a automatiquement activé sa bibliothèque d'exercices et de corrections locales de secours conformes au programme officiel pour vous assurer un soutien fluide, continu et instantané !
        </p>
       </div>
      </div>
      <div className="flex items-center gap-2">
       <span className="text-[10px] bg-amber-500/10 text-amber-800 font-extrabold border border-amber-300 px-3 py-1.5 rounded-xl uppercase tracking-wider block whitespace-nowrap text-center">
        Réussite Continue 🎓
       </span>
      </div>
     </div>
    )}

    {/* The Bento Layout */}
    <div className="grid grid-cols-12 gap-6 items-start">
     
     {/* Box 1: Focus Exercise Unit (col-span-12 lg:col-span-8) */}
     <div 
      id="exercise-focus-card" 
      className="col-span-12 lg:col-span-8 bg-white rounded-3xl border-2 border-[#D9E2EC] p-6 sm:p-8 shadow-sm flex flex-col hover:border-[#2563EB]/40 transition-colors"
     >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F8FAFC]">
       <div>
        <div className="flex items-center gap-2 flex-wrap">
         <span className="px-3 py-1 bg-[#1D4ED8]/15 text-[#1D4ED8] text-[10px] font-black rounded-lg uppercase tracking-wider border border-[#1D4ED8]/10">
          DÉFI ACTIF • {selectedTopic.level}
         </span>
         
         {/* Dynamic mini session scorecard */}
         <div className="flex items-center gap-1 bg-[#F8FAFC]/80 px-2.5 py-0.5 rounded-lg border border-[#D9E2EC] text-[9px] font-bold text-[#334155]">
          <span>Série de défis :</span>
          <span className="text-[#1D4ED8] font-black">{exerciseSessionStreak}/3</span>
          <span className="text-amber-500">
           {exerciseSessionStreak === 1 ? "⭐️" : exerciseSessionStreak === 2 ? "⭐️⭐️" : exerciseSessionStreak >= 3 ? "👑 PERFECT" : "▫️"}
          </span>
         </div>
        </div>
        <h3 className="text-lg font-serif font-black text-[#1A1A1A] tracking-tight mt-1">
         {selectedTopic.title}
        </h3>
       </div>
       <div className="flex items-center gap-2">
        <button
         onClick={() => speakFrenchText(exerciseText)}
         className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border transition cursor-pointer select-none ${
          isSpeaking 
           ? "bg-rose-50 border-rose-200 text-rose-700 animate-pulse" 
           : "bg-[#1D4ED8]/10 hover:bg-[#1D4ED8]/15 text-[#1D4ED8] border-[#1D4ED8]/20"
         }`}
         title={isSpeaking ? "Arrêter la voix" : "Écouter l'énoncé à voix haute pour améliorer votre prononciation"}
        >
         {isSpeaking ? <VolumeX className="w-3.5 h-3.5 hover:scale-110" /> : <Volume2 className="w-3.5 h-3.5" />}
         <span>{isSpeaking ? "Arrêter" : "Prononciation"}</span>
        </button>
        <span className="text-xs text-[#64748B] font-mono select-all hidden sm:inline">
         {selectedTopic.id}
        </span>
       </div>
      </div>

      {/* Exercise contents with loader */}
      <div className="flex-1 min-h-[160px] relative">
       {exerciseLoading ? (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-10 p-6 text-center">
         <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin mb-4" />
         <p className="text-sm font-bold text-[#334155]">Analyse du programme officiel marocain...</p>
         <p className="text-xs text-[#64748B] mt-1">Génération en cours...</p>
        </div>
       ) : null}

       {/* Pedatogial Text content */}
       <div className="bg-[#FFFFFF] p-5 sm:p-7 rounded-2xl border-l-4 border-[#2563EB] border-y border-r border-[#D9E2EC]/60 mb-6 font-serif">
        {exerciseText ? (
         renderMarkdown(exerciseText)
        ) : (
         <div className="text-[#64748B] italic text-center py-4">
          Aucun défi sélectionné. Choisissez une fiche de révision ci-dessous !
         </div>
        )}
       </div>
      </div>

      {/* Answer Input Frame */}
      <div className="space-y-4">
       <div>
        <label className="block text-xs font-extrabold text-[#64748B] uppercase tracking-wide mb-1.5">
         Votre réponse d'élève :
        </label>
        <input 
         type="text" 
         value={studentAnswer}
         onChange={(e) => setStudentAnswer(e.target.value)}
         placeholder="Écrivez soigneusement votre réponse ici (ex: 'obtiendrait', 'les didascalies')..." 
         className="w-full p-4 rounded-xl border-2 border-[#D9E2EC] focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] outline-none text-base transition-colors placeholder-gray-400 font-medium"
         onKeyDown={(e) => {
          if (e.key === "Enter") submitAnswer();
         }}
        />
       </div>

       {/* Action Buttons */}
       <div className="flex flex-col sm:flex-row gap-3">
        <button 
         onClick={submitAnswer}
         disabled={submitting || !studentAnswer.trim()}
         className={`flex-1 flex items-center justify-center gap-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-950/10 transition disabled:opacity-40`}
        >
         {submitting ? (
          <>
           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
           <span>Correction en cours...</span>
          </>
         ) : (
          <>
           <CheckCircle className="w-4 h-4" />
           <span>Valider ma réponse</span>
          </>
         )}
        </button>
        <button 
         onClick={askForHint}
         className="px-5 py-3.5 border border-[#D9E2EC] hover:border-[#64748B] rounded-xl font-bold text-xs text-[#64748B] bg-[#FFFFFF] hover:bg-neutral-50 transition flex items-center justify-center gap-2"
        >
         <Lightbulb className="w-4 h-4 text-[#2563EB]" />
         <span>Besoin d'un indice ?</span>
        </button>
       </div>
      </div>

      {/* Dynamic Results Banner */}
      {feedback && (
       <div 
        id="correction-feedback"
        className={`mt-6 p-5 rounded-2xl border transition-all duration-300 ${
         feedback.statut === "[CORRECTION_JUSTE]"
          ? "bg-emerald-50 border-emerald-200 text-emerald-950"
          : "bg-orange-50 border-orange-200 text-orange-950"
        }`}
       >
        <div className="flex items-start gap-3">
         <div className="mt-0.5">
          {feedback.statut === "[CORRECTION_JUSTE]" ? (
           <CheckCircle className="w-6 h-6 text-emerald-600 block shrink-0" />
          ) : (
           <XCircle className="w-6 h-6 text-orange-600 block shrink-0" />
          )}
         </div>
         <div className="flex-1">
          <span className="text-xs font-black tracking-widest uppercase block mb-1 opacity-70">
           {feedback.statut === "[CORRECTION_JUSTE]" ? "✨ RÉPONSE CORRECTE" : "💡 BESOIN D'AIDE ! CONSEIL SÉMANTIQUE"}
          </span>
          <div className="text-sm font-medium leading-relaxed font-serif">
           {renderMarkdown(feedback.contenu)}
          </div>
         </div>
        </div>
       </div>
      )}
     </div>

     {/* Box 2: Course Sticky Note (col-span-12 lg:col-span-4) */}
     <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
      
      {/* Cours Memorization Slate */}
      <div 
       id="course-reminder-slate" 
       className="bg-[#F8FAFC] rounded-3xl p-6 border-2 border-[#D9E2EC] shadow-sm relative overflow-hidden shrink-0 flex flex-col justify-between min-h-[220px]"
      >
       {/* Pattern detail reminiscent of architecture */}
       <div className="absolute top-0 right-0 w-12 h-12 bg-[#1D4ED8]/5 rounded-bl-full pointer-events-none"></div>

       <div>
        <div className="flex items-center gap-2 mb-3">
         <Lightbulb className="w-5 h-5 text-[#2563EB] shrink-0" />
         <p className="text-xs font-black text-[#64748B] uppercase tracking-wider">
          Rappel de cours en direct
         </p>
        </div>
        
        <h4 className="text-[#1A1A1A] font-serif font-extrabold italic text-sm mb-2 leading-snug">
         Pour surmonter ce thème :
        </h4>
        
        <p className="text-sm font-sans leading-relaxed text-[#334155] font-semibold">
         {reminderText || selectedTopic.keyRule}
        </p>
       </div>

       <div className="border-t border-[#D9E2EC] pt-4 mt-4 flex items-center justify-between">
        <span className="text-[10px] text-[#64748B] font-bold">Règle officielle {selectedTopic.level}</span>
        <span className="text-[10px] bg-white text-[#1D4ED8] px-2 py-0.5 rounded-md font-extrabold border border-[#D9E2EC]">
         {selectedTopic.category}
        </span>
       </div>
      </div>

      {/* Quick Helper Moroccan Fact */}
      <div className="bg-white rounded-3xl p-5 border-2 border-[#D9E2EC] shadow-xs shrink-0">
       <h4 className="text-xs font-black text-[#1D4ED8] uppercase tracking-wider mb-2 flex items-center gap-2">
        <GraduationCap className="w-4 h-4" />
        <span>Conseils pour l'examen Régional</span>
       </h4>
       <p className="text-xs leading-relaxed text-[#334155] font-medium">
        Pour l'examen régional du brevet (3AC), ne négligez pas les **formules de politesse** des lettres administratives et la concordance des temps de l'**hypothèse** ! C'est ce qui fait la différence.
       </p>
      </div>

      {/* Stats Overview */}
      <div className="bg-[#1D4ED8] text-white rounded-3xl p-5 shadow-sm flex flex-col justify-between shrink-0">
       <div className="flex justify-between items-start">
        <p className="text-xs font-black uppercase tracking-widest text-[#F8FAFC]/80">Niveau de maîtrise</p>
        <span className="text-lg bg-green-900/30 px-2.5 py-0.5 rounded-full border border-green-700 text-xs font-bold">Score total</span>
       </div>
       <div className="my-3">
        <h4 className="text-3xl font-serif font-black">{Math.min(100, (stats.totalCorrect * 15))} %</h4>
        <p className="text-xs opacity-85 mt-0.5">Plus vous résolvez des défis distincts, plus votre jauge grimpe !</p>
       </div>
       <div className="w-full bg-white/20 h-2.5 rounded-full mt-2 overflow-hidden">
        <div 
         className="bg-[#2563EB] h-full rounded-full transition-all duration-700" 
         style={{ width: `${Math.min(100, Math.max(10, (stats.totalCorrect * 15)))}%` }}
        ></div>
       </div>
      </div>

     </div>

     {/* Box 3: Ask PR_Molière / Sandbox Chat (col-span-12 lg:col-span-7) */}
     <div 
      id="chat-sandbox" 
      className="col-span-12 lg:col-span-7 bg-white rounded-3xl border-2 border-[#D9E2EC] p-6 shadow-sm flex flex-col"
     >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F8FAFC]">
       <div className="flex items-center gap-3">
        <div className="bg-amber-100 text-amber-900 p-2 rounded-xl">
         <MessageSquare className="w-5 h-5 text-amber-700" />
        </div>
        <div>
         <h4 className="text-sm font-black text-[#1A1A1A] tracking-tight">Discussion interactive avec le tuteur</h4>
         <p className="text-xs text-[#64748B] font-bold">Posez vos questions, demandez des exemples ou une aide ciblée</p>
        </div>
       </div>
      </div>

      {/* Chat messages viewport */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 p-2 bg-[#FFFFFF] rounded-2xl border border-[#D9E2EC]/40">
       {chatMessages.map((msg, index) => (
        <div 
         key={index} 
         className={`flex gap-2 items-start max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
        >
         <div className={`p-2.5 rounded-2xl text-xs leading-relaxed ${
          msg.role === "user" 
           ? "bg-[#1D4ED8] text-white rounded-tr-xs" 
           : "bg-[#F8FAFC] text-[#2D2D2D] rounded-tl-xs border border-[#D9E2EC]/60"
         }`}>
          {msg.role === "model" ? (
           <div className="font-serif prose">
            {renderMarkdown(msg.content)}
           </div>
          ) : (
           <p className="font-semibold">{msg.content}</p>
          )}
         </div>
        </div>
       ))}
       
       {chatLoading && (
        <div className="mr-auto max-w-[85%] flex items-center gap-2 p-2 bg-[#F8FAFC] rounded-2xl">
         <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce"></span>
         <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
         <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
         <span className="text-[10px] text-amber-900 font-bold ml-1">PR Molière réfléchit...</span>
        </div>
       )}
      </div>

      {/* Quick replies */}
      <div className="flex flex-wrap gap-2 mb-4">
       <span className="text-[10px] text-[#64748B] font-black uppercase tracking-wider block w-full">Questions rapides :</span>
       {[
        "Explique l'imparfait et le passé simple",
        "Donne un exemple de lettre d'invitation",
        "Qu'est-ce qu'une didascalie ?",
        "Enseigne la concordance après 'SI'"
       ].map((chip) => (
        <button
         key={chip}
         onClick={() => sendChatMessage(chip)}
         disabled={chatLoading}
         className="text-[11px] bg-[#F8FAFC]/60 hover:bg-[#F8FAFC] text-[#334155] border border-[#D9E2EC] px-2.5 py-1.5 rounded-xl font-bold transition duration-200"
        >
         {chip}
        </button>
       ))}
      </div>

      {/* Input field */}
      <div className="flex gap-2">
       <input 
        type="text" 
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        placeholder="Posez votre question en français..." 
        disabled={chatLoading}
        className="flex-1 text-xs px-4 py-3 bg-white text-[#2D2D2D] border-2 border-[#D9E2EC] focus:border-[#1D4ED8] outline-none rounded-xl font-medium"
        onKeyDown={(e) => {
         if (e.key === "Enter") sendChatMessage();
        }}
       />
       <button 
        onClick={() => sendChatMessage()}
        disabled={chatLoading || !userQuery.trim()}
        className="bg-[#1D4ED8] text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-[#1E40AF] transition disabled:opacity-40 shrink-0"
       >
        Envoyer
       </button>
      </div>
     </div>

     {/* Box 4: Palmarès & Badges widget (col-span-12 lg:col-span-5) */}
     <div className="col-span-12 lg:col-span-5 space-y-4">
      <div className="flex bg-[#F8FAFC]/60 p-1 rounded-3xl border border-[#D9E2EC] shadow-xs gap-0.5">
       <button
        onClick={() => setActiveRightTab("BADGES")}
        className={`flex-1 py-2 rounded-2xl text-[10px] font-black transition-all flex items-center justify-center gap-1 ${
         activeRightTab === "BADGES"
          ? "bg-[#1D4ED8] text-white shadow-md"
          : "text-[#334155] hover:bg-white/40 hover:text-[#1D4ED8]"
        }`}
       >
        <span>🏆 Palmarès</span>
       </button>
       <button
        onClick={() => setActiveRightTab("HISTORY")}
        className={`flex-1 py-2 rounded-2xl text-[10px] font-black transition-all flex items-center justify-center gap-1 ${
         activeRightTab === "HISTORY"
          ? "bg-[#1D4ED8] text-white shadow-md"
          : "text-[#334155] hover:bg-white/40 hover:text-[#1D4ED8]"
        }`}
       >
        <Clock className="w-3 h-3" />
        <span>Historique</span>
       </button>
       <button
        onClick={() => setActiveRightTab("EXAMS")}
        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs transition ${
         activeRightTab === "EXAMS"
          ? "bg-[#1D4ED8] text-white"
          : "bg-[#F8FAFC] text-[#111111] hover:bg-[#D9E2EC]"
        }`}
       >
        <BookOpen className="w-4 h-4" />
        <span>Examens</span>
       </button>
       <button
        onClick={() => setActiveRightTab("LEXICON")}
        className={`flex-1 py-2 rounded-2xl text-[10px] font-black transition-all flex items-center justify-center gap-1 ${
         activeRightTab === "LEXICON"
          ? "bg-[#1D4ED8] text-white shadow-md"
          : "text-[#334155] hover:bg-white/40 hover:text-[#1D4ED8]"
        }`}
       >
        <span>✍️ Lexique</span>
       </button>
       <button
        onClick={() => setActiveRightTab("BREVET")}
        className={`flex-1 py-2 rounded-2xl text-[10px] font-black transition-all flex items-center justify-center gap-1 ${
         activeRightTab === "BREVET"
          ? "bg-[#1D4ED8] text-white shadow-md"
          : "text-[#334155] hover:bg-white/40 hover:text-[#1D4ED8]"
        }`}
       >
        <span>🎯 Brevet 3AC</span>
       </button>
      </div>

      {activeRightTab === "BADGES" ? (
       <ProgressPanel stats={stats} onResetStats={handleResetStats} />
      ) : activeRightTab === "HISTORY" ? (
       <StudentHistoryPanel userId={currentUser?.uid} />
      ) : activeRightTab === "EXAMS" ? (
       <ExamCorpusPanel onStartTraining={handleExamTraining} />
      ) : activeRightTab === "LEXICON" ? (
       <SuccessLexicon 
        bookmarkedWordIds={bookmarkedWordIds}
        onToggleBookmark={(id) => {
         setBookmarkedWordIds(prev => 
          prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
         );
        }}
       />
      ) : (
       <BrevetTracker totalCorrect={stats.totalCorrect} />
      )}
     </div>

     {/* Section: Fiches de Révision / Course Catalogue (col-span-12) */}
     <div className="col-span-12 border-t-2 border-[#D9E2EC] pt-8 mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
       <div>
        <h3 className="text-xl font-serif font-black text-[#1A1A1A] tracking-tight">
         Bibliothèque des Modules & Fiches de Révision
        </h3>
        <p className="text-xs text-[#64748B] font-semibold">
         Cliquez sur "Créer un défi" pour charger instantanément l'exercice ou sur "Lire la leçon" pour réviser la règle.
        </p>
       </div>
      </div>

      <LessonCard 
       onSelectTopic={handleLessonSelect} 
       selectedTopicId={selectedTopic.id}
       solvedTopicIds={stats.solvedCount}
      />
     </div>

    </div>

   </main>

   {/* Footer */}
   <footer className="bg-white border-t border-[#D9E2EC] py-8 mt-12 text-center text-xs text-[#64748B] font-medium">
    <div className="max-w-7xl mx-auto px-4 space-y-2">
     <p className="font-serif font-extrabold text-[#1D4ED8] text-sm">PR Molière, Plateforme de français du collège</p>
     <p></p>
     <p className="opacity-80">© {new Date().getFullYear()} • Fait avec passion pour la réussite des élèves.</p>
    </div>
   </footer>

  </div>
 );
}
