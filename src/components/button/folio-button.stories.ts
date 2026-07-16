import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-button.js';

const meta: Meta = {
  title: 'Components/Button',
  component: 'folio-button',
  render: (args) => html`
    <folio-button
      variant=${args.variant}
      ?disabled=${args.disabled}
      href=${args.href || undefined}
      >${args.label}</folio-button
    >
  `,
  argTypes: {
    variant: { control: 'radio', options: ['card', 'ghost'] },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
  },
  args: { variant: 'card', disabled: false, label: 'Voir le projet' },
};
export default meta;

type Story = StoryObj;

export const Card: Story = {};

export const Ghost: Story = {
  args: { variant: 'ghost', label: 'Action secondaire' },
};

export const WithIcon: Story = {
  render: () => html`
    <folio-button href="mailto:hello@example.com">
      <svg slot="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4">
        <rect x="1.5" y="3" width="13" height="10" />
        <path d="m1.5 4 6.5 5 6.5-5" />
      </svg>
      Me contacter
    </folio-button>
  `,
};

export const AsLink: Story = {
  args: { href: 'https://example.com', label: 'Ouvrir le case study' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Indisponible' },
};

export const Group: Story = {
  render: () => html`
    <div style="display:flex; gap: var(--folio-space-3);">
      <folio-button>LinkedIn</folio-button>
      <folio-button>Lire mon CV</folio-button>
      <folio-button variant="ghost">Plus tard</folio-button>
    </div>
  `,
};
