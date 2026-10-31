// Chapitre 1, page par page. Chine : 九年级上册 第三单元 课题2 « 原子的结构 » ; 必修第一册 第四章.
import * as M from './model.js';
import { ST } from './world.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (st, dx, y, dz, az, el, dist) => ({ target: [ST[st] + dx, y, dz], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 1 · 3e–2de', title: 'L’atome', sub: 'un noyau minuscule et des électrons',
    body: `
      <p class="lede">Toute la matière est faite d’atomes. Un atome a en son centre un <b>noyau</b>, fait de protons (charge +) et de neutrons (neutres), autour duquel se déplacent des <b>électrons</b> (charge −).</p>
      <p>L’atome de sodium a 11 protons et 11 électrons : il est électriquement neutre. Le nombre de protons, <i>Z</i>, est le <b>numéro atomique</b> : c’est lui qui définit l’élément.</p>
      ${eq('<sup><i>A</i></sup><sub><i>Z</i></sub>X    <i>A</i> = <i>Z</i> + <i>N</i>   (nucléons = protons + neutrons)')}
      <p>La figure n’est pas à l’échelle : si l’atome avait la taille d’un stade de football, le noyau serait une bille au centre du terrain. Le noyau fait environ 10<sup>−15</sup> m, l’atome 10<sup>−10</sup> m, mais le noyau porte plus de 99,9 % de la masse.</p>
      ${china('原子的结构 (troisième année de collège). Les élèves chinois dessinent le « schéma de structure atomique » (原子结构示意图) : un cercle marqué +11 et trois arcs portant 2, 8, 1.')}`,
    cam: cam('atom', 0, 1.2, 0, -20, 34, 13), lit: 'atom', scene: 'atom', look: {},
    fig: 'Le sodium : 11 protons, 12 neutrons, 11 électrons',
  },
  {
    kicker: '1.1', title: 'Les couches électroniques', sub: '2, puis 8, puis 8',
    body: `
      <p class="lede">Les électrons se rangent sur des <b>couches</b> de plus en plus éloignées du noyau : K, L, M. La couche K accepte au plus 2 électrons, les couches L et M (pour les 18 premiers éléments) au plus 8.</p>
      <table class="data"><tr><th>élément</th><th><i>Z</i></th><th>K</th><th>L</th><th>M</th></tr>${[1, 2, 3, 6, 8, 10, 11, 17, 18].map(z => { const e = M.ELTS[z - 1], c = M.shells(z); return `<tr><td>${e.nom}</td><td>${z}</td><td>${c[0] ?? ''}</td><td>${c[1] ?? ''}</td><td>${c[2] ?? ''}</td></tr>`; }).join('')}</table>
      <p>La figure fait défiler les 18 premiers éléments. Les électrons de la dernière couche, dits <b>de valence</b>, décident de presque toute la chimie d’un élément : le néon et l’argon, dont la couche externe est pleine, ne réagissent avec presque rien.</p>
      ${china('核外电子排布 (分层排布), première année de lycée. Le programme chinois va jusqu’à Z = 20 au collège-lycée, puis introduit les sous-couches s, p, d (能级) en option « structure de la matière ».')}`,
    cam: cam('atom', 0, 1.2, 0, -20, 34, 13), lit: 'atom', scene: 'shells', look: {},
    fig: 'Les 18 premiers éléments, un toutes les deux secondes',
  },
  {
    kicker: '1.2', title: 'Les ions', sub: 'Na + Cl → Na⁺ + Cl⁻',
    body: `
      <p class="lede">Le sodium a un seul électron sur sa couche externe ; le chlore en a sept. Quand ils se rencontrent, l’électron solitaire du sodium (en jaune) passe sur le chlore.</p>
      <p>Chacun obtient alors une couche externe pleine, comme un gaz noble : le sodium devient l’ion <b>Na⁺</b> (il a perdu une charge négative), le chlore l’ion <b>Cl⁻</b>. Les deux ions de signes opposés s’attirent : c’est la <b>liaison ionique</b> du sel de cuisine, NaCl.</p>
      ${eq('Na → Na⁺ + e⁻    Cl + e⁻ → Cl⁻')}
      <p>Règle de l’octet : les atomes des trois premières périodes tendent à gagner, perdre ou partager des électrons pour avoir 8 électrons sur leur couche externe (2 pour l’hydrogène).</p>
      ${china('离子的形成 et 离子键 ; les manuels chinois utilisent le « schéma électronique » (电子式) Na⁺[:Cl:]⁻.')}`,
    cam: cam('ion', 0, 1.4, 0, -10, 40, 22), lit: 'na', scene: 'ion', look: {},
    fig: 'Un électron passe du sodium au chlore',
  },
  {
    kicker: '1.3', title: 'Les isotopes', sub: 'même élément, masses différentes',
    body: `
      <p class="lede">Deux atomes d’un même élément ont toujours le même nombre de protons, mais pas forcément le même nombre de neutrons : ce sont des <b>isotopes</b>. Le carbone en a trois dans la nature : <sup>12</sup>C, <sup>13</sup>C et <sup>14</sup>C.</p>
      <p>Ils ont les mêmes électrons, donc la même chimie. Seule la masse change, et la stabilité du noyau : le carbone 14 est radioactif, ce qui sert à dater les restes d’êtres vivants.</p>
      <p>La masse atomique d’un élément, dans le tableau périodique, est la moyenne pondérée de ses isotopes. Pour le chlore :</p>
      ${eq(`${M.CL.map(i => `${fr(100 * i.p, 2)} % × ${fr(i.m, 3)}`).join(' + ')} = ${fr(M.mCl, 2)}`)}
      ${china('同位素 et 相对原子质量 (必修第一册 §4.1). Le nombre 35,5 du chlore est un classique des calculs de masse molaire au lycée chinois.')}`,
    cam: cam('iso', 0, 1.2, 0, -10, 40, 19), lit: 'iso1', scene: 'iso', look: {},
    fig: '¹²C, ¹³C et ¹⁴C : 6 protons chacun',
  },
];

export const PLATES = {
  atom: { text: `Le noyau (protons et neutrons) et les couches d’électrons.`, facts: s => { const e = M.ELTS[s.Z - 1]; return [['élément', `${e.nom} (${e.s})`], ['protons', String(e.Z)], ['neutrons', String(e.n)], ['électrons', M.shells(e.Z).join(' – ')]]; } },
  na: { text: `Le sodium : 11 électrons, dont 1 sur la couche externe.`, facts: () => [['configuration', '2 – 8 – 1'], ['ion formé', 'Na⁺']] },
  cl: { text: `Le chlore : 17 électrons, dont 7 sur la couche externe.`, facts: () => [['configuration', '2 – 8 – 7'], ['ion formé', 'Cl⁻']] },
  iso0: { text: `Carbone 12 : 6 protons, 6 neutrons.`, facts: () => [['abondance', '98,9 %']] },
  iso1: { text: `Carbone 13 : 6 protons, 7 neutrons.`, facts: () => [['abondance', '1,1 %']] },
  iso2: { text: `Carbone 14 : 6 protons, 8 neutrons.`, facts: () => [['demi-vie', '5 730 ans']] },
};
