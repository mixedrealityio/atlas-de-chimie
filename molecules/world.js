// La figure : cinq molécules alignées (CO₂, BF₃, CH₄, NH₃, H₂O) qui tournent lentement sur elles-mêmes,
// les moments dipolaires de l'eau et du CO₂, puis PCl₅ et SF₆.
import * as THREE from 'three';
import { lines, arrow, setArrow, V } from '../engine/parts.js';
import { molecule } from '../engine/chem.js';
import * as M from './model.js';

export const ST = { row: 0, big: 16 };
export const XR = k => (M.ROW.indexOf(k) - 2) * 3.2;
const Y = 1.8;

export function buildWorld(E) {
  const { scene, asm } = E;
  const root = new THREE.Group(); scene.add(root);
  const labels = [];
  const label = (cls, html, at, text) => labels.push({ cls, html, at, text });
  let st = {};
  const grid = []; for (let x = -10; x <= 22; x++) grid.push(x, 0.001, -4, x, 0.001, 4); for (let z = -4; z <= 4; z++) grid.push(-10, 0.001, z, 22, 0.001, z);
  lines(root, grid, '#e4e4e0');
  const spin = [];
  const place = (k, x) => {
    const m = M.MOLS[k], g = asm(k, root, { title: `${m.f} · ${m.nom}`, sub: m.forme });
    g.userData.focus = () => ({ target: [x, Y, 0], radius: 2 });
    const mol = molecule(g, m, { at: [x, Y, 0] }); spin.push([mol, k]);
    label('vec', m.f, () => V(x, Y + 1.9, 0));
    label('mark', '', () => V(x, Y - 1.8, 0), () => `${m.forme}<br>${m.angle}`);
    return mol;
  };
  M.ROW.forEach(k => place(k, ST.row + XR(k)));
  M.BIG.forEach((k, i) => place(k, ST.big + (i - 0.5) * 4.4));

  // moments dipolaires : deux flèches opposées pour CO₂, une résultante vers le haut pour H₂O
  const dCO = [arrow(root, 'red', { name: 'Moment dipolaire de la liaison C=O' }), arrow(root, 'red', { name: 'Moment dipolaire de la liaison C=O' })];
  const dH2O = arrow(root, 'red', { name: 'Moment dipolaire de la molécule d’eau', r: 0.05, head: 0.25, headR: 0.13 });
  label('vec red', 'somme nulle', () => st.scene === 'polar' ? V(ST.row + XR('co2'), Y + 1.0, 0) : null);
  label('vec red', 'μ', () => st.scene === 'polar' ? V(ST.row + XR('h2o') + 0.4, Y + 2.0, 0) : null);
  label('mark', 'δ−', () => st.scene === 'polar' ? V(ST.row + XR('h2o') - 0.5, Y + 0.4, 0) : null);
  label('mark', 'δ+', () => st.scene === 'polar' ? V(ST.row + XR('h2o'), Y - 1.2, 0) : null);

  function update(s) {
    st = s;
    for (const [mol, k] of spin) mol.rotation.y = ((k === 'co2' || k === 'h2o') && s.scene === 'polar') || (k === 'h2o' && s.scene === 'lewis') ? 0 : s.clock * 0.35 + (k.length);
    const pol = s.scene === 'polar', xc = ST.row + XR('co2'), xw = ST.row + XR('h2o');
    setArrow(dCO[0], V(xc - 0.25, Y + 0.45, 0), V(-0.9, 0, 0)); setArrow(dCO[1], V(xc + 0.25, Y + 0.45, 0), V(0.9, 0, 0));
    setArrow(dH2O, V(xw, Y - 0.6, 0.0), V(0, 2.2, 0));
    for (const a of [...dCO, dH2O]) a.visible = pol;
  }
  return { update, labels };
}
