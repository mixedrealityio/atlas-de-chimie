// Chapitre 6, page par page. Chine : 选择性必修2 第三章 « 晶体结构与性质 » (晶体与晶胞, 离子晶体,
// 共价晶体, 过渡晶体与混合型晶体).
import * as M from './model.js';
import { ST } from './world.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (st, el = 22, dist = 27) => ({ target: [ST[st], 2, 0], az: -20, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 6 · 1re–Tle', title: 'Les cristaux', sub: 'la maille du sel',
    body: `
      <p class="lede">Un cristal est un empilement régulier d’atomes ou d’ions. On le décrit par sa <b>maille</b> : le petit motif qui, répété dans les trois directions, reconstruit tout le cristal, comme un carreau de carrelage en 3D.</p>
      <p>Dans le sel (NaCl), chaque ion Na⁺ est entouré de 6 ions Cl⁻ et réciproquement. Un ion placé sur un sommet de la maille est partagé entre 8 mailles, sur une arête entre 4, sur une face entre 2. On compte donc :</p>
      ${eq('Cl⁻ : 8 × 1/8 + 6 × 1/2 = 4    Na⁺ : 12 × 1/4 + 1 = 4')}
      <p>Quatre « NaCl » par maille de côté <i>a</i> = 564 pm : on en déduit la masse volumique du sel,</p>
      ${eq(`ρ = 4 <i>M</i>(NaCl) / (<i>N</i><sub>A</sub> <i>a</i>³) = ${fr(M.rho(4, 58.44, M.A.NaCl), 2)} g/cm³`)}
      ${china('晶胞 et la méthode du partage 均摊法 (« répartir équitablement »), un passage obligé des exercices de gaokao sur la structure de la matière.')}`,
    cam: cam('nacl'), lit: 'nacl', scene: 'nacl', look: {},
    fig: '14 ions Cl⁻ et 13 ions Na⁺ visibles, 4 de chaque par maille',
  },
  {
    kicker: '6.1', title: 'Le chlorure de césium', sub: 'cubique centré',
    body: `
      <p class="lede">Le césium est beaucoup plus gros que le sodium : l’ion Cs⁺ trouve de la place pour 8 voisins Cl⁻ au lieu de 6. La maille devient un cube avec un ion Cs⁺ en son centre et des ions Cl⁻ aux huit sommets.</p>
      ${eq('Cl⁻ : 8 × 1/8 = 1    Cs⁺ : 1')}
      <p>Le nombre de voisins (la <b>coordinence</b>) dépend du rapport des rayons des ions : 6 pour NaCl, 8 pour CsCl. Les cristaux ioniques sont durs, cassants, et ne conduisent l’électricité qu’une fois fondus ou dissous, quand leurs ions peuvent bouger.</p>
      ${china('离子晶体 et 配位数 (coordinence) : NaCl 6, CsCl 8 — une comparaison présente dans tous les manuels.')}`,
    cam: cam('cscl'), lit: 'cscl', scene: 'cscl', look: {},
    fig: 'Huit voisins pour le césium',
  },
  {
    kicker: '6.2', title: 'Le diamant', sub: 'un cristal covalent',
    body: `
      <p class="lede">Dans le diamant, il n’y a pas d’ions : chaque atome de carbone est lié par quatre liaisons covalentes à quatre voisins disposés en tétraèdre. Tout le cristal est une seule molécule géante.</p>
      ${eq('8 × 1/8 + 6 × 1/2 + 4 = 8 atomes par maille')}
      <p>Avec <i>a</i> = 357 pm, cela donne ${fr(M.rho(8, 12.011, M.A.diamant), 2)} g/cm³. Pour rayer ou casser un diamant, il faut rompre des liaisons C–C très solides dans toutes les directions : c’est le matériau naturel le plus dur.</p>
      ${china('共价晶体 (金刚石, 二氧化硅). La Chine est aujourd’hui le premier producteur mondial de diamants de synthèse, notamment dans la province du Henan.')}`,
    cam: cam('diam'), lit: 'diam', scene: 'diam', look: {},
    fig: 'Quatre voisins pour chaque carbone',
  },
  {
    kicker: '6.3', title: 'Le graphite', sub: 'même carbone, autre empilement',
    body: `
      <p class="lede">Le graphite de la mine de crayon est fait du même carbone, autrement rangé : des <b>feuillets</b> plats d’hexagones (chaque carbone a 3 voisins à 142 pm), empilés à 335 pm les uns des autres.</p>
      <p>Dans un feuillet, les liaisons sont fortes ; entre les feuillets, seules de faibles forces de van der Waals les retiennent. Les feuillets glissent : le graphite est tendre et laisse une trace sur le papier. Le quatrième électron de chaque carbone circule dans le feuillet : le graphite conduit l’électricité, le diamant non.</p>
      <p>Un seul feuillet isolé s’appelle le <b>graphène</b> (prix Nobel 2010).</p>
      ${china('石墨 est classé comme 混合型晶体 (cristal « mixte »), à la fois covalent, métallique et moléculaire.')}`,
    cam: cam('gra', 18, 25), lit: 'gra', scene: 'gra', look: {},
    fig: 'Trois feuillets de graphène',
  },
];

export const PLATES = {
  nacl: { text: `La maille cubique à faces centrées du sel.`, facts: () => [['Na⁺ par maille', '4'], ['Cl⁻ par maille', '4'], ['a', '564 pm'], ['coordinence', '6']] },
  cscl: { text: `La maille cubique du chlorure de césium.`, facts: () => [['Cs⁺', '1'], ['Cl⁻', '1'], ['a', '412 pm'], ['coordinence', '8']] },
  diam: { text: `La maille du diamant.`, facts: () => [['atomes par maille', '8'], ['a', '357 pm'], ['voisins', '4']] },
  gra: { text: `Trois feuillets de graphite.`, facts: () => [['C–C', '142 pm'], ['entre feuillets', '335 pm'], ['voisins', '3']] },
};
