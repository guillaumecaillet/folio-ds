# Changelog

## 0.3.1 — 2026-09-14

Deux couleurs qui vivaient en dur dans le JS du site entrent dans le système :
`--folio-color-cta-light` (#8fb0d8) et `--folio-color-key-light` (#f2d49a), les
extrémités pâles des rampes bleue et or qui composent la frise du process. Elles
sont fixes dans les deux thèmes, comme le reste des rampes `cta` et `key`.

Le troisième hors-palette, `#e7b968` dans le flicker des CTA, n'avait pas de
raison d'exister : il est à 9/255 de `--folio-color-key-hot`, qui le remplace.

86 tokens.

## 0.3.0 — 2026-09-14

Tout passe sur une **grille 8 points**. C'est la version qui fait autorité : à
partir d'ici Figma puis le site s'alignent sur le système, et non l'inverse.

### Typographie — 13 crans → 6

`hero` (40→64) · `title` (32→48) · `heading` (28) · `subtitle` (20) · `body` (16)
· `small` (12). Toutes multiples de 4.

Chaque taille a un interligne apparié (`--folio-leading-*`), en rem et multiple
de 8, pour que le texte retombe sur la grille. 12px devient le plancher du
système : les 9,28px et 10px des badges remontent.

Mono, majuscules et graisse sont désormais des *traitements* posés sur l'une des
six tailles — ils ne créent plus de cran.

### Espacement — nommé par sa valeur

`--folio-space-24` vaut 24px. Plus d'index à mémoriser, et le renommage de la
v0.2.0 devient sans objet. Échelle : 4 (demi-pas, padding interne des tags et
badges uniquement), puis 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128.

### Hauteurs de contrôle — nouveau

Les éléments interactifs ne se dimensionnent plus par leur padding vertical.
`--folio-control-sm|md|lg|xl` = 24 / 32 / 40 / 48px, en `box-sizing: border-box`
pour qu'une bordure ne les pousse jamais hors grille.

Mesuré après coup : Button primary 48, card et ghost 40, Badge 24, Tag 24,
Chip 32, ThemeToggle 32, SectionTitle 16, Stat 48. Aucun composant hors grille.

### Élévation — nouveau, et sans ombre

`--folio-elevation-0|1|2` sont des alias des trois fonds. Élever un élément, c'est
monter d'un niveau de surface et lui donner une bordure 1px s'il flotte. Le
système reste plat, délibérément.

### Coins

Radius toujours à 0 (`--folio-radius-none`), `--folio-radius-full` pour les
pastilles. Le cran pixel passe de 10/5 à **8/4**, lui aussi sur la grille.

### Ruptures

Le CTA passe de 46 à **48px**, le Button card de 44 à **40px**, la typo UI de 14
à **16px**, les labels de 11 à **12px**. Le site en ligne devra suivre — c'est
attendu : le système fait foi à partir de cette version.

## 0.2.0 — 2026-09-10

Passe de réconciliation. Le DS était figé au 16 juillet pendant que le portfolio
avançait de 16 commits ; cette version réaligne le système sur **le site en
ligne**, qui a fait référence pour l'exercice. Les prochaines passes repartiront
dans l'autre sens : Figma redevient la source de vérité.

### Identité

- **Space Grotesk remplace Inter** comme famille sans (`--folio-font-family-sans`).
- **Pixelify Sans entre dans le système** (`--folio-font-family-display`), réservée
  aux titres de section et au boot loader. Jamais de texte courant.

### Tokens

Le fichier passe de 55 à 79 tokens.

- **Couleurs d'action.** `--folio-color-cta`, `-cta-hot`, `-cta-ink`, `--folio-color-key`,
  `-key-hot`, `-key-ink`. `cta` et `key` ne basculent volontairement pas avec le thème ;
  seul `key-ink` s'assombrit en light, où `#e0ac4e` échoue au contraste.
- **`--folio-color-glow`** — transparent dans les deux thèmes, conservé pour pouvoir
  réintroduire le lavis de survol depuis un seul endroit.
- **Typographie : 8 → 13 crans.** Ajout de `heading`, `stat`, `lead`, `body-lg`, `caption`.
  Couvre les 34 tailles distinctes réellement déclarées sur le site.
- **Espacement : 10 → 13 crans.** Ajout de 20px, 56px et 80px, qui manquaient pour
  décrire le site.
- `--folio-radius-full` (50%) pour les pastilles ; `--folio-pixel-notch` /
  `-notch-inner` pour les coins crantés.
- Motion : ajout de `duration-instant` (200ms) et `duration-reveal` (800ms).
- `--folio-z-lightbox` (9999).

### Composants

- **`folio-button`** — nouvelle variante `primary` (le CTA bleu rempli) et attribut
  booléen `pixel` pour les coins crantés. Le padding en dur (`14px`) passe sur l'échelle.
- **`folio-badge`** — nouveau ton `key` (or, bordé) pour marquer les projets clés.
  La taille en dur (`0.62rem`) passe sur `--folio-text-micro`.

### Ruptures

Aucun consommateur externe : le paquet n'a jamais été publié sur npm et le portfolio
n'utilisait aucun token. Les 17 composants ont été remappés dans le même commit.

- **Espacement.** L'insertion de 20px décale tous les index ≥ 24px :
  `space-5`→`6`, `6`→`7`, `7`→`8`, `8`→`9`, `9`→`11`, `10`→`13`. Les crans 1 à 4 ne bougent pas.
- **Typographie.** `text-small` (0.875rem) → `text-ui` ; `text-caption` (0.8125rem) → `text-small`.
  Les deux noms libérés reprennent la valeur du cran inférieur.
- `text-hero` passe de `clamp(2.2rem, 5vw, 3.8rem)` à `clamp(2.4rem, 5.5vw, 4rem)`,
  `text-body` de `0.95rem` à `0.9375rem`, `text-micro` de `0.62rem` à `0.625rem` —
  dans les trois cas c'est la valeur du site qui l'emporte.

## 0.1.0 — 2026-07-16

Version initiale : 17 composants Lit, tokens DTCG, docs Storybook.
