import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { FolioAccordionItem } from './folio-accordion-item.js';

/**
 * Groups `folio-accordion-item` children into a bordered list.
 * With `exclusive`, opening one item closes the others.
 *
 * @slot - One or more `folio-accordion-item` elements.
 */
@customElement('folio-accordion')
export class FolioAccordion extends LitElement {
  /** Only one item may be open at a time. */
  @property({ type: Boolean }) exclusive = false;

  static styles = css`
    :host {
      display: block;
    }
  `;

  private onToggle = (e: Event) => {
    if (!this.exclusive) return;
    const detail = (e as CustomEvent<{ open: boolean }>).detail;
    const target = e.target as FolioAccordionItem;
    if (!detail.open) return;
    for (const item of this.querySelectorAll<FolioAccordionItem>('folio-accordion-item')) {
      if (item !== target) item.open = false;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('folio-toggle', this.onToggle);
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-accordion': FolioAccordion;
  }
}
