# Folio DS

Design system du portfolio de [Guillaume Caillet](https://www.guillaumecaillet.fr) — base Swiss design (grille stricte, hiérarchie typographique, blanc tournant, angles droits) avec un accent pixel assumé : Jersey 15 sur le hero, coins crantés sur les CTA principaux. IBM Plex Mono structure l'UI, Faculty Glyphic porte la lecture.

17 web components construits avec [Lit](https://lit.dev), thémés dark/light par CSS custom properties, documentés dans Storybook (docs style Polaris : propriétés, slots, événements, accessibilité).

**Sens de la vérité.** La v0.2.0 a réaligné le système sur le site en ligne, qui avait divergé de deux mois. À partir de là, le sens s'inverse : **le fichier Figma redevient la source de vérité**, et le code s'y conforme. Voir [CHANGELOG.md](CHANGELOG.md).

## Structure

```
tokens/          Tokens au format DTCG (source de vérité, partagée avec Figma)
scripts/         build-tokens.mjs → génère src/styles/tokens.css
src/components/  Un dossier par composant : .ts + .stories.ts + .mdx
docs/            Pages foundations (Colors, Typography, Spacing, Motion)
.storybook/      Config Storybook (toolbar theme dark/light)
```

## Développement

```bash
npm install
npm run storybook     # docs interactives sur :6006
npm run build         # dist/folio-ds.js + dist/tokens.css + types
npm run tokens        # régénère tokens.css depuis tokens/*.json
```

## Usage sans build

```html
<html lang="fr" data-theme="dark">
  <head>
    <link rel="stylesheet" href="dist/tokens.css" />
    <script type="module" src="dist/folio-ds.js"></script>
  </head>
  <body>
    <folio-button href="mailto:hello@example.com">Me contacter</folio-button>
  </body>
</html>
```

## Composants

Button · Tag · Chip · Badge · Link · SectionTitle · ThemeToggle · LocalTime · Tooltip · Stat · Accordion · AccordionItem · ProjectRow · ContactRow · Figure · Toast · Lightbox

## Roadmap

- Adoption des composants par le portfolio (en cours — le site réimplémente encore les 17 en CSS)
- Navigation et footer composés
- i18n
- Documentation des patterns `proto-*` (les prototypes interactifs des case studies), aujourd'hui hors système
