import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-chip.js';

const meta: Meta = {
  title: 'Components/Chip',
  component: 'folio-chip',
  render: (args) => html`
    <folio-chip ?selected=${args.selected} ?disabled=${args.disabled}>${args.label}</folio-chip>
  `,
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { selected: false, disabled: false, label: 'Design system' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Selected: Story = { args: { selected: true } };

export const Disabled: Story = { args: { disabled: true } };

export const FilterBar: Story = {
  render: () => html`
    <div style="display:flex; flex-wrap:wrap; gap: var(--folio-space-8);">
      <folio-chip selected>Tous</folio-chip>
      <folio-chip>Design system</folio-chip>
      <folio-chip>Produit</folio-chip>
      <folio-chip>Recherche</folio-chip>
      <folio-chip disabled>Archives</folio-chip>
    </div>
  `,
};
