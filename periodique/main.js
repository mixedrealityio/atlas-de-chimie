import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';

let scene = 'table';
startBook({
  no: 4, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => ({ clock, scene, reduced }),
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'table': return `4 périodes, 18 colonnes\nune famille par colonne`;
      case 'rayon': return `le rayon augmente vers le bas\net diminue vers la droite`;
      case 'eneg': return `l’électronégativité augmente\nvers le haut et vers la droite`;
      case 'ie': return `pics : gaz nobles\ncreux : métaux alcalins`;
    }
    return '';
  },
});
