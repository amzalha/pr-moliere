import React, { useMemo } from "react";
import { Award, Trophy, Star, Sparkles, Calendar, BookOpen, Flame } from "lucide-react";

interface ProgressStats {
 solvedCount: Record<string, number>;
 levelCount: Record<"1AC" | "2AC" | "3AC", number>;
 totalCorrect: number;
 streak: number;
 lastActive: string | null;
}

interface ProgressPanelProps {
 stats: ProgressStats;
 onResetStats: () => void;
}

export default function ProgressPanel({ stats, onResetStats }: ProgressPanelProps) {
 const badgeList = useMemo(() => {
  const badges = [
   {
    id: "first-step",
    title: "Pousse de Larache 🌿",
    description: "Résoudre ton premier exercice ou défi de français.",
    unlocked: stats.totalCorrect >= 1,
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: Star,
   },
   {
    id: "narrati-leader",
    title: "Conte d'Essaouira 📖",
    description: "Résoudre au moins 1 exercice du niveau 1AC (Le récit).",
    unlocked: stats.levelCount["1AC"] >= 1,
    color: "bg-teal-50 text-teal-800 border-teal-200",
    icon: BookOpen,
   },
   {
    id: "theater-star",
    title: "Planches de Casablanca 🎭",
    description: "Résoudre au moins 1 exercice du niveau 2AC (Le théâtre).",
    unlocked: stats.levelCount["2AC"] >= 1,
    color: "bg-indigo-50 text-indigo-800 border-indigo-200",
    icon: Sparkles,
   },
   {
    id: "regional-boss",
    title: "As du Régional de Rabat 🎓",
    description: "Résoudre au moins 1 exercice du niveau 3AC (Concordance / Lettre officielle).",
    unlocked: stats.levelCount["3AC"] >= 1,
    color: "bg-amber-50 text-amber-900 border-amber-200",
    icon: Award,
   },
   {
    id: "marathon",
    title: "Savant de la Koutoubia 🕌",
    description: "Atteindre 4 réponses correctes au total dans ton palmarès.",
    unlocked: stats.totalCorrect >= 4,
    color: "bg-rose-50 text-rose-800 border-rose-200",
    icon: Trophy,
   }
  ];
  return badges;
 }, [stats]);

 const unlockedCount = badgeList.filter(b => b.unlocked).length;

 return (
  <div id="progress-panel" className="bg-white rounded-3xl border-2 border-[#E5E1D8] p-5 shadow-sm transition-all">
   <div className="flex items-center justify-between border-b border-[#F2EDE4] pb-3 mb-4">
    <div className="flex items-center gap-2.5">
     <div className="bg-[#006233]/10 text-[#006233] p-2 rounded-xl">
      <Trophy className="w-5 h-5" />
     </div>
     <div>
      <h2 className="text-base font-serif font-black text-[#1A1A1A]">Mon Palmarès National</h2>
      <p className="text-[11px] text-[#7A7468] font-bold">Pistes scolaires & exploits débloqués</p>
     </div>
    </div>

    {stats.totalCorrect > 0 && (
     <button
      onClick={onResetStats}
      className="text-[10px] text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/50 border border-rose-100 px-2 py-1 rounded-lg font-bold transition"
     >
      Effacer
     </button>
    )}
   </div>

   <div className="grid grid-cols-2 gap-3 mb-4">
    {/* Total stats */}
    <div className="bg-[#FDFCFB] rounded-2xl p-3 border border-[#E5E1D8]/60 flex items-center gap-3">
     <div className="bg-[#006233] text-white rounded-lg p-2 shrink-0">
      <Award className="w-4 h-4" />
     </div>
     <div>
      <div className="text-xl font-black text-[#1A1A1A] leading-none">{stats.totalCorrect}</div>
      <div className="text-[10px] text-[#A39E93] font-bold">Réponses Justes</div>
     </div>
    </div>

    {/* Level distribution */}
    <div className="bg-[#FDFCFB] rounded-2xl p-3 border border-[#E5E1D8]/60 flex items-center gap-3">
     <div className="bg-[#C18F5A] text-white rounded-lg p-2 shrink-0 animate-pulse">
      <Flame className="w-4 h-4" />
     </div>
     <div>
      <div className="text-xl font-black text-[#1A1A1A] leading-none">{stats.streak}</div>
      <div className="text-[10px] text-[#A39E93] font-bold">Assiduité (jours)</div>
     </div>
    </div>
   </div>

   <div>
    <h3 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wide mb-2">
     Badges Honorifiques ({unlockedCount} / {badgeList.length})
    </h3>

    <div className="space-y-2">
     {badgeList.map((badge) => {
      const IconComp = badge.icon;
      return (
       <div
        key={badge.id}
        className={`border rounded-xl p-2.5 flex gap-3 items-start transition-all duration-300 ${
         badge.unlocked
          ? `${badge.color} border-l-4 shadow-xs`
          : "bg-gray-50 text-gray-400 border-gray-105 opacity-60"
        }`}
       >
        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${badge.unlocked ? "bg-white shadow-xs" : "bg-gray-100"}`}>
         <IconComp className={`w-4 h-4 ${badge.unlocked ? "text-[#006233]" : "text-gray-400"}`} />
        </div>
        <div className="flex-1 min-w-0">
         <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-xs tracking-tight text-current truncate">{badge.title}</h4>
          <span className="text-[8px] font-black tracking-wider uppercase opacity-80 select-none">
           {badge.unlocked ? "✓" : "🔒"}
          </span>
         </div>
         <p className="text-[10px] leading-tight mt-0.5 opacity-90">{badge.description}</p>
        </div>
       </div>
      );
     })}
    </div>
   </div>
  </div>
 );
}
