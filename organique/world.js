// La figure : les quatre premiers alcanes, les deux isomères du butane, le benzène et ses deux formules
// de Kekulé, et une molécule chirale devant un miroir.
import * as THREE from 'three';
import { part, box, lines, shadeMat, V } from '../engine/parts.js';
import { molecule, hydrogenate, atom, bond } from '../engine/chem.js';
import * as M from './model.js';

export const ST = { alc: 0, iso: 15, benz: 25, chir: 35 };
const Y = 1.9;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -8; x <= 40; x++) grid.push(x, 0.001, -4, x, 0.001, 4); for (let z = -4; z <= 4; z++) grid.push(-8, 0.001, z, 40, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const spin = [];
  const put = (key, title, sub, spec, x, k = 0.85, tag, lab) => {
    const g = asm(key, root, { title, sub }); g.userData.focus = () => ({ target: [x, Y, 0], radius: 2.2 });
    const m = molecule(g, spec, { at: [x, Y, 0], k }); spin.push(m);
    if (tag) label('vec', tag, () => st.scene === lab ? V(x, Y + 1.9, 0) : null);
    return m;
  };
  // 0 · les alcanes
  const xs = [-6.3, -3.4, 0.2, 4.6];
  M.ALC.forEach((a, i) => { put('a' + i, `${a.f} · ${a.nom}`, `bout à ${String(a.eb).replace('.', ',')} °C`, hydrogenate(a.C, a.cc), ST.alc + xs[i], 0.8, a.f, 'alc');
    label('mark', '', () => st.scene === 'alc' ? V(ST.alc + xs[i], Y - 1.9, 0) : null, () => `${a.nom}<br>${String(a.eb).replace('.', ',').replace('-', '−')} °C`); });
  // 1 · butane et isobutane
  const b = M.ALC[3];
  put('but', 'Butane', 'chaîne droite, bout à −0,5 °C', hydrogenate(b.C, b.cc), ST.iso - 2.6, 0.8, 'butane', 'iso');
  put('isob', 'Méthylpropane (isobutane)', 'chaîne ramifiée, bout à −11,7 °C', hydrogenate(M.ISO.C, M.ISO.cc), ST.iso + 2.6, 0.8, 'méthylpropane', 'iso');
  label('mark', 'C₄H₁₀, −0,5 °C', () => st.scene === 'iso' ? V(ST.iso - 2.6, Y - 1.9, 0) : null);
  label('mark', 'C₄H₁₀, −11,7 °C', () => st.scene === 'iso' ? V(ST.iso + 2.6, Y - 1.9, 0) : null);
  // 2 · le benzène : deux jeux de doubles liaisons qui alternent
  const gB = asm('benz', root, { title: 'Le benzène', sub: 'C₆H₆, un cycle aromatique' }); gB.userData.focus = () => ({ target: [ST.benz, Y, 0], radius: 2.5 });
  const bz = new THREE.Group(); bz.position.set(ST.benz, Y, 0); gB.add(bz); spin.push(bz);
  const P = M.BENZ.map(p => V(...p)); P.forEach(p => atom(bz, 'C', p.toArray(), 0.85)); P.forEach(p => { const h = p.clone().multiplyScalar(1.85); atom(bz, 'H', h.toArray(), 0.85); bond(bz, p, h, 1, 0.05); });
  const single = P.map((p, i) => bond(bz, p, P[(i + 1) % 6], 1, 0.05)[0]);
  const dbl = [0, 1].map(s => [0, 2, 4].map(i => { const a = P[(i + s) % 6], c = P[(i + s + 1) % 6], mid = a.clone().add(c).multiplyScalar(0.5), inward = mid.clone().multiplyScalar(-0.16 / mid.length()); return bond(bz, a.clone().lerp(c, 0.15).add(inward), c.clone().lerp(a, 0.15).add(inward), 1, 0.045, 'Double liaison (formule de Kekulé)')[0]; }));
  const ring = part(bz, new THREE.TorusGeometry(0.78, 0.04, 8, 48), { pal: 'red', tone: 'hi', name: 'Électrons délocalisés sur tout le cycle' });
  label('vec', '', () => st.scene === 'benz' ? V(ST.benz, Y + 3.0, 0) : null, () => st.kek < 2 ? 'Kekulé 1' : st.kek < 4 ? 'Kekulé 2' : 'la réalité : un cycle délocalisé');
  // 3 · chiralité : la molécule et son image dans un miroir
  const gC = asm('chir', root, { title: 'Le bromochlorofluorométhane', sub: 'CHFClBr, chiral' }); gC.userData.focus = () => ({ target: [ST.chir, Y, 0], radius: 3 });
  const mA = molecule(gC, { atoms: M.CHIR, bonds: [[0, 1], [0, 2], [0, 3], [0, 4]] }, { at: [ST.chir - 2.2, Y, 0], k: 1 });
  const mB = molecule(gC, { atoms: M.CHIR.map(([e, x, y, z]) => [e, -x, y, z]), bonds: [[0, 1], [0, 2], [0, 3], [0, 4]] }, { at: [ST.chir + 2.2, Y, 0], k: 1 });
  const mir = part(gC, box(0.04, 3.4, 3.0, 0.01), { pal: 'blue', tone: 'lo', name: 'Miroir', pos: [ST.chir, Y, 0], mat: shadeMat('blue', { opacity: 0.18 }) }); mir.userData.noEdge = true;
  label('mark', 'miroir', () => st.scene === 'chir' ? V(ST.chir, Y + 2.0, 0) : null);
  label('mark', 'H blanc, F vert clair, Cl vert, Br rouge', () => st.scene === 'chir' ? V(ST.chir, Y - 2.0, 0) : null);

  function update(s) {
    st = s;
    spin.forEach((m, i) => { m.rotation.y = s.clock * 0.3 + i * 0.7; });
    bz.rotation.y = Math.sin(s.clock * 0.3) * 0.5;
    const k = s.kek; single.forEach(m => { m.visible = true; }); dbl[0].forEach(m => { m.visible = k < 2; }); dbl[1].forEach(m => { m.visible = k >= 2 && k < 4; }); ring.visible = k >= 4;
    mA.rotation.y = Math.sin(s.clock * 0.4) * 0.6; mB.rotation.y = -mA.rotation.y;
  }
  return { update, labels };
}
