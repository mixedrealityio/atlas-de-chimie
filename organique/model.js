// Chimie organique (必修第二册 第七章 « 有机化合物 » ; 选择性必修3 « 有机化学基础 » : 烷烃, 同分异构体,
// 苯, 手性碳原子).
const CC = 1.3;                                                         // longueur C–C dessinée
const zig = n => Array.from({ length: n }, (_, i) => [i * CC * 0.82 - (n - 1) * CC * 0.41, (i % 2 ? 0.45 : -0.45) * (n > 1 ? 1 : 0), 0]);
export const ALC = [
  { nom: 'méthane', f: 'CH₄', n: 1, eb: -161.5 }, { nom: 'éthane', f: 'C₂H₆', n: 2, eb: -88.6 },
  { nom: 'propane', f: 'C₃H₈', n: 3, eb: -42.1 }, { nom: 'butane', f: 'C₄H₁₀', n: 4, eb: -0.5 },
].map(a => ({ ...a, C: zig(a.n), cc: Array.from({ length: a.n - 1 }, (_, i) => [i, i + 1]) }));
export const MORE = [['pentane', 'C₅H₁₂', 36.1], ['hexane', 'C₆H₁₄', 68.7], ['octane', 'C₈H₁₈', 125.6]];
// isomères de C₄H₁₀
const T = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(v => v.map(x => x / Math.sqrt(3)));
export const ISO = { C: [[0, 0, 0], ...T.slice(1).map(d => d.map(x => x * CC))], cc: [[0, 1], [0, 2], [0, 3]], eb: -11.7 };
// benzène : hexagone dans le plan vertical
export const BENZ = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 2 + i * Math.PI / 3; return [1.25 * Math.cos(a), 1.25 * Math.sin(a), 0]; });
// carbone asymétrique : H, F, Cl, Br aux sommets d'un tétraèdre
export const CHIR = [['C', 0, 0, 0], ['H', ...T[0].map(x => x * 1.0)], ['F', ...T[1].map(x => x * 1.3)], ['Cl', ...T[2].map(x => x * 1.5)], ['Br', ...T[3].map(x => x * 1.6)]];
