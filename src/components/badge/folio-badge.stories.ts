import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-badge.js';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'folio-badge',
  render: (args) => html`<folio-badge tone=${args.tone}>${args.label}</folio-badge>`,
  argTypes: {
    tone: { control: 'select', options: ['accent', 'ok', 'warn', 'danger', 'info'] },
  },
  args: { tone: 'accent', label: 'Nouveau' },
};
export default meta;

type Story = StoryObj;

export const Accent: Story = {};

export const Tones: Story = {
  render: () => html`
    <div style="display:flex; gap: var(--folio-space-2); flex-wrap:wrap;">
      <folio-badge tone="accent">Focus</folio-badge>
      <folio-badge tone="ok">Livré</folio-badge>
      <folio-badge tone="warn">En cours</folio-badge>
      <folio-badge tone="danger">Bloqué</folio-badge>
      <folio-badge tone="info">Hérité</folio-badge>
    </div>
  `,
};
