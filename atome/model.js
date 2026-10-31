// L'atome (九年级上册 第三单元 « 物质构成的奥秘 » ; 必修第一册 第四章 « 物质结构 元素周期律 »).
// Les 18 premiers éléments : symbole, nom, nombre de neutrons de l'isotope le plus abondant.
export const ELTS = [
  ['H', 'hydrogène', 0], ['He', 'hélium', 2], ['Li', 'lithium', 4], ['Be', 'béryllium', 5], ['B', 'bore', 6], ['C', 'carbone', 6],
  ['N', 'azote', 7], ['O', 'oxygène', 8], ['F', 'fluor', 10], ['Ne', 'néon', 10], ['Na', 'sodium', 12], ['Mg', 'magnésium', 12],
  ['Al', 'aluminium', 14], ['Si', 'silicium', 14], ['P', 'phosphore', 16], ['S', 'soufre', 16], ['Cl', 'chlore', 18], ['Ar', 'argon', 22],
].map(([s, nom, n], i) => ({ Z: i + 1, s, nom, n }));
// remplissage des couches K, L, M (règle simple valable jusqu'à Z = 18 : 2, 8, 8)
export const shells = Z => { const c = []; let r = Z; for (const cap of [2, 8, 8]) { if (r <= 0) break; c.push(Math.min(cap, r)); r -= cap; } return c; };
export const zOf = c => 1 + Math.floor(((c % 36) + 36) % 36 / 2);         // un élément toutes les 2 s
// chlore : deux isotopes
export const CL = [{ A: 35, m: 34.969, p: 0.7576 }, { A: 37, m: 36.966, p: 0.2424 }];
export const mCl = CL.reduce((s, i) => s + i.m * i.p, 0);                   // ≈ 35,45
// carbone : trois isotopes
export const CISO = [{ A: 12, n: 6, info: '98,9 %, stable' }, { A: 13, n: 7, info: '1,1 %, stable' }, { A: 14, n: 8, info: 'traces, radioactif (5 730 ans)' }];
// un noyau compact : N billes rangées sur une spirale dans une boule
export function packNucleus(N, r0 = 0.13) {
  const R = r0 * Math.cbrt(Math.max(N, 1)), out = [], g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) { const u = N === 1 ? 0 : 1 - 2 * (i + 0.5) / N, rr = Math.sqrt(1 - u * u), a = g * i, d = R * Math.cbrt((i + 0.5) / N);
    out.push([d * rr * Math.cos(a), d * u, d * rr * Math.sin(a)]); }
  return out;
}
