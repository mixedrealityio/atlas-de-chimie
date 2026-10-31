// Chapitre 3, page par page. Chine : 九年级下册 第十单元 « 酸和碱 » (溶液酸碱度的表示法——pH) ;
// 选择性必修1 第三章 第二节 « 水的电离和溶液的pH » et 实验活动2 « 强酸与强碱的中和滴定 ».
import * as M from './model.js';
import { ST } from './world.js';
import { chart, sample } from '../engine/kit.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (st, dx, y, dz, az, el, dist) => ({ target: [ST[st] + dx, y, dz], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 3 · 3e–Tle', title: 'L’échelle de pH', sub: 'acide, neutre, basique',
    body: `
      <p class="lede">Le <b>pH</b> mesure l’acidité d’une solution aqueuse sur une échelle de 0 à 14. Une goutte d’<b>indicateur universel</b> colore chaque solution : rouge pour les acides forts, vert pour le neutre, violet pour les bases fortes.</p>
      <table class="data"><tr><th>pH</th><th>exemple</th></tr>${M.EX.map(([p, n]) => `<tr><td>${p}</td><td>${n}</td></tr>`).join('')}</table>
      <p>On mesure le pH avec du papier pH (une bande imbibée d’indicateur universel) ou, plus précisément, avec un pH-mètre.</p>
      ${china('溶液的酸碱度 et pH试纸, troisième année de collège : les élèves déposent une goutte de solution sur le papier pH avec une baguette de verre et comparent à l’échelle de couleurs (标准比色卡).')}`,
    cam: cam('ph', 0, 0.8, 0, 0, 30, 37), lit: 'ph', scene: 'ph', look: {},
    fig: 'De l’acide de batterie à la soude',
  },
  {
    kicker: '3.1', title: 'Le pH et les ions H₃O⁺', sub: 'une échelle logarithmique',
    body: `
      <p class="lede">Une solution est acide parce qu’elle contient beaucoup d’ions oxonium H₃O⁺ (les billes rouges). Le pH est défini à partir de leur concentration :</p>
      ${eq('pH = −log [H₃O⁺]    [H₃O⁺] = 10<sup>−pH</sup> mol/L')}
      <p>Chaque unité de pH correspond à un facteur 10 : en diluant dix fois de l’acide chlorhydrique à 0,1 mol/L (pH 1), on obtient pH 2, puis pH 3. Un jus de citron (pH 2) contient ainsi 100 000 fois plus d’ions H₃O⁺ que l’eau pure (pH 7).</p>
      <p>Même l’eau pure contient un peu d’ions : 2 H₂O ⇌ H₃O⁺ + OH⁻, avec à 25 °C</p>
      ${eq('[H₃O⁺] × [OH⁻] = <i>K</i><sub>e</sub> = 10<sup>−14</sup>')}
      ${china('水的电离 et 水的离子积常数 <i>K</i><sub>w</sub> (选择性必修1 §3.2). Le manuel chinois note H⁺ là où le manuel français écrit H₃O⁺.')}`,
    cam: cam('dil', 0, 1.2, 0, 0, 30, 25), lit: 'dil', scene: 'dil', look: {},
    fig: '100, 10 puis 1 ion H₃O⁺',
  },
  {
    kicker: '3.2', title: 'Le dosage acide-base', sub: 'trouver une concentration inconnue',
    body: `
      <p class="lede">On verse goutte à goutte de la soude (NaOH, 0,10 mol/L) dans 20 mL d’acide chlorhydrique. Chaque ion OH⁻ ajouté neutralise un ion H₃O⁺ :</p>
      ${eq('H₃O⁺ + OH⁻ → 2 H₂O')}
      <div class="charts">${chart({ x0: 0, x1: 40, y0: 0, y1: 14, xlabel: 'volume de soude versé (mL)', ylabel: 'pH', h: 150, label: 'La courbe de dosage', series: [{ pts: sample(M.pHt, 0, 40, 400) }], marks: [[M.Veq, 7, 'équivalence', 6, 14]], cursors: ['t'] })}</div>
      <p>Le pH monte lentement, puis fait un <b>saut</b> brutal autour de 20 mL : c’est l’<b>équivalence</b>, où l’on a versé autant de OH⁻ qu’il y avait de H₃O⁺. La phénolphtaléine, incolore en milieu acide, vire au rose juste après : on lit alors le volume à la burette.</p>
      ${eq('<i>C</i><sub>a</sub> <i>V</i><sub>a</sub> = <i>C</i><sub>b</sub> <i>V</i><sub>éq</sub>')}
      ${china('酸碱中和滴定, une expérience obligatoire du lycée chinois (实验活动2), avec la burette à robinet (酸式/碱式滴定管).')}`,
    cam: cam('titr', 0.6, 2.6, 0, -14, 14, 24), lit: 'titr', scene: 'titr', look: {},
    fig: 'Le rose apparaît à l’équivalence',
  },
];

export const PLATES = {
  ph: { text: `Quinze solutions colorées à l’indicateur universel.`, facts: () => [['acide', 'pH < 7'], ['neutre', 'pH = 7'], ['basique', 'pH > 7']] },
  dil: { text: `Acide chlorhydrique à trois concentrations.`, facts: () => M.DIL.map(d => [`pH ${d.pH}`, `${d.c} mol/L`]) },
  titr: { text: `Burette de soude au-dessus de 20 mL d’acide.`, facts: s => [['volume versé', `${fr(s.Vb, 1)} mL`], ['pH', fr(M.pHt(s.Vb), 2)], ['équivalence', `${fr(M.Veq, 0)} mL`]] },
};
