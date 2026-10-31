// Chapitre 4, page par page. Chine : 必修第一册 第四章 « 物质结构 元素周期律 » (原子结构与元素周期表 ;
// 元素周期律) ; 选择性必修2 第一章 第二节 « 原子结构与元素的性质 » (电离能, 电负性).
import * as M from './model.js';
import { ST } from './world.js';
import { chart } from '../engine/kit.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = { target: [0, 0.6, 0.4], az: 0, el: 62, dist: 40 };
const camLow = { target: [0, 1.2, 0.2], az: -14, el: 30, dist: 46 };
const line = (f, y1, lab) => chart({ x0: 1, x1: 36, y0: 0, y1, xlabel: 'numéro atomique Z', ylabel: lab, h: 130, label: lab,
  series: [{ pts: M.E.filter(e => f(e) != null).map(e => [e.Z, f(e)]) }], marks: [3, 11, 19].map(z => [z, f(M.E[z - 1]), M.E[z - 1].s, 4, 14]).concat([2, 10, 18].filter(z => f(M.E[z - 1]) != null).map(z => [z, f(M.E[z - 1]), M.E[z - 1].s, 4, -6])) });

export const PAGES = [
  {
    kicker: 'Chapitre 4 · 2de', title: 'Le tableau périodique', sub: 'ranger les éléments par Z',
    body: `
      <p class="lede">En 1869, Mendeleïev range les éléments connus par masse croissante et remarque que les propriétés se répètent périodiquement. Il laisse des cases vides pour des éléments encore inconnus, et prédit leurs propriétés : le gallium et le germanium, découverts ensuite, lui donnent raison.</p>
      <p>Aujourd’hui, on range par numéro atomique <i>Z</i>. Une <b>ligne</b> (période) correspond à une couche électronique en cours de remplissage ; une <b>colonne</b> (groupe) rassemble des éléments qui ont le même nombre d’électrons de valence, donc une chimie semblable : métaux alcalins très réactifs (violet), halogènes (vert), gaz nobles inertes (bleu).</p>
      <p>La figure montre les quatre premières périodes, de l’hydrogène au krypton. Les métaux de transition (gris) apparaissent à la période 4.</p>
      ${china('元素周期表, première année de lycée. Les noms chinois des éléments disent leur état : la clé 钅 (métal) pour 钠 Na ou 铁 Fe, 气 (gaz) pour 氧 O ou 氖 Ne, 石 (solide non métallique) pour 硫 S ou 碳… et 氵 (liquide) pour 溴 Br. Le chimiste Zhang Qinglian (张青莲) a mesuré plusieurs masses atomiques adoptées par l’UICPA.')}`,
    cam, lit: 'alc', scene: 'table', look: {},
    fig: 'Les 36 premiers éléments',
  },
  {
    kicker: '4.1', title: 'Le rayon des atomes', sub: 'vers le bas, ça grossit ; vers la droite, ça rétrécit',
    body: `
      <p class="lede">La hauteur des colonnes est maintenant le rayon de l’atome. En descendant une colonne, on ajoute une couche d’électrons : l’atome grossit (Li 128 pm, Na 166 pm, K 203 pm).</p>
      <p>Le long d’une période, la couche externe reste la même mais le noyau gagne des protons : il attire plus fort ses électrons, et l’atome rétrécit (Li 128 pm → F 57 pm).</p>
      <div class="charts">${line(e => e.r, 220, 'rayon covalent (pm)')}</div>
      ${china('元素周期律 : 同周期从左到右原子半径逐渐减小, 同主族从上到下逐渐增大 — la phrase que tous les lycéens chinois récitent.')}`,
    cam: camLow, lit: 'alc', scene: 'rayon', look: {},
    fig: 'Le rayon covalent, en picomètres',
  },
  {
    kicker: '4.2', title: 'L’électronégativité', sub: 'qui attire les électrons d’une liaison',
    body: `
      <p class="lede">L’<b>électronégativité</b> (échelle de Pauling) mesure la force avec laquelle un atome attire vers lui les électrons d’une liaison. Elle augmente vers la droite et vers le haut : le fluor (3,98) est le champion, les métaux alcalins sont en bas de l’échelle.</p>
      <p>La différence d’électronégativité entre deux atomes prévoit le type de liaison : faible (C–H, 0,35) → liaison covalente presque non polaire ; moyenne (O–H, 1,24) → liaison polarisée ; grande (Na–Cl, 2,23) → liaison ionique.</p>
      <div class="charts">${line(e => e.en, 4.2, 'électronégativité de Pauling')}</div>
      <p>Les gaz nobles légers, qui ne forment pas de liaison, n’ont pas de valeur.</p>
      ${china('电负性 (选择性必修2 §1.2), avec le tableau des valeurs de Pauling et la règle : Δχ > 1,7 → 离子键.')}`,
    cam: camLow, lit: 'hal', scene: 'eneg', look: {},
    fig: 'Le fluor domine',
  },
  {
    kicker: '4.3', title: 'L’énergie d’ionisation', sub: 'arracher un électron',
    body: `
      <p class="lede">L’énergie de première ionisation est l’énergie qu’il faut pour arracher l’électron le moins lié d’un atome isolé : X → X⁺ + e⁻.</p>
      <div class="charts">${line(e => e.ie, 26, 'énergie de 1re ionisation (eV)')}</div>
      <p>La courbe est en dents de scie : <b>maximum</b> pour chaque gaz noble (couche pleine, très stable), <b>chute brutale</b> au métal alcalin suivant (un électron seul sur une nouvelle couche, facile à arracher : ${fr(M.E[2].ie, 2)} eV pour le lithium contre ${fr(M.E[1].ie, 2)} eV pour l’hélium).</p>
      <p>Les petits accidents (Be → B, N → O) révèlent les sous-couches s et p : c’est l’objet du chapitre sur les orbitales.</p>
      ${china('电离能 et ses « anomalies » : 第一电离能 N > O, Mg > Al, P > S, une question récurrente du gaokao.')}`,
    cam: camLow, lit: 'noble', scene: 'ie', look: {},
    fig: 'Les gaz nobles au sommet',
  },
];

export const PLATES = Object.fromEntries(Object.entries(M.FAM).map(([k, [, nom]]) => [k, { text: `${nom[0].toUpperCase() + nom.slice(1)}.`, facts: () => M.E.filter(e => e.fam === k).slice(0, 6).map(e => [`${e.s} ${e.cn}`, `${e.nom}, Z = ${e.Z}`]) }]));
