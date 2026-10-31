// La figure : les 36 premiers éléments rangés en tableau périodique, chaque case est une colonne dont la hauteur
// montre une propriété (rayon, électronégativité, énergie d'ionisation).
import * as THREE from 'three';
import { lines, V } from '../engine/parts.js';
import { sizedBox, setBox } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { pt: 0 };
const W = 0.9;
export const pos = Z => { const [p, g] = M.cell(Z); return [(g - 9.5) * W, (p - 2.5) * W]; };

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -10; x <= 10; x++) grid.push(x, 0.001, -4, x, 0.001, 4); for (let z = -4; z <= 4; z++) grid.push(-10, 0.001, z, 10, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const groups = {};
  for (const [k, [, nom]] of Object.entries(M.FAM)) { groups[k] = asm(k, root, { title: nom[0].toUpperCase() + nom.slice(1), sub: 'une famille du tableau' }); }
  const cols = M.E.map(e => { const m = sizedBox(groups[e.fam], { pal: M.FAM[e.fam][0], tone: 'hi', name: `${e.nom} (${e.s}, Z = ${e.Z}) · ${e.cn}` }); return m; });
  const hNow = M.E.map(() => 0.25);
  M.E.forEach((e, i) => { const [x, z] = pos(e.Z); label('mark', e.s, () => V(x, hNow[i] + 0.22, z)); });
  for (const k of Object.keys(groups)) { const ids = M.E.filter(e => e.fam === k).map(e => pos(e.Z)); const cx = ids.reduce((s, p) => s + p[0], 0) / ids.length, cz = ids.reduce((s, p) => s + p[1], 0) / ids.length; groups[k].userData.focus = () => ({ target: [cx, 0.5, cz], radius: 2.5 }); }
  label('board', '', () => st.scene !== 'table' ? V(0, 4.2, -2.6) : null, () => `${M.PROP[st.scene].label}${M.PROP[st.scene].unit ? ' (' + M.PROP[st.scene].unit + ')' : ''}`);
  let lastT = null;

  function update(s) {
    st = s;
    const P = M.PROP[s.scene] || M.PROP.table, dt = lastT === null ? 1 : Math.min(1, Math.max(0, (s.clock - lastT) * 3)); lastT = s.clock;
    M.E.forEach((e, i) => { const target = P.h(e); hNow[i] += (target - hNow[i]) * (s.reduced ? 1 : dt); const [x, z] = pos(e.Z); setBox(cols[i], x - W * 0.44, x + W * 0.44, 0, Math.max(0.02, hNow[i]), z - W * 0.44, z + W * 0.44); });
  }
  return { update, labels };
}
