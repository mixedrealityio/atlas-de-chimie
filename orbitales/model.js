// Les orbitales atomiques (选择性必修2 第一章 « 原子结构与性质 » : 能层与能级, 原子轨道, 构造原理 ;
// prépa : orbitales hydrogénoïdes, règle de Klechkowski, règle de Hund).
// partie angulaire réelle, avec y vers le haut (l'axe z des chimistes)
export const ANG = {
  s: () => 1,
  px: (x, y, z) => x, py: (x, y, z) => z, pz: (x, y, z) => y,
  dz2: (x, y, z) => (3 * y * y - 1) / 2, dxz: (x, y, z) => 1.7 * x * y, dyz: (x, y, z) => 1.7 * z * y,
  dxy: (x, y, z) => 1.7 * x * z, dx2y2: (x, y, z) => 0.87 * (x * x - z * z),
};
export const DNAMES = [['dz2', 'd<sub>z²</sub>'], ['dxz', 'd<sub>xz</sub>'], ['dyz', 'd<sub>yz</sub>'], ['dxy', 'd<sub>xy</sub>'], ['dx2y2', 'd<sub>x²−y²</sub>']];
// densité radiale de probabilité (rayon en unités de a₀ = 52,9 pm)
export const P1s = r => 4 * r * r * Math.exp(-2 * r);
export const P2s = r => r * r * (2 - r) ** 2 * Math.exp(-r) / 8;
// ordre de remplissage (Klechkowski) et capacités
export const SUB = [['1s', 2, 0], ['2s', 2, 1], ['2p', 6, 2], ['3s', 2, 3], ['3p', 6, 4], ['4s', 2, 5], ['3d', 10, 5.7], ['4p', 6, 6.6]];
export const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr'.split(' ');
export function config(Z) {
  const c = {}; let r = Z; for (const [n, cap] of SUB) { const k = Math.min(cap, r); c[n] = k; r -= k; }
  if (Z === 24 || Z === 29) { c['4s'] = 1; c['3d'] += 1; }                     // Cr et Cu : exceptions
  return c;
}
export const confStr = Z => { const c = config(Z); return SUB.filter(([n]) => c[n]).sort((a, b) => a[0].localeCompare(b[0]) * 0 + (parseInt(a[0]) - parseInt(b[0]) || 'spd'.indexOf(a[0][1]) - 'spd'.indexOf(b[0][1]))).map(([n]) => `${n}<sup>${c[n]}</sup>`).join(' '); };
// électrons d'une sous-couche répartis dans ses cases (Hund : d'abord un par case, spins parallèles)
export function boxes(n, cap) { const nb = cap / 2, out = Array.from({ length: nb }, () => 0); for (let e = 0; e < n; e++) out[e % nb] += 1; return out; }
export const zOf = c => 1 + Math.floor(((c % 54) + 54) % 54 / 1.5);
