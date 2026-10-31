// La figure : les orbitales s, p et d dessinées comme des surfaces (rouge : signe +, bleu : signe −),
// puis le remplissage des sous-couches de l'hydrogène au krypton.
import * as THREE from 'three';
import { part, box, lines, shadeMat, V } from '../engine/parts.js';
import { ball, rod, rodTo } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { s: 0, p: 12, d: 25, auf: 42 };
const Y = 2.2;

// surface polaire r = scale · max(±f(direction), 0)
function lobeGeo(f, sign, scale, nT = 48, nP = 64) {
  const pos = [], idx = [];
  for (let i = 0; i <= nT; i++) { const t = Math.PI * i / nT; for (let j = 0; j <= nP; j++) { const p = 2 * Math.PI * j / nP, d = [Math.sin(t) * Math.cos(p), Math.cos(t), Math.sin(t) * Math.sin(p)], r = scale * Math.max(0, sign * f(...d)); pos.push(d[0] * r, d[1] * r, d[2] * r); } }
  for (let i = 0; i < nT; i++) for (let j = 0; j < nP; j++) { const a = i * (nP + 1) + j, b = a + nP + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals(); return g;
}

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -6; x <= 48; x++) grid.push(x, 0.001, -4, x, 0.001, 4); for (let z = -4; z <= 4; z++) grid.push(-6, 0.001, z, 48, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const spin = [];
  function orbital(key, title, f, x, scale, sc) {
    const g = asm(key, root, { title, sub: 'rouge : fonction d’onde positive ; bleu : négative' }); g.userData.focus = () => ({ target: [x, Y, 0], radius: 1.6 });
    const piv = new THREE.Group(); piv.position.set(x, Y, 0); g.add(piv); spin.push([piv, sc]);
    for (const [sgn, pal] of [[1, 'red'], [-1, 'blue']]) { const m = part(piv, lobeGeo(f, sgn, scale), { pal, tone: 'hi', name: title }); m.userData.noEdge = true; }
    ball(piv, 'ink', 'Noyau', 0.06);
    const ax = []; for (const [a, b] of [[[-1.6, 0, 0], [1.6, 0, 0]], [[0, -1.6, 0], [0, 1.6, 0]], [[0, 0, -1.6], [0, 0, 1.6]]]) ax.push(...a, ...b); lines(piv, ax, '#9c9ca2');
    return piv;
  }
  // 0 · s : 1s (une sphère) et 2s (une sphère dans une sphère, de signes opposés)
  orbital('o1s', 'Orbitale 1s', M.ANG.s, ST.s - 2.2, 1.0, 's');
  const g2 = asm('o2s', root, { title: 'Orbitale 2s', sub: 'une surface nodale sphérique' }); g2.userData.focus = () => ({ target: [ST.s + 2.6, Y, 0], radius: 2 });
  const out = part(g2, new THREE.SphereGeometry(1.6, 40, 28), { pal: 'red', tone: 'hi', name: 'Orbitale 2s : partie externe (+)', pos: [ST.s + 2.6, Y, 0], mat: shadeMat('red', { opacity: 0.3 }) }); out.userData.noEdge = true;
  part(g2, new THREE.SphereGeometry(0.55, 32, 20), { pal: 'blue', tone: 'hi', name: 'Orbitale 2s : partie interne (−)', pos: [ST.s + 2.6, Y, 0] });
  label('vec', '1s', () => st.scene === 's' ? V(ST.s - 2.2, Y + 2.0, 0) : null); label('vec', '2s', () => st.scene === 's' ? V(ST.s + 2.6, Y + 2.2, 0) : null);
  // 1 · p
  [['px', 'p<sub>x</sub>'], ['py', 'p<sub>y</sub>'], ['pz', 'p<sub>z</sub>']].forEach(([k, n], i) => { const x = ST.p + (i - 1) * 3.4; orbital(k, `Orbitale 2${n.replace(/<\/?sub>/g, '')}`, M.ANG[k], x, 1.3, 'p'); label('vec', n, () => st.scene === 'p' ? V(x, Y + 2.0, 0) : null); });
  // 2 · d
  M.DNAMES.forEach(([k, n], i) => { const x = ST.d + (i - 2) * 3.3; orbital(k, `Orbitale 3${n.replace(/<\/?sub>/g, '')}`, M.ANG[k], x, 1.45, 'd'); label('vec', n, () => st.scene === 'd' ? V(x, Y + 2.1, 0) : null); });

  // 3 · le remplissage
  const XA = ST.auf, gA = asm('auf', root, { title: 'Le diagramme des niveaux', sub: 'chaque case contient au plus 2 électrons' });
  gA.userData.focus = () => ({ target: [XA, 3.5, 0], radius: 4 });
  const W = 0.62, slots = {};
  for (const [n, cap, e] of M.SUB) {
    const nb = cap / 2, y = 0.6 + e * 0.85, x0 = XA - (nb - 1) * W / 2 + (n[1] === 's' ? -2.6 : n[1] === 'p' ? 0 : 2.9) * 0 ;
    const xs = Array.from({ length: nb }, (_, k) => XA + (n[1] === 's' ? -3.2 : n[1] === 'p' ? -0.6 : 2.3) + k * W);
    xs.forEach(x => { const e2 = []; for (const [a, b] of [[[-0.28, -0.25], [0.28, -0.25]], [[0.28, -0.25], [0.28, 0.25]], [[0.28, 0.25], [-0.28, 0.25]], [[-0.28, 0.25], [-0.28, -0.25]]]) e2.push(x + a[0], y + a[1], 0, x + b[0], y + b[1], 0); lines(gA, e2, '#26262a'); });
    label('mark', n, () => st.scene === 'auf' ? V(xs[0] - 0.65, y, 0) : null);
    slots[n] = xs.map(x => [0, 1].map(k => { const a = rod(gA, { r: 0.035, pal: k ? 'blue' : 'red', name: k ? 'Électron de spin ↓' : 'Électron de spin ↑' }); const dx = k ? 0.1 : -0.1; rodTo(a, V(x + dx, y + (k ? 0.18 : -0.18), 0.02), V(x + dx, y + (k ? -0.18 : 0.18), 0.02)); const tip = ball(gA, k ? 'blue' : 'red', 'Pointe de flèche', 0.06); tip.position.set(x + dx, y + (k ? -0.18 : 0.18), 0.02); return [a, tip]; }));
  }
  part(gA, box(0.06, 6.8, 0.06, 0.01), { pal: 'dark', tone: 'mid', name: 'Axe des énergies', pos: [XA - 4.6, 3.6, 0] });
  label('mark', 'énergie ↑', () => st.scene === 'auf' ? V(XA - 4.6, 7.3, 0) : null);
  label('board', '', () => st.scene === 'auf' ? V(XA - 1.8, 7.9, 0) : null, () => `${M.SYM[st.Z - 1]} (Z = ${st.Z}) : ${M.confStr(st.Z)}`);

  function update(s) {
    st = s;
    spin.forEach(([p, k]) => { p.rotation.y = s.clock * 0.3 + (k === 'd' ? 0.6 : 0.4); p.rotation.x = 0.25; });
    const c = M.config(s.Z);
    for (const [n, cap] of M.SUB) { const b = M.boxes(c[n] || 0, cap); slots[n].forEach((pair, i) => pair.forEach(([a, tip], k) => { a.visible = tip.visible = b[i] > k; })); }
  }
  return { update, labels };
}
