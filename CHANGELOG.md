# Changelog

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
