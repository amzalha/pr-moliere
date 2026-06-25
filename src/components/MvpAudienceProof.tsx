import { School, UserRoundCheck, Rocket } from "lucide-react";

const audiences = [
  {
    title: "Pour les enseignants",
    description: "Présenter rapidement un corpus structuré, des critères de réussite et des pistes de remédiation."
  },
  {
    title: "Pour les élèves",
    description: "Réviser, s’entraîner, poser une question et suivre les progrès dans une interface claire."
  },
  {
    title: "Pour les partenaires",
    description: "Démontrer un MVP EdTech déjà déployable, testable et évolutif."
  }
];

const icons = [School, UserRoundCheck, Rocket];

export default function MvpAudienceProof() {
  return (
    <section className="col-span-12 rounded-[2rem] border border-[#D9E2EC] bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1D4ED8]">
            MVP prêt pour démonstration
          </p>
          <h3 className="text-xl font-black tracking-tight text-[#0F172A]">
            Une interface pensée pour convaincre trois publics
          </h3>
        </div>
        <p className="max-w-xl text-xs font-semibold leading-5 text-[#64748B]">
          Cette version met en avant la valeur pédagogique, la lisibilité du parcours et la crédibilité du produit.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {audiences.map((audience, index) => {
          const Icon = icons[index];

          return (
            <article
              key={audience.title}
              className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
            >
              <div className="mb-3 inline-flex rounded-2xl bg-white p-3 text-[#1D4ED8] shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-black text-[#0F172A]">{audience.title}</h4>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#64748B]">
                {audience.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
