import React, { useState, useEffect } from "react";
import { CheckSquare, Square, Award, Target, HelpCircle, MapPin, Gauge } from "lucide-react";

const REGIONAL_CHECKLIST_ITEMS = [
 { id: "3ac-c1", label: "La concordance d'hypothèse : Si + Imparfait -> Conditionnel Présent", desc: "La règle reine exigée à chaque examen régional." },
 { id: "3ac-c2", label: "L'expression de la concession avec 'Bien que (+ Subjonctif)'", desc: "Savoir utiliser le subjonctif après 'bien que' ou 'quoique'." },
 { id: "3ac-c3", label: "Contraster la Cause (parce que) et la Conséquence (si bien que)", desc: "Relier deux phrases logiquement sans les confondre." },
 { id: "3ac-c4", label: "La structure formelle de la Lettre Administrative Officielle", desc: "Savoir placer l'émetteur, le destinataire et l'objet en haut à droite." },
 { id: "3ac-c5", label: "Le vocabulaire de la Nouvelle Policière", desc: "Champ lexical du mystère (indice, coupable, mobile, suspect)." },
 { id: "3ac-c6", label: "Les didascalies & le dialogue théâtral", desc: "Indiquer le ton, la gestuelle et le décor au théâtre." },
];

const MAROC_REGIONS = [
 "Rabat-Salé-Kénitra",
 "Casablanca-Settat",
 "Fès-Meknès",
 "Marrakech-Safi",
 "Tanger-Tétouan-Al Hoceïma",
 "Souss-Massa",
 "l'Oriental",
 "Béni Mellal-Khénifra",
 "Drâa-Tafilalet",
 "Guelmim-Oued Noun",
 "Laâyoune-Sakia El Hamra",
 "Dakhla-Oued Ed-Dahab"
];

interface BrevetTrackerProps {
 totalCorrect: number;
}

