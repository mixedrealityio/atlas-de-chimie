// Chapitre 9, page par page. Chine : 选择性必修1 第四章 « 化学反应与电能 » (原电池 — 盐桥, 化学电源 ;
// 电解池 ; 金属的腐蚀与防护) ; 必修第二册 §6.1.
import * as M from './model.js';
import { ST } from './world.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (st, dx, y, az, el, dist) => ({ target: [ST[st] + dx, y, 0], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 9 · Tle', title: 'La pile', sub: 'une réaction qui fait circuler des électrons',
    body: `
      <p class="lede">Une lame de zinc plongée dans du sulfate de cuivre se couvre de cuivre : le zinc cède des électrons aux ions Cu²⁺. Dans une <b>pile</b>, on sépare les deux moitiés de la réaction pour obliger les électrons à passer par un fil.</p>
      ${eq('anode (−) : Zn → Zn²⁺ + 2 e⁻    cathode (+) : Cu²⁺ + 2 e⁻ → Cu')}
      <p>Les électrons (bleus) vont du zinc au cuivre dans le fil. Le <b>pont salin</b> ferme le circuit : ses ions K⁺ (violets) vont vers le cuivre, ses ions Cl⁻ (verts) vers le zinc, pour que chaque bécher reste neutre.</p>
      <p>La tension à vide vaut ${fr(M.DANIELL, 2)} V. Peu à peu, le zinc se ronge, du cuivre se dépose, la solution bleue pâlit : la pile s’use.</p>
      ${china('原电池 et 盐桥 (pont salin), avec la pile 锌铜原电池. Mnémotechnique chinoise : 负极失电子 (le pôle − perd des électrons), 正极得电子.')}`,
    cam: cam('dan', 0, 2.3, -12, 14, 22), lit: 'dan', scene: 'dan', look: {},
    fig: 'Des électrons du zinc vers le cuivre',
  },
  {
    kicker: '9.1', title: 'L’échelle des potentiels', sub: 'qui donne, qui prend',
    body: `
      <p class="lede">Chaque couple oxydant/réducteur a un <b>potentiel standard</b> <i>E</i>° mesuré par rapport à l’électrode à hydrogène (0 V). En bas (bleu), les métaux qui cèdent facilement leurs électrons, comme le lithium ; en haut (rouge), les ions qui les captent facilement, comme l’or.</p>
      <table class="data"><tr><th>couple</th><th><i>E</i>° (V)</th></tr>${M.E0.map(([c, e]) => `<tr><td>${c}</td><td>${fr(e, 2)}</td></tr>`).join('')}</table>
      ${eq('<i>E</i><sub>pile</sub> = <i>E</i>°(cathode) − <i>E</i>°(anode)')}
      <p>Une pile zinc–argent donnerait 0,80 − (−0,76) = 1,56 V. Le lithium, tout en bas, permet les tensions les plus élevées : c’est pourquoi il est au cœur des batteries modernes.</p>
      ${china('金属活动性顺序 (ordre d’activité des métaux, dès le collège : 钾钙钠镁铝, 锌铁锡铅氢, 铜汞银铂金, une comptine que tous les élèves connaissent).')}`,
    cam: cam('pot', 0, 3.2, -8, 10, 40), lit: 'pot', scene: 'pot', look: {},
    fig: 'De −3,04 V à +1,50 V',
  },
  {
    kicker: '9.2', title: 'L’électrolyse', sub: 'forcer une réaction avec un générateur',
    body: `
      <p class="lede">Une pile transforme une réaction spontanée en courant. L’<b>électrolyse</b> fait l’inverse : un générateur force une réaction qui ne se ferait pas seule. Dans le voltamètre de Hofmann, l’eau (rendue conductrice par un peu d’acide) se décompose :</p>
      ${eq('cathode (−) : 2 H⁺ + 2 e⁻ → H₂    anode (+) : 2 H₂O → O₂ + 4 H⁺ + 4 e⁻')}
      <p>Il se forme deux fois plus de dihydrogène que de dioxygène, en volume : c’est la formule H₂O qui apparaît sous nos yeux. Un courant de 1 A pendant une heure donne ${fr(M.vH2(1, 3600), 0)} mL de H₂ et ${fr(M.vO2(1, 3600), 0)} mL de O₂ (loi de Faraday).</p>
      <p>L’électrolyse produit l’aluminium, le chlore, la soude, le cuivre pur, et l’hydrogène « vert » à partir d’électricité renouvelable.</p>
      ${china('电解池 : 电解饱和食盐水 (le procédé chlore-soude) et 电镀 (la galvanoplastie) sont au programme, avec l’expérience de l’électrolyse de CuCl₂.')}`,
    cam: cam('hof', 0, 2.9, -10, 10, 22), lit: 'hof', scene: 'hof', look: {},
    fig: 'Deux volumes de H₂ pour un de O₂',
  },
  {
    kicker: '9.3', title: 'La batterie lithium-ion', sub: 'une pile qu’on recharge',
    body: `
      <p class="lede">Dans une batterie lithium-ion, les ions Li⁺ (violets) font la navette entre deux électrodes où ils se glissent comme des livres sur une étagère : du graphite côté négatif, un oxyde ou un phosphate métallique côté positif.</p>
      <p>À la <b>décharge</b>, les Li⁺ passent du graphite vers l’électrode positive à travers le séparateur, pendant que les électrons font le tour par le circuit extérieur (le téléphone, la voiture). À la <b>charge</b>, le chargeur les renvoie de l’autre côté.</p>
      ${eq('décharge : LiC₆ + FePO₄ → C₆ + LiFePO₄    ≈ 3,2 V')}
      <p>La chimie au phosphate de fer (LFP) est moins dense en énergie que celle au nickel-manganèse-cobalt (NMC, ≈ 3,7 V), mais plus sûre, plus durable et sans cobalt.</p>
      ${china('化学电源 (§4.1) : 锂离子电池. Les fabricants chinois CATL (宁德时代) et BYD (比亚迪) produisent aujourd’hui la plus grande partie des batteries de voitures électriques du monde ; la « Blade Battery » de BYD est une batterie LFP.')}`,
    cam: cam('li', 0, 2.4, -14, 14, 18), lit: 'li', scene: 'li', look: {},
    fig: 'Les ions Li⁺ changent de côté',
  },
];

export const PLATES = {
  dan: { text: `La pile Daniell : zinc, cuivre et pont salin.`, facts: () => [['tension', `${fr(M.DANIELL, 2)} V`], ['pôle −', 'zinc'], ['pôle +', 'cuivre']] },
  pot: { text: `Les potentiels standard de quelques couples.`, facts: () => [['référence', 'H⁺/H₂ = 0 V'], ['le plus bas', 'Li⁺/Li −3,04 V'], ['le plus haut ici', 'Au³⁺/Au +1,50 V']] },
  hof: { text: `Le voltamètre de Hofmann.`, facts: s => [['H₂', `${fr(s.vh ?? 0, 1)} mL`], ['O₂', `${fr((s.vh ?? 0) / 2, 1)} mL`]] },
  li: { text: `Une cellule lithium-ion LFP.`, facts: s => [['état', s.lib?.mode ?? ''], ['tension', '3,2 V']] },
};
