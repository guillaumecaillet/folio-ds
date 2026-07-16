import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-contact-row.js';

const meta: Meta = {
  title: 'Components/ContactRow',
  component: 'folio-contact-row',
  render: (args) => html`
    <folio-contact-row
      style="max-width: 480px;"
      label=${args.label}
      value=${args.value}
      href=${args.href}
    ></folio-contact-row>
  `,
  args: { label: 'Email', value: 'hello@guillaumecaillet.com', href: 'mailto:hello@guillaumecaillet.com' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Block: Story = {
  render: () => html`
    <div style="max-width: 480px;">
      <folio-contact-row label="Email" value="hello@guillaumecaillet.com" href="mailto:hello@guillaumecaillet.com"></folio-contact-row>
      <folio-contact-row label="LinkedIn" value="in/guillaumecaillet" href="#" target="_blank"></folio-contact-row>
      <folio-contact-row label="CV" value="guillaume-caillet.pdf" href="#" target="_blank"></folio-contact-row>
    </div>
  `,
};
