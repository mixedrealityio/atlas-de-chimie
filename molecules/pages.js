// Chapitre 5, page par page. Chine : 必修第一册 §4.3 « 化学键 » (共价键, 电子式) ; 选择性必修2 第二章
// « 分子结构与性质 » (价层电子对互斥模型, 杂化轨道理论, 键的极性和分子的极性).
import * as M from './model.js';
import { ST, XR } from './world.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const at = (k, y = 1.8) => [ST.row + XR(k), y, 0];

export const PAGES = [
  {
    kicker: 'Chapitre 5 · 2de', title: 'La liaison covalente', sub: 'partager des électrons',
    body: `
      <p class="lede">Deux non-métaux ne s’arrachent pas d’électrons : ils en <b>mettent en commun</b>. Chaque paire d’électrons partagée forme une <b>liaison covalente</b> (un bâtonnet sur la figure).</p>
      <p>Dans la molécule d’eau, l’atome d’oxygène (6 électrons de valence) forme deux liaisons avec deux hydrogènes. Il lui reste deux paires d’électrons à lui seul : les <b>doublets non liants</b> (les lobes jaunes). Au total, il est entouré de 8 électrons : la règle de l’octet est respectée.</p>
      ${eq('H–O–H    nombre de liaisons : H 1, O 2, N 3, C 4')}
      <p>Les liaisons peuvent être doubles (O=C=O) ou triples (N≡N), quand deux atomes partagent deux ou trois paires.</p>
      ${china('共价键 et 电子式 (schéma de Lewis), première année de lycée. Les « valences » 1, 2, 3, 4 de H, O, N, C se récitent comme en France.')}`,
    cam: { target: at('h2o'), az: -10, el: 14, dist: 15 }, lit: 'h2o', scene: 'lewis', look: {},
    fig: 'La molécule d’eau et ses deux doublets',
  },
  {
    kicker: '5.1', title: 'La méthode VSEPR', sub: 'les doublets se repoussent',
    body: `
      <p class="lede">Pourquoi CO₂ est-il droit et H₂O coudé ? Gillespie et Nyholm (1957) : autour de l’atome central, les doublets d’électrons (liants et non liants) se repoussent et s’écartent le plus possible.</p>
      <table class="data"><tr><th>molécule</th><th>doublets liants + non liants</th><th>forme</th><th>angle</th></tr>${M.ROW.map(k => { const m = M.MOLS[k]; return `<tr><td>${m.f}</td><td>${m.paires}</td><td>${m.forme}</td><td>${m.angle}</td></tr>`; }).join('')}</table>
      <p>Un doublet non liant prend plus de place qu’une liaison : il resserre les angles. D’où 109,5° dans CH₄, 107° dans NH₃ (un doublet), 104,5° dans H₂O (deux doublets). Une liaison double compte comme une seule direction.</p>
      ${china('价层电子对互斥模型 (VSEPR, 选择性必修2 §2.2) : les élèves calculent le nombre de paires 价层电子对数 = σ键数 + 孤电子对数 pour prédire la forme 空间结构.')}`,
    cam: { target: [ST.row, 1.4, 0], az: 0, el: 16, dist: 47 }, lit: 'nh3', scene: 'vsepr', look: {},
    fig: 'Linéaire, plane, tétraèdre, pyramide, coudée',
  },
  {
    kicker: '5.2', title: 'Molécules polaires', sub: 'pourquoi l’eau dissout le sel',
    body: `
      <p class="lede">Dans une liaison entre deux atomes d’électronégativités différentes, les électrons sont attirés vers le plus électronégatif, qui porte une charge partielle δ−. La liaison a un <b>moment dipolaire</b> (flèche).</p>
      <p>Dans CO₂, les deux liaisons C=O sont polarisées, mais la molécule est droite et symétrique : les deux flèches s’annulent, la molécule est <b>apolaire</b>. Dans H₂O, la molécule est coudée : les deux contributions s’ajoutent, l’eau est <b>polaire</b>, son côté oxygène négatif et son côté hydrogène positif.</p>
      <p>Cette polarité explique pourquoi l’eau dissout le sel et le sucre mais pas l’huile (« qui se ressemble s’assemble »), et pourquoi elle bout à 100 °C malgré sa petite taille : ses molécules s’accrochent par des liaisons hydrogène.</p>
      ${china('键的极性和分子的极性, 相似相溶 (« les semblables se dissolvent ») et 氢键 (liaison hydrogène), 选择性必修2 §2.3.')}`,
    cam: { target: [ST.row + 0.0, 1.8, 0], az: 0, el: 6, dist: 47 }, lit: 'h2o', scene: 'polar', look: {},
    fig: 'Deux flèches qui s’annulent, deux qui s’ajoutent',
  },
  {
    kicker: '5.3', title: 'Au-delà de l’octet', sub: 'PCl₅, SF₆ et l’hybridation',
    body: `
      <p class="lede">À partir de la troisième période, l’atome central peut s’entourer de plus de 8 électrons. Cinq doublets donnent une <b>bipyramide trigonale</b> (PCl₅), six un <b>octaèdre</b> (SF₆).</p>
      <p>Pour expliquer ces formes avec les orbitales atomiques (chapitre 10), Pauling introduit l’<b>hybridation</b> : les orbitales de l’atome central se mélangent en orbitales équivalentes pointant vers les sommets de la figure.</p>
      <table class="data"><tr><th>hybridation</th><th>forme</th><th>exemple</th></tr>${[...M.ROW.slice(0, 3), ...M.BIG].map(k => { const m = M.MOLS[k]; return `<tr><td>${m.hyb}</td><td>${m.forme}</td><td>${m.f}</td></tr>`; }).join('')}</table>
      <p>Le SF₆ est un gaz très stable utilisé comme isolant dans les postes électriques haute tension ; c’est aussi le plus puissant gaz à effet de serre connu.</p>
      ${china('杂化轨道理论 (sp, sp², sp³), 选择性必修2 §2.2 ; les formes sp³d et sp³d² sont vues à l’université (结构化学) et en prépa.')}`,
    cam: { target: [ST.big, 1.6, 0], az: -15, el: 18, dist: 26 }, lit: 'sf6', scene: 'big', look: {},
    fig: 'Bipyramide et octaèdre',
  },
];

export const PLATES = Object.fromEntries(Object.entries(M.MOLS).map(([k, m]) => [k, { text: `${m.f}, ${m.nom}.`, facts: () => [['forme', m.forme], ['angle', m.angle], ['doublets', m.paires], ['hybridation', m.hyb]] }]));
