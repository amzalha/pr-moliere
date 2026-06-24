import { ExternalLink, Link2, ShieldCheck } from "lucide-react";
import { examSourceCatalog } from "../data/examSourceCatalog";

export default function ExamSourceCatalogPanel() {
  return (
    <div className="bg-white rounded-3xl border-2 border-[#D9E2EC] p-5 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-blue-50 text-blue-700 p-2.5 rounded-2xl">
          <Link2 className="w-5 h-5" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#111111]">
            Sources web référencées
          </h3>
          <p className="text-sm text-[#333333]">
            Liens externes vers les plateformes éducatives. Les contenus ne sont pas copiés dans PR_Molière.
          </p>
        </div>
      </div>

      <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" />
        <p className="text-xs text-[#114433]">
          Utilisation prudente : référencement, métadonnées et orientation seulement. Les sujets réels doivent être autorisés ou reformulés avant intégration.
        </p>
      </div>

      <div className="space-y-3">
        {examSourceCatalog.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="block bg-[#FFFFFF] border border-[#D9E2EC] rounded-2xl p-3 hover:border-[#1D4ED8]/40 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-[#1D4ED8]/10 text-[#1D4ED8] px-2 py-1 rounded-lg text-xs">
                    {source.niveau}
                  </span>
                  <span className="bg-[#F8FAFC] text-[#111111] px-2 py-1 rounded-lg text-xs">
                    {source.source}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#111111]">
                  {source.nom}
                </h4>

                <p className="text-xs text-[#333333] mt-1">
                  {source.usageAutoriseDansPRMoliere}
                </p>
              </div>

              <ExternalLink className="w-4 h-4 text-[#1D4ED8] shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
