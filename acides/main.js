import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { moveCursors } from '../engine/kit.js';
import { fr } from '../engine/chem.js';
import * as M from './model.js';

let scene = 'ph';
startBook({
  no: 3, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, Vb: reduced ? 22 : M.vbOf(clock) }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'ph': return `pH < 7 acide, pH = 7 neutre\npH > 7 basique`;
      case 'dil': return `[H₃O⁺] = 10⁻ᵖᴴ\ndiluer 10 fois : pH + 1`;
      case 'titr': return `V = ${fr(s.Vb, 1)} mL   pH = ${fr(M.pHt(s.Vb), 2)}\néquivalence à ${fr(M.Veq, 0)} mL`;
    }
    return '';
  },
  onFrame(s, sheets) { moveCursors(sheets, { t: [s.Vb, M.pHt(s.Vb)] }); },
});
