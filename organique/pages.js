// Chapitre 10, page par page. Chine : 必修第二册 第七章 « 有机化合物 » (认识有机化合物 — 烷烃) ;
// 选择性必修3 第一章 (有机化合物的结构特点 — 同分异构现象, 手性) et 第二章 « 烃 » (芳香烃 — 苯).
import * as M from './model.js';
import { ST } from './world.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (st, dx, az, el, dist) => ({ target: [ST[st] + dx, 1.8, 0], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 10 · 1re–Tle', title: 'Les alcanes', sub: 'des chaînes de carbone',
    body: `
      <p class="lede">Le carbone forme 4 liaisons et peut s’enchaîner à lui-même presque sans limite : c’est la base de la <b>chimie organique</b>, celle du vivant, du pétrole et des plastiques.</p>
      <p>Les alcanes sont les chaînes les plus simples : seulement des liaisons simples C–C et C–H. Chaque carbone est au centre d’un tétraèdre, d’où la chaîne en zigzag.</p>
      ${eq('C<sub><i>n</i></sub>H<sub>2<i>n</i>+2</sub>')}
      <table class="data"><tr><th>alcane</th><th>formule</th><th>ébullition</th></tr>${M.ALC.map(a => `<tr><td>${a.nom}</td><td>${a.f}</td><td>${fr(a.eb, 1)} °C</td></tr>`).join('')}${M.MORE.map(([n, f, e]) => `<tr><td>${n}</td><td>${f}</td><td>${fr(e, 1)} °C</td></tr>`).join('')}</table>
      <p>Plus la chaîne est longue, plus les molécules s’accrochent entre elles : les quatre premiers sont des gaz (gaz naturel, butane du briquet), puis viennent les liquides de l’essence, et les solides des bougies.</p>
      ${china('烷烃 et 同系物 (série homologue) ; les élèves chinois nomment les chaînes avec les « dix tiges célestes » : 甲烷, 乙烷, 丙烷, 丁烷 (1, 2, 3, 4 carbones), puis 戊, 己, 庚, 辛…')}`,
    cam: cam('alc', -0.8, -8, 14, 36), lit: 'a3', scene: 'alc', look: {},
    fig: 'Méthane, éthane, propane, butane',
  },
  {
    kicker: '10.1', title: 'Les isomères', sub: 'une formule, plusieurs molécules',
    body: `
      <p class="lede">Avec quatre carbones et dix hydrogènes, on peut construire deux molécules différentes : le <b>butane</b>, chaîne droite, et le <b>méthylpropane</b> (isobutane), chaîne ramifiée. Ce sont des <b>isomères</b> : même formule brute C₄H₁₀, structures différentes, propriétés différentes.</p>
      <p>La forme ramifiée est plus compacte, ses molécules se touchent moins : elle bout plus bas (−11,7 °C contre −0,5 °C).</p>
      <p>Le nombre d’isomères explose avec la longueur : 3 pour C₅H₁₂, 75 pour C₁₀H₂₂, plus de 366 000 pour C₂₀H₄₂. L’octane de l’indice d’octane est d’ailleurs un isomère très ramifié, l’isooctane.</p>
      ${china('同分异构体 (isomères) : écrire tous les isomères d’une formule donnée est un exercice incontournable du gaokao (书写同分异构体).')}`,
    cam: cam('iso', 0, -8, 14, 32), lit: 'isob', scene: 'iso', look: {},
    fig: 'Butane et méthylpropane : C₄H₁₀ tous les deux',
  },
  {
    kicker: '10.2', title: 'Le benzène', sub: 'un cycle à part',
    body: `
      <p class="lede">Le benzène C₆H₆ est un hexagone plat de six carbones. En 1865, Kekulé propose d’y alterner liaisons simples et doubles ; il raconte avoir eu l’idée en rêvant d’un serpent qui se mord la queue.</p>
      <p>Mais toutes les liaisons du benzène ont la même longueur (139 pm, entre une simple et une double). Les deux formules de Kekulé (qui alternent sur la figure) ne sont que des écritures : en réalité, six électrons sont partagés par tout le cycle (le cercle rouge). Cette <b>délocalisation</b> rend le cycle très stable : on dit qu’il est <b>aromatique</b>.</p>
      ${eq('benzène : 6 liaisons C–C identiques de 139 pm    (C–C 154 pm, C=C 134 pm)')}
      ${china('苯的结构 : le manuel chinois écrit le benzène avec un cercle dans l’hexagone (大π键, la « grande liaison π » de six électrons).')}`,
    cam: cam('benz', 0, 0, 8, 25), lit: 'benz', scene: 'benz', look: {},
    fig: 'Kekulé 1, Kekulé 2, puis la réalité',
  },
  {
    kicker: '10.3', title: 'La chiralité', sub: 'molécules droites et gauches',
    body: `
      <p class="lede">Un carbone qui porte quatre groupes tous différents (ici H, F, Cl, Br) est dit <b>asymétrique</b>. La molécule et son image dans un miroir ne sont pas superposables, comme une main droite et une main gauche : ce sont deux <b>énantiomères</b>.</p>
      <p>Ils ont les mêmes propriétés physiques, mais le vivant, lui-même chiral, les distingue : l’un des énantiomères du limonène sent l’orange, l’autre le citron ; un médicament peut être efficace sous une forme et toxique sous l’autre, comme le tragique exemple de la thalidomide.</p>
      <p>Tous les acides aminés de nos protéines (sauf la glycine) sont chiraux, et tous de la même « main ».</p>
      ${china('手性分子 et 手性碳原子 (选择性必修3 §1.1) ; repérer les carbones asymétriques (标出手性碳) dans une formule est un exercice classique.')}`,
    cam: cam('chir', 0, -10, 10, 29), lit: 'chir', scene: 'chir', look: {},
    fig: 'Deux mains qui ne se superposent pas',
  },
];

export const PLATES = {
  ...Object.fromEntries(M.ALC.map((a, i) => ['a' + i, { text: `${a.nom[0].toUpperCase() + a.nom.slice(1)}, ${a.f}.`, facts: () => [['carbones', String(a.n)], ['ébullition', `${fr(a.eb, 1)} °C`]] }])),
  but: { text: `Butane, chaîne droite.`, facts: () => [['formule', 'C₄H₁₀'], ['ébullition', '−0,5 °C']] },
  isob: { text: `Méthylpropane, chaîne ramifiée.`, facts: () => [['formule', 'C₄H₁₀'], ['ébullition', '−11,7 °C']] },
  benz: { text: `Le benzène, C₆H₆.`, facts: () => [['liaisons C–C', '6 × 139 pm'], ['angles', '120°']] },
  chir: { text: `CHFClBr et son image dans le miroir.`, facts: () => [['carbone', 'asymétrique'], ['énantiomères', '2']] },
};
