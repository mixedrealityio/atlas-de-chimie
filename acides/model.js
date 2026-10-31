// Acides, bases et pH (九年级下册 第十单元 « 酸和碱 » ; 选择性必修1 第三章 « 水溶液中的离子反应与平衡 »).
export const Kw = 1e-14;
// couleur de l'indicateur universel selon le pH
const UI = ['#d7263d', '#e2433a', '#ee6a2f', '#f3962c', '#f5c02e', '#e6d83a', '#b6d33e', '#4caf50', '#2fa38a', '#2a8fb0', '#2d6fc4', '#3d55c0', '#5a46b5', '#6b3ea8', '#5b2f8a'];
export const uiColor = pH => UI[Math.max(0, Math.min(14, Math.round(pH)))];
export const EX = [[0, 'acide de batterie'], [2, 'jus de citron'], [3, 'vinaigre, cola'], [4, 'jus de tomate'], [5, 'café'], [6, 'lait'], [7, 'eau pure'], [8, 'eau de mer'], [9, 'bicarbonate'], [10, 'savon'], [11, 'ammoniaque'], [12, 'eau de chaux'], [13, 'eau de Javel'], [14, 'soude (lessive)']];
// dilution : HCl à 10⁻¹, 10⁻², 10⁻³ mol/L
export const DIL = [1, 2, 3].map(k => ({ c: 10 ** -k, pH: k, n: [100, 10, 1][k - 1] }));
// dosage : 20 mL d'acide chlorhydrique à 0,10 mol/L par la soude à 0,10 mol/L
export const T = { Ca: 0.1, Va: 20, Cb: 0.1, Vmax: 40 };
export const Veq = T.Ca * T.Va / T.Cb;
export function pHt(Vb) { const d = (T.Ca * T.Va - T.Cb * Vb) / (T.Va + Vb); const h = (d + Math.sqrt(d * d + 4 * Kw)) / 2; return -Math.log10(h); }
export const vbOf = c => T.Vmax * (((c % 24) + 24) % 24) / 24;
// phénolphtaléine : incolore sous 8,2, rose au-dessus de 10
export const phenol = pH => Math.max(0, Math.min(1, (pH - 8.2) / 1.8));
