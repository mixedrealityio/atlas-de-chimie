import { startBook } from '../engine/book.js';
import { buildWorld } from './world.js';
import { PAGES, PLATES } from './pages.js';

let scene = 'alc';
startBook({
  no: 10, PAGES, PLATES, clock0: 0, lookKeys: [],
  buildWorld(E) { const W = buildWorld(E); return { update: s => W.update(s), labels: W.labels }; },
  state: (clock, reduced) => { const c = reduced ? 1 : clock; return { clock: c, scene, kek: reduced ? 5 : ((c % 6) + 6) % 6 }; },
  readout(s, p) {
    scene = p.scene;
    switch (p.scene) {
      case 'alc': return `CₙH₂ₙ₊₂ : CH₄, C₂H₆, C₃H₈, C₄H₁₀\nplus la chaîne est longue, plus ça bout haut`;
      case 'iso': return `même formule C₄H₁₀\ndeux molécules différentes`;
      case 'benz': return `C₆H₆ : 6 électrons partagés\npar tout le cycle`;
      case 'chir': return `image dans un miroir\nmais pas superposable`;
    }
    return '';
  },
});
