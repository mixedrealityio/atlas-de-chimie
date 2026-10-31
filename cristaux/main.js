import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import { fr } from '../engine/chem.js';
import * as M from './model.js';

let scene = 'nacl';
startBook({
  no: 6, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => ({ clock: reduced ? 0.3 : clock, scene }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'nacl': return `Na⁺ : 12 × 1/4 + 1 = 4\nCl⁻ : 8 × 1/8 + 6 × 1/2 = 4`;
      case 'cscl': return `Cl⁻ : 8 × 1/8 = 1   Cs⁺ : 1\nmasse volumique ${fr(M.rho(1, 168.36, M.A.CsCl), 2)} g/cm³`;
      case 'diam': return `8 × 1/8 + 6 × 1/2 + 4 = 8 atomes\nmasse volumique ${fr(M.rho(8, 12.011, M.A.diamant), 2)} g/cm³`;
      case 'gra': return `C–C 142 pm dans un feuillet\n335 pm entre feuillets`;
    }
    return '';
  },
});
