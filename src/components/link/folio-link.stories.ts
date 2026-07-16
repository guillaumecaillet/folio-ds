import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-link.js';

const meta: Meta = {
  title: 'Components/Link',
  component: 'folio-link',
  render: (args) => html`
    <folio-link variant=${args.variant} href=${args.href} ?active=${args.active}
      >${args.label}</folio-link
    >
  `,
  argTypes: {
    variant: { control: 'radio', options: ['nav', 'inline', 'back'] },
    active: { control: 'boolean' },
  },
  args: { variant: 'inline', href: '#', active: false, label: 'le case study complet' },
};
export default meta;

type Story = StoryObj;

export const Inline: Story = {};

export const Nav: Story = {
  render: () => html`
    <nav style="display:flex; gap: var(--folio-space-7);">
      <folio-link variant="nav" href="#" active>Projets</folio-link>
      <folio-link variant="nav" href="#">Qui suis-je</folio-link>
      <folio-link variant="nav" href="#">Contact</folio-link>
    </nav>
  `,
};

export const Back: Story = {
  args: { variant: 'back', label: 'Tous les projets' },
};

export const InProse: Story = {
  render: () => html`
    <p style="max-width:48ch; font-size:0.95rem; line-height:1.65; color:var(--folio-color-text-muted);">
      L'audit a révélé 44 composants dupliqués entre les deux librairies. Les détails de la
      méthode sont dans <folio-link href="#">le case study complet</folio-link>, avec les
      métriques avant/après.
    </p>
  `,
};
