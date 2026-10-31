import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/chem.js';
import * as M from './model.js';

let scene = 'combust';
startBook({
  no: 2, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => { const p = M.phase(reduced ? 1 : clock); return { clock, scene, ...p }; },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'combust': return `1 C, 4 H, 4 O avant\n1 C, 4 H, 4 O après`;
      case 'mass': return `16 g + 64 g = 44 g + 36 g\nrien ne se perd, rien ne se crée`;
      case 'limit': return `2 CH₄ et 2 O₂ : O₂ limite\nil reste 1 CH₄`;
      case 'mole': return `1 mol = 6,022 × 10²³ entités\nM(CH₄) = ${fr(M.MOL.CH4, 1)} g/mol`;
    }
    return '';
  },
});
