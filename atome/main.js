import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';
import * as M from './model.js';

let scene = 'atom';
function state(clock, reduced) {
  const c = reduced ? 21 : clock;
  const tI = reduced ? 5 : ((c % 8) + 8) % 8;
  return { clock: c, scene, Z: scene === 'atom' ? 11 : M.zOf(c), tI, dx: Math.max(0, Math.min(1, (tI - 3.8) / 1.5)) * 0.9 };
}
startBook({
  no: 1, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state,
  readout(s, p) {
    scene = p.scene;
    const e = M.ELTS[s.Z - 1];
    switch (p.scene) {
      case 'atom': return `sodium : 11 protons, 12 neutrons\n11 électrons : 2 – 8 – 1`;
      case 'shells': return `${e.nom} (Z = ${e.Z})\ncouches ${M.shells(e.Z).join(' – ')}`;
      case 'ion': return s.tI > 3.5 ? `Na⁺ et Cl⁻ : couches externes pleines\nils s’attirent : NaCl` : `Na : 1 électron externe\nCl : 7 électrons externes`;
      case 'iso': return `même Z = 6, A = 12, 13, 14\nmême chimie, masses différentes`;
    }
    return '';
  },
});
