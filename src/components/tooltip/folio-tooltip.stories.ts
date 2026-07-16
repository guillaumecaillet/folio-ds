import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-tooltip.js';
import '../button/folio-button.js';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'folio-tooltip',
  render: (args) => html`
    <div style="padding: 48px; display:flex; justify-content:center;">
      <folio-tooltip text=${args.text} position=${args.position}>
        <folio-button>Survoler</folio-button>
      </folio-tooltip>
    </div>
  `,
  argTypes: {
    position: { control: 'radio', options: ['top', 'bottom'] },
  },
  args: { text: 'Ouvre dans un nouvel onglet', position: 'top' },
};
export default meta;

type Story = StoryObj;

export const Top: Story = {};

export const Bottom: Story = { args: { position: 'bottom' } };
