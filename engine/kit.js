// Petits outils communs aux chapitres de maths : polygones extrudés posés sur la table,
// tiges entre deux points, quadrillages, courbes en tube et petits graphiques SVG.
// Convention : le plan du dessin (u, v) est la table ; monde (x, y, z) = (u, hauteur, −v).
import * as THREE from 'three';
import { part, shadeMat, cyl, lines, liveTube, V } from './parts.js';

export const W3 = (u, v, h = 0) => V(u, h, -v);

// un polygone [[u, v], ...] extrudé de h vers le haut
export function slabGeo(pts, h = 0.12) {
  const s = new THREE.Shape(pts.map(([u, v]) => new THREE.Vector2(u, v)));
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false });
  g.rotateX(-Math.PI / 2);
  return g;
}
export function slab(parent, pts, { h = 0.12, pal = 'paper', tone = 'hi', name, ex = [0, 0, 0], opacity = 1, y = 0 } = {}) {
  const m = part(parent, slabGeo(pts, h), { pal, tone, name, ex, mat: opacity < 1 ? shadeMat(pal, { opacity }) : undefined });
  m.position.y = y; m.userData.home = m.position.clone();
  return m;
}

// une tige d'épaisseur r ; rodTo(m, a, b) la place de a à b
export function rod(parent, { r = 0.03, pal = 'ink', tone = 'hi', name } = {}) {
  return part(parent, cyl(r, 1, 14), { pal, tone, name });
}
export function rodTo(m, a, b) {
  const d = b.clone().sub(a), L = d.length();
  m.visible = L > 1e-4;
  if (!m.visible) return;
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.scale.set(1, L, 1);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
}

// un quadrillage d'unités sur un carré : origine o, côtés e1, e2 (vecteurs du plan), n carreaux
export function gridOn(parent, o, e1, e2, n, h, color = '#9c9ca2') {
  const c = [];
  for (let i = 1; i < n; i++) {
    const a = [o[0] + e1[0] * i / n, o[1] + e1[1] * i / n], b = [a[0] + e2[0], a[1] + e2[1]];
    const p = [o[0] + e2[0] * i / n, o[1] + e2[1] * i / n], q = [p[0] + e1[0], p[1] + e1[1]];
    c.push(a[0], h, -a[1], b[0], h, -b[1], p[0], h, -p[1], q[0], h, -q[1]);
  }
  return lines(parent, c, color);
}

// un graphique SVG pour la page de gauche, avec des curseurs animés (data-cursor)
const GW = 420, P = { l: 40, r: 14, t: 16, b: 28 };
export const CURSORS = {};
export function chart({ x0, x1, y0, y1, series = [], xlabel = '', ylabel = '', marks = [], cursors = [], label, h = 160, extra = '' }) {
  const H = h;
  const sx = x => P.l + (x - x0) / (x1 - x0) * (GW - P.l - P.r), sy = y => P.t + (1 - (y - y0) / (y1 - y0)) * (H - P.t - P.b);
  for (const c of cursors) CURSORS[c] = (x, y) => [sx(x), sy(y)];
  const zero = y0 < 0 && y1 > 0 ? `<line class="zero" x1="${P.l}" x2="${GW - P.r}" y1="${sy(0)}" y2="${sy(0)}"/>` : '';
  const zx = x0 < 0 && x1 > 0 ? `<line class="zero" y1="${P.t}" y2="${H - P.b}" x1="${sx(0)}" x2="${sx(0)}"/>` : '';
  const paths = series.map(s => `<path class="${s.cls || 'curve'}" d="${s.pts.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join('')}"/>`
    + (s.tag ? `<text class="lab" x="${sx(s.tag[0]) + 4}" y="${sy(s.tag[1]) - 6}">${s.tag[2]}</text>` : '')).join('');
  const mk = marks.map(([x, y, t, dx = 6, dy = 14]) => `<circle class="mark" cx="${sx(x)}" cy="${sy(y)}" r="3.5"/><text x="${sx(x) + dx}" y="${sy(y) + dy}">${t}</text>`).join('');
  return `<svg class="chart" viewBox="0 0 ${GW} ${H}" role="img" aria-label="${label}">
    <rect class="frame" x="${P.l}" y="${P.t}" width="${GW - P.l - P.r}" height="${H - P.t - P.b}"/>${zero}${zx}${paths}${mk}${extra}
    <text x="${P.l - 6}" y="${sy(y1) + 4}" text-anchor="end">${y1}</text><text x="${P.l - 6}" y="${sy(y0) + 4}" text-anchor="end">${y0}</text>
    <text x="${P.l}" y="${H - 9}">${x0}</text><text x="${GW - P.r}" y="${H - 9}" text-anchor="end">${x1}</text>
    <text class="lab" x="${P.l + 6}" y="${P.t + 13}">${ylabel}</text><text x="${(P.l + GW - P.r) / 2}" y="${H - 9}" text-anchor="middle">${xlabel}</text>
    ${cursors.map(c => `<circle class="cursor" r="4.5" cx="-20" cy="-20" data-cursor="${c}"/>`).join('')}
  </svg>`;
}
export const sample = (fn, a, b, n = 120) => Array.from({ length: n + 1 }, (_, i) => { const x = a + (b - a) * i / n; return [x, fn(x)]; });

