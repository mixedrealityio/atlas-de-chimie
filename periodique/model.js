// Le tableau périodique (必修第一册 第四章 « 物质结构 元素周期律 »). Les 36 premiers éléments.
// [symbole, nom, nom chinois, famille, électronégativité de Pauling, rayon covalent (pm, Cordero 2008), 1re énergie d'ionisation (eV)]
export const E = [
  ['H', 'hydrogène', '氢', 'h', 2.20, 31, 13.60], ['He', 'hélium', '氦', 'noble', null, 28, 24.59],
  ['Li', 'lithium', '锂', 'alc', 0.98, 128, 5.39], ['Be', 'béryllium', '铍', 'alt', 1.57, 96, 9.32], ['B', 'bore', '硼', 'semi', 2.04, 84, 8.30], ['C', 'carbone', '碳', 'nm', 2.55, 76, 11.26], ['N', 'azote', '氮', 'nm', 3.04, 71, 14.53], ['O', 'oxygène', '氧', 'nm', 3.44, 66, 13.62], ['F', 'fluor', '氟', 'hal', 3.98, 57, 17.42], ['Ne', 'néon', '氖', 'noble', null, 58, 21.56],
  ['Na', 'sodium', '钠', 'alc', 0.93, 166, 5.14], ['Mg', 'magnésium', '镁', 'alt', 1.31, 141, 7.65], ['Al', 'aluminium', '铝', 'pm', 1.61, 121, 5.99], ['Si', 'silicium', '硅', 'semi', 1.90, 111, 8.15], ['P', 'phosphore', '磷', 'nm', 2.19, 107, 10.49], ['S', 'soufre', '硫', 'nm', 2.58, 105, 10.36], ['Cl', 'chlore', '氯', 'hal', 3.16, 102, 12.97], ['Ar', 'argon', '氩', 'noble', null, 106, 15.76],
  ['K', 'potassium', '钾', 'alc', 0.82, 203, 4.34], ['Ca', 'calcium', '钙', 'alt', 1.00, 176, 6.11], ['Sc', 'scandium', '钪', 'tr', 1.36, 170, 6.56], ['Ti', 'titane', '钛', 'tr', 1.54, 160, 6.83], ['V', 'vanadium', '钒', 'tr', 1.63, 153, 6.75], ['Cr', 'chrome', '铬', 'tr', 1.66, 139, 6.77], ['Mn', 'manganèse', '锰', 'tr', 1.55, 139, 7.43], ['Fe', 'fer', '铁', 'tr', 1.83, 132, 7.90], ['Co', 'cobalt', '钴', 'tr', 1.88, 126, 7.88], ['Ni', 'nickel', '镍', 'tr', 1.91, 124, 7.64], ['Cu', 'cuivre', '铜', 'tr', 1.90, 132, 7.73], ['Zn', 'zinc', '锌', 'tr', 1.65, 122, 9.39],
  ['Ga', 'gallium', '镓', 'pm', 1.81, 122, 6.00], ['Ge', 'germanium', '锗', 'semi', 2.01, 120, 7.90], ['As', 'arsenic', '砷', 'semi', 2.18, 119, 9.79], ['Se', 'sélénium', '硒', 'nm', 2.55, 120, 9.75], ['Br', 'brome', '溴', 'hal', 2.96, 120, 11.81], ['Kr', 'krypton', '氪', 'noble', 3.00, 116, 14.00],
].map(([s, nom, cn, fam, en, r, ie], i) => ({ Z: i + 1, s, nom, cn, fam, en, r, ie }));
// position (période, colonne) dans le tableau à 18 colonnes
export function cell(Z) {
  if (Z === 1) return [1, 1]; if (Z === 2) return [1, 18];
  if (Z <= 10) return [2, Z <= 4 ? Z - 2 : Z + 8];
  if (Z <= 18) return [3, Z <= 12 ? Z - 10 : Z];
  return [4, Z - 18];
}
export const FAM = { h: ['paper', 'hydrogène'], alc: ['violet', 'métaux alcalins'], alt: ['orange', 'alcalino-terreux'], tr: ['dark', 'métaux de transition'], pm: ['base', 'autres métaux'], semi: ['yellow', 'métalloïdes'], nm: ['paper', 'non-métaux'], hal: ['green', 'halogènes'], noble: ['blue', 'gaz nobles'] };
// la hauteur de chaque colonne, selon la page
export const PROP = {
  table: { h: () => 0.25, label: '' },
  rayon: { h: e => e.r / 60, label: 'rayon covalent', unit: 'pm', v: e => e.r },
  eneg: { h: e => (e.en ?? 0) * 0.9 + 0.05, label: 'électronégativité', unit: '', v: e => e.en },
  ie: { h: e => e.ie / 6, label: 'énergie de 1re ionisation', unit: 'eV', v: e => e.ie },
};
