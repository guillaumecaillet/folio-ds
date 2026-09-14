import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-stat.js';

const meta: Meta = {
  title: 'Components/Stat',
  component: 'folio-stat',
  render: (args) => html`
    <folio-stat value=${args.value} label=${args.label} variant=${args.variant}></folio-stat>
  `,
  argTypes: {
    variant: { control: 'radio', options: ['plain', 'bar'] },
  },
  args: { value: '-38%', label: 'Temps de saisie', variant: 'plain' },
};
export default meta;

type Story = StoryObj;

export const Plain: Story = {};

export const Bar: Story = { args: { variant: 'bar' } };

export const MetricsRow: Story = {
  render: () => html`
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: var(--folio-space-32); max-width: 640px;">
      <folio-stat variant="bar" value="-38%" label="Temps de saisie"></folio-stat>
      <folio-stat variant="bar" value="×2" label="Vitesse de livraison"></folio-stat>
      <folio-stat variant="bar" value="9" label="Équipes utilisatrices"></folio-stat>
    </div>
  `,
};
