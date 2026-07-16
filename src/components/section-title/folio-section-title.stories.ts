import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-section-title.js';

const meta: Meta = {
  title: 'Components/SectionTitle',
  component: 'folio-section-title',
  render: (args) => html`
    <folio-section-title level=${args.level} ?dim=${args.dim}>${args.label}</folio-section-title>
  `,
  argTypes: {
    level: { control: { type: 'number', min: 1, max: 6 } },
    dim: { control: 'boolean' },
  },
  args: { level: 2, dim: false, label: 'Le problème' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Dim: Story = { args: { dim: true, label: 'Contexte' } };

export const InSection: Story = {
  render: () => html`
    <section style="max-width:56ch; display:flex; flex-direction:column; gap: var(--folio-space-4);">
      <folio-section-title>Le problème</folio-section-title>
      <p style="margin:0; font-size:0.95rem; line-height:1.65; color:var(--folio-color-text-muted);">
        Deux librairies de composants coexistaient, sans source de vérité. Chaque équipe
        redessinait les mêmes patterns avec des variantes incompatibles.
      </p>
    </section>
  `,
};
