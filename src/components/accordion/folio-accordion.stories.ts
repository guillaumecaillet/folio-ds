import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './folio-accordion.js';
import './folio-accordion-item.js';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'folio-accordion',
  render: (args) => html`
    <folio-accordion ?exclusive=${args.exclusive} style="max-width: 640px; display:block;">
      <folio-accordion-item heading="Senior Product Designer" meta="2023 — 2025" open>
        Design system, recherche utilisateur et livraison produit sur un SaaS industriel.
        Audit puis unification de deux librairies de composants.
      </folio-accordion-item>
      <folio-accordion-item heading="Product Designer" meta="2021 — 2023">
        Parcours d'onboarding, comptes clients et tunnels d'authentification.
      </folio-accordion-item>
      <folio-accordion-item heading="UX/UI Designer" meta="2019 — 2021">
        Premiers systèmes de design et prototypage haute fidélité.
      </folio-accordion-item>
    </folio-accordion>
  `,
  argTypes: { exclusive: { control: 'boolean' } },
  args: { exclusive: false },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Exclusive: Story = { args: { exclusive: true } };
