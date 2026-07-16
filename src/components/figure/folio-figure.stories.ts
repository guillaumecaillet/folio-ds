import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-figure.js';
import '../lightbox/folio-lightbox.js';

const SAMPLE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="#26282b"/><g fill="none" stroke="#8ba6c6" stroke-width="1"><rect x="60" y="60" width="300" height="180"/><rect x="400" y="60" width="340" height="80"/><rect x="400" y="170" width="340" height="70"/><rect x="60" y="280" width="680" height="110"/></g><text x="70" y="45" font-family="monospace" font-size="12" fill="#8ba6c6">WIREFRAME — 800×450</text></svg>`
  );

const meta: Meta = {
  title: 'Components/Figure',
  component: 'folio-figure',
  render: (args) => html`
    <folio-figure
      style="max-width: 560px;"
      src=${args.src}
      alt=${args.alt}
      caption=${args.caption}
      ?zoomable=${args.zoomable}
    ></folio-figure>
  `,
  args: {
    src: SAMPLE,
    alt: 'Wireframe de la page de suivi',
    caption: 'Premier wireframe — la stickybar regroupe les actions de masse.',
    zoomable: false,
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Zoomable: Story = {
  render: () => html`
    <folio-figure
      style="max-width: 560px;"
      src=${SAMPLE}
      alt="Wireframe de la page de suivi"
      caption="Cliquer l'image pour l'agrandir (folio-lightbox écoute folio-zoom)."
      zoomable
    ></folio-figure>
    <folio-lightbox></folio-lightbox>
  `,
};

export const Placeholder: Story = {
  args: { src: '', caption: 'Sans src, un placeholder tient la mise en page.' },
};
