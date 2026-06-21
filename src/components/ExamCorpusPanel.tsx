import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Filter,
  GraduationCap,
  MapPin,
  Play,
  Timer
} from "lucide-react";
import ExamSourceCatalogPanel from "./ExamSourceCatalogPanel";
import {
  examCorpus,
  ExamCorpusItem,
  ExamEvaluationType,
  ExamLevel
} from "../data/examCorpus";

type LevelFilter = "TOUS" | ExamLevel;
type TypeFilter = "TOUS" | ExamEvaluationType;

type ExamCorpusPanelProps = {
  onStartTraining: (item: ExamCorpusItem) => void;
};

const levelLabels: Record<LevelFilter, string> = {
  TOUS: "Tous",
  "1AC": "1AC",
  "2AC": "2AC",
  "3AC": "3AC"
};

const typeLabels: Record<TypeFilter, string> = {
  TOUS: "Tous",
  controle_continu: "Contrôle",
  examen_local: "Local",
  examen_regional: "Régional"
};

export default function ExamCorpusPanel({ onStartTraining }: ExamCorpusPanelProps) {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("TOUS");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("TOUS");

  const filteredCorpus = useMemo(() => {
    return examCorpus.filter((item) => {
      const levelOk = levelFilter === "TOUS" || item.niveau === levelFilter;
      const typeOk = typeFilter === "TOUS" || item.typeEvaluation === typeFilter;
      return levelOk && typeOk;
    });
  }, [levelFilter, typeFilter]);

  const totalRegional = examCorpus.filter(
    (item) => item.typeEvaluation === "examen_regional"
  ).length;

  const totalTroisieme = examCorpus.filter((item) => item.niveau === "3AC").length;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl border-2 border-[#E5E1D8] p-5 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-[#006233]/10 text-[#006233] p-2.5 rounded-2xl">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111111]">
              Corpus examens collège
            </h3>
            <p className="text-sm text-[#333333]">
              Banque de sujets modèles pour préparer les contrôles, examens locaux et examens régionaux.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#F8F5EF] border border-[#E5E1D8] rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-[#006233]">{examCorpus.length}</p>
            <p className="text-xs text-[#333333]">Sujets</p>
          </div>
          <div className="bg-[#F8F5EF] border border-[#E5E1D8] rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-[#006233]">{totalTroisieme}</p>
            <p className="text-xs text-[#333333]">3AC</p>
          </div>
          <div className="bg-[#F8F5EF] border border-[#E5E1D8] rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-[#006233]">{totalRegional}</p>
            <p className="text-xs text-[#333333]">Régional</p>
          </div>
        </div>
      </div>

      <div className="bg-[#FDFCFB] rounded-3xl border-2 border-[#E5E1D8] p-4">
        <div className="flex items-center gap-2 mb-3 text-[#111111]">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-bold">Filtres</span>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-[#333333] mb-2">Niveau</p>
            <div className="flex flex-wrap gap-2">
              {(["TOUS", "1AC", "2AC", "3AC"] as LevelFilter[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level)}
                  className={`px-3 py-2 rounded-xl border text-xs transition ${
                    levelFilter === level
                      ? "bg-[#006233] text-white border-[#006233]"
                      : "bg-white text-[#111111] border-[#E5E1D8]"
                  }`}
                >
                  {levelLabels[level]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-[#333333] mb-2">Type</p>
            <div className="flex flex-wrap gap-2">
              {(["TOUS", "controle_continu", "examen_local", "examen_regional"] as TypeFilter[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-2 rounded-xl border text-xs transition ${
                    typeFilter === type
                      ? "bg-[#006233] text-white border-[#006233]"
                      : "bg-white text-[#111111] border-[#E5E1D8]"
                  }`}
                >
                  {typeLabels[type]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ExamSourceCatalogPanel />

      <div className="space-y-3">
        {filteredCorpus.map((item) => (
          <div
            key={item.id}
            className="bg-white border-2 border-[#E5E1D8] rounded-3xl p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-[#006233]/10 text-[#006233] border border-[#006233]/20 px-2 py-1 rounded-lg text-xs">
                    {item.niveau}
                  </span>
                  <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2 py-1 rounded-lg text-xs">
                    {typeLabels[item.typeEvaluation]}
                  </span>
                  <span className="bg-[#F2EDE4] text-[#111111] border border-[#E5E1D8] px-2 py-1 rounded-lg text-xs">
                    {item.competence}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#111111]">
                  {item.titre}
                </h4>
              </div>

              <BookOpen className="w-5 h-5 text-[#006233] shrink-0" />
            </div>

            <p className="text-sm text-[#222222] mb-3">
              {item.consigne}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#333333]">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#006233]" />
                <span>Thème : {item.theme}</span>
              </div>

              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-[#006233]" />
                <span>Barème : {item.baremeTotal} points</span>
              </div>

              {item.region ? (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#006233]" />
                  <span>Région : {item.region}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-3 pt-3 border-t border-[#E5E1D8] space-y-3">
              <p className="text-xs text-[#333333]">
                Questions : {item.questions.length} · {item.sourceType === "modele_original" ? "Sujet modèle original PR_Molière" : "Source web à structurer"} · Source : {item.sourceNom}
              </p>

              <button
                onClick={() => onStartTraining(item)}
                className="w-full bg-[#006233] hover:bg-[#004D28] text-white rounded-2xl px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition"
              >
                <Play className="w-4 h-4" />
                <span>S’entraîner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
