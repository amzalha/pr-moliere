import React, { useState, useMemo } from "react";
import { BookMarked, Search, Copy, Check, Sparkles, BookOpen, PenTool, Volume2, Star, Bookmark } from "lucide-react";

interface LexiconEntry {
  id: string;
  word: string;
  definition: string;
  category: string;
  level: "1AC" | "2AC" | "3AC" | "TOUS";
  example: string;
}

const LEXICON_DATA: LexiconEntry[] = [
  {
    id: "lex-jadis",
    word: "Jadis ou Naguère",
    definition: "Formules d'ouverture classiques désignant une époque lointaine, essentielle pour ancrer la situation stable du conte.",
    category: "Conte & Récit",
    level: "1AC",
    example: "« Jadis, un vieux conteur se réunissait avec les villageois sous le grand arganier de Taroudant. »"
  },
  {
    id: "lex-stabilite",
    word: "Situation stable",
    definition: "L'état d'équilibre initial au tout début du récit où les actions n'ont pas encore commencé.",
    category: "Structure narrative",
    level: "1AC",
    example: "« Au début du conte, la famille vivait sereinement dans une oasis tranquille du Tafilalet. »"
  },
  {
    id: "lex-emerite",
    word: "Émérite (artisan)",
    definition: "Qui a acquis une grande maîtrise dans son art ou métier grâce à une longue expérience.",
    category: "Portrait & Description",
    level: "1AC",
    example: "« Le maâlem d'orfévrerie à Fès était un artisan émérite estimé de tous ses pairs. »"
  },
  {
    id: "lex-subit",
    word: "Soudainement / Tout à coup",
    definition: "Adverbes de temps marquant l'imprévu, servant à rompre l'équilibre et introduire l'élément modificateur dans le schéma narratif.",
    category: "Indicateurs temporels",
    level: "1AC",
    example: "« Soudainement, un vent impétueux s'éleva de l'Atlantique et bouscula les barques à Essaouira. »"
  },
  {
    id: "lex-didascalie",
    word: "La Didascalie",
    definition: "Instruction écrite par l'auteur dramatique donnant des consignes d'intonation, de gestuelle ou d'ambiance.",
    category: "Lexique Théâtral",
    level: "2AC",
    example: "« MEHDI (d'un ton hésitant mais respectueux, regardant son maître tisserand) : Puis-je vous aider ? »"
  },
  {
    id: "lex-manchette",
    word: "La manchette",
    definition: "La partie supérieure de la Une d'un journal où s'inscrit le scoop principal en très gros caractères.",
    category: "Presse & Média",
    level: "2AC",
    example: "« La manchette du journal de Casablanca annonçait en grand : Victoire écologique au collège ! »"
  },
  {
    id: "lex-insolite",
    word: "Insolite",
    definition: "Qui étonne par son caractère extraordinaire, inhabituel et surprenant.",
    category: "Fait Divers",
    level: "2AC",
    example: "« Un phénomène insolite s'est produit hier à la prière : une cigogne a déposé une rose d'Ifrane ! »"
  },
  {
    id: "lex-concordance",
    word: "Si + Imparfait -> Conditionnel",
    definition: "La concordance de l'hypothèse obligatoire : si la condition est à l'imparfait, le résultat est au conditionnel présent.",
    category: "Grammaire & Outils",
    level: "3AC",
    example: "« Si nous protégions les palmeraies de Ouarzazate, la désertification reculerait. »"
  },
  {
    id: "lex-concession",
    word: "Bien que (+ Subjonctif)",
    definition: "Conjonction de subordination introduisant un rapport de concession logique avec verbe conjugué au subjonctif.",
    category: "Connecteurs Logiques",
    level: "3AC",
    example: "« Bien que le vent de Tanger soit glacial ce soir, le gardien du phare continue sa ronde de nuit. »"
  },
  {
    id: "lex-politesse",
    word: "Veuillez agréer...",
    definition: "Formule de politesse officielle obligatoire à la fin de toute correspondance administrative de haut niveau.",
    category: "Lettre Administrative",
    level: "3AC",
    example: "« Veuillez agréer, Monsieur le Directeur Académique, l'expression de mes sentiments distingués. »"
  },
  {
    id: "lex-but",
    word: "Afin de (+ Infinitif)",
    definition: "Préposition de but utilisée quand le sujet de l'action principale et de la subordonnée est identique.",
    category: "Outils de Cohésion",
    level: "3AC",
    example: "« Nous économisons l'eau de l'oued oum er-rbia afin de préserver l'irrigation locale. »"
  },
  {
    id: "lex-suspect",
    word: "Indice matériel",
    definition: "Toute trace, marque, empreinte ou objet découvert sur la scène d'un crime et éclairant l'enquête.",
    category: "Nouvelle Policière",
    level: "3AC",
    example: "« L'inspecteur découvrit des empreintes de pas boueuses sur le tapis de laine fine de la villa de Rabat. »"
  }
];

