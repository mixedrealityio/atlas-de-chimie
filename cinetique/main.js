import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import * as M from './model.js';

let scene = 'dh';
startBook({
  no: 7, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => { const c = reduced ? 19.5 : clock; const hot = scene === 'temp' && Math.floor(c / M.CYCLE) % 2 === 1; return { clock: c, scene, hot, kT: hot ? M.KT.high : M.KT.low, n: 0 }; },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'dh': return `réaction exothermique\nles produits sont plus bas`;
      case 'ea': return `il faut franchir Ea\npeu de molécules y arrivent`;
      case 'temp': return s.hot ? `température haute\nplus de molécules passent` : `température basse\npeu de molécules passent`;
      case 'cata': return `le catalyseur abaisse Ea\nΔH ne change pas`;
    }
    return '';
  },
});
