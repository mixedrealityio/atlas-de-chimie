// Énergie et vitesse des réactions (选择性必修1 第一章 « 化学反应的热效应 » ; 第二章 第一节 « 化学反应速率 »).
// Profil d'énergie le long de la « coordonnée de réaction » x (unités de la figure).
export const PR = { dH: -1.2, Ea: 2.0, EaCat: 1.0 };
const bump = (x, A) => A * Math.exp(-x * x * 1.2);
const step = (x, dH) => dH * (1 + Math.tanh(1.3 * x)) / 2;
// amplitude A de la bosse telle que le maximum vaille Ea (recherche simple)
function ampFor(Ea, dH) { let lo = 0, hi = 6; for (let k = 0; k < 50; k++) { const A = (lo + hi) / 2; let m = -9; for (let x = -3; x <= 3; x += 0.01) m = Math.max(m, bump(x, A) + step(x, dH)); m > Ea ? hi = A : lo = A; } return (lo + hi) / 2; }
export const AMP = ampFor(PR.Ea, PR.dH), AMPC = ampFor(PR.EaCat, PR.dH);
export const prof = (x, cat = false, dH = PR.dH) => step(x, dH) + bump(x, cat ? AMPC : AMP);
// 12 molécules ; une tentative toutes les 2 s ; énergie tirée selon une loi exponentielle (Boltzmann)
export const NB = 12, PER = 2, CYCLE = 20;
const hash = (i, k) => { let h = (i * 374761393 + k * 668265263) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
export const energy = (i, k, kT) => -kT * Math.log(1 - hash(i, k) * 0.999999);
// état d'une molécule : position x sur le profil, et si elle est passée
export function mol(i, clock, kT, barrier) {
  const t = ((clock % CYCLE) + CYCLE) % CYCLE, off = (i * 0.37) % PER;
  let crossed = -1;
  for (let k = 0; k * PER + off <= t; k++) if (energy(i, k, kT) > barrier) { crossed = k; break; }
  const k = Math.floor((t - off) / PER), u = (t - off - k * PER) / 1.2;
  if (crossed >= 0 && k > crossed) return { x: 3 + 0.25 * Math.sin(clock * 3 + i), done: true };
  if (k < 0 || u > 1) return { x: -3 + 0.25 * Math.sin(clock * 3 + i), done: false };
  const E = energy(i, k, kT);
  if (crossed === k) return { x: -3 + 6 * u, done: u > 0.5 };
  // monte jusqu'à l'énergie E puis redescend
  let xm = -3; while (xm < 0 && prof(xm + 0.02, barrier < 1.5) < E) xm += 0.02;
  return { x: -3 + (xm + 3) * Math.sin(Math.PI * u), done: false };
}
export const KT = { low: 0.55, high: 1.0 };
// loi d'Arrhenius pour une vraie réaction : Ea = 50 kJ/mol
export const R = 8.314;
export const arr = (Ea, T1, T2) => Math.exp(Ea / R * (1 / T1 - 1 / T2));
export const boltz = (E, kT) => 2 * Math.sqrt(E / Math.PI) * kT ** -1.5 * Math.exp(-E / kT);
