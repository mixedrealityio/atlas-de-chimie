// La figure : quinze béchers de pH 0 à 14 teintés à l'indicateur universel, trois dilutions d'acide
// chlorhydrique, et un dosage acide-base à la burette.
import * as THREE from 'three';
import { part, box, cyl, lines, shadeMat, V } from '../engine/parts.js';
import { rod, rodTo } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { ph: 0, dil: 15, titr: 26 };

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -8; x <= 30; x++) grid.push(x, 0.001, -4, x, 0.001, 4); for (let z = -4; z <= 4; z++) grid.push(-8, 0.001, z, 30, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const liquid = c => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.8 });
  function beaker(g, x, z, r, h, fill, color, name) {
    const glass = part(g, new THREE.CylinderGeometry(r, r, h, 32, 1, true), { pal: 'paper', tone: 'lo', name, pos: [x, h / 2, z], mat: shadeMat('paper', { opacity: 0.25 }) }); glass.userData.noEdge = true;
    const rim = []; for (let i = 0; i < 40; i++) { const a = 2 * Math.PI * i / 40, b = 2 * Math.PI * (i + 1) / 40; for (const y of [0.01, h]) rim.push(x + r * Math.cos(a), y, z + r * Math.sin(a), x + r * Math.cos(b), y, z + r * Math.sin(b)); }
    lines(g, rim, '#8a8a8f');
    const liq = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.96, r * 0.96, 1, 32), liquid(color)); liq.userData.noEdge = true; liq.userData.part = name;
    liq.scale.y = h * fill; liq.position.set(x, h * fill / 2 + 0.01, z); g.add(liq);
    return liq;
  }

  // ---------- 0 · l'échelle de pH ----------
  const gP = asm('ph', root, { title: 'L’échelle de pH', sub: 'de 0 (très acide) à 14 (très basique)' });
  gP.userData.focus = () => ({ target: [ST.ph, 0.6, 0], radius: 6.5 });
  M.EX.concat([[1, '']]).sort((a, b) => a[0] - b[0]).forEach(([p]) => {
    const x = ST.ph + (p - 7) * 0.9; beaker(gP, x, 0, 0.36, 1.1, 0.7, M.uiColor(p), `Solution de pH ${p}`);
    label('mark', String(p), () => st.scene === 'ph' ? V(x, 1.35, 0) : null);
  });
  label('vec red', 'acide', () => st.scene === 'ph' ? V(ST.ph - 4.5, 2.0, 0) : null);
  label('mark', 'neutre', () => st.scene === 'ph' ? V(ST.ph, 2.0, 0) : null);
  label('vec blue', 'basique', () => st.scene === 'ph' ? V(ST.ph + 4.5, 2.0, 0) : null);

  // ---------- 1 · trois dilutions ----------
  const gD = asm('dil', root, { title: 'Trois dilutions', sub: 'chaque fois dix fois moins d’ions H₃O⁺' });
  gD.userData.focus = () => ({ target: [ST.dil, 1, 0], radius: 4 });
  const ionsGeo = new THREE.SphereGeometry(0.06, 10, 8);
  M.DIL.forEach((d, i) => {
    const x = ST.dil + (i - 1) * 2.6; beaker(gD, x, 0, 0.95, 2.2, 0.85, M.uiColor(d.pH), `Acide chlorhydrique à ${d.c} mol/L`);
    const m = new THREE.InstancedMesh(ionsGeo, shadeMat('red'), d.n); m.userData.noEdge = true; m.userData.part = 'Ion H₃O⁺'; gD.add(m);
    let s = 3 + i; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647; const T4 = new THREE.Matrix4();
    for (let k = 0; k < d.n; k++) { const a = rnd() * 2 * Math.PI, r = 0.8 * Math.sqrt(rnd()); T4.makeTranslation(x + r * Math.cos(a), 0.15 + rnd() * 1.6, r * Math.sin(a)); m.setMatrixAt(k, T4); }
    label('mark', '', () => st.scene === 'dil' ? V(x, 2.6, 0) : null, () => `${['10⁻¹', '10⁻²', '10⁻³'][i]} mol/L<br>pH = ${d.pH}`);
  });

  // ---------- 2 · le dosage ----------
  const X = ST.titr;
  const gT = asm('titr', root, { title: 'Le dosage', sub: 'de la soude versée goutte à goutte dans l’acide' });
  gT.userData.focus = () => ({ target: [X, 2, 0], radius: 3.5 });
  const flask = beaker(gT, X, 0, 0.9, 1.6, 0.4, '#f4f4f0', 'Bécher : 20 mL d’acide chlorhydrique + phénolphtaléine');
  part(gT, cyl(0.6, 0.08, 24), { pal: 'dark', tone: 'mid', name: 'Pied du support', pos: [X - 1.8, 0.04, 0] });
  rodTo(rod(gT, { r: 0.05, pal: 'dark', name: 'Tige du support' }), V(X - 1.8, 0, 0), V(X - 1.8, 6, 0));
  rodTo(rod(gT, { r: 0.04, pal: 'dark', name: 'Pince' }), V(X - 1.8, 4.6, 0), V(X, 4.6, 0));
  const bur = part(gT, new THREE.CylinderGeometry(0.14, 0.14, 3.2, 20, 1, true), { pal: 'paper', tone: 'lo', name: 'Burette de soude à 0,10 mol/L', pos: [X, 4.0, 0], mat: shadeMat('paper', { opacity: 0.3 }) }); bur.userData.noEdge = true;
  const burLiq = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1, 16), liquid('#cfd8e8')); burLiq.userData.noEdge = true; gT.add(burLiq);
  rodTo(rod(gT, { r: 0.03, pal: 'dark', name: 'Robinet' }), V(X, 2.4, 0), V(X, 2.0, 0));
  const drop = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), liquid('#cfd8e8')); drop.userData.noEdge = true; gT.add(drop);
  label('board', '', () => st.scene === 'titr' ? V(X + 2.4, 3.6, 0) : null, () => `<i>V</i><sub>soude</sub> = ${fr(st.Vb, 1)} mL<br>pH = ${fr(M.pHt(st.Vb), 2)}`);
  const pink = new THREE.Color('#e45aa8'), clear = new THREE.Color('#f4f4f0');

  function update(s) {
    st = s;
    const v = s.Vb, f = v / M.T.Vmax;
    burLiq.scale.y = 3 * (1 - f) + 0.01; burLiq.position.set(X, 2.45 + 1.5 * (1 - f), 0);
    flask.scale.y = 1.6 * (0.4 + 0.35 * f); flask.position.y = flask.scale.y / 2 + 0.01;
    flask.material.color.copy(clear).lerp(pink, M.phenol(M.pHt(v)));
    drop.position.set(X, 1.95 - ((s.clock * 1.5) % 1) * 0.6, 0); drop.visible = s.scene === 'titr' && f < 0.999;
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
