// La réaction chimique (九年级上册 第五单元 « 化学方程式 » : 质量守恒定律 ; 必修第一册 第二章 « 物质的量 »).
export const NA = 6.022e23;
export const MM = { H: 1.008, C: 12.011, O: 15.999 };
export const MOL = { CH4: MM.C + 4 * MM.H, O2: 2 * MM.O, CO2: MM.C + 2 * MM.O, H2O: 2 * MM.H + MM.O };
// CH₄ + 2 O₂ → CO₂ + 2 H₂O, pour 1 mol de méthane
export const MASS = { CH4: MOL.CH4, O2: 2 * MOL.O2, CO2: MOL.CO2, H2O: 2 * MOL.H2O };
export const left = MASS.CH4 + MASS.O2, right = MASS.CO2 + MASS.H2O;
// chronologie d'un cycle de 8 s : réactifs (0–2 s), réarrangement (2–5 s), produits (5–8 s)
export const phase = c => { const t = ((c % 8) + 8) % 8, u = Math.min(1, Math.max(0, (t - 2) / 3)); return { t, f: u * u * (3 - 2 * u) }; };
// réactif limitant : n(CH₄) et n(O₂) au départ, avancement maximal
export const limit = (nCH4, nO2) => { const x = Math.min(nCH4, nO2 / 2); return { x, CH4: nCH4 - x, O2: nO2 - 2 * x, CO2: x, H2O: 2 * x }; };
