# Folio DS

Design system du portfolio de [Guillaume Caillet](https://www.guillaumecaillet.com) — direction Swiss design : grille stricte, hiérarchie typographique, blanc tournant, angles droits, zéro ornement.

17 web components construits avec [Lit](https://lit.dev), thémés dark/light par CSS custom properties, documentés dans Storybook (docs style Polaris : propriétés, slots, événements, accessibilité).

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

- Navigation et footer composés
- i18n
- Librairie Figma générée depuis `tokens/` (variables dark/light, text styles, composants)
