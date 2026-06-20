import React, { useEffect, useMemo, useState } from "react";
import { Clock, CheckCircle, XCircle, RefreshCcw, Database } from "lucide-react";
import { getStudentHistory } from "../services/studentHistory";
import type { StudentAnswerRow } from "../types/supabase";

type Props = {
  userId?: string | null;
};

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

  const stats = useMemo(() => {
    const total = rows.length;
    const correct = rows.filter((r) => r.statut === "[CORRECTION_JUSTE]").length;
    const rate = total ? Math.round((correct / total) * 100) : 0;
    return { total, correct, rate };
  }, [rows]);

  if (!userId) {
    return (
      <div className="bg-white rounded-3xl border-2 border-[#E5E1D8] p-5 text-sm text-[#4A453C]">
        <div className="flex items-center gap-2 font-black text-[#006233] mb-2">
          <Database className="w-4 h-4" />
          <span>Historique Supabase</span>
        </div>
        <p>Connecte-toi avec Google pour enregistrer et afficher ton historique.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-[#E5E1D8] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-black text-[#1A1A1A]">Historique des réponses</h4>
          <p className="text-xs text-[#A39E93] font-bold">Sauvegarde Supabase des corrections</p>
        </div>
        <button
          onClick={loadHistory}
          disabled={loading}
          className="text-[10px] px-3 py-2 rounded-xl bg-[#F2EDE4] hover:bg-[#E5E1D8] text-[#4A453C] font-black border border-[#E5E1D8] flex items-center gap-1"
        >
          <RefreshCcw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          Actualiser
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#F2EDE4] rounded-2xl p-3 text-center">
          <p className="text-[10px] font-black text-[#7A7468] uppercase">Total</p>
          <p className="text-xl font-black text-[#1A1A1A]">{stats.total}</p>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] font-black text-emerald-700 uppercase">Justes</p>
          <p className="text-xl font-black text-emerald-700">{stats.correct}</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-3 text-center">
          <p className="text-[10px] font-black text-amber-700 uppercase">Réussite</p>
          <p className="text-xl font-black text-amber-700">{stats.rate}%</p>
        </div>
      </div>

      {error ? (
        <div className="text-xs bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl p-3 font-bold">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="text-xs text-[#A39E93] font-bold">Chargement de l’historique...</div>
      ) : rows.length === 0 ? (
        <div className="text-xs text-[#A39E93] font-bold">Aucune réponse enregistrée pour le moment.</div>
      ) : (
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {rows.map((row) => {
            const ok = row.statut === "[CORRECTION_JUSTE]";
            return (
              <div key={row.id} className="border border-[#E5E1D8] rounded-2xl p-3 bg-[#FDFCFB]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {ok ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-orange-600" />
                    )}
                    <span className="text-xs font-black text-[#1A1A1A]">{row.theme}</span>
                  </div>
                  <span className="text-[10px] font-black text-[#006233] bg-[#006233]/10 px-2 py-0.5 rounded-lg">
                    {row.niveau}
                  </span>
                </div>
                <p className="text-xs text-[#4A453C] line-clamp-2">{row.reponse_eleve}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-[#A39E93] font-bold">
                  <Clock className="w-3 h-3" />
                  {new Date(row.created_at).toLocaleString("fr-FR")}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
