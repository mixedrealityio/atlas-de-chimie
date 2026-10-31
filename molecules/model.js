// La géométrie des molécules (必修第一册 §4.3 « 化学键 » ; 选择性必修2 第二章 « 分子结构与性质 » :
// 共价键, 价层电子对互斥模型 (VSEPR), 杂化轨道理论, 分子的极性).
const D = Math.PI / 180, L = 1.25;                                   // longueur dessinée des liaisons
const sph = (polFromMinusY, az, r = L) => [r * Math.sin(polFromMinusY) * Math.cos(az), -r * Math.cos(polFromMinusY), r * Math.sin(polFromMinusY) * Math.sin(az)];
// pyramide : trois liaisons sous l'axe, angle H–X–H donné
const pyr = ang => { const c = Math.sqrt((Math.cos(ang * D) + 0.5) / 1.5); return Math.acos(c); };
export const MOLS = {
  co2: { nom: 'dioxyde de carbone', f: 'CO₂', forme: 'linéaire', angle: '180°', paires: '2 + 0', hyb: 'sp', atoms: [['C', 0, 0, 0], ['O', -L, 0, 0], ['O', L, 0, 0]], bonds: [[0, 1, 2], [0, 2, 2]] },
  bf3: { nom: 'trifluorure de bore', f: 'BF₃', forme: 'triangulaire plane', angle: '120°', paires: '3 + 0', hyb: 'sp²', atoms: [['B', 0, 0, 0], ...[90, 210, 330].map(a => ['F', L * Math.cos(a * D), L * Math.sin(a * D), 0])], bonds: [[0, 1], [0, 2], [0, 3]] },
  ch4: { nom: 'méthane', f: 'CH₄', forme: 'tétraédrique', angle: '109,5°', paires: '4 + 0', hyb: 'sp³', atoms: [['C', 0, 0, 0], ['H', 0, L, 0], ...[0, 120, 240].map(a => ['H', ...sph(pyr(109.47), a * D)])], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]] },
  nh3: { nom: 'ammoniac', f: 'NH₃', forme: 'pyramidale', angle: '107°', paires: '3 + 1', hyb: 'sp³', atoms: [['N', 0, 0, 0], ...[0, 120, 240].map(a => ['H', ...sph(pyr(107), a * D)])], bonds: [[0, 1], [0, 2], [0, 3]], lone: [[0, 1, 0]] },
  h2o: { nom: 'eau', f: 'H₂O', forme: 'coudée', angle: '104,5°', paires: '2 + 2', hyb: 'sp³', atoms: [['O', 0, 0, 0], ['H', -L * Math.sin(52.25 * D), -L * Math.cos(52.25 * D), 0], ['H', L * Math.sin(52.25 * D), -L * Math.cos(52.25 * D), 0]], bonds: [[0, 1], [0, 2]], lone: [[0, Math.cos(54.7 * D), Math.sin(54.7 * D)], [0, Math.cos(54.7 * D), -Math.sin(54.7 * D)]] },
  pcl5: { nom: 'pentachlorure de phosphore', f: 'PCl₅', forme: 'bipyramide trigonale', angle: '90° et 120°', paires: '5 + 0', hyb: 'sp³d', atoms: [['P', 0, 0, 0], ['Cl', 0, 1.5, 0], ['Cl', 0, -1.5, 0], ...[0, 120, 240].map(a => ['Cl', 1.45 * Math.cos(a * D), 0, 1.45 * Math.sin(a * D)])], bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]] },
  sf6: { nom: 'hexafluorure de soufre', f: 'SF₆', forme: 'octaédrique', angle: '90°', paires: '6 + 0', hyb: 'sp³d²', atoms: [['S', 0, 0, 0], ['F', 1.4, 0, 0], ['F', -1.4, 0, 0], ['F', 0, 1.4, 0], ['F', 0, -1.4, 0], ['F', 0, 0, 1.4], ['F', 0, 0, -1.4]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]] },
};
export const ROW = ['co2', 'bf3', 'ch4', 'nh3', 'h2o'];
export const BIG = ['pcl5', 'sf6'];
// électronégativités utiles (Pauling)
export const CHI = { H: 2.20, C: 2.55, N: 3.04, O: 3.44, F: 3.98, Cl: 3.16, B: 2.04 };
// angle mesuré entre deux liaisons (vérification)
export function angle(m, i, j) { const a = MOLS[m].atoms, c = a[0], p = a[i], q = a[j]; const u = [1, 2, 3].map(k => p[k] - c[k]), v = [1, 2, 3].map(k => q[k] - c[k]); const d = u.reduce((s, x, k) => s + x * v[k], 0); return Math.acos(d / Math.hypot(...u) / Math.hypot(...v)) / D; }
