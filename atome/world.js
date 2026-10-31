// La figure : un atome de Bohr dont le numéro atomique défile, la formation de Na⁺ et Cl⁻, trois isotopes du carbone.
import * as THREE from 'three';
import { part, lines, shadeMat, V } from '../engine/parts.js';
import { ball } from '../engine/kit.js';
import * as M from './model.js';

export const ST = { atom: 0, ion: 12, iso: 24 };
const SR = [0.9, 1.55, 2.2];                                       // rayons des couches K, L, M

function atomView(parent, asm, key, title, sub, at, { nucMax = 40, eMax = 18, k = 1 } = {}) {
  const g = asm(key, parent, { title, sub }); const [x0, y0, z0] = at;
  g.userData.focus = () => ({ target: at, radius: 2.6 * k });
  const nuc = Array.from({ length: nucMax }, () => ball(g, 'red', 'Noyau : protons (rouges) et neutrons (gris)', 0.11 * k));
  const el = Array.from({ length: eMax }, () => ball(g, 'blue', 'Électron', 0.075 * k));
  const rings = SR.map(r => { const c = []; for (let i = 0; i < 96; i++) { const a = 2 * Math.PI * i / 96, b = 2 * Math.PI * (i + 1) / 96; c.push(x0 + k * r * Math.cos(a), y0, z0 + k * r * Math.sin(a), x0 + k * r * Math.cos(b), y0, z0 + k * r * Math.sin(b)); } return lines(g, c, '#9c9ca2'); });
  let last = '';
  const pM = shadeMat('red'), nM = shadeMat('dark');
  return {
    g,
    set(Z, N, sh, clock, { show = true, eOverride } = {}) {
      const key2 = `${Z}/${N}`;
      if (key2 !== last) { last = key2; const P = M.packNucleus(Z + N, 0.13 * k);
        nuc.forEach((b, i) => { b.visible = i < Z + N; if (i < Z + N) { b.position.set(x0 + P[i][0], y0 + P[i][1], z0 + P[i][2]); b.material = (i * 7919 % (Z + N)) < Z ? pM : nM; } }); }
      nuc.forEach((b, i) => { b.visible = show && i < Z + N; });
      rings.forEach((r, i) => { r.visible = show && i < sh.length; });
      let j = 0;
      sh.forEach((cnt, s) => { for (let e = 0; e < cnt; e++, j++) { const a = clock * (1.4 / (s + 1)) + 2 * Math.PI * e / cnt + s; el[j].visible = show; el[j].position.set(x0 + k * SR[s] * Math.cos(a), y0, z0 + k * SR[s] * Math.sin(a)); } });
      for (; j < el.length; j++) el[j].visible = false;
      return el;
    },
  };
}

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -5; x <= 30; x++) grid.push(x, 0.001, -5, x, 0.001, 5); for (let z = -5; z <= 5; z++) grid.push(-5, 0.001, z, 30, 0.001, z);
  lines(root, grid, '#e4e4e0');

  // 0, 1 · l'atome dont Z défile
  const A = atomView(root, asm, 'atom', 'Un atome', 'noyau et couches électroniques', [ST.atom, 1.2, 0]);
  label('board', '', () => (st.scene === 'atom' || st.scene === 'shells') ? V(ST.atom, 3.2, 0) : null, () => { const e = M.ELTS[st.Z - 1]; return `${e.nom} (${e.s}) : <i>Z</i> = ${e.Z}<br>couches ${M.shells(e.Z).join(' – ')}`; });

  // 2 · Na + Cl → Na⁺ + Cl⁻
  const NA = atomView(root, asm, 'na', 'L’atome de sodium', 'il perd un électron', [ST.ion - 2.8, 1.2, 0], { k: 0.8 });
  const CLv = atomView(root, asm, 'cl', 'L’atome de chlore', 'il gagne un électron', [ST.ion + 2.8, 1.2, 0], { k: 0.8 });
  const jumper = ball(root, 'yellow', 'L’électron transféré', 0.1);
  label('vec', '', () => st.scene === 'ion' ? V(ST.ion - 2.8 + st.dx, 3.4, 0) : null, () => st.tI > 3.5 ? 'Na⁺ (2 – 8)' : 'Na (2 – 8 – 1)');
  label('vec', '', () => st.scene === 'ion' ? V(ST.ion + 2.8 - st.dx, 3.4, 0) : null, () => st.tI > 3.5 ? 'Cl⁻ (2 – 8 – 8)' : 'Cl (2 – 8 – 7)');

  // 3 · trois isotopes du carbone
  const ISO = M.CISO.map((c, i) => { const v = atomView(root, asm, 'iso' + i, `Carbone ${c.A}`, c.info, [ST.iso + (i - 1) * 3.2, 1.2, 0], { k: 0.55, eMax: 6 }); label('vec', `<sup>${c.A}</sup>C`, () => st.scene === 'iso' ? V(ST.iso + (i - 1) * 3.2, 2.5, 0) : null); label('mark', '', () => st.scene === 'iso' ? V(ST.iso + (i - 1) * 3.2, 0.2, 1.5) : null, () => `6 p + ${c.n} n`); return v; });

  function update(s) {
    st = s;
    const z = s.Z, e = M.ELTS[z - 1];
    A.set(z, e.n, M.shells(z), s.clock, { show: s.scene === 'atom' || s.scene === 'shells' });
    // le transfert : de 2 à 3,5 s l'électron externe du sodium passe sur la couche externe du chlore
    const t = s.tI, f = Math.min(1, Math.max(0, (t - 2) / 1.5));
    const showI = s.scene === 'ion';
    NA.set(11, 12, f >= 1 ? [2, 8] : [2, 8, 0], s.clock, { show: showI });
    CLv.set(17, 18, [2, 8, 7], s.clock, { show: showI });
    NA.g.position.x = s.dx; CLv.g.position.x = -s.dx;
    const from = V(ST.ion - 2.8 + 0.8 * SR[2] + s.dx * 0, 1.2, 0), to = V(ST.ion + 2.8 - 0.8 * SR[2], 1.2, 0);
    jumper.visible = showI;
    if (f <= 0) { const a = s.clock * 0.47 + 2; jumper.position.set(ST.iso * 0 + ST.ion - 2.8 + 0.8 * SR[2] * Math.cos(a), 1.2, 0.8 * SR[2] * Math.sin(a)); }
    else if (f < 1) { jumper.position.copy(from.lerp(to, f)); jumper.position.y += 0.8 * Math.sin(Math.PI * f); }
    else { const a = s.clock * 0.47; jumper.position.set(ST.ion + 2.8 - s.dx + 0.8 * SR[2] * Math.cos(a), 1.2, 0.8 * SR[2] * Math.sin(a)); }
    ISO.forEach((v, i) => v.set(6, M.CISO[i].n, [2, 4], s.clock, { show: s.scene === 'iso' }));
  }
  return { update, labels };
}