export default function BrevetTracker({ totalCorrect }: BrevetTrackerProps) {
 // Load checked items from localStorage
 const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
  try {
   const saved = localStorage.getItem("brevet_tracker_checklist");
   return saved ? JSON.parse(saved) : {};
  } catch {
   return {};
  }
 });

 // Selected Region
 const [selectedRegion, setSelectedRegion] = useState<string>(() => {
  try {
   return localStorage.getItem("brevet_tracker_region") || "Rabat-Salé-Kénitra";
  } catch {
   return "Rabat-Salé-Kénitra";
  }
 });

 // Save changes
 useEffect(() => {
  localStorage.setItem("brevet_tracker_checklist", JSON.stringify(checkedIds));
 }, [checkedIds]);

 useEffect(() => {
  localStorage.setItem("brevet_tracker_region", selectedRegion);
 }, [selectedRegion]);

 const toggleCheck = (id: string) => {
  setCheckedIds(prev => ({
   ...prev,
   [id]: !prev[id]
  }));
 };

 const checkedCount = Object.values(checkedIds).filter(Boolean).length;
 // Calculate a mock score of readiness
 // Each checked item is 12%, each correct answer (up to 5) is 5% extra.
 const baselinePercentage = Math.round((checkedCount / REGIONAL_CHECKLIST_ITEMS.length) * 100);
 const bonus = Math.min(totalCorrect * 5, 25);
 const readinessPercentage = Math.min(baselinePercentage + bonus, 100);

 return (
  <div id="brevet-tracker-widget" className="bg-white rounded-3xl border-2 border-[#D9E2EC] p-5 shadow-sm transition-all">
   {/* Header */}
   <div className="flex items-center justify-between border-b border-[#F8FAFC] pb-3 mb-4">
    <div className="flex items-center gap-2.5">
     <div className="bg-[#1D4ED8]/10 text-[#1D4ED8] p-2 rounded-xl">
      <Target className="w-5 h-5" />
     </div>
     <div>
      <h2 className="text-base font-serif font-black text-[#1A1A1A]">Simulateur Brevet 100% 🎯</h2>
      <p className="text-[11px] text-[#64748B] font-bold">Checklist officielle de l'Examen Régional (3AC)</p>
     </div>
    </div>
   </div>

   {/* Region selector & stats */}
   <div className="space-y-3 mb-4">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 bg-[#F8FAFC]/40 p-3 rounded-2xl border border-[#D9E2EC]/60">
     <div className="flex items-center gap-1 text-xs text-[#334155] font-bold">
      <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
      <span>Mon Académie Académique :</span>
     </div>
     <select
      value={selectedRegion}
      onChange={(e) => setSelectedRegion(e.target.value)}
      className="text-[11px] font-black bg-white text-[#2C2C2C] border border-[#D9E2EC] px-2 py-1 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
     >
      {MAROC_REGIONS.map(reg => (
       <option key={reg} value={reg}>{reg}</option>
      ))}
     </select>
    </div>

    {/* Readiness progress gauge */}
    <div className="bg-gradient-to-br from-[#1D4ED8]/5 to-[#2563EB]/5 rounded-2xl p-4 border border-[#D9E2EC]/80 flex items-center justify-between gap-4">
     <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
       <span className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wide">Taux de Réussite Régionale estimé :</span>
       <span className="text-sm font-black text-[#1D4ED8]">{readinessPercentage}%</span>
      </div>
      
      <div className="w-full bg-[#D9E2EC] h-2.5 rounded-full overflow-hidden">
       <div 
        className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] h-full rounded-full transition-all duration-500"
        style={{ width: `${readinessPercentage}%` }}
       ></div>
      </div>
      <p className="text-[9px] text-[#64748B] font-bold mt-1 leading-tight">
       {readinessPercentage >= 80 ? "🌟 Niveau exceptionnel (Mention Très Bien visée !)" :
        readinessPercentage >= 50 ? "👍 Progression stable. Continuez à réviser votre lexique !" :
        "📝 Remplissez la checklist et réussissez des exercices pour augmenter votre confiance."}
      </p>
     </div>

     <div className="flex flex-col items-center justify-center shrink-0">
      <Gauge className="w-8 h-8 text-[#2563EB] mb-1 opacity-90 animate-pulse" />
      <span className="text-[9px] text-[#64748B] font-semibold">Tuteur marocain</span>
     </div>
    </div>
   </div>

   {/* Checklist items list */}
   <div>
    <h3 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wide mb-2.5">
     Validation des Outils Clés de l'Examen :
    </h3>

    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
     {REGIONAL_CHECKLIST_ITEMS.map((item) => {
      const isChecked = !!checkedIds[item.id];
      return (
       <button
        key={item.id}
        onClick={() => toggleCheck(item.id)}
        type="button"
        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 leading-snug ${
         isChecked
          ? "bg-emerald-50/50 border-emerald-200 text-emerald-950"
          : "bg-[#FFFFFF] border-[#D9E2EC]/60 text-[#334155] hover:bg-[#F8FAFC]/20"
        }`}
       >
        <div className="mt-0.5 shrink-0">
         {isChecked ? (
          <CheckSquare className="w-4 h-4 text-emerald-600" />
         ) : (
          <Square className="w-4 h-4 text-[#64748B]" />
         )}
        </div>
        <div>
         <h4 className={`text-[11px] font-black tracking-tight ${isChecked ? "line-through text-emerald-800" : "text-[#1A1A1A]"}`}>
          {item.label}
         </h4>
         <p className="text-[9px] text-[#64748B] leading-tight mt-0.5">{item.desc}</p>
        </div>
       </button>
      );
     })}
    </div>
   </div>

   {/* Advisory Note from inspector */}
   <div className="mt-3 border-t border-[#F8FAFC] pt-3 flex gap-2 items-start">
    <div className="text-[9px] text-[#64748B] leading-relaxed">
     💡 <strong>Note de l'Inspecteur régional :</strong> Pour l'examen de l'Académie de <strong>{selectedRegion}</strong>, accordez un soin maximal à l'orthographe d'usage des homophones et à la propreté de la copie d'examen !
    </div>
   </div>
  </div>
 );
}
