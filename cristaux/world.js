// La figure : quatre cristaux qui tournent lentement. Sel (NaCl), chlorure de césium, diamant, graphite.
import * as THREE from 'three';
import { lines, V } from '../engine/parts.js';
import { atom, bond } from '../engine/chem.js';
import * as M from './model.js';

export const ST = { nacl: 0, cscl: 9, diam: 18, gra: 28 };
const Y = 2;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -5; x <= 33; x++) grid.push(x, 0.001, -5, x, 0.001, 5); for (let z = -5; z <= 5; z++) grid.push(-5, 0.001, z, 33, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const spinners = [];
  function cell(key, title, sub, list, a, k, bonds) {
    const g = asm(key, root, { title, sub }); const X = ST[key];
    g.userData.focus = () => ({ target: [X, Y, 0], radius: a });
    const piv = new THREE.Group(); piv.position.set(X, Y, 0); g.add(piv);
    const P = list.map(t => V(...t.p.map(v => (v - 0.5) * a)));
    list.forEach((t, i) => atom(piv, t.el, P[i].toArray(), typeof k === 'object' ? k[t.el] : k, `${t.el === 'C' ? 'Atome de carbone' : 'Ion ' + t.el + (t.el === 'Cl' ? '⁻' : '⁺')} (compte pour ${['1', '1/2', '1/4', '1/8'][[1, 1 / 2, 1 / 4, 1 / 8].indexOf(M.share(t.p))]})`));
    const e = []; for (const [p, q] of [[[0, 0, 0], [1, 0, 0]], [[0, 0, 0], [0, 1, 0]], [[0, 0, 0], [0, 0, 1]]]) for (const u of [0, 1]) for (const v of [0, 1]) {
      const sh = (pt) => { const r = [...pt]; const free = [0, 1, 2].filter(i => q[i] === 0 && p[i] === 0); r[free[0]] += u; r[free[1]] += v; return r.map(c => (c - 0.5) * a); };
      e.push(...sh(p), ...sh(q)); }
    lines(piv, e, '#26262a');
    if (bonds) for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) if (Math.abs(P[i].distanceTo(P[j]) - bonds) < 0.05) bond(piv, P[i], P[j], 1, 0.05, 'Liaison covalente C–C');
    spinners.push(piv); return piv;
  }
  cell('nacl', 'La maille du sel', 'NaCl, ionique', M.NACL, 3.2, { Na: 0.6, Cl: 1.05 });
  cell('cscl', 'Chlorure de césium', 'CsCl, cubique centré', M.CSCL, 2.6, { Cs: 0.95, Cl: 1.1 });
  cell('diam', 'Le diamant', 'chaque carbone lié à quatre voisins', M.DIAM, 3.4, 0.8, 3.4 * Math.sqrt(3) / 4);
  // graphite : trois feuillets de graphène empilés (ABA)
  const g = asm('gra', root, { title: 'Le graphite', sub: 'des feuillets empilés' }); g.userData.focus = () => ({ target: [ST.gra, Y, 0], radius: 3.5 });
  const piv = new THREE.Group(); piv.position.set(ST.gra, Y, 0); g.add(piv); spinners.push(piv);
  const d = 0.62, gap = 1.45;
  for (let L = 0; L < 3; L++) {
    const pts = [], off = L === 1 ? d : 0;
    for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) for (const s of [0, 1]) {
      const x = 1.5 * d * i + off, z = Math.sqrt(3) * d * (j + i / 2) + s * d * 0;
      const p = s ? V(x + d, 0, z) : V(x, 0, z); if (Math.hypot(p.x, p.z) < 2.6) pts.push(p);
    }
    const y = (L - 1) * gap;
    pts.forEach(p => { p.y = y; atom(piv, 'C', p.toArray(), 0.55, `Atome de carbone (feuillet ${L + 1})`); });
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) if (Math.abs(pts[i].distanceTo(pts[j]) - d) < 0.02) bond(piv, pts[i], pts[j], 1, 0.035, 'Liaison covalente dans le feuillet');
  }
  label('mark', '335 pm entre feuillets', () => st.scene === 'gra' ? V(ST.gra + 3.2, Y + gap / 2, 0) : null);
  const tag = (k, t) => label('vec', t, () => st.scene === k ? V(ST[k], Y + 3.3, 0) : null);
  tag('nacl', 'Na⁺ (violet) et Cl⁻ (vert)'); tag('cscl', 'Cs⁺ au centre, Cl⁻ aux sommets'); tag('diam', 'C, tétraèdres');

  function update(s) { st = s; spinners.forEach((p, i) => { p.rotation.y = s.clock * 0.25 + 0.5 + i; }); }
  return { update, labels };
}
