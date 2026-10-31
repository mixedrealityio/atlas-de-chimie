import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { moveCursors } from '../engine/kit.js';
import { fr } from '../engine/chem.js';
import * as M from './model.js';

let scene = 'dyn';
startBook({
  no: 8, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => { const c = reduced ? 12 : clock; return { clock: c, scene, t: ((c % M.CYC) + M.CYC) % M.CYC, nNO2: 0, nN2O4: 0 }; },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'dyn': { const k = M.conc(s.t); return `[N₂O₄] = ${fr(k.N2O4, 2)}   [NO₂] = ${fr(k.NO2, 2)} mol/L\nK = [NO₂]²/[N₂O₄] → ${fr(M.K(M.XT[25]), 2)}`; }
      case 'chat': return `froid : incolore (N₂O₄)\nchaud : brun (NO₂)`;
      case 'haber': return `basse T, haute P : bon rendement\nmais trop lent sans catalyseur`;
    }
    return '';
  },
  onFrame(s, sheets) { const k = M.conc(s.t); moveCursors(sheets, { a: [s.t, k.N2O4], b: [s.t, k.NO2] }); },
});
