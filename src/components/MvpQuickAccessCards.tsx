import { BookOpen, Brain, ClipboardCheck, Trophy } from "lucide-react";

type MvpQuickAccessCardsProps = {
  onOpenExams: () => void;
  onOpenProgress: () => void;
};

const cards = [
  {
    title: "Examens structurés",
    description: "Accédez rapidement aux sujets 1AC, 2AC et 3AC avec critères de réussite.",
    icon: BookOpen,
    action: "Explorer",
    variant: "blue" as const
  },
  {
    title: "Tuteur IA",
    description: "Posez une question en français et obtenez une aide pédagogique claire.",
    icon: Brain,
    action: "Questionner",
    variant: "amber" as const
  },
  {
    title: "Progression",
    description: "Suivez les réussites, l’assiduité et les acquis de l’élève.",
    icon: Trophy,
    action: "Voir",
    variant: "green" as const
  },
  {
    title: "Préparation brevet",
    description: "Présentez une démonstration crédible pour enseignants et partenaires.",
    icon: ClipboardCheck,
    action: "Préparer",
    variant: "slate" as const
  }
];

const variantClasses = {
  blue: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
  amber: "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]",
  green: "bg-[#ECFDF5] text-[#166534] border-[#BBF7D0]",
  slate: "bg-[#F8FAFC] text-[#334155] border-[#CBD5E1]"
};

export default function MvpQuickAccessCards({
  onOpenExams,
  onOpenProgress
}: MvpQuickAccessCardsProps) {
  const handleAction = (title: string) => {
    if (title === "Examens structurés") onOpenExams();
    if (title === "Progression") onOpenProgress();
    if (title === "Tuteur IA") {
      document.getElementById("chat-sandbox")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (title === "Préparation brevet") onOpenProgress();
  };

  return (
    <section className="col-span-12 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <button
            key={card.title}
            type="button"
            onClick={() => handleAction(card.title)}
            className="group rounded-3xl border border-[#D9E2EC] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`mb-4 inline-flex rounded-2xl border p-3 ${variantClasses[card.variant]}`}>
              <Icon className="h-5 w-5" />
            </div>

            <h3 className="text-sm font-black text-[#0F172A]">{card.title}</h3>
            <p className="mt-2 min-h-[3rem] text-xs font-semibold leading-5 text-[#64748B]">
              {card.description}
            </p>

            <span className="mt-4 inline-flex text-xs font-black text-[#1D4ED8] group-hover:underline">
              {card.action}
            </span>
          </button>
        );
      })}
    </section>
  );
}
