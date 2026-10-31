// Chapitre 11, page par page. Chine : 选择性必修2 第一章 第一节 « 原子结构 » (能层与能级, 基态与激发态,
// 原子轨道 — 电子云, 泡利原理, 洪特规则, 能量最低原理, 构造原理).
import * as M from './model.js';
import { ST } from './world.js';
import { chart, sample } from '../engine/kit.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (st, dx, y, az, el, dist) => ({ target: [ST[st] + dx, y, 0], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 11 · MPSI–PCSI', title: 'Les orbitales s', sub: 'où se trouve l’électron ?',
    body: `
      <p class="lede">La mécanique quantique ne donne pas la trajectoire d’un électron, seulement une <b>fonction d’onde</b> ψ dont le carré mesure la probabilité de le trouver en un point. Une <b>orbitale</b> est la région où cette probabilité est grande.</p>
      <p>Les orbitales s (nombre quantique <i>l</i> = 0) sont sphériques. Pour l’hydrogène dans son état fondamental (1s), la probabilité de trouver l’électron à la distance <i>r</i> du noyau est maximale à <i>r</i> = <i>a</i>₀ = 52,9 pm, le rayon de Bohr :</p>
      <div class="charts">${chart({ x0: 0, x1: 10, y0: 0, y1: 0.6, xlabel: 'r / a₀', ylabel: 'densité radiale', h: 130, label: 'Densité radiale de probabilité des orbitales 1s et 2s', series: [{ pts: sample(M.P1s, 0, 10, 200), tag: [1.2, M.P1s(1) + 0.03, '1s'] }, { cls: 'curve faint', pts: sample(r => 2.7 * M.P2s(r), 0, 10, 200), tag: [5.6, 2.7 * M.P2s(5.2) + 0.03, '2s'] }], marks: [[1, M.P1s(1), 'a₀', 4, -6], [2, 0, 'nœud', 4, -6]] })}</div>
      <p>L’orbitale 2s est plus grande et possède une <b>surface nodale</b> sphérique (à <i>r</i> = 2<i>a</i>₀) où ψ change de signe : la partie interne (bleue) et la partie externe (rouge, transparente) sont de signes opposés.</p>
      ${china('电子云 (« nuage électronique ») et 原子轨道 : le manuel chinois représente 1s par un nuage de points dont la densité figure la probabilité.')}`,
    cam: cam('s', 0.2, 2.2, -10, 14, 27), lit: 'o2s', scene: 's', look: {},
    fig: '1s et 2s',
  },
  {
    kicker: '11.1', title: 'Les orbitales p', sub: 'trois haltères perpendiculaires',
    body: `
      <p class="lede">À partir de la deuxième couche apparaissent les orbitales p (<i>l</i> = 1). Il y en a trois, de même énergie, orientées selon les trois axes : p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>.</p>
      <p>Chacune a deux lobes de signes opposés, séparés par un plan nodal qui passe par le noyau : la probabilité de trouver l’électron exactement au noyau est nulle.</p>
      ${eq('<i>n</i> = 2 : une 2s + trois 2p = 4 orbitales, soit 8 électrons')}
      <p>C’est l’origine de la règle de l’octet, et la forme des orbitales p explique celle des molécules : les trois liaisons de l’azote dans NH₃, les doubles liaisons π.</p>
      ${china('Le manuel chinois introduit les nombres quantiques par 能层 (couche, <i>n</i>) et 能级 (sous-couche s, p, d, f) ; les orbitales p sont dites 哑铃形 (« en forme d’haltère »).')}`,
    cam: cam('p', 0, 2.2, -10, 14, 33), lit: 'px', scene: 'p', look: {},
    fig: 'Les trois orbitales 2p',
  },
  {
    kicker: '11.2', title: 'Les orbitales d', sub: 'cinq formes pour les métaux de transition',
    body: `
      <p class="lede">À partir de la troisième couche, les orbitales d (<i>l</i> = 2) sont au nombre de cinq. Quatre ont la forme d’un trèfle à quatre lobes (d<sub>xz</sub>, d<sub>yz</sub>, d<sub>xy</sub>, d<sub>x²−y²</sub>), la cinquième (d<sub>z²</sub>) ressemble à un haltère passé dans un anneau.</p>
      <p>Les électrons d des métaux de transition (fer, cuivre, chrome…) expliquent leurs couleurs, leur magnétisme et leur rôle de catalyseurs : selon les molécules qui entourent le métal, les cinq orbitales d n’ont plus la même énergie, et l’absorption de lumière entre elles colore la solution (le bleu du sulfate de cuivre).</p>
      ${eq('nombre d’orbitales d’une sous-couche : 2<i>l</i> + 1    (s 1, p 3, d 5, f 7)')}
      ${china('Les formes des orbitales d ne sont pas exigées au lycée chinois ; elles relèvent du cours universitaire 结构化学 (chimie structurale), comme en prépa.')}`,
    cam: cam('d', 0, 2.2, -8, 14, 50), lit: 'dz2', scene: 'd', look: {},
    fig: 'Les cinq orbitales 3d',
  },
  {
    kicker: '11.3', title: 'Le remplissage', sub: 'Klechkowski, Pauli et Hund',
    body: `
      <p class="lede">Pour écrire la configuration électronique d’un atome, on place ses électrons dans les cases, de bas en haut. Trois règles :</p>
      <p><b>Klechkowski</b> : on remplit dans l’ordre des énergies croissantes, 1s, 2s, 2p, 3s, 3p, <b>4s</b>, puis 3d, 4p (la 4s passe avant la 3d). <b>Pauli</b> : au plus deux électrons par case, de spins opposés. <b>Hund</b> : dans une sous-couche, les électrons occupent d’abord des cases différentes, avec des spins parallèles.</p>
      ${eq('Fe (<i>Z</i> = 26) : 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²')}
      <p>La figure fait défiler les éléments de l’hydrogène au krypton. Deux exceptions à surveiller : le chrome (3d⁵ 4s¹) et le cuivre (3d¹⁰ 4s¹), pour qui une sous-couche d à moitié ou entièrement pleine est plus stable.</p>
      ${china('构造原理 (le principe de construction, avec le diagramme en zigzag), 泡利原理 et 洪特规则, et les « cas particuliers » 24Cr et 29Cu, très appréciés des sujets de gaokao.')}`,
    cam: cam('auf', -0.6, 4.0, 0, 6, 31), lit: 'auf', scene: 'auf', look: {},
    fig: 'De l’hydrogène au krypton',
  },
];

export const PLATES = {
  o1s: { text: `L’orbitale 1s de l’hydrogène.`, facts: () => [['l', '0'], ['rayon le plus probable', '52,9 pm']] },
  o2s: { text: `L’orbitale 2s.`, facts: () => [['l', '0'], ['surface nodale', 'sphère r = 2a₀']] },
  px: { text: `Les orbitales p.`, facts: () => [['l', '1'], ['nombre', '3']] }, py: { text: `Orbitale p_y.`, facts: () => [['l', '1']] }, pz: { text: `Orbitale p_z.`, facts: () => [['l', '1']] },
  dz2: { text: `Orbitale d_z².`, facts: () => [['l', '2'], ['nombre de d', '5']] }, dxz: { text: `Orbitale d_xz.`, facts: () => [['l', '2']] }, dyz: { text: `Orbitale d_yz.`, facts: () => [['l', '2']] }, dxy: { text: `Orbitale d_xy.`, facts: () => [['l', '2']] }, dx2y2: { text: `Orbitale d_x²−y².`, facts: () => [['l', '2']] },
  auf: { text: `Les sous-couches jusqu’à 4p.`, facts: s => [['élément', `${M.SYM[s.Z - 1]} (Z = ${s.Z})`]] },
};
