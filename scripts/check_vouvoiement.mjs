import fs from "node:fs";

const files = [
  "server.ts",
  "src/App.tsx",
  "src/components/StudentHistoryPanel.tsx",
  "src/components/ProgressPanel.tsx",
  "src/components/BrevetTracker.tsx",
  "src/data/examCorpus.ts"
];

const forbidden = [
  "ton tuteur",
  "ton choix",
  "tes questions",
  "ton examen",
  "t'accompagner",
  "t’aider",
  "t'aider",
  "t'assurer",
  "ta réponse",
  "Ta réponse",
  "ton exercice",
  "ton feedback",
  "ta réussite",
  "ta prononciation",
  "ton diagnostic",
  "ton historique",
  "ta progression",
  "ta jauge",
  "ton palmarès",
  "Tu as",
  "Tu maîtrises",
  "Tu m'as",
  "As-tu",
  "Peux-tu"
];

let errors = [];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const word of forbidden) {
      if (line.includes(word)) {
        errors.push(`${file}:${index + 1}: ${word}`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error("TUTOIEMENT_INTERDIT_DETECTE");
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("VOUVOIEMENT_CHECK_OK");
