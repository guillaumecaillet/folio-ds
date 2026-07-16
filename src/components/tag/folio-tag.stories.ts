import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-tag.js';

const meta: Meta = {
  title: 'Components/Tag',
  component: 'folio-tag',
  render: (args) => html`<folio-tag>${args.label}</folio-tag>`,
  args: { label: 'Design system' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Group: Story = {
  render: () => html`
    <div style="display:flex; flex-wrap:wrap; gap: var(--folio-space-2);">
      <folio-tag>Design system</folio-tag>
      <folio-tag>UX Research</folio-tag>
      <folio-tag>Figma</folio-tag>
      <folio-tag>B2B SaaS</folio-tag>
      <folio-tag>Accessibilité</folio-tag>
    </div>
  `,
};
