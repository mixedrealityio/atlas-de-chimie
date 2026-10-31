import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';

let scene = 'lewis';
startBook({
  no: 5, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => ({ clock: reduced ? 1.5 : clock, scene }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'lewis': return `O : 2 liaisons + 2 doublets non liants\n8 électrons autour de O`;
      case 'vsepr': return `les doublets se repoussent\net s’écartent au maximum`;
      case 'polar': return `CO₂ : apolaire (symétrique)\nH₂O : polaire (coudée)`;
      case 'big': return `5 doublets : bipyramide\n6 doublets : octaèdre`;
    }
    return '';
  },
});
