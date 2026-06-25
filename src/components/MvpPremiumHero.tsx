import { Award, BookOpen, GraduationCap, Sparkles, Target, TrendingUp } from "lucide-react";

type MvpPremiumHeroProps = {
  totalCorrect: number;
  streak: number;
  onOpenExams: () => void;
  onOpenProgress: () => void;
};

const heroStats = [
  { label: "Sujets structurés", value: "90", detail: "1AC, 2AC et 3AC" },
  { label: "Niveaux couverts", value: "3", detail: "Collège complet" },
  { label: "Mode MVP", value: "95%", detail: "Objectif démonstration" }
];

export default function MvpPremiumHero({
  totalCorrect,
  streak,
  onOpenExams,
  onOpenProgress
}: MvpPremiumHeroProps) {
  return (
    <section className="col-span-12 overflow-hidden rounded-[2rem] border border-[#D9E2EC] bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF6FF] p-5 shadow-sm md:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-white/80 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#1D4ED8]">
            <Sparkles className="h-3.5 w-3.5" />
            MVP pédagogique premium
          </div>

          <h2 className="max-w-3xl text-3xl font-black tracking-tight text-[#0F172A] md:text-5xl">
            PR Molière accompagne la réussite en français, du diagnostic à la progression.
          </h2>

          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#475569] md:text-base">
            Une expérience claire pour réviser, s’entraîner sur des sujets structurés, interroger le tuteur IA et suivre les acquis avec un tableau de bord lisible.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onOpenExams}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1D4ED8] px-5 py-3 text-sm font-black text-white shadow-md transition hover:bg-[#1E40AF]"
            >
              <BookOpen className="h-4 w-4" />
              Explorer les examens
            </button>

            <button
              type="button"
              onClick={onOpenProgress}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-black text-[#0F172A] transition hover:bg-[#F8FAFC]"
            >
              <TrendingUp className="h-4 w-4" />
              Voir la progression
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#64748B]">
                Démonstration MVP
              </p>
              <h3 className="text-lg font-black text-[#0F172A]">Tableau de valeur</h3>
            </div>
            <div className="rounded-2xl bg-[#DBEAFE] p-3 text-[#1D4ED8]">
              <Award className="h-5 w-5" />
            </div>
          </div>

          <div className="grid gap-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-[#0F172A]">{stat.label}</p>
                    <p className="text-[11px] font-bold text-[#64748B]">{stat.detail}</p>
                  </div>
                  <span className="text-2xl font-black text-[#1D4ED8]">{stat.value}</span>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#ECFDF5] p-3">
                <div className="mb-2 flex items-center gap-2 text-[#166534]">
                  <Target className="h-4 w-4" />
                  <span className="text-[11px] font-black">Réussites</span>
                </div>
                <p className="text-xl font-black text-[#14532D]">{totalCorrect}</p>
              </div>

              <div className="rounded-2xl bg-[#FFF7ED] p-3">
                <div className="mb-2 flex items-center gap-2 text-[#9A3412]">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-[11px] font-black">Assiduité</span>
                </div>
                <p className="text-xl font-black text-[#7C2D12]">{streak} jour(s)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
