// La figure : la pile Daniell, l'échelle des potentiels, l'électrolyse de l'eau (voltamètre de Hofmann)
// et une batterie lithium-ion.
import * as THREE from 'three';
import { part, box, cyl, lines, shadeMat, V } from '../engine/parts.js';
import { ball, rod, rodTo, sizedBox, setBox, liveCurve } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { dan: 0, pot: 12, hof: 23, li: 33 };

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -5; x <= 38; x++) grid.push(x, 0.001, -4, x, 0.001, 4); for (let z = -4; z <= 4; z++) grid.push(-5, 0.001, z, 38, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const liq = (c, o = 0.45) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, depthWrite: false });
  function beaker(g, x, color, name) {
    const r = 1.1, h = 2.2;
    const gl = part(g, new THREE.CylinderGeometry(r, r, h, 32, 1, true), { pal: 'paper', tone: 'lo', name: 'Bécher', pos: [x, h / 2, 0], mat: shadeMat('paper', { opacity: 0.2 }) }); gl.userData.noEdge = true;
    const rim = []; for (let i = 0; i < 40; i++) { const a = 2 * Math.PI * i / 40, b = 2 * Math.PI * (i + 1) / 40; for (const y of [0.01, h]) rim.push(x + r * Math.cos(a), y, r * Math.sin(a), x + r * Math.cos(b), y, r * Math.sin(b)); } lines(g, rim, '#8a8a8f');
    const l = part(g, new THREE.CylinderGeometry(r * 0.96, r * 0.96, 1.6, 32), { pal: 'paper', name, pos: [x, 0.81, 0], mat: liq(color) }); l.userData.noEdge = true;
  }
  // une file de billes qui avancent le long d'un chemin polygonal
  function runner(g, pts, n, pal, name, r = 0.08) {
    const segs = []; let L = 0; for (let i = 0; i + 1 < pts.length; i++) { const d = pts[i].distanceTo(pts[i + 1]); segs.push([pts[i], pts[i + 1], L, d]); L += d; }
    const at = u => { let s = ((u % 1) + 1) % 1 * L; for (const [a, b, l0, d] of segs) if (s <= l0 + d) return a.clone().lerp(b, (s - l0) / d); return pts[pts.length - 1].clone(); };
    const balls = Array.from({ length: n }, () => ball(g, pal, name, r));
    return { set(t, show = true, dir = 1) { balls.forEach((b, i) => { b.visible = show; b.position.copy(at(dir * t + i / n)); }); } };
  }

  // ---------- 0 · la pile Daniell ----------
  const X = ST.dan, gD = asm('dan', root, { title: 'La pile Daniell', sub: 'zinc | Zn²⁺ ‖ Cu²⁺ | cuivre' });
  gD.userData.focus = () => ({ target: [X, 2, 0], radius: 3.5 });
  beaker(gD, X - 2, '#d9d9d6', 'Solution de sulfate de zinc'); beaker(gD, X + 2, '#5b9be0', 'Solution de sulfate de cuivre (bleue)');
  part(gD, box(0.5, 2.6, 0.12, 0.02), { pal: 'dark', tone: 'hi', name: 'Lame de zinc : anode (−), Zn → Zn²⁺ + 2 e⁻', pos: [X - 2, 1.6, 0] });
  part(gD, box(0.5, 2.6, 0.12, 0.02), { pal: 'orange', tone: 'hi', name: 'Lame de cuivre : cathode (+), Cu²⁺ + 2 e⁻ → Cu', pos: [X + 2, 1.6, 0] });
  const bridge = liveCurve(gD, { n: 60, r: 0.16, pal: 'paper', name: 'Pont salin (KCl gélifié)' });
  bridge.set([V(X - 1.4, 0.9, 0), V(X - 1.4, 2.7, 0), V(X - 1.0, 3.0, 0), V(X + 1.0, 3.0, 0), V(X + 1.4, 2.7, 0), V(X + 1.4, 0.9, 0)]);
  const wire = [V(X - 2, 2.9, 0), V(X - 2, 4.2, 0), V(X + 2, 4.2, 0), V(X + 2, 2.9, 0)];
  for (let i = 0; i < 3; i++) rodTo(rod(gD, { r: 0.03, pal: 'ink', name: 'Fil électrique' }), wire[i], wire[i + 1]);
  part(gD, box(1.0, 0.7, 0.3, 0.06), { pal: 'base', tone: 'hi', name: 'Voltmètre : 1,10 V', pos: [X, 4.2, 0] });
  const eDan = runner(gD, wire, 10, 'blue', 'Électron (va du zinc vers le cuivre dans le fil)');
  const kIon = runner(gD, [V(X - 1.4, 1.2, 0), V(X - 1.4, 2.8, 0), V(X + 1.4, 2.8, 0), V(X + 1.4, 1.2, 0)], 4, 'violet', 'Ion K⁺ du pont salin', 0.07);
  const clIon = runner(gD, [V(X + 1.4, 1.2, 0.0), V(X + 1.4, 3.05, 0), V(X - 1.4, 3.05, 0), V(X - 1.4, 1.2, 0)], 4, 'green', 'Ion Cl⁻ du pont salin', 0.07);
  label('vec', '1,10 V', () => st.scene === 'dan' ? V(X, 4.9, 0) : null);
  label('vec', 'Zn (−)', () => st.scene === 'dan' ? V(X - 3.1, 3.2, 0) : null); label('vec', 'Cu (+)', () => st.scene === 'dan' ? V(X + 3.1, 3.2, 0) : null);

  // ---------- 1 · l'échelle des potentiels ----------
  const gP = asm('pot', root, { title: 'L’échelle des potentiels', sub: 'du lithium à l’or' });
  gP.userData.focus = () => ({ target: [ST.pot, 3.5, 0], radius: 5 });
  const B0 = 4, K = 1.0;
  lines(gP, [ST.pot - 7, B0, 0, ST.pot + 7, B0, 0], '#26262a');
  M.E0.forEach(([c, e], i) => { const x = ST.pot + (i - 5) * 1.25, b = sizedBox(gP, { pal: e < 0 ? 'blue' : e > 0 ? 'red' : 'dark', tone: 'hi', name: `${c} : E° = ${String(e).replace('.', ',')} V` }); setBox(b, x - 0.35, x + 0.35, Math.min(B0, B0 + e * K), Math.max(B0, B0 + e * K) + (e === 0 ? 0.04 : 0), -0.35, 0.35);
    label('mark', c, () => st.scene === 'pot' ? V(x, e >= 0 ? B0 - 0.3 : B0 + 0.3, 0.5) : null); });
  label('vec blue', 'réducteurs forts', () => st.scene === 'pot' ? V(ST.pot - 4.6, 0.4, 0) : null);
  label('vec red', 'oxydants forts', () => st.scene === 'pot' ? V(ST.pot + 4.6, 6.0, 0) : null);

  // ---------- 2 · l'électrolyse de l'eau ----------
  const XH = ST.hof, gH = asm('hof', root, { title: 'L’électrolyse de l’eau', sub: 'voltamètre de Hofmann' });
  gH.userData.focus = () => ({ target: [XH, 2.5, 0], radius: 3.2 });
  const tube = (x, h, name) => { const t = part(gH, new THREE.CylinderGeometry(0.32, 0.32, h, 24, 1, true), { pal: 'paper', tone: 'lo', name, pos: [x, 0.4 + h / 2, 0], mat: shadeMat('paper', { opacity: 0.22 }) }); t.userData.noEdge = true; };
  tube(XH - 1.4, 4.2, 'Tube côté cathode (−) : dihydrogène'); tube(XH + 1.4, 4.2, 'Tube côté anode (+) : dioxygène'); tube(XH, 5.0, 'Réservoir');
  part(gH, box(3.4, 0.4, 0.7, 0.05), { pal: 'paper', tone: 'lo', name: 'Raccord', pos: [XH, 0.4, 0], mat: liq('#cfe3f5', 0.6) });
  const water = [-1.4, 1.4].map(dx => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 1, 20), liq('#cfe3f5', 0.6)); m.userData.noEdge = true; gH.add(m); return m; });
  const gas = [-1.4, 1.4].map(dx => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 1, 20), liq('#ffffff', 0.25)); m.userData.noEdge = true; gH.add(m); return m; });
  part(gH, box(0.12, 0.5, 0.12, 0.01), { pal: 'ink', tone: 'hi', name: 'Électrode de platine (−)', pos: [XH - 1.4, 0.75, 0] });
  part(gH, box(0.12, 0.5, 0.12, 0.01), { pal: 'red', tone: 'hi', name: 'Électrode de platine (+)', pos: [XH + 1.4, 0.75, 0] });
  const bub = Array.from({ length: 12 }, (_, i) => ball(gH, 'paper', 'Bulle de gaz', 0.06));
  label('vec', 'H₂', () => st.scene === 'hof' ? V(XH - 1.4, 5.0, 0) : null); label('vec', 'O₂', () => st.scene === 'hof' ? V(XH + 1.4, 5.0, 0) : null);
  label('mark', '', () => st.scene === 'hof' ? V(XH, 5.6, 0) : null, () => `H₂ : ${fr(st.vh, 1)} mL   O₂ : ${fr(st.vh / 2, 1)} mL`);

  // ---------- 3 · la batterie lithium-ion ----------
  const XL = ST.li, gL = asm('li', root, { title: 'La batterie lithium-ion', sub: 'des ions Li⁺ qui font la navette' });
  gL.userData.focus = () => ({ target: [XL, 2, 0], radius: 3.5 });
  for (let k = 0; k < 5; k++) part(gL, box(1.6, 0.08, 1.6, 0.01), { pal: 'ink', tone: 'mid', name: 'Feuillets de graphite (électrode négative)', pos: [XL - 1.6, 0.6 + k * 0.6, 0] });
  part(gL, box(1.6, 2.7, 1.6, 0.05), { pal: 'orange', tone: 'lo', name: 'Phosphate de fer lithié LiFePO₄ (électrode positive)', pos: [XL + 1.6, 1.85, 0], mat: shadeMat('orange', { opacity: 0.35 }) });
  part(gL, box(0.06, 2.8, 1.7, 0.01), { pal: 'paper', tone: 'lo', name: 'Séparateur poreux', pos: [XL, 1.85, 0] });
  const li = Array.from({ length: 12 }, (_, i) => ball(gL, 'violet', 'Ion lithium Li⁺', 0.1));
  const lw = [V(XL - 1.6, 3.3, 0), V(XL - 1.6, 4.4, 0), V(XL + 1.6, 4.4, 0), V(XL + 1.6, 3.3, 0)];
  for (let i = 0; i < 3; i++) rodTo(rod(gL, { r: 0.03, pal: 'ink', name: 'Circuit extérieur' }), lw[i], lw[i + 1]);
  const eLi = runner(gL, lw, 8, 'blue', 'Électron dans le circuit extérieur');
  label('board', '', () => st.scene === 'li' ? V(XL, 5.1, 0) : null, () => `${st.lib.mode} : Li⁺ ${st.lib.mode === 'décharge' ? 'vers la droite' : 'vers la gauche'}`);

  function update(s) {
    st = s;
    eDan.set(s.clock * 0.12, s.scene === 'dan'); kIon.set(s.clock * 0.05, s.scene === 'dan'); clIon.set(s.clock * 0.05, s.scene === 'dan');
    // Hofmann : le gaz chasse l'eau ; H₂ deux fois plus que O₂
    const f = (((s.clock % M.HOF) + M.HOF) % M.HOF) / M.HOF, hH = 2.6 * f, hO = 1.3 * f, top = 4.6;
    s.vh = 40 * f;
    [[hH, -1.4], [hO, 1.4]].forEach(([h, dx], i) => { gas[i].scale.y = Math.max(0.01, h); gas[i].position.set(XH + dx, top - h / 2, 0); water[i].scale.y = top - h - 0.6; water[i].position.set(XH + dx, 0.6 + (top - h - 0.6) / 2, 0); });
    bub.forEach((b, i) => { const dx = i % 3 === 2 ? 1.4 : -1.4, u = ((s.clock * 0.6 + i * 0.37) % 1); b.position.set(XH + dx + 0.1 * Math.sin(i), 1.0 + u * (top - (dx < 0 ? hH : hO) - 1.0), 0.1 * Math.cos(i)); b.visible = s.scene === 'hof'; });
    // lithium-ion
    const L = M.libState(s.clock);
    li.forEach((b, i) => { const k = i / 12, fr2 = Math.min(1, Math.max(0, (L.f * 1.3 - k * 0.3))); const x = XL - 1.6 + 3.2 * (L.mode === 'décharge' ? fr2 : fr2); b.position.set(XL - 1.6 + 3.2 * fr2, 0.9 + (i % 5) * 0.6, -0.5 + (i % 3) * 0.5); b.visible = s.scene === 'li'; });
    eLi.set(s.clock * 0.15, s.scene === 'li', L.mode === 'décharge' ? 1 : -1);
  }
  return { update, labels };
}
const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
