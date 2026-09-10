import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, reducedMotion } from '../../styles/shared.js';

let itemId = 0;

/**
 * A single expandable entry inside a `folio-accordion`. The header row
 * shows a heading, an optional meta annotation (e.g. dates), and a
 * plus/cross toggle. Full disclosure ARIA wiring is built in.
 *
 * @slot - The panel content, revealed when open.
 * @slot heading - Rich heading content (overrides the `heading` property).
 * @fires folio-toggle - Fired when the item opens or closes. `detail: { open: boolean }`.
 * @csspart header - The clickable header button.
 * @csspart panel - The collapsible content region.
 */
@customElement('folio-accordion-item')
export class FolioAccordionItem extends LitElement {
  /** Header title. */
  @property() heading = '';

  /** Muted annotation on the right of the header (e.g. "2023 — 2025"). */
  @property() meta = '';

  /** Whether the panel is expanded. */
  @property({ type: Boolean, reflect: true }) open = false;

  private readonly id_ = `folio-acc-${++itemId}`;

  static styles = [
    focusRing,
    reducedMotion,
    css`
      :host {
        display: block;
        border-top: 1px solid var(--folio-color-border);
      }
      :host(:last-of-type) {
        border-bottom: 1px solid var(--folio-color-border);
      }
      .header {
        display: flex;
        align-items: baseline;
        gap: var(--folio-space-4);
        width: 100%;
        padding: var(--folio-space-4) 0;
        background: none;
        border: none;
        border-radius: var(--folio-radius-none);
        font-family: var(--folio-font-family-sans);
        text-align: left;
        color: var(--folio-color-text);
        cursor: pointer;
      }
      .heading {
        font-size: var(--folio-text-body);
        font-weight: 500;
        letter-spacing: -0.01em;
      }
      .meta {
        margin-left: auto;
        font-family: var(--folio-font-family-mono);
        font-size: var(--folio-text-label);
        color: var(--folio-color-text-muted);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .toggle {
        flex: none;
        font-family: var(--folio-font-family-mono);
        font-size: 0.9rem;
        color: var(--folio-color-accent);
        transition: transform var(--folio-transition);
        transform-origin: center;
        line-height: 1;
        align-self: center;
      }
      :host([open]) .toggle {
        transform: rotate(45deg);
      }
      .panel {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--folio-transition);
      }
      :host([open]) .panel {
        grid-template-rows: 1fr;
      }
      .panel-inner {
        overflow: hidden;
      }
      .panel-content {
        padding: 0 0 var(--folio-space-6);
        font-size: var(--folio-text-body);
        line-height: 1.65;
        color: var(--folio-color-text-muted);
        max-width: 60ch;
      }
    `,
  ];

  toggle() {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('folio-toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        part="header"
        class="header"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-controls="${this.id_}-panel"
        @click=${this.toggle}
      >
        <span class="heading"><slot name="heading">${this.heading}</slot></span>
        ${this.meta ? html`<span class="meta">${this.meta}</span>` : ''}
        <span class="toggle" aria-hidden="true">+</span>
      </button>
      <div id="${this.id_}-panel" part="panel" class="panel" role="region" aria-label=${this.heading}>
        <div class="panel-inner">
          <div class="panel-content"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-accordion-item': FolioAccordionItem;
  }
}
