# Atlas de chimie

Onze chapitres interactifs de chimie, du collège à la prépa (MPSI–PCSI), entièrement en français. Chaque page associe un texte à une figure 3D qu’on peut faire tourner et décomposer, ainsi qu’une question d’entraînement. Les contenus s’inspirent aussi des manuels chinois 人教版 (PEP), signalés dans des encadrés « Chine ».

Le moteur de rendu (three.js, pages qui se tournent, figures décomposables) vient de [Atlas of Physics](https://github.com/nathanliow/atlas-of-physics), sous licence MIT.

| N° | Chapitre | Pages | Programme chinois |
|---|---|---|---|
| 1 | L’atome | 4 | 初三 · 原子的结构 |
| 2 | La réaction chimique | 4 | 初三 · 化学方程式 |
| 3 | Acides et bases | 3 | 初三 · 酸和碱 / 高二 |
| 4 | Le tableau périodique | 4 | 高一 · 元素周期律 |
| 5 | La forme des molécules | 4 | 高一 · 高二 · 分子结构 |
| 6 | Les cristaux | 4 | 高二 · 晶体结构 |
| 7 | Énergie et vitesse | 4 | 高二 · 反应热 · 反应速率 |
| 8 | L’équilibre chimique | 3 | 高二 · 化学平衡 |
| 9 | Piles et électrolyse | 4 | 高二 · 化学反应与电能 |
| 10 | Chimie organique | 4 | 高一 · 高二 · 有机化学基础 |
| 11 | Les orbitales | 4 | 高二 · 大学 · 原子轨道 |

## Installation

Ce site est entièrement statique. Il est prévu pour être servi dans le sous-dossier `chimie/` du site de l’atlas de physique, à côté de `maths/` et `complements/`.

Chaque chapitre est un dossier qui contient `index.html`, `main.js`, `world.js`, `pages.js`, `practice.js` et `model.js`. Les outils de chimie communs (atomes, liaisons, molécules) se trouvent dans `engine/chem.js`.
