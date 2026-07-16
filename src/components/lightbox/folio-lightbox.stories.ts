import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-lightbox.js';
import '../figure/folio-figure.js';

const SAMPLE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><rect width="1200" height="675" fill="#26282b"/><g fill="none" stroke="#8ba6c6"><rect x="80" y="80" width="1040" height="515"/><line x1="80" y1="200" x2="1120" y2="200"/><line x1="400" y1="200" x2="400" y2="595"/></g><text x="90" y="60" font-family="monospace" font-size="16" fill="#8ba6c6">MAQUETTE — 1200×675</text></svg>`
  );

const meta: Meta = {
  title: 'Components/Lightbox',
  component: 'folio-lightbox',
};
export default meta;

type Story = StoryObj;

export const WithFigures: Story = {
  render: () => html`
    <div style="display:grid; grid-template-columns:1fr 1fr; gap: var(--folio-space-4); max-width:720px;">
      <folio-figure src=${SAMPLE} alt="Maquette A" zoomable caption="Cliquer pour agrandir"></folio-figure>
      <folio-figure src=${SAMPLE} alt="Maquette B" zoomable caption="Cliquer pour agrandir"></folio-figure>
    </div>
    <folio-lightbox></folio-lightbox>
  `,
};
