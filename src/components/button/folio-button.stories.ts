import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-button.js';

const meta: Meta = {
  title: 'Components/Button',
  component: 'folio-button',
  render: (args) => html`
    <folio-button
      variant=${args.variant}
      ?pixel=${args.pixel}
      ?disabled=${args.disabled}
      href=${args.href || undefined}
      >${args.label}</folio-button
    >
  `,
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'card', 'ghost'] },
    pixel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
  },
  args: { variant: 'card', pixel: false, disabled: false, label: 'Voir le projet' },
};
export default meta;

type Story = StoryObj;

const mailIcon = html`<svg
  slot="icon"
  width="14"
  height="14"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.8"
  style="opacity: 0.85"
>
  <rect x="2" y="4" width="20" height="16" />
  <path d="m2 6 10 7 10-7" />
</svg>`;

export const Primary: Story = {
  render: () => html`<folio-button variant="primary">${mailIcon}M'écrire</folio-button>`,
};

/**
 * How the CTA actually ships: notched corners and a 14px leading icon.
 * Every primary CTA on the site carries one.
 */
export const PrimaryPixel: Story = {
  name: 'Primary / pixel',
  render: () => html`<folio-button variant="primary" pixel>${mailIcon}M'écrire</folio-button>`,
};

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
    <div style="display:flex; gap: var(--folio-space-3); align-items: center;">
      <folio-button variant="primary" pixel>Me contacter</folio-button>
      <folio-button>LinkedIn</folio-button>
      <folio-button>Lire mon CV</folio-button>
      <folio-button variant="ghost">Plus tard</folio-button>
    </div>
  `,
};
