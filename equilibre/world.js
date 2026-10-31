// La figure : des ballons fermés de N₂O₄ / NO₂ (incolore / brun) à trois températures, puis un diagramme en
// barres du rendement de la synthèse de l'ammoniac.
import * as THREE from 'three';
import { part, box, lines, shadeMat, V } from '../engine/parts.js';
import { ball, sizedBox, setBox } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { flask: 0, hab: 14 };
const R = 1.25, Y = 1.6;
const PAL = { 0: '#bcd6ef', 25: null, 80: '#f2a7a0' };

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -6; x <= 20; x++) grid.push(x, 0.001, -4, x, 0.001, 4); for (let z = -4; z <= 4; z++) grid.push(-6, 0.001, z, 20, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const brown = new THREE.Color('#b5651d'), clear = new THREE.Color('#f6f4ee');
  const seedPos = (i, j) => { let s = 17 + i * 31 + Math.round((j + 10) * 7); const r = () => (s = (s * 16807) % 2147483647) / 2147483647; for (let n = 0; n < 200; n++) { const p = [r() * 2 - 1, r() * 2 - 1, r() * 2 - 1]; if (Math.hypot(...p) < 1) return p.map(v => v * (R - 0.25)); } return [0, 0, 0]; };
  function flask(key, x, T) {
    const g = asm(key, root, { title: `Ballon à ${T} °C`, sub: 'N₂O₄ ⇌ 2 NO₂' }); g.userData.focus = () => ({ target: [x, Y, 0], radius: 1.8 });
    const mat = shadeMat('paper', { opacity: 0.22 }).clone(); mat.uniforms.uTop.value = new THREE.Color('#ffffff');
    const glass = part(g, new THREE.SphereGeometry(R, 32, 20), { pal: 'paper', tone: 'lo', name: `Ballon fermé à ${T} °C`, pos: [x, Y, 0], mat: new THREE.MeshBasicMaterial({ color: '#f6f4ee', transparent: true, opacity: 0.4, depthWrite: false }) }); glass.userData.noEdge = true;
    const neck = part(g, new THREE.CylinderGeometry(0.22, 0.22, 0.7, 16), { pal: 'paper', tone: 'lo', name: 'Col du ballon', pos: [x, Y + R + 0.25, 0] });
    let bath = null; if (PAL[T]) { bath = part(g, box(3.0, 1.4, 3.0, 0.05), { pal: 'paper', tone: 'lo', name: T === 0 ? 'Bain d’eau glacée' : 'Bain d’eau chaude', pos: [x, 0.7, 0], mat: new THREE.MeshBasicMaterial({ color: PAL[T], transparent: true, opacity: 0.35, depthWrite: false }) }); bath.userData.noEdge = true; }
    const pairs = Array.from({ length: M.NSLOT }, (_, i) => [ball(g, 'paper', 'Molécule de N₂O₄ (incolore) ou de NO₂ (brun)', 0.09), ball(g, 'paper', 'Molécule de N₂O₄ (incolore) ou de NO₂ (brun)', 0.09)]);
    const home = Array.from({ length: M.NSLOT }, (_, i) => seedPos(i, x));
    label('vec', `${T} °C`, () => st.scene !== 'haber' && (key === 'f25' || st.scene === 'chat') ? V(x, Y + R + 0.9, 0) : null);
    return { g, glass, pairs, home, x, T, bath, neck };
  }
  const F = [flask('f0', ST.flask - 3.6, 0), flask('f25', ST.flask, 25), flask('f80', ST.flask + 3.6, 80)];
  const no2 = shadeMat('orange'), n2o4 = shadeMat('paper');
  label('board', '', () => st.scene === 'dyn' ? V(ST.flask, Y + 3.0, 0) : null, () => `${st.nNO2} NO₂ et ${st.nN2O4} N₂O₄`);

  // le diagramme en barres de la synthèse de l'ammoniac
  const gH = asm('hab', root, { title: 'Rendement de la synthèse de l’ammoniac', sub: 'N₂ + 3 H₂ ⇌ 2 NH₃' });
  gH.userData.focus = () => ({ target: [ST.hab, 1.5, 0], radius: 4 });
  const pals = { 300: 'blue', 400: 'base', 500: 'red' };
  M.HAB.T.forEach((T, ti) => M.HAB.P.forEach((P, pi) => {
    const b = sizedBox(gH, { pal: pals[T], tone: 'hi', name: `${T} °C, ${P} atm : ${M.HAB.y[T][pi]} % de NH₃` });
    const x = ST.hab + (pi - 2) * 1.1, z = (ti - 1) * 1.3, h = M.HAB.y[T][pi] / 25;
    setBox(b, x - 0.4, x + 0.4, 0, h, z - 0.45, z + 0.45);
    label('mark', '', () => st.scene === 'haber' ? V(x, h + 0.25, z) : null, () => `${String(M.HAB.y[T][pi]).replace('.', ',')}`);
  }));
  M.HAB.P.forEach((P, pi) => label('mark', `${P} atm`, () => st.scene === 'haber' ? V(ST.hab + (pi - 2) * 1.1, 0.05, 2.3) : null));
  M.HAB.T.forEach((T, ti) => label('vec', `${T} °C`, () => st.scene === 'haber' ? V(ST.hab - 3.4, 0.2, (ti - 1) * 1.3) : null));

  function update(s) {
    st = s; let n = 0, m = 0;
    for (const f of F) {
      const on = s.scene !== 'haber' && (s.scene === 'chat' || f.T === 25);
      const x = s.scene === 'dyn' ? M.relax(s.t, M.XT[25]) : M.XT[f.T];
      if (f.bath) f.bath.visible = s.scene === 'chat'; f.glass.visible = f.neck.visible = on;
      f.glass.material.color.copy(clear).lerp(brown, 0.15 + 0.75 * x);
      f.pairs.forEach(([a, b], i) => {
        const h = f.home[i], j = Math.sin(s.clock * 2 + i) * 0.08, d = M.isNO2(i, s.clock, x);
        const c = V(f.x + h[0] + j, Y + h[1] + Math.cos(s.clock * 1.7 + i) * 0.08, h[2]);
        a.visible = b.visible = on;
        a.material = b.material = d ? no2 : n2o4;
        const sep = d ? 0.32 + 0.1 * Math.sin(s.clock * 3 + i) : 0.18;
        a.position.copy(c).add(V(-sep / 2, 0, 0)); b.position.copy(c).add(V(sep / 2, 0, 0));
        if (f.T === 25) { if (d) n += 2; else m++; }
      });
    }
    s.nNO2 = n; s.nN2O4 = m;
  }
  return { update, labels };
}
