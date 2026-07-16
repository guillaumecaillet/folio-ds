import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-local-time.js';

const meta: Meta = {
  title: 'Components/LocalTime',
  component: 'folio-local-time',
  render: (args) => html`
    <folio-local-time timezone=${args.timezone} label=${args.label}></folio-local-time>
  `,
  args: { timezone: 'Europe/Paris', label: 'Nantes, FR' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const TimeOnly: Story = { args: { label: '' } };
