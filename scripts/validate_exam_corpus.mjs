import fs from 'node:fs';

const filePath = 'src/data/examCorpus.ts';

if (!fs.existsSync(filePath)) {
  console.error('CORPUS_VALIDATION=ERREUR');
  console.error('Fichier introuvable: ' + filePath);
  process.exit(1);
}

const text = fs.readFileSync(filePath, 'utf8');

const subjectIds = [...text.matchAll(/id:\s*'(modele-[^']+)'/g)].map((m) => m[1]);
const niveaux = [...text.matchAll(/niveau:\s*'([^']+)'/g)].map((m) => m[1]);
const types = [...text.matchAll(/typeEvaluation:\s*'([^']+)'/g)].map((m) => m[1]);
const baremes = [...text.matchAll(/baremeTotal:\s*(\d+)/g)].map((m) => Number(m[1]));

const allowedLevels = new Set(['1AC', '2AC', '3AC']);
const allowedTypes = new Set(['controle_continu', 'examen_local', 'examen_regional']);

const errors = [];

if (subjectIds.length === 0) {
  errors.push('Aucun sujet modèle trouvé');
}

if (new Set(subjectIds).size !== subjectIds.length) {
  errors.push('IDs de sujets dupliqués');
}

for (const niveau of niveaux) {
  if (!allowedLevels.has(niveau)) {
    errors.push('Niveau invalide: ' + niveau);
  }
}

for (const type of types) {
  if (!allowedTypes.has(type)) {
    errors.push('Type evaluation invalide: ' + type);
  }
}

for (const bareme of baremes) {
  if (!Number.isFinite(bareme) || bareme <= 0) {
    errors.push('Barème invalide: ' + bareme);
  }
}

const countBy = (items) => {
  const result = {};
  for (const item of items) result[item] = (result[item] || 0) + 1;
  return result;
};

console.log('=== RAPPORT CORPUS EXAMENS ===');
console.log('TOTAL_SUJETS=' + subjectIds.length);
console.log('IDS_SUJETS_UNIQUES=' + new Set(subjectIds).size);
console.log('NIVEAUX=' + JSON.stringify(countBy(niveaux)));
console.log('TYPES_EVALUATION=' + JSON.stringify(countBy(types)));
console.log('BAREMES=' + JSON.stringify(baremes));

if (errors.length > 0) {
  console.log('CORPUS_VALIDATION=ERREUR');
  for (const error of errors) console.log('- ' + error);
  process.exit(1);
}

console.log('CORPUS_VALIDATION=OK');
