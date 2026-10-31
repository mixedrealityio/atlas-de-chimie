// Chapitre 7, page par page. Chine : 选择性必修1 第一章 « 化学反应的热效应 » (反应热, 焓变, 盖斯定律) ;
// 第二章 第一节 « 化学反应速率 » (有效碰撞, 活化能, 影响速率的因素, 催化剂).
import * as M from './model.js';
import { chart, sample } from '../engine/kit.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = { target: [0, 2.2, 0], az: 0, el: 8, dist: 29 };

export const PAGES = [
  {
    kicker: 'Chapitre 7 · 1re–Tle', title: 'L’énergie d’une réaction', sub: 'exothermique ou endothermique',
    body: `
      <p class="lede">Rompre une liaison coûte de l’énergie, en former une en libère. Si les liaisons des produits sont plus solides que celles des réactifs, la réaction libère de la chaleur : elle est <b>exothermique</b> et son enthalpie de réaction Δ<i>H</i> est négative.</p>
      ${eq('CH₄ + 2 O₂ → CO₂ + 2 H₂O    Δ<i>H</i> = −890 kJ/mol')}
      <p>Sur la figure, les produits sont plus bas que les réactifs : la différence part en chaleur. À l’inverse, une réaction <b>endothermique</b> (Δ<i>H</i> > 0) absorbe de la chaleur, comme la dissolution du nitrate d’ammonium des poches de froid instantané.</p>
      <p><b>Loi de Hess</b> : Δ<i>H</i> ne dépend que de l’état de départ et d’arrivée, pas du chemin. On peut donc additionner des équations connues pour calculer l’énergie d’une réaction qu’on ne sait pas mesurer.</p>
      ${china('反应热, 焓变 Δ<i>H</i> et 热化学方程式 (équation thermochimique avec les états physiques), puis 盖斯定律 (loi de Hess), 选择性必修1 chapitre 1.')}`,
    cam, lit: 'hill', scene: 'dh', look: {},
    fig: 'Les produits sont plus bas que les réactifs',
  },
  {
    kicker: '7.1', title: 'L’énergie d’activation', sub: 'une colline à franchir',
    body: `
      <p class="lede">Une réaction exothermique n’est pas forcément rapide : un mélange de méthane et d’air peut rester des années sans brûler. Pour réagir, les molécules doivent se heurter assez fort pour casser leurs liaisons : il faut franchir une barrière, l’<b>énergie d’activation</b> <i>E</i><sub>a</sub>.</p>
      <p>Les douze billes rouges s’élancent régulièrement vers le sommet, chacune avec une énergie tirée au hasard. La plupart retombent ; seules celles qui dépassent <i>E</i><sub>a</sub> passent de l’autre côté (en bleu). Ce sont les <b>chocs efficaces</b>.</p>
      <p>Une allumette fournit l’énergie qui permet aux premières molécules de franchir la barrière ; la chaleur libérée en fait passer d’autres : la flamme s’entretient.</p>
      ${china('有效碰撞理论 et 活化能 (选择性必修1 §2.1) : 活化分子 (molécules activées) et 有效碰撞 (chocs efficaces) sont les mots clés.')}`,
    cam, lit: 'hill', scene: 'ea', look: {},
    fig: 'Rouge : réactifs ; bleu : produits',
  },
  {
    kicker: '7.2', title: 'L’effet de la température', sub: 'plus chaud, plus vite',
    body: `
      <p class="lede">Quand on chauffe, les molécules sont en moyenne plus énergiques ; surtout, la part de celles qui dépassent <i>E</i><sub>a</sub> (l’aire grise à droite) augmente fortement. La figure alterne une manche « froide » et une manche « chaude ».</p>
      <div class="charts">${chart({ x0: 0, x1: 4, y0: 0, y1: 1.2, xlabel: 'énergie d’une molécule', ylabel: 'répartition', h: 130, label: 'Répartition des énergies à deux températures',
        series: [{ pts: sample(E => M.boltz(E, M.KT.low), 0.001, 4, 160), tag: [0.35, M.boltz(0.35, M.KT.low), 'froid'] }, { cls: 'curve faint', pts: sample(E => M.boltz(E, M.KT.high), 0.001, 4, 160), tag: [1.3, M.boltz(1.3, M.KT.high) + 0.05, 'chaud'] }, { cls: 'curve faint', pts: [[M.PR.Ea, 0], [M.PR.Ea, 1.2]], tag: [M.PR.Ea, 1.05, 'Ea'] }] })}</div>
      <p>La loi d’<b>Arrhenius</b> le quantifie : <i>k</i> = <i>A</i> e<sup>−<i>E</i><sub>a</sub>/<i>RT</i></sup>. Pour <i>E</i><sub>a</sub> = 50 kJ/mol, passer de 27 °C à 37 °C multiplie la vitesse par ${fr(M.arr(50000, 300, 310), 1)}. D’où la règle pratique : « +10 °C, vitesse × 2 », et l’intérêt du réfrigérateur.</p>
      ${china('温度对化学反应速率的影响 ; la loi d’Arrhenius (阿伦尼乌斯公式) est donnée en lecture complémentaire 资料卡片.')}`,
    cam, lit: 'hill', scene: 'temp', look: {},
    fig: 'Une manche froide, une manche chaude',
  },
  {
    kicker: '7.3', title: 'Le catalyseur', sub: 'un raccourci par le col',
    body: `
      <p class="lede">Un <b>catalyseur</b> offre à la réaction un autre chemin, avec une barrière plus basse (courbe bleue). Presque toutes les molécules passent : la réaction est beaucoup plus rapide. Le catalyseur n’est pas consommé, et il ne change ni les réactifs, ni les produits, ni Δ<i>H</i>.</p>
      <p>Exemples : le fer du procédé Haber (synthèse de l’ammoniac), le platine des pots catalytiques, et les <b>enzymes</b> de notre corps, qui accélèrent des réactions des millions de fois à 37 °C.</p>
      ${eq('2 H₂O₂ → 2 H₂O + O₂    (catalysée par MnO₂ ou par la catalase)')}
      ${china('催化剂 : l’expérience du manuel décompose l’eau oxygénée (过氧化氢) avec du dioxyde de manganèse (二氧化锰), dès la troisième année de collège.')}`,
    cam, lit: 'cat', scene: 'cata', look: {},
    fig: 'Avec catalyseur, presque tout passe',
  },
];

export const PLATES = {
  hill: { text: `Le profil d’énergie : réactifs, sommet, produits.`, facts: s => [['Ea', 'hauteur du sommet'], ['ΔH', 'produits − réactifs, < 0'], ['ont réagi', `${s.n ?? 0} / 12`]] },
  cat: { text: `Le chemin catalysé, deux fois moins haut.`, facts: () => [['Ea catalysée', 'la moitié'], ['ΔH', 'inchangé']] },
};
