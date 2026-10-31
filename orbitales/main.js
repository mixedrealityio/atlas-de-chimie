import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import * as M from './model.js';

let scene = 's';
startBook({
  no: 11, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => { const c = reduced ? 0.8 : clock; return { clock: c, scene, Z: reduced ? 26 : M.zOf(c) }; },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 's': return `l = 0 : une sphère\n2s a une surface nodale`;
      case 'p': return `l = 1 : trois haltères\nle long de x, y, z`;
      case 'd': return `l = 2 : cinq orbitales\nquatre trèfles et un d_z²`;
      case 'auf': return `${M.SYM[s.Z - 1]} : ${M.confStr(s.Z).replace(/<sup>(\d+)<\/sup>/g, '$1 ').trim()}\nKlechkowski, Pauli, Hund`;
    }
    return '';
  },
});
