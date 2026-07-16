import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-toast.js';
import '../button/folio-button.js';
import type { FolioToast } from './folio-toast.js';

const meta: Meta = {
  title: 'Components/Toast',
  component: 'folio-toast',
};
export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => html`
    <folio-button
      @click=${(e: Event) => {
        const toast = (e.target as HTMLElement)
          .parentElement!.querySelector<FolioToast>('folio-toast')!;
        toast.show('Copié dans le presse-papier');
      }}
      >Afficher le toast</folio-button
    >
    <folio-toast duration="3000"></folio-toast>
  `,
};

export const OpenState: Story = {
  render: () => html`
    <div style="position:relative; height:120px;">
      <folio-toast open duration="0" style="position:absolute;" message="Page introuvable — retour à l'accueil"></folio-toast>
    </div>
  `,
};