// place les curseurs animés d'une page : vals = { clé: [x, y] }
export function moveCursors(sheets, vals) {
  for (const el of sheets) el.querySelectorAll('circle[data-cursor]').forEach(c => {
    const k = c.dataset.cursor; if (!vals[k] || !CURSORS[k]) return;
    const [cx, cy] = CURSORS[k](...vals[k]); c.setAttribute('cx', cx); c.setAttribute('cy', cy);
  });
}

// nombres à la française : virgule décimale, signe moins typographique
export const fr = (x, n = 2) => (x < -1e-9 ? '−' : '') + Math.abs(x).toFixed(n).replace('.', ',');

// ---------- pour les chapitres « tableau » : un repère 2D dressé debout ----------
// X, Y : fonctions des coordonnées mathématiques vers le monde ; le tableau est dans le plan z = 0.
export const ball = (parent, pal, name, r = 0.11) => part(parent, new THREE.SphereGeometry(r, 20, 14), { pal, tone: 'hi', name });
export function board2d(parent, label, { x0, x1, y0, y1, X, Y, ticksX = [], ticksY = [], name = 'Tableau', vis = () => true, axes = true, pal = 'board' }) {
  const xa = X(x0), xb = X(x1), ya = Y(y0), yb = Y(y1);
  const b = part(parent, new THREE.BoxGeometry(xb - xa, yb - ya, 0.12), { pal, tone: 'lo', name });
  b.position.set((xa + xb) / 2, (ya + yb) / 2, -0.07); b.userData.home = b.position.clone();
  if (!axes) return b;
  const ax = [];
  if (y0 <= 0 && y1 >= 0) ax.push(xa + 0.12, Y(0), 0.01, xb - 0.12, Y(0), 0.01);
  if (x0 <= 0 && x1 >= 0) ax.push(X(0), ya + 0.12, 0.01, X(0), yb - 0.12, 0.01);
  const y0p = y0 <= 0 && y1 >= 0 ? Y(0) : ya + 0.25, x0p = x0 <= 0 && x1 >= 0 ? X(0) : xa + 0.25;
  for (const [x, t] of ticksX.map(v => Array.isArray(v) ? v : [v, fr(v, Number.isInteger(v) ? 0 : 1)])) {
    ax.push(X(x), y0p - 0.07, 0.01, X(x), y0p + 0.07, 0.01);
    label('tick', t, () => vis() ? V(X(x) + 0.06, y0p - 0.24, 0) : null);
  }
  for (const [y, t] of ticksY.map(v => Array.isArray(v) ? v : [v, fr(v, Number.isInteger(v) ? 0 : 1)])) {
    ax.push(x0p - 0.07, Y(y), 0.01, x0p + 0.07, Y(y), 0.01);
    label('tick', t, () => vis() ? V(x0p - 0.12, Y(y), 0) : null);
  }
  lines(parent, ax, '#57575a');
  return b;
}
// une courbe y = fn(x) en tube, figée
export function plotTube(parent, fn, X, Y, a, b, { pal = 'ink', r = 0.045, name = 'Courbe', n = 200, z = 0.1 } = {}) {
  const pts = Array.from({ length: n + 1 }, (_, i) => { const x = a + (b - a) * i / n; return V(X(x), Y(fn(x)), z); });
  return part(parent, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n * 2, r, 8), { pal, tone: 'hi', name });
}
// une courbe qui change à chaque image : set(pts) avec pts = liste de Vector3 (au moins 2)
export function liveCurve(parent, { n = 160, r = 0.04, pal = 'ink', name = 'Courbe' } = {}) {
  const geo = liveTube(n, r, 6);
  const m = part(parent, geo, { pal, tone: 'hi', name }); m.frustumCulled = false;
  const buf = Array.from({ length: n + 1 }, () => V());
  return { mesh: m, set(pts) {
    if (pts.length < 2) { m.visible = false; return; }
    m.visible = true;
    for (let i = 0; i <= n; i++) { const u = i / n * (pts.length - 1), k = Math.min(Math.floor(u), pts.length - 2); buf[i].copy(pts[k]).lerp(pts[k + 1], u - k); }
    geo.update(buf);
  } };
}
// une boîte qu'on redimensionne (barres, rectangles d'aire) : setBox(m, x0, x1, y0, y1, z0, z1)
export function sizedBox(parent, { pal = 'paper', tone = 'hi', name, opacity = 1 } = {}) {
  return part(parent, new THREE.BoxGeometry(1, 1, 1), { pal, tone, name, mat: opacity < 1 ? shadeMat(pal, { opacity }) : undefined });
}
export function setBox(m, x0, x1, y0, y1, z0 = -0.05, z1 = 0.05) {
  const w = Math.abs(x1 - x0), h = Math.abs(y1 - y0);
  m.visible = w > 1e-4 && h > 1e-4;
  m.scale.set(Math.max(w, 1e-4), Math.max(h, 1e-4), z1 - z0);
  m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
}
