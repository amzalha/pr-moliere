import React, { useEffect, useMemo, useState } from "react";
import {
 Clock,
 CheckCircle,
 XCircle,
 RefreshCcw,
 Database,
 BarChart3,
 AlertTriangle,
 Target,
 BookOpen
} from "lucide-react";
import { getStudentHistory } from "../services/studentHistory";
import type { StudentAnswerRow } from "../types/supabase";

type Props = {
 userId?: string | null;
};

function normalizeStatus(status: string) {
 return status === "[CORRECTION_JUSTE]" ? "JUSTE" : "A_REVOIR";
}

export default function StudentHistoryPanel({ userId }: Props) {
 const [rows, setRows] = useState<StudentAnswerRow[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const loadHistory = async () => {
  if (!userId) return;

  setLoading(true);
  setError(null);

  const result = await getStudentHistory(userId);

  if (!result.ok) {
   setError(result.error || "Historique indisponible");
   setRows([]);
  } else {
   setRows(result.data);
  }

  setLoading(false);
 };

 useEffect(() => {
  loadHistory();
 }, [userId]);

 const analytics = useMemo(() => {
  const total = rows.length;
  const correct = rows.filter((r) => r.statut === "[CORRECTION_JUSTE]").length;
  const wrong = total - correct;
  const rate = total ? Math.round((correct / total) * 100) : 0;

  const byLevel: Record<string, { total: number; correct: number }> = {};
  const byTheme: Record<string, { total: number; correct: number; wrong: number; niveau: string }> = {};

  for (const row of rows) {
   if (!byLevel[row.niveau]) {
    byLevel[row.niveau] = { total: 0, correct: 0 };
   }

   byLevel[row.niveau].total += 1;
   if (row.statut === "[CORRECTION_JUSTE]") {
    byLevel[row.niveau].correct += 1;
   }

   if (!byTheme[row.theme]) {
    byTheme[row.theme] = { total: 0, correct: 0, wrong: 0, niveau: row.niveau };
   }

   byTheme[row.theme].total += 1;
   if (row.statut === "[CORRECTION_JUSTE]") {
    byTheme[row.theme].correct += 1;
   } else {
    byTheme[row.theme].wrong += 1;
   }
  }

  const weakThemes = Object.entries(byTheme)
   .map(([theme, value]) => ({
    theme,
    niveau: value.niveau,
    total: value.total,
    correct: value.correct,
    wrong: value.wrong,
    rate: value.total ? Math.round((value.correct / value.total) * 100) : 0
   }))
   .sort((a, b) => b.wrong - a.wrong || a.rate - b.rate)
   .slice(0, 3);

  const bestLevel = Object.entries(byLevel)
   .map(([niveau, value]) => ({
    niveau,
    total: value.total,
    correct: value.correct,
    rate: value.total ? Math.round((value.correct / value.total) * 100) : 0
   }))
   .sort((a, b) => b.rate - a.rate)[0];

  const recommendation =
   weakThemes.length > 0 && weakThemes[0].wrong > 0
    ? `Révise en priorité : ${weakThemes[0].theme}.`
    : total === 0
     ? "Commencez par répondre à un premier défi pour générer votre diagnostic."
     : "Très bon début : continuez avec un nouveau thème pour consolider votre progression.";

  return {
   total,
   correct,
   wrong,
   rate,
   byLevel,
   weakThemes,
   bestLevel,
   recommendation
  };
 }, [rows]);

 if (!userId) {
  return (
   <div className="bg-white rounded-3xl border-2 border-[#D9E2EC] p-5 text-sm text-[#334155]">
    <div className="flex items-center gap-2 font-black text-[#1D4ED8] mb-2">
     <Database className="w-4 h-4" />
     <span>Dashboard élève</span>
    </div>
    <p>Connectez-vous avec Google pour enregistrer votre historique et afficher votre diagnostic personnalisé.</p>
   </div>
  );
 }

 return (
  <div className="bg-white rounded-3xl border-2 border-[#D9E2EC] p-5 shadow-sm">
   <div className="flex items-center justify-between mb-4">
    <div>
     <h4 className="text-sm font-black text-[#1A1A1A]">Dashboard élève</h4>
     <p className="text-xs text-[#64748B] font-bold">Historique, progression et recommandations personnalisées</p>
    </div>
    <button
     onClick={loadHistory}
     disabled={loading}
     className="text-[10px] px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#D9E2EC] text-[#334155] font-black border border-[#D9E2EC] flex items-center gap-1"
    >
     <RefreshCcw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
     Actualiser
    </button>
   </div>

   <div className="grid grid-cols-3 gap-2 mb-4">
    <div className="bg-[#F8FAFC] rounded-2xl p-3 text-center">
     <p className="text-[10px] font-black text-[#64748B] uppercase">Total</p>
     <p className="text-xl font-black text-[#1A1A1A]">{analytics.total}</p>
    </div>
    <div className="bg-emerald-50 rounded-2xl p-3 text-center">
     <p className="text-[10px] font-black text-emerald-700 uppercase">Justes</p>
     <p className="text-xl font-black text-emerald-700">{analytics.correct}</p>
    </div>
    <div className="bg-amber-50 rounded-2xl p-3 text-center">
     <p className="text-[10px] font-black text-amber-700 uppercase">Réussite</p>
     <p className="text-xl font-black text-amber-700">{analytics.rate}%</p>
    </div>
   </div>

   <div className="bg-[#1D4ED8]/5 border border-[#1D4ED8]/15 rounded-2xl p-3 mb-4">
    <div className="flex items-center gap-2 text-[#1D4ED8] font-black text-xs mb-1">
     <Target className="w-4 h-4" />
     <span>Recommandation personnalisée</span>
    </div>
    <p className="text-xs text-[#334155] font-bold">{analytics.recommendation}</p>
   </div>

   <div className="mb-4">
    <div className="flex items-center gap-2 text-[#1A1A1A] font-black text-xs mb-2">
     <BarChart3 className="w-4 h-4 text-[#1D4ED8]" />
     <span>Progression par niveau</span>
    </div>

    <div className="space-y-2">
     {["1AC", "2AC", "3AC"].map((level) => {
      const item = analytics.byLevel[level] || { total: 0, correct: 0 };
      const rate = item.total ? Math.round((item.correct / item.total) * 100) : 0;

      return (
       <div key={level} className="bg-[#FFFFFF] border border-[#D9E2EC] rounded-2xl p-3">
        <div className="flex items-center justify-between text-xs font-black mb-1">
         <span>{level}</span>
         <span className="text-[#1D4ED8]">{rate}%</span>
        </div>
        <div className="w-full bg-[#F8FAFC] h-2 rounded-full overflow-hidden">
         <div
          className="bg-[#1D4ED8] h-full rounded-full transition-all"
          style={{ width: `${Math.max(5, rate)}%` }}
         />
        </div>
        <p className="text-[10px] text-[#64748B] font-bold mt-1">
         {item.correct}/{item.total} réponses justes
        </p>
       </div>
      );
     })}
    </div>
   </div>

   <div className="mb-4">
    <div className="flex items-center gap-2 text-[#1A1A1A] font-black text-xs mb-2">
     <AlertTriangle className="w-4 h-4 text-orange-600" />
     <span>Thèmes à renforcer</span>
    </div>

    {analytics.weakThemes.length === 0 ? (
     <p className="text-xs text-[#64748B] font-bold">Aucun thème faible détecté pour le moment.</p>
    ) : (
     <div className="space-y-2">
      {analytics.weakThemes.map((item) => (
       <div key={item.theme} className="bg-orange-50 border border-orange-100 rounded-2xl p-3">
        <div className="flex items-center justify-between gap-2">
         <p className="text-xs font-black text-orange-950">{item.theme}</p>
         <span className="text-[10px] bg-white border border-orange-100 rounded-lg px-2 py-0.5 font-black text-orange-700">
          {item.niveau}
         </span>
        </div>
        <p className="text-[10px] text-orange-800 font-bold mt-1">
         Réussite : {item.rate}% • À revoir : {item.wrong}
        </p>
       </div>
      ))}
     </div>
    )}
   </div>

   {error ? (
    <div className="text-xs bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl p-3 font-bold mb-3">
     {error}
    </div>
   ) : null}

   <div>
    <div className="flex items-center gap-2 text-[#1A1A1A] font-black text-xs mb-2">
     <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
     <span>Dernières réponses</span>
    </div>

    {loading ? (
     <div className="text-xs text-[#64748B] font-bold">Chargement de l’historique...</div>
    ) : rows.length === 0 ? (
     <div className="text-xs text-[#64748B] font-bold">Aucune réponse enregistrée pour le moment.</div>
    ) : (
     <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
      {rows.slice(0, 8).map((row) => {
       const ok = normalizeStatus(row.statut) === "JUSTE";

       return (
        <div key={row.id} className="border border-[#D9E2EC] rounded-2xl p-3 bg-[#FFFFFF]">
         <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
           {ok ? (
            <CheckCircle className="w-4 h-4 text-emerald-600" />
           ) : (
            <XCircle className="w-4 h-4 text-orange-600" />
           )}
           <span className="text-xs font-black text-[#1A1A1A]">{row.theme}</span>
          </div>
          <span className="text-[10px] font-black text-[#1D4ED8] bg-[#1D4ED8]/10 px-2 py-0.5 rounded-lg">
           {row.niveau}
          </span>
         </div>
         <p className="text-xs text-[#334155] line-clamp-2">{row.reponse_eleve}</p>
         <div className="flex items-center gap-1 mt-2 text-[10px] text-[#64748B] font-bold">
          <Clock className="w-3 h-3" />
          {new Date(row.created_at).toLocaleString("fr-FR")}
         </div>
        </div>
       );
      })}
     </div>
    )}
   </div>
  </div>
 );
}
