// L'équilibre chimique (选择性必修1 第二章 第二节 « 化学平衡 », 第四节 « 化学反应的调控 » : 合成氨).
// N₂O₄ (incolore) ⇌ 2 NO₂ (brun), ΔH = +57 kJ/mol.
export const NSLOT = 40;
const hash = (i, k) => { let h = (i * 2654435761 + k * 40503) | 0; h = (h ^ (h >>> 15)) * 2246822519 | 0; return ((h ^ (h >>> 13)) >>> 0) / 4294967296; };
// part des molécules de N₂O₄ dissociées à l'équilibre, selon la température (allure qualitative)
export const XT = { 0: 0.15, 25: 0.45, 80: 0.8 };
export const relax = (t, xe) => xe * (1 - Math.exp(-t / 3));
export const CYC = 16;
// chaque « case » est soit une molécule N₂O₄, soit deux NO₂ ; elle change d'état au hasard (équilibre dynamique)
export const isNO2 = (i, t, x) => hash(i, Math.floor(t / 0.8)) < x;
// concentrations normalisées en partant de N₂O₄ pur (1 mol/L) : [N₂O₄] = 1 − x, [NO₂] = 2x
export const conc = t => { const x = relax(t, XT[25]); return { N2O4: 1 - x, NO2: 2 * x }; };
export const K = x => (2 * x) ** 2 / (1 - x);
// synthèse de l'ammoniac : % de NH₃ à l'équilibre (mélange 1:3) — table classique (Larson et Dodge)
export const HAB = { P: [10, 100, 200, 300, 600], T: [300, 400, 500], y: { 300: [14.7, 52.5, 62.8, 71.0, 84.2], 400: [3.9, 25.1, 36.3, 47.0, 65.2], 500: [1.2, 10.6, 17.6, 23.5, 42.2] } };
