import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-project-row.js';

const meta: Meta = {
  title: 'Components/ProjectRow',
  component: 'folio-project-row',
  render: (args) => html`
    <folio-project-row
      style="max-width: 720px;"
      index=${args.index}
      name=${args.name}
      company=${args.company}
      kind=${args.kind}
      href=${args.href}
    ></folio-project-row>
  `,
  args: {
    index: '01',
    name: 'Audit du design system',
    company: 'Oplit',
    kind: 'Design system',
    href: '#',
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const List: Story = {
  render: () => html`
    <div style="max-width: 720px;">
      <folio-project-row index="01" name="Audit du design system" company="Oplit" kind="Design system" href="#"></folio-project-row>
      <folio-project-row index="02" name="Multiselect & stickybar" company="Oplit" kind="Produit" href="#"></folio-project-row>
      <folio-project-row index="03" name="Store association" company="PrestaShop" kind="Parcours" href="#" style="--folio-project-row-company: var(--folio-color-accent);"></folio-project-row>
      <folio-project-row index="04" name="Sign-in / Sign-up" company="PrestaShop" kind="Authentification" href="#" style="--folio-project-row-company: var(--folio-color-accent);"></folio-project-row>
    </div>
  `,
};