interface ConjugationResult {
  imparfait: string[];
  passeSimple: string[];
  conditionnel: string[];
}

function conjugateFrenchVerb(verb: string): ConjugationResult {
  const v = verb.trim().toLowerCase();
  
  const irregulars: Record<string, ConjugationResult> = {
    etre: {
      imparfait: ["j'étais", "tu étais", "il/elle était", "nous étions", "vous étiez", "ils/elles étaient"],
      passeSimple: ["je fus", "tu fus", "il fut", "nous fûmes", "vous fûtes", "ils furent"],
      conditionnel: ["je serais", "tu serais", "il/elle serait", "nous serions", "vous seriez", "ils/elles seraient"]
    },
    être: {
      imparfait: ["j'étais", "tu étais", "il/elle était", "nous étions", "vous étiez", "ils/elles étaient"],
      passeSimple: ["je fus", "tu fus", "il fut", "nous fûmes", "vous fûtes", "ils furent"],
      conditionnel: ["je serais", "tu serais", "il/elle serait", "nous serions", "vous seriez", "ils/elles seraient"]
    },
    avoir: {
      imparfait: ["j'avais", "tu avais", "il/elle avait", "nous avions", "vous aviez", "ils/elles avaient"],
      passeSimple: ["j'eus", "tu eus", "il eut", "nous eûmes", "vous eûtes", "ils eurent"],
      conditionnel: ["j'aurais", "tu aurais", "il/elle aurait", "nous aurions", "vous auriez", "ils/elles auraient"]
    },
    faire: {
      imparfait: ["je faisais", "tu faisais", "il/elle faisait", "nous faisions", "vous faisiez", "ils/elles faisaient"],
      passeSimple: ["je fis", "tu fis", "il fit", "nous fîmes", "vous fîtes", "ils firent"],
      conditionnel: ["je ferais", "tu ferais", "il/elle ferait", "nous ferions", "vous feriez", "ils/elles feraient"]
    },
    aller: {
      imparfait: ["j'allais", "tu allais", "il/elle allait", "nous allions", "vous alliez", "ils/elles allaient"],
      passeSimple: ["j'allai", "tu allas", "il alla", "nous allâmes", "vous allâtes", "ils allèrent"],
      conditionnel: ["j'irais", "tu irais", "il/elle irait", "nous irions", "vous iriez", "ils/elles iraient"]
    },
    prendre: {
      imparfait: ["je prenais", "tu prenais", "il/elle prenait", "nous prenions", "vous preniez", "ils/elles prenaient"],
      passeSimple: ["je pris", "tu pris", "il prit", "nous prîmes", "vous prîtes", "ils prirent"],
      conditionnel: ["je prendrais", "tu prendrais", "il/elle prendrait", "nous prendrions", "vous prendriez", "ils/elles prendraient"]
    },
    pouvoir: {
      imparfait: ["je pouvais", "tu pouvais", "il/elle pouvait", "nous pouvions", "vous pouviez", "ils/elles pouvaient"],
      passeSimple: ["je pus", "tu pus", "il put", "nous pûmes", "vous pûtes", "ils purent"],
      conditionnel: ["je pourrais", "tu pourrais", "il/elle pourrait", "nous pourrions", "vous pourriez", "ils/elles pourraient"]
    },
    vouloir: {
      imparfait: ["je voulais", "tu voulais", "il/elle voulait", "nous voulions", "vous vouliez", "ils/elles voulaient"],
      passeSimple: ["je voulus", "tu voulus", "il voulut", "nous voulûmes", "vous voulûtes", "ils voulurent"],
      conditionnel: ["je voudrais", "tu voudrais", "il/elle voudrait", "nous voudrions", "vous voudriez", "ils/elles voudraient"]
    },
    devoir: {
      imparfait: ["je devais", "tu devais", "il/elle devait", "nous devions", "vous deviez", "ils/elles devaient"],
      passeSimple: ["je dus", "tu dus", "il dut", "nous dûmes", "vous dûtes", "ils durent"],
      conditionnel: ["je devrais", "tu devrais", "il/elle devrait", "nous devrions", "vous devriez", "ils/elles devraient"]
    },
    écrire: {
      imparfait: ["j'écrivais", "tu écrivais", "il/elle écrivait", "nous écrivions", "vous écriviez", "ils/elles écrivaient"],
      passeSimple: ["j'écrivis", "tu écrivis", "il écrivit", "nous écrivîmes", "vous écrivîtes", "ils écrivirent"],
      conditionnel: ["j'écrirais", "tu écrirais", "il/elle écrirait", "nous écririons", "vous écririez", "ils/elles écriraient"]
    },
    ecrire: {
      imparfait: ["j'écrivais", "tu écrivais", "il/elle écrivait", "nous écrivions", "vous écriviez", "ils/elles écrivaient"],
      passeSimple: ["j'écrivis", "tu écrivis", "il écrivit", "nous écrivîmes", "vous écrivîtes", "ils écrivirent"],
      conditionnel: ["j'écrirais", "tu écrirais", "il/elle écrirait", "nous écririons", "vous écririez", "ils/elles écriraient"]
    },
    lire: {
      imparfait: ["je lisais", "tu lisais", "il/elle lisait", "nous lisions", "vous lisiez", "ils/elles lisaient"],
      passeSimple: ["je lus", "tu lus", "il lut", "nous lûmes", "vous lûtes", "ils lurent"],
      conditionnel: ["je lirais", "tu lirais", "il/elle lirait", "nous lirions", "vous liriez", "ils/elles liraient"]
    },
    dire: {
      imparfait: ["je disais", "tu disais", "il/elle disait", "nous disions", "vous disiez", "ils/elles disaient"],
      passeSimple: ["je dis", "tu dis", "il dit", "nous dîmes", "vous dîtes", "ils dirent"],
      conditionnel: ["je dirais", "tu dirais", "il/elle dirait", "nous dirions", "vous diriez", "ils/elles diraient"]
    },
    voir: {
      imparfait: ["je voyais", "tu voyais", "il/elle voyait", "nous voyions", "vous voyiez", "ils/elles voyaient"],
      passeSimple: ["je vis", "tu vis", "il vit", "nous vîmes", "vous vîtes", "ils virent"],
      conditionnel: ["je verrais", "tu verrais", "il/elle verrait", "nous verrions", "vous verriez", "ils/elles verraient"]
    }
  };

  if (irregulars[v]) {
    return irregulars[v];
  }

  // Handle standard -er verbs (regular)
  if (v.endsWith("er")) {
    const radical = v.slice(0, -2);
    const firstChar = radical.length > 0 ? radical[0] : "";
    const isVowel = ["a", "e", "i", "o", "u", "y", "é", "è", "à", "h"].includes(firstChar);
    const je = isVowel ? "j'" : "je ";
    const impRadical = v.endsWith("ger") ? radical + "e" : radical;

    return {
      imparfait: [
        `${je}${impRadical}ais`,
        `tu ${impRadical}ais`,
        `il/elle ${impRadical}ait`,
        `nous ${radical}ions`,
        `vous ${radical}iez`,
        `ils/elles ${impRadical}aient`
      ],
      passeSimple: [
        `${je}${radical}ai`,
        `tu ${radical}as`,
        `il ${radical}a`,
        `nous ${radical}âmes`,
        `vous ${radical}âtes`,
        `ils/elles ${radical}èrent`
      ],
      conditionnel: [
        `${je}${v}ais`,
        `tu ${v}ais`,
        `il/elle ${v}ait`,
        `nous ${v}ions`,
        `vous ${v}iez`,
        `ils/elles ${v}aient`
      ]
    };
  }

  // Handle standard -ir verbs (like finir)
  if (v.endsWith("ir")) {
    const radical = v.slice(0, -2);
    const firstChar = radical.length > 0 ? radical[0] : "";
    const isVowel = ["a", "e", "i", "o", "u", "y", "é", "è", "à", "h"].includes(firstChar);
    const je = isVowel ? "j'" : "je ";

    return {
      imparfait: [
        `${je}${radical}issais`,
        `tu ${radical}issais`,
        `il/elle ${radical}issait`,
        `nous ${radical}issions`,
        `vous ${radical}issiez`,
        `ils/elles ${radical}issaient`
      ],
      passeSimple: [
        `${je}${radical}is`,
        `tu ${radical}is`,
        `il ${radical}it`,
        `nous ${radical}îmes`,
        `vous ${radical}îtes`,
        `ils/elles ${radical}irent`
      ],
      conditionnel: [
        `${je}${v}ais`,
        `tu ${v}ais`,
        `il/elle ${v}ait`,
        `nous ${v}ions`,
        `vous ${v}iez`,
        `ils/elles ${v}aient`
      ]
    };
  }

  // Pure fallback
  return {
    imparfait: ["je " + v + "ais", "tu " + v + "ais", "il " + v + "ait", "nous " + v + "ions", "vous " + v + "iez", "ils " + v + "aient"],
    passeSimple: ["je " + v + "is", "tu " + v + "is", "il " + v + "it", "nous " + v + "îmes", "vous " + v + "îtes", "ils " + v + "irent"],
    conditionnel: ["je " + v + "rais", "tu " + v + "rais", "il " + v + "rait", "nous " + v + "rions", "vous " + v + "riez", "ils " + v + "raient"]
  };
}

