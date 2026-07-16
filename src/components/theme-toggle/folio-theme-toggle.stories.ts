import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-theme-toggle.js';

const meta: Meta = {
  title: 'Components/ThemeToggle',
  component: 'folio-theme-toggle',
  render: () => html`<folio-theme-toggle></folio-theme-toggle>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
