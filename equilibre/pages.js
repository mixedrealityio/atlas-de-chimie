// Chapitre 8, page par page. Chine : 选择性必修1 第二章 第二节 « 化学平衡 » (化学平衡状态, 平衡常数,
// 影响化学平衡的因素 — 勒夏特列原理) et 第四节 « 化学反应的调控 » (合成氨).
import * as M from './model.js';
import { ST } from './world.js';
import { chart, sample } from '../engine/kit.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;

export const PAGES = [
  {
    kicker: 'Chapitre 8 · Tle', title: 'L’équilibre chimique', sub: 'une réaction qui va dans les deux sens',
    body: `
      <p class="lede">On enferme du tétraoxyde de diazote N₂O₄, incolore, dans un ballon. Ses molécules se cassent en deux molécules de dioxyde d’azote NO₂, brun ; mais deux NO₂ qui se rencontrent peuvent aussi se recoller.</p>
      ${eq('N₂O₄ ⇌ 2 NO₂')}
      <div class="charts">${chart({ x0: 0, x1: 16, y0: 0, y1: 1, xlabel: 't (s)', ylabel: 'concentration (mol/L)', h: 130, label: 'Les concentrations tendent vers des valeurs fixes', series: [{ pts: sample(t => M.conc(t).N2O4, 0, 16, 120), tag: [10, M.conc(10).N2O4 + 0.08, 'N₂O₄'] }, { cls: 'curve faint', pts: sample(t => M.conc(t).NO2, 0, 16, 120), tag: [10, M.conc(10).NO2 - 0.12, 'NO₂'] }], cursors: ['a', 'b'] })}</div>
      <p>Au bout de quelques secondes, la couleur ne change plus : autant de molécules se cassent que se recollent à chaque instant. C’est un <b>équilibre dynamique</b> : rien ne bouge en apparence, tout bouge en réalité. Les concentrations vérifient alors</p>
      ${eq(`<i>K</i> = [NO₂]² / [N₂O₄] = ${fr(M.K(M.XT[25]), 2)}    (constante à température fixée)`)}
      ${china('化学平衡状态 et 化学平衡常数 <i>K</i> ; le ballon de NO₂ est une expérience du manuel (实验2-?).'.replace(' (实验2-?)', ''))}`,
    cam: { target: [ST.flask, 1.9, 0], az: 0, el: 12, dist: 18 }, lit: 'f25', scene: 'dyn', look: {},
    fig: 'Le brun se stabilise',
  },
  {
    kicker: '8.1', title: 'Le principe de Le Chatelier', sub: 'l’équilibre résiste aux changements',
    body: `
      <p class="lede">On plonge un ballon dans la glace et un autre dans l’eau chaude. Le premier pâlit, le second devient brun foncé.</p>
      <p>La dissociation de N₂O₄ absorbe de la chaleur (Δ<i>H</i> = +57 kJ/mol). Quand on chauffe, l’équilibre se déplace dans le sens qui consomme cette chaleur : vers NO₂. Quand on refroidit, vers N₂O₄.</p>
      <p><b>Principe de Le Chatelier</b> (1884) : si on modifie une condition d’un équilibre (température, pression, concentration), il se déplace dans le sens qui tend à s’opposer à cette modification.</p>
      ${eq('↑ <i>T</i> : sens endothermique    ↑ <i>P</i> : sens qui diminue le nombre de molécules de gaz')}
      ${china('勒夏特列原理, avec l’expérience classique des deux ballons de NO₂ plongés dans l’eau chaude et l’eau glacée (浸泡在冷水和热水中).')}`,
    cam: { target: [ST.flask, 1.8, 0], az: 0, el: 14, dist: 27 }, lit: 'f80', scene: 'chat', look: {},
    fig: '0 °C, 25 °C, 80 °C',
  },
  {
    kicker: '8.2', title: 'La synthèse de l’ammoniac', sub: 'le compromis de Haber et Bosch',
    body: `
      <p class="lede">L’ammoniac NH₃, base des engrais azotés, se fabrique à partir de l’azote de l’air et d’hydrogène :</p>
      ${eq('N₂ + 3 H₂ ⇌ 2 NH₃    Δ<i>H</i> = −92 kJ/mol')}
      <p>Le Chatelier dit comment favoriser NH₃ : <b>haute pression</b> (4 molécules de gaz deviennent 2) et <b>basse température</b> (réaction exothermique). Les barres montrent le pourcentage d’ammoniac à l’équilibre.</p>
      <p>Mais à basse température, la réaction est beaucoup trop lente. L’industrie choisit un compromis : 400 à 500 °C, 200 à 300 atm, un catalyseur au fer, et on recycle le gaz qui n’a pas réagi. Le procédé nourrit aujourd’hui près de la moitié de l’humanité.</p>
      <table class="data"><tr><th></th>${M.HAB.P.map(p => `<th>${p} atm</th>`).join('')}</tr>${M.HAB.T.map(T => `<tr><td>${T} °C</td>${M.HAB.y[T].map(v => `<td>${fr(v, 1)} %</td>`).join('')}</tr>`).join('')}</table>
      ${china('合成氨条件的选择 (选择性必修1 §2.4). La Chine est le premier producteur mondial d’ammoniac.')}`,
    cam: { target: [ST.hab, 1.4, 0], az: -25, el: 28, dist: 25 }, lit: 'hab', scene: 'haber', look: {},
    fig: 'Bleu 300 °C, gris 400 °C, rouge 500 °C',
  },
];

export const PLATES = {
  f0: { text: `Ballon dans la glace.`, facts: () => [['NO₂ dissocié', '≈ 15 %'], ['couleur', 'pâle']] },
  f25: { text: `Ballon à température ambiante.`, facts: s => [['NO₂', String(s.nNO2 ?? '')], ['N₂O₄', String(s.nN2O4 ?? '')]] },
  f80: { text: `Ballon dans l’eau chaude.`, facts: () => [['NO₂ dissocié', '≈ 80 %'], ['couleur', 'brun foncé']] },
  hab: { text: `Pourcentage d’ammoniac à l’équilibre (mélange N₂ + 3 H₂).`, facts: () => [['meilleur', '300 °C, 600 atm : 84 %'], ['industrie', '≈ 450 °C, 250 atm']] },
};