interface SuccessLexiconProps {
  bookmarkedWordIds?: string[];
  onToggleBookmark?: (id: string) => void;
}

export default function SuccessLexicon({ bookmarkedWordIds = [], onToggleBookmark }: SuccessLexiconProps) {
  const [activeSubTab, setActiveSubTab] = useState<"VOCAB" | "CONJ">("VOCAB");
  const [selectedLvl, setSelectedLvl] = useState<"TOUS" | "1AC" | "2AC" | "3AC" | "FAVORIS">("TOUS");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Conjugator States
  const [conjugateInput, setConjugateInput] = useState("finir");

  const speakFrenchText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const copiedNotification = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = useMemo(() => {
    return LEXICON_DATA.filter(entry => {
      const matchLvl = selectedLvl === "TOUS" 
        || (selectedLvl === "FAVORIS" ? bookmarkedWordIds.includes(entry.id) : entry.level === selectedLvl);
      const matchText = 
        entry.word.toLowerCase().includes(search.toLowerCase()) ||
        entry.definition.toLowerCase().includes(search.toLowerCase()) ||
        entry.category.toLowerCase().includes(search.toLowerCase());
      return matchLvl && matchText;
    });
  }, [selectedLvl, search, bookmarkedWordIds]);

  const conjugated = useMemo(() => {
    return conjugateFrenchVerb(conjugateInput);
  }, [conjugateInput]);

  return (
    <div id="success-lexicon-widget" className="bg-white rounded-3xl border-2 border-[#E5E1D8] p-5 shadow-sm transition-all">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-[#F2EDE4] pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#006233]/10 text-[#006233] p-2 rounded-xl">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-serif font-black text-[#1A1A1A]">Le Kit d'Excellence ✍️</h2>
            <p className="text-[11px] text-[#7A7468] font-bold">Lexique officiel & Conjugateur de secours</p>
          </div>
        </div>
      </div>

      {/* Primary Sub-Tabs Switcher */}
      <div className="flex bg-[#F2EDE4]/40 p-1 rounded-2xl border border-[#E5E1D8]/50 mb-3.5">
        <button
          onClick={() => setActiveSubTab("VOCAB")}
          className={`flex-1 flex items-center justify-center gap-1 text-[10px] py-2 rounded-xl font-bold transition ${
            activeSubTab === "VOCAB" 
              ? "bg-[#006233] text-white shadow" 
              : "text-[#4A453C] hover:bg-white/40"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Mots d'Or (Vocab)</span>
        </button>
        <button
          onClick={() => setActiveSubTab("CONJ")}
          className={`flex-1 flex items-center justify-center gap-1 text-[10px] py-2 rounded-xl font-bold transition ${
            activeSubTab === "CONJ" 
              ? "bg-[#006233] text-white shadow" 
              : "text-[#4A453C] hover:bg-white/40"
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Conjugateur ⚡</span>
        </button>
      </div>

      {activeSubTab === "VOCAB" ? (
        <>
          {/* Mini Level Switcher */}
          <div className="flex bg-[#F2EDE4]/60 p-1 rounded-xl border border-[#E5E1D8]/50 mb-3 overflow-x-auto">
            {(["TOUS", "1AC", "2AC", "3AC", "FAVORIS"] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLvl(lvl)}
                className={`flex-1 text-[9px] py-1 px-1 rounded-lg font-extrabold transition whitespace-nowrap ${
                  selectedLvl === lvl 
                    ? "bg-[#C18F5A] text-white shadow-xs" 
                    : "text-[#4A453C] hover:bg-white/40"
                }`}
              >
                {lvl === "TOUS" ? "Tous" : lvl === "FAVORIS" ? "⭐ Carnet" : lvl}
              </button>
            ))}
          </div>

          {/* Input query */}
          <div className="relative mb-3">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une formulation..."
              className="w-full text-[11px] bg-white text-[#2D2D2D] border border-[#E5E1D8] rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#006233] font-medium"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#A39E93]" />
          </div>

          {/* Grid viewport */}
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {filtered.map(entry => (
              <div 
                key={entry.id} 
                className="p-3 bg-[#FDFCFB] border border-[#E5E1D8]/60 rounded-xl hover:border-[#C18F5A]/40 transition group animate-fade-in"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => onToggleBookmark?.(entry.id)}
                      className="text-[#A39E93] hover:text-amber-500 transition cursor-pointer shrink-0"
                      title={bookmarkedWordIds.includes(entry.id) ? "Retirer des favoris" : "Ajouter au carnet de révision"}
                    >
                      <Star 
                        className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                          bookmarkedWordIds.includes(entry.id) ? "text-amber-500 fill-amber-500 scale-110" : "hover:scale-110"
                        }`} 
                      />
                    </button>
                    <span className="font-extrabold text-xs text-[#1A1A1A] truncate">{entry.word}</span>
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded shrink-0 ${
                      entry.level === "1AC" ? "bg-teal-50 text-teal-800" :
                      entry.level === "2AC" ? "bg-indigo-50 text-indigo-800" : "bg-rose-50 text-rose-800"
                    }`}>
                      {entry.level}
                    </span>
                  </div>
                  <span className="text-[8px] bg-amber-100/60 text-amber-900 border border-amber-200/50 px-1.5 py-0.5 rounded font-black tracking-wider uppercase shrink-0">
                    {entry.category}
                  </span>
                </div>

                <p className="text-[10px] text-[#7A7468] leading-relaxed mb-2 font-medium">
                  {entry.definition}
                </p>

                <div className="bg-[#F2EDE4]/35 p-2 rounded-lg border border-[#E5E1D8]/40 flex gap-2 items-center justify-between">
                  <span className="text-[10px] text-[#4A453C] italic font-serif leading-tight">
                    {entry.example}
                  </span>
                  <div className="flex gap-1 items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => speakFrenchText(entry.example)}
                      className="text-[#A39E93] hover:text-[#006233] p-1 rounded-md hover:bg-white border border-transparent hover:border-[#E5E1D8] transition cursor-pointer"
                      title="Lire l'exemple à haute voix"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => copiedNotification(entry.id, entry.word)}
                      className="text-[#A39E93] hover:text-[#006233] p-1 rounded-md hover:bg-white border border-transparent hover:border-[#E5E1D8] transition cursor-pointer"
                      title="Copier le mot clé"
                    >
                      {copiedId === entry.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-6 text-[10px] text-[#A39E93] font-bold">
                Aucun terme trouvé pour cette combinaison.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Explain verb conjugates search */}
          <div className="bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-2xl">
            <p className="text-[10px] text-amber-900 font-semibold leading-normal">
              💡 <strong>Règle du Brevet :</strong> Entrez un verbe à l'infinitif pour afficher instantanément ses trois temps incontournables de la réussite.
            </p>
          </div>

          {/* Selection Suggestion Chips */}
          <div className="flex flex-wrap gap-1.5">
            {["être", "avoir", "faire", "aimer", "finir", "partir", "écrire"].map(verb => (
              <button
                key={verb}
                onClick={() => setConjugateInput(verb)}
                className={`text-[9px] px-2 py-1 rounded-lg border font-black uppercase transition ${
                  conjugateInput === verb 
                    ? "bg-[#C18F5A] text-white border-[#C18F5A]" 
                    : "bg-[#F8F7F4] text-[#4A453C] border-[#E5E1D8] hover:bg-[#F2EDE4]"
                }`}
              >
                {verb}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={conjugateInput}
              onChange={(e) => setConjugateInput(e.target.value)}
              placeholder="Ex: chanter, parler, choisir..."
              className="w-full text-xs bg-white text-[#2C2C2C] border-2 border-[#E5E1D8] rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#006233] font-extrabold"
            />
          </div>

          {/* Render Conjugated Blocks */}
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {/* L'Imparfait block */}
            <div className="p-3 bg-teal-50/40 border border-teal-100 rounded-2xl">
              <h4 className="text-[10px] font-black tracking-wider uppercase text-teal-950 mb-1 flex items-center gap-1">
                <span>🕒 L'Imparfait</span>
                <span className="text-[8px] bg-teal-100/80 px-1 py-0.2 rounded font-extrabold text-teal-800">1AC & 3AC</span>
              </h4>
              <p className="text-[9px] text-[#7A7468] font-bold mb-1.5">Pour installer la situation stable ou décrire le décor.</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-mono text-[10px] text-teal-900">
                {conjugated.imparfait.map((line, idx) => (
                  <div key={idx} className="truncate font-semibold">{line}</div>
                ))}
              </div>
            </div>

            {/* Le Passé Simple block */}
            <div className="p-3 bg-violet-50/40 border border-violet-100 rounded-2xl">
              <h4 className="text-[10px] font-black tracking-wider uppercase text-violet-950 mb-1 flex items-center gap-1">
                <span>⚡ Le Passé Simple</span>
                <span className="text-[8px] bg-violet-100/80 px-1 py-0.2 rounded font-extrabold text-violet-800">1AC & 3AC</span>
              </h4>
              <p className="text-[9px] text-[#7A7468] font-bold mb-1.5">Temps des actions brèves, soudaines et des péripéties.</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-mono text-[10px] text-violet-900">
                {conjugated.passeSimple.map((line, idx) => (
                  <div key={idx} className="truncate font-semibold">{line}</div>
                ))}
              </div>
            </div>

            {/* Le Conditionnel Présent block */}
            <div className="p-3 bg-amber-50/40 border border-amber-100 rounded-2xl">
              <h4 className="text-[10px] font-black tracking-wider uppercase text-amber-950 mb-1 flex items-center gap-1">
                <span>🎭 Le Conditionnel Présent</span>
                <span className="text-[8px] bg-amber-100/80 px-1 py-0.2 rounded font-extrabold text-amber-800">3AC (Examen)</span>
              </h4>
              <p className="text-[9px] text-[#7A7468] font-bold mb-1.5">Essentiel pour relier la proposition principale après "Si + Imparfait".</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-mono text-[10px] text-amber-900">
                {conjugated.conditionnel.map((line, idx) => (
                  <div key={idx} className="truncate font-semibold">{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
