// Les cristaux (选择性必修2 第三章 « 晶体结构与性质 » : 晶胞, 离子晶体, 共价晶体, 混合型晶体 (石墨)).
// Positions en fraction de maille. Comptage : sommet 1/8, arête 1/4, face 1/2, centre 1 (均摊法).
const bin = [0, 0.5, 1];
export const NACL = []; for (const x of bin) for (const y of bin) for (const z of bin) NACL.push({ el: (Math.round(2 * (x + y + z)) % 2) ? 'Na' : 'Cl', p: [x, y, z] });
export const CSCL = [...[0, 1].flatMap(x => [0, 1].flatMap(y => [0, 1].map(z => ({ el: 'Cl', p: [x, y, z] })))), { el: 'Cs', p: [0.5, 0.5, 0.5] }];
const fcc = []; for (const x of bin) for (const y of bin) for (const z of bin) { const k = [x, y, z].filter(v => v === 0.5).length; if (k === 0 || k === 2) fcc.push([x, y, z]); }
export const DIAM = [...fcc, [0.25, 0.25, 0.25], [0.75, 0.75, 0.25], [0.75, 0.25, 0.75], [0.25, 0.75, 0.75]].map(p => ({ el: 'C', p }));
export function share(p) { const k = p.filter(v => v === 0 || v === 1).length; return [1, 1 / 2, 1 / 4, 1 / 8][k]; }
export const count = (list, el) => list.filter(a => a.el === el).reduce((s, a) => s + share(a.p), 0);
// données réelles
export const A = { NaCl: 564.0, CsCl: 412.3, diamant: 356.7 };            // paramètre de maille (pm)
export const NAv = 6.022e23;
export const rho = (Z, M, a) => Z * M / NAv / (a * 1e-10) ** 3;           // g/cm³
// graphite : couches de graphène, C–C = 142 pm, écart entre couches = 335 pm
export const GR = { cc: 142, d: 335 };
