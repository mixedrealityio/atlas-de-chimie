// Piles et électrolyse (选择性必修1 第四章 « 化学反应与电能 » : 原电池, 电解池, 金属的腐蚀与防护 ;
// 必修第二册 §6.1 « 化学反应与电能 »). Potentiels standard à 25 °C (V).
export const E0 = [['Li⁺/Li', -3.04], ['Na⁺/Na', -2.71], ['Mg²⁺/Mg', -2.37], ['Al³⁺/Al', -1.66], ['Zn²⁺/Zn', -0.76], ['Fe²⁺/Fe', -0.44], ['Pb²⁺/Pb', -0.13], ['H⁺/H₂', 0], ['Cu²⁺/Cu', 0.34], ['Ag⁺/Ag', 0.80], ['Au³⁺/Au', 1.50]];
export const pot = c => E0.find(e => e[0] === c)[1];
export const emf = (cath, an) => pot(cath) - pot(an);
export const DANIELL = emf('Cu²⁺/Cu', 'Zn²⁺/Zn');                                // 1,10 V
// électrolyse de l'eau : 2 H₂O → 2 H₂ + O₂, volumes 2 : 1. Courant de 1 A pendant t secondes
export const F = 96485, Vm = 24.0;                                                 // L/mol à 20 °C
export const vH2 = (I, t) => I * t / (2 * F) * Vm * 1000;                          // mL
export const vO2 = (I, t) => I * t / (4 * F) * Vm * 1000;
export const HOF = 12;                                                             // cycle de la figure (s)
// batterie lithium-ion LFP : 3,2 V nominal ; NMC : 3,7 V
export const LIB = { lfp: 3.2, nmc: 3.7, cyc: 20 };
export const libState = c => { const t = ((c % LIB.cyc) + LIB.cyc) % LIB.cyc; return t < 10 ? { mode: 'décharge', f: t / 10 } : { mode: 'charge', f: 1 - (t - 10) / 10 }; };
