export function sanitizeTutorText(value: string): string {
  return value
    .replace(/\b(Chère|Cher)\s+élève\s*,?/gi, "Bonjour,")
    .replace(/\s*,?\s*jeune\s+élève\s*:/gi, " :")
    .replace(/\s*,?\s*jeune\s+eleve\s*:/gi, " :")
    .replace(/\s*,?\s*jeune\s+élève\s*!/gi, " !")
    .replace(/\s*,?\s*jeune\s+eleve\s*!/gi, " !")
    .replace(/\s*,?\s*jeune\s+élève\b/gi, "")
    .replace(/\s*,?\s*jeune\s+eleve\b/gi, "")
    .replace(/\s+([,.;!?])/g, "$1")
    .replace(/\s+:/g, " :")
    .replace(/,\s*,/g, ",")
    .replace(/Bonjour,\s*!/g, "Bonjour !");
}
