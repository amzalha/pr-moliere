import React, { useMemo, useState } from "react";
import { LessonTopic, LESSONS } from "../data/lessons";
import { Search, GraduationCap, ArrowRight, Lightbulb, CheckCircle2 } from "lucide-react";

interface LessonCardProps {
 onSelectTopic: (topic: LessonTopic, autoGenerate: boolean) => void;
 selectedTopicId: string | null;
 solvedTopicIds: Record<string, number>;
}

export default function LessonCard({ onSelectTopic, selectedTopicId, solvedTopicIds }: LessonCardProps) {
 const [selectedLevel, setSelectedLevel] = useState<"TOUS" | "1AC" | "2AC" | "3AC">("TOUS");
 const [searchQuery, setSearchQuery] = useState("");

 const filteredLessons = useMemo(() => {
  return LESSONS.filter((lesson) => {
   const matchLevel = selectedLevel === "TOUS" || lesson.level === selectedLevel;
   const matchSearch =
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.category.toLowerCase().includes(searchQuery.toLowerCase());
   return matchLevel && matchSearch;
  });
 }, [selectedLevel, searchQuery]);

 return (
  <div className="space-y-4">
   {/* Search and Filters Header */}
   <div className="bg-[#F8FAFC]/60 p-4 rounded-3xl border border-[#D9E2EC]/70 flex flex-col sm:flex-row gap-3 items-center justify-between">
    {/* Levels */}
    <div className="flex bg-white p-1 rounded-2xl border border-[#D9E2EC] shadow-sm w-full sm:w-auto">
     {(["TOUS", "1AC", "2AC", "3AC"] as const).map((lvl) => (
      <button
       key={lvl}
       onClick={() => setSelectedLevel(lvl)}
       className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
        selectedLevel === lvl
         ? "bg-[#1D4ED8] text-white shadow"
         : "text-[#334155] hover:bg-[#F8F7F3]"
       }`}
      >
       {lvl === "TOUS" ? "Tous les niveaux" : lvl}
      </button>
     ))}
    </div>

    {/* Search */}
    <div className="relative w-full sm:w-64">
     <input
      type="text"
      placeholder="Rechercher une notion, thème..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full text-xs bg-white text-[#2D2D2D] border border-[#D9E2EC] rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] font-medium"
     />
     <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
    </div>
   </div>

   {/* Program Summary Banner per level */}
   <div className="bg-[#F8FAFC]/30 p-4 border border-dashed border-[#D9E2EC] rounded-2xl">
    <p className="text-xs text-[#334155] font-semibold flex items-center gap-2">
     <GraduationCap className="w-4 h-4 text-[#1D4ED8]" />
     <span>
      {selectedLevel === "1AC" && "Programme 1AC (1ère année) : Le genre narratif, portrait, conte merveilleux, schéma du récit."}
      {selectedLevel === "2AC" && "Programme 2AC (2ème année) : Le théâtre scolaire (dialogues, didascalies) et les médias (La Une de presse)."}
      {selectedLevel === "3AC" && "Programme 3AC (Examen Régional) : Nouvelle policière, lettre officielle, hypothèse 'Si', cause, concession."}
      {selectedLevel === "TOUS" && "Sélectionne un niveau pour afficher les orientations d'études du Ministère marocain."}
     </span>
    </p>
   </div>

   {/* Lessons Grid */}
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {filteredLessons.map((lesson) => {
     const isSelected = selectedTopicId === lesson.id;
     const solvedCount = solvedTopicIds[lesson.id] || 0;
     return (
      <div
       key={lesson.id}
       className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
        isSelected
         ? "bg-white border-[#1D4ED8] shadow-md ring-1 ring-[#1D4ED8] scale-[1.01]"
         : "bg-white hover:bg-[#F8FAFC]/10 border-[#D9E2EC] shadow-sm"
       }`}
      >
       <div>
        <div className="flex items-center justify-between mb-2">
         <div className="flex gap-2 items-center">
          <span
           className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
            lesson.level === "1AC"
             ? "bg-teal-50 text-teal-800 border border-teal-100"
             : lesson.level === "2AC"
             ? "bg-indigo-50 text-indigo-800 border border-indigo-100"
             : "bg-rose-50 text-rose-800 border border-rose-100"
           }`}
          >
           {lesson.level}
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-extrabold">
           {lesson.category}
          </span>
         </div>
         {solvedCount > 0 && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
           <CheckCircle2 className="w-3.5 h-3.5" />
           <span>Réussi ×{solvedCount}</span>
          </span>
         )}
        </div>

        <h3 className="font-serif font-black text-[#1A1A1A] text-sm leading-snug tracking-tight mb-1.5">
         {lesson.title}
        </h3>
        <p className="text-xs text-[#64748B] leading-relaxed mb-3">
         {lesson.description}
        </p>

        {/* Key Rule Box */}
        <div className="bg-[#F8FAFC]/40 rounded-2xl p-3 border border-[#D9E2EC]/60 mb-4 flex gap-2 items-start">
         <Lightbulb className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
         <div className="text-[11px] text-[#334155] leading-normal font-sans">
          <span className="font-black text-[#2563EB] uppercase tracking-wider block mb-0.5">La règle d'or :</span>
          {lesson.keyRule}
         </div>
        </div>
       </div>

       {/* Action bar and launchers */}
       <div className="flex gap-2 items-center mt-3 border-t border-[#F8FAFC] pt-3">
        <button
         type="button"
         onClick={() => onSelectTopic(lesson, false)}
         className="flex-1 text-center bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] text-[#334155] border border-[#D9E2EC] py-2 rounded-xl text-xs font-bold transition"
        >
         Lire la fiche
        </button>
        <button
         type="button"
         onClick={() => onSelectTopic(lesson, true)}
         className="flex-1 flex items-center justify-center gap-1.5 bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white py-2 rounded-xl text-xs font-black transition shadow-xs"
        >
         <span>Créer un défi</span>
         <ArrowRight className="w-3.5 h-3.5" />
        </button>
       </div>
      </div>
     );
    })}
   </div>

   {filteredLessons.length === 0 && (
    <div className="text-center py-10 bg-[#F8FAFC]/20 rounded-3xl border border-dashed border-[#D9E2EC]">
     <p className="text-xs font-bold text-[#334155]">Aucune leçon trouvée pour votre sélection.</p>
     <p className="text-[11px] text-[#64748B] mt-1">Essayer d'élargir la recherche ou réinitialiser les filtres.</p>
    </div>
   )}
  </div>
 );
}
