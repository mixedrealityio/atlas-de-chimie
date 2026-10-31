// La figure : une molécule de méthane et deux de dioxygène dont les atomes se réarrangent
// en une molécule de dioxyde de carbone et deux d'eau.
import * as THREE from 'three';
import { part, box, lines, V } from '../engine/parts.js';
import { sizedBox, setBox } from '../engine/kit.js';
import { atom, bond, molecule, TETRA } from '../engine/chem.js';
import * as M from './model.js';

export const ST = { rx: 0 };
const Y = 1.5;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -7; x <= 7; x++) grid.push(x, 0.001, -5, x, 0.001, 5); for (let z = -5; z <= 5; z++) grid.push(-7, 0.001, z, 7, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const g = asm('rx', root, { title: 'La combustion du méthane', sub: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O' });
  g.userData.focus = () => ({ target: [0, Y, 0], radius: 4.5 });

  // positions de départ et d'arrivée de chacun des 9 atomes
  const C0 = V(-3.6, Y, 0), Hs = TETRA.map(d => C0.clone().add(V(...d).multiplyScalar(1.0)));
  const A = [
    ['C', C0, V(2.9, Y, 0)],
    ['H', Hs[0], V(2.15, Y + 0.6, -2.0)], ['H', Hs[1], V(3.65, Y + 0.6, -2.0)],
    ['H', Hs[2], V(2.15, Y + 0.6, 2.0)], ['H', Hs[3], V(3.65, Y + 0.6, 2.0)],
    ['O', V(-1.9, Y, -1.6), V(1.7, Y, 0)], ['O', V(-0.7, Y, -1.6), V(2.9, Y, -2.0)],
    ['O', V(-1.9, Y, 1.6), V(4.1, Y, 0)], ['O', V(-0.7, Y, 1.6), V(2.9, Y, 2.0)],
  ];
  const balls = A.map(([el, p]) => atom(g, el, p.toArray()));
  const rb = [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [5, 6, 2], [7, 8, 2]].flatMap(([i, j, o]) => bond(g, A[i][1], A[j][1], o));
  const pb = [[5, 0, 2], [7, 0, 2], [6, 1, 1], [6, 2, 1], [8, 3, 1], [8, 4, 1]].flatMap(([i, j, o]) => bond(g, A[i][2], A[j][2], o));
  // la molécule de méthane en trop (page « réactif limitant »)
  const extra = molecule(g, { atoms: [['C', 0, 0, 0], ...TETRA.map(d => ['H', ...d])], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]] }, { at: [-3.6, Y, 3.4] });
  label('mark', 'CH₄ en excès', () => st.scene === 'limit' ? V(-3.6, Y + 1.3, 3.4) : null);
  label('vec', 'CH₄', () => st.f < 0.05 && st.scene !== 'mass' ? V(-3.6, Y + 1.5, 0) : null);
  label('vec', '2 O₂', () => st.f < 0.05 && st.scene !== 'mass' ? V(-1.3, Y + 1.0, -2.4) : null);
  label('vec', 'CO₂', () => st.f > 0.95 && st.scene !== 'mass' ? V(2.9, Y + 1.0, 0.6) : null);
  label('vec', '2 H₂O', () => st.f > 0.95 && st.scene !== 'mass' ? V(4.6, Y + 1.0, 2.2) : null);

  // la balance des masses : deux piles de barres, réactifs à gauche, produits à droite
  const K = 2.6 / 80, Z = -5.6;
  const bars = { CH4: sizedBox(g, { pal: 'dark', name: 'Masse de méthane (16 g)' }), O2: sizedBox(g, { pal: 'red', name: 'Masse de dioxygène (64 g)' }), CO2: sizedBox(g, { pal: 'ink', name: 'Masse de dioxyde de carbone (44 g)' }), H2O: sizedBox(g, { pal: 'blue', name: 'Masse d’eau (36 g)' }) };
  const plinths = [-3, 3].map(x => part(g, box(1.4, 0.06, 1.4, 0.01), { pal: 'dark', tone: 'lo', name: 'Socle', pos: [x, 0.03, Z] }));
  const tag = (k, x, lo, hi) => label('mark', '', () => st.scene === 'mass' ? V(x + 1.05, (lo + hi) / 2, Z) : null, () => `${k.replace('2', '₂').replace('4', '₄')} ${M.MASS[k].toFixed(0)} g`);
  const lay = { CH4: [-3, 0, M.MASS.CH4], O2: [-3, M.MASS.CH4, M.left], CO2: [3, 0, M.MASS.CO2], H2O: [3, M.MASS.CO2, M.right] };
  for (const [k, [x, a, b]] of Object.entries(lay)) tag(k, x, 0.06 + a * K, 0.06 + b * K);
  label('board', '', () => st.scene === 'mass' ? V(0, 3.6, Z) : null, () => `${M.left.toFixed(1).replace('.', ',')} g = ${M.right.toFixed(1).replace('.', ',')} g`);

  function update(s) {
    st = s;
    A.forEach(([, p, q], i) => { const b = balls[i]; b.position.copy(p).lerp(q, s.f); b.position.y += 1.2 * Math.sin(Math.PI * s.f) * (i % 2 ? 1 : -0.4); });
    rb.forEach(m => { m.visible = s.f < 0.02; }); pb.forEach(m => { m.visible = s.f > 0.98; });
    extra.visible = s.scene === 'limit';
    for (const [k, [x, a, b]] of Object.entries(lay)) { setBox(bars[k], x - 0.5, x + 0.5, 0.06 + a * K, 0.06 + b * K, Z - 0.5, Z + 0.5); bars[k].visible = bars[k].visible && s.scene === 'mass'; }
    plinths.forEach(p => { p.visible = s.scene === 'mass'; });
  }
  return { update, labels };
}
