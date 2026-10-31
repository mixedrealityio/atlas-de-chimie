// La figure : le profil d'énergie d'une réaction, une colline à franchir. Douze molécules s'élancent ;
// celles qui ont assez d'énergie passent de l'autre côté.
import * as THREE from 'three';
import { lines, arrow, setArrow, shadeMat, V } from '../engine/parts.js';
import { ball, liveCurve } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { hill: 0 };
const SX = 1.4, Y0 = 1.6, SY = 1.3;
export const W = (x, E) => V(x * SX, Y0 + E * SY, 0);

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -7; x <= 7; x++) grid.push(x, 0.001, -3, x, 0.001, 3); for (let z = -3; z <= 3; z++) grid.push(-7, 0.001, z, 7, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const g = asm('hill', root, { title: 'Le profil d’énergie', sub: 'réactifs, état de transition, produits' });
  g.userData.focus = () => ({ target: [0, Y0 + 1, 0], radius: 5 });
  const pts = cat => Array.from({ length: 161 }, (_, i) => { const x = -4 + 8 * i / 160; return W(x, M.prof(x, cat)); });
  const main = liveCurve(g, { n: 200, r: 0.06, pal: 'ink', name: 'Énergie le long de la réaction' }); main.set(pts(false));
  const gc = asm('cat', root, { title: 'Avec catalyseur', sub: 'un autre chemin, moins haut' });
  const catC = liveCurve(gc, { n: 200, r: 0.06, pal: 'blue', name: 'Chemin avec catalyseur' }); catC.set(pts(true));
  const lv = (y, x0, x1) => [x0 * SX, Y0 + y * SY, 0, x1 * SX, Y0 + y * SY, 0];
  lines(g, [...lv(0, -4, 1.5), ...lv(M.PR.dH, -1, 4), ...lv(M.PR.Ea, -2.2, 0.8)], '#b4b4b8');
  const aEa = arrow(g, 'red', { name: 'Énergie d’activation Ea' }), aH = arrow(g, 'blue', { name: 'Enthalpie de réaction ΔH' }), aC = arrow(gc, 'blue', { name: 'Énergie d’activation avec catalyseur' });
  setArrow(aEa, W(-1.9, 0), V(0, M.PR.Ea * SY, 0)); setArrow(aH, W(1.2, 0), V(0, M.PR.dH * SY, 0)); setArrow(aC, W(-1.2, 0), V(0, M.PR.EaCat * SY, 0));
  label('vec red', '<i>E</i><sub>a</sub>', () => W(-2.3, M.PR.Ea / 2));
  label('vec blue', 'Δ<i>H</i> &lt; 0', () => W(1.75, M.PR.dH / 2));
  label('vec blue', '<i>E</i><sub>a</sub> catalysée', () => st.scene === 'cata' ? W(-2.2, M.PR.EaCat + 0.35) : null);
  label('mark', 'réactifs', () => W(-3.3, 0.45));
  label('mark', 'produits', () => W(3.2, M.PR.dH + 0.45));
  label('mark', 'état de transition', () => st.scene !== 'cata' ? W(0.4, M.PR.Ea + 0.4) : null);
  label('board', '', () => (st.scene === 'temp' || st.scene === 'ea' || st.scene === 'cata') ? V(0, Y0 + 4.2, 0) : null, () => `${st.n} molécules sur 12 ont réagi${st.scene === 'temp' ? (st.hot ? ' (chaud)' : ' (froid)') : ''}`);
  const red = shadeMat('red'), blue = shadeMat('blue');
  const mols = Array.from({ length: M.NB }, (_, i) => ball(g, 'red', 'Une molécule', 0.16));

  function update(s) {
    st = s;
    const cat = s.scene === 'cata', show = s.scene !== 'dh';
    catC.mesh.visible = aC.visible = cat;
    let n = 0;
    mols.forEach((b, i) => {
      const m = M.mol(i, s.clock, s.kT, cat ? M.PR.EaCat : M.PR.Ea); if (m.done) n++;
      const p = W(m.x, M.prof(m.x, cat)); b.position.set(p.x, p.y + 0.17, (i - 5.5) * 0.18); b.material = m.done ? blue : red; b.visible = show;
    });
    s.n = n;
  }
  return { update, labels };
}
