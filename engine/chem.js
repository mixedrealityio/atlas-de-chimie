// Outils communs de l'atlas de chimie : atomes (code couleur CPK), liaisons, molécules.
import * as THREE from 'three';
import { part, shadeMat, V } from './parts.js';
import { rod, rodTo } from './kit.js';

// rayon dessiné (unités de la figure) et couleur de chaque élément
export const EL = {
  H: { pal: 'paper', r: 0.22, nom: 'hydrogène' }, C: { pal: 'ink', r: 0.34, nom: 'carbone' }, N: { pal: 'blue', r: 0.33, nom: 'azote' },
  O: { pal: 'red', r: 0.32, nom: 'oxygène' }, F: { pal: 'green', r: 0.28, nom: 'fluor' }, Cl: { pal: 'green', r: 0.42, nom: 'chlore' },
  Na: { pal: 'violet', r: 0.48, nom: 'sodium' }, S: { pal: 'yellow', r: 0.4, nom: 'soufre' }, B: { pal: 'orange', r: 0.32, nom: 'bore' },
  Cs: { pal: 'violet', r: 0.55, nom: 'césium' }, Cu: { pal: 'orange', r: 0.4, nom: 'cuivre' }, Zn: { pal: 'dark', r: 0.4, nom: 'zinc' },
  P: { pal: 'orange', r: 0.4, nom: 'phosphore' }, Br: { pal: 'red', r: 0.46, nom: 'brome' }, Fe: { pal: 'orange', r: 0.42, nom: 'fer' },
};
const SPH = new THREE.SphereGeometry(1, 24, 16);
export function atom(parent, el, pos = [0, 0, 0], k = 1, name) {
  const e = EL[el];
  const m = part(parent, SPH, { pal: e.pal, tone: 'hi', name: name || `Atome de ${e.nom} (${el})`, pos });
  m.scale.setScalar(e.r * k); return m;
}
// une liaison simple, double ou triple entre deux points
export function bond(parent, a, b, order = 1, r = 0.06, name = 'Liaison covalente') {
  const rods = [];
  const d = b.clone().sub(a), side = new THREE.Vector3(0, 1, 0).cross(d); if (side.lengthSq() < 1e-6) side.set(1, 0, 0); side.normalize().multiplyScalar(order > 1 ? 0.09 : 0);
  for (let i = 0; i < order; i++) { const off = side.clone().multiplyScalar(i - (order - 1) / 2); const m = rod(parent, { r, pal: 'dark', name }); rodTo(m, a.clone().add(off), b.clone().add(off)); rods.push(m); }
  return rods;
}
const n = v => { const l = Math.hypot(...v); return v.map(x => x / l); };
// une molécule : spec = { atoms: [[el, x, y, z], …], bonds: [[i, j, ordre], …], lone: [[x, y, z], …] } en angströms (≈ unités)
export function molecule(parent, spec, { at = [0, 0, 0], k = 1, title } = {}) {
  const g = new THREE.Group(); g.position.set(...at); parent.add(g);
  const P = spec.atoms.map(([, x, y, z]) => V(x * k, y * k, z * k));
  spec.atoms.forEach(([el], i) => atom(g, el, P[i].toArray(), Math.max(0.7, k * 0.9)));
  for (const [i, j, o = 1] of spec.bonds || []) bond(g, P[i], P[j], o, 0.055 * Math.max(0.8, k));
  for (const l of spec.lone || []) {                                  // doublets non liants : lobes translucides
    const dir = V(...l).normalize(), m = part(g, SPH, { pal: 'yellow', tone: 'lo', name: 'Doublet non liant', mat: shadeMat('yellow', { opacity: 0.35 }) });
    m.userData.noEdge = true; m.scale.set(0.2 * k, 0.2 * k, 0.38 * k); m.position.copy(dir.clone().multiplyScalar(0.62 * k)); m.lookAt(dir.clone().multiplyScalar(5));
  }
  return g;
}
// compléter un squelette carboné par des hydrogènes (géométrie tétraédrique) :
// carbons = [[x, y, z], …], cc = [[i, j], …] ; renvoie une spec de molécule utilisable par molecule()
export function hydrogenate(carbons, cc, { lenH = 1.0, keep = {} } = {}) {
  const C = carbons.map(p => V(...p)), atoms = carbons.map(p => ['C', ...p]), bonds = cc.map(([i, j]) => [i, j, 1]);
  C.forEach((c, i) => {
    const nb = cc.filter(b => b.includes(i)).map(b => C[b[0] === i ? b[1] : b[0]].clone().sub(c).normalize());
    let dirs = [];
    if (nb.length === 0) dirs = TETRA.map(d => V(...d));
    else if (nb.length === 1) { const d = nb[0], u = Math.abs(d.y) < 0.9 ? V(0, 1, 0).cross(d).normalize() : V(1, 0, 0).cross(d).normalize(), v = d.clone().cross(u); for (let k = 0; k < 3; k++) { const f = 2 * Math.PI * k / 3; dirs.push(d.clone().multiplyScalar(-1 / 3).add(u.clone().multiplyScalar(Math.sqrt(8 / 9) * Math.cos(f))).add(v.clone().multiplyScalar(Math.sqrt(8 / 9) * Math.sin(f)))); } }
    else if (nb.length === 2) { const m = nb[0].clone().add(nb[1]).multiplyScalar(-1).normalize(), p = nb[0].clone().cross(nb[1]).normalize(), a = 54.75 * Math.PI / 180; dirs = [m.clone().multiplyScalar(Math.cos(a)).add(p.clone().multiplyScalar(Math.sin(a))), m.clone().multiplyScalar(Math.cos(a)).sub(p.clone().multiplyScalar(Math.sin(a)))]; }
    else if (nb.length === 3) dirs = [nb[0].clone().add(nb[1]).add(nb[2]).multiplyScalar(-1).normalize()];
    for (const d of dirs) { const h = c.clone().add(d.multiplyScalar(lenH)); atoms.push(['H', h.x, h.y, h.z]); bonds.push([i, atoms.length - 1, 1]); }
  });
  return { atoms, bonds };
}
// directions utiles
export const TETRA = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(n);
export const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');
