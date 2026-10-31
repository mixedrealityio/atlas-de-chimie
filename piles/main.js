import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/chem.js';
import * as M from './model.js';

let scene = 'dan';
startBook({
  no: 9, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => { const c = reduced ? 8 : clock; return { clock: c, scene, vh: 0, lib: M.libState(c) }; },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'dan': return `Zn → Zn²⁺ + 2 e⁻   Cu²⁺ + 2 e⁻ → Cu\nE = 0,34 − (−0,76) = ${fr(M.DANIELL, 2)} V`;
      case 'pot': return `E(pile) = E°(cathode) − E°(anode)\nplus l’écart est grand, plus la tension monte`;
      case 'hof': return `2 H₂O → 2 H₂ + O₂\nvolume de H₂ = 2 × volume de O₂`;
      case 'li': return `${s.lib.mode}\nLiFePO₄ : ${fr(M.LIB.lfp, 1)} V par cellule`;
    }
    return '';
  },
});
