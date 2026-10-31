// Chapitre 2, page par page. Chine : 九年级上册 第五单元 « 化学方程式 » (质量守恒定律, 如何正确书写化学方程式,
// 利用化学方程式的简单计算) ; 必修第一册 第二章 第三节 « 物质的量 ».
import * as M from './model.js';
import { ST } from './world.js';
import { fr } from '../engine/chem.js';

const eq = s => `<div class="eq">${s}</div>`;
const china = s => `<p class="cn">Chine : ${s}</p>`;
const cam = (st, dx, y, dz, az, el, dist) => ({ target: [ST[st] + dx, y, dz], az, el, dist });

export const PAGES = [
  {
    kicker: 'Chapitre 2 · 3e', title: 'La réaction chimique', sub: 'les atomes changent de partenaires',
    body: `
      <p class="lede">Quand le gaz de la cuisinière brûle, une molécule de méthane CH₄ réagit avec deux molécules de dioxygène O₂. Les liaisons se cassent, les atomes se réarrangent, et il se forme une molécule de dioxyde de carbone CO₂ et deux molécules d’eau H₂O.</p>
      ${eq('CH₄ + 2 O₂ → CO₂ + 2 H₂O')}
      <p>Comptez les billes avant et après : 1 carbone (noir), 4 hydrogènes (blancs), 4 oxygènes (rouges). <b>Aucun atome n’apparaît ni ne disparaît.</b> C’est pourquoi on « équilibre » une équation : on place devant chaque formule le nombre (coefficient stœchiométrique) qui assure le même nombre de chaque atome des deux côtés.</p>
      <p>Les réactifs (méthane, dioxygène) disparaissent, les produits (dioxyde de carbone, eau) apparaissent : ce sont d’autres corps, avec d’autres propriétés.</p>
      ${china('化学方程式的配平 (équilibrer une équation), troisième année de collège. Les élèves chinois apprennent la méthode du « plus petit multiple commun » (最小公倍数法).')}`,
    cam: cam('rx', 0.2, 1.4, 0, -12, 40, 25), lit: 'rx', scene: 'combust', look: {},
    fig: '9 atomes avant, 9 atomes après',
  },
  {
    kicker: '2.1', title: 'La conservation de la masse', sub: 'Lavoisier',
    body: `
      <p class="lede">Puisque les atomes se conservent, la masse aussi. Pour une mole de méthane :</p>
      <table class="data"><tr><th>espèce</th><th>quantité</th><th>masse</th></tr>
        <tr><td>CH₄</td><td>1 mol</td><td>${fr(M.MASS.CH4, 1)} g</td></tr><tr><td>O₂</td><td>2 mol</td><td>${fr(M.MASS.O2, 1)} g</td></tr>
        <tr><td>CO₂</td><td>1 mol</td><td>${fr(M.MASS.CO2, 1)} g</td></tr><tr><td>H₂O</td><td>2 mol</td><td>${fr(M.MASS.H2O, 1)} g</td></tr></table>
      ${eq(`${fr(M.MASS.CH4, 1)} + ${fr(M.MASS.O2, 1)} = ${fr(M.left, 1)} g    ${fr(M.MASS.CO2, 1)} + ${fr(M.MASS.H2O, 1)} = ${fr(M.right, 1)} g`)}
      <p>Lavoisier l’a montré vers 1775 en pesant des réactions faites en récipient fermé : « Rien ne se perd, rien ne se crée, tout se transforme ». Une bougie semble perdre de la masse parce que ses produits (gaz) s’échappent dans l’air.</p>
      ${china('质量守恒定律, avec l’expérience du manuel : du phosphore brûlé dans un flacon fermé posé sur une balance (红磷燃烧前后质量的测定).')}`,
    cam: cam('rx', 0, 1.6, -2.4, -8, 24, 28), lit: 'rx', scene: 'mass', look: {},
    fig: '80 g de réactifs, 80 g de produits',
  },
  {
    kicker: '2.2', title: 'La mole', sub: 'compter les atomes par paquets',
    body: `
      <p class="lede">Les atomes sont si petits qu’on les compte par paquets géants : une <b>mole</b> contient <i>N</i><sub>A</sub> = 6,022 × 10<sup>23</sup> entités (la constante d’Avogadro).</p>
      <p>La <b>masse molaire</b> <i>M</i> est la masse d’une mole. Elle se lit dans le tableau périodique : <i>M</i>(C) = 12,0 g/mol, <i>M</i>(H) = 1,0 g/mol, <i>M</i>(O) = 16,0 g/mol. Pour une molécule, on additionne :</p>
      ${eq(`<i>M</i>(CH₄) = 12,0 + 4 × 1,0 = ${fr(M.MOL.CH4, 1)} g/mol    <i>n</i> = <i>m</i> / <i>M</i>`)}
      <p>L’équation se lit alors en moles : 1 mol de méthane réagit avec 2 mol de dioxygène. Pour brûler 100 g de méthane (${fr(100 / M.MOL.CH4, 2)} mol), il faut ${fr(200 / M.MOL.CH4, 2)} mol de O₂, soit ${fr(200 / M.MOL.CH4 * M.MOL.O2, 0)} g.</p>
      ${china('物质的量 (« quantité de matière »), 摩尔质量 et 阿伏加德罗常数 : première année de lycée, 必修第一册 §2.3.')}`,
    cam: cam('rx', 0.2, 1.4, 0, -12, 40, 25), lit: 'rx', scene: 'mole', look: {},
    fig: 'Une molécule pour 6 × 10²³',
  },
  {
    kicker: '2.3', title: 'Le réactif limitant', sub: 'quand un réactif manque',
    body: `
      <p class="lede">On met maintenant <b>2</b> molécules de méthane et seulement 2 de dioxygène. Une seule molécule de méthane peut brûler : le dioxygène est épuisé le premier. C’est le <b>réactif limitant</b> ; il reste du méthane en excès.</p>
      <p>Pour trouver le réactif limitant, on divise chaque quantité initiale par son coefficient : le plus petit quotient l’emporte.</p>
      <table class="data"><tr><th>départ</th><th>reste CH₄</th><th>reste O₂</th><th>CO₂ formé</th></tr>${[[2, 2], [1, 3], [3, 6], [5, 4]].map(([a, b]) => { const r = M.limit(a, b); return `<tr><td>${a} CH₄ + ${b} O₂</td><td>${fr(r.CH4, 0)}</td><td>${fr(r.O2, 0)}</td><td>${fr(r.CO2, 0)}</td></tr>`; }).join('')}</table>
      <p>Dans une gazinière mal réglée, c’est le dioxygène qui manque : la combustion est incomplète et produit du monoxyde de carbone CO, un gaz toxique.</p>
      ${china('利用化学方程式的简单计算 et 过量计算 (calculs avec un réactif en excès).')}`,
    cam: cam('rx', 0, 1.4, 1, -12, 40, 27), lit: 'rx', scene: 'limit', look: {},
    fig: 'Le méthane en trop ne brûle pas',
  },
];

export const PLATES = {
  rx: { text: `Méthane et dioxygène, puis dioxyde de carbone et eau.`, facts: s => [['carbone', '1'], ['hydrogène', '4'], ['oxygène', '4'], ['avancement', `${fr(100 * s.f, 0)} %`]] },
};
