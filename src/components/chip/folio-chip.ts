import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, reducedMotion } from '../../styles/shared.js';

/**
 * Chips are toggleable filters. Selecting a chip inverts its colors.
 * Chips manage their own `selected` state and notify listeners via
 * the `folio-change` event; group behavior (e.g. exclusive selection)
 * is left to the consumer.
 *
 * @slot - The chip label.
 * @fires folio-change - Fired when selection is toggled. `detail: { selected: boolean }`.
 * @csspart button - The internal button element.
 */
@customElement('folio-chip')
export class FolioChip extends LitElement {
  /** Whether the chip is selected (inverted colors). */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Disables interaction. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = [
    focusRing,
    reducedMotion,
    css`
      :host {
        display: inline-block;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: var(--folio-space-2);
        padding: 6px var(--folio-space-3);
        font-family: var(--folio-font-family-sans);
        font-size: 0.72rem;
        font-weight: 500;
        letter-spacing: 0.02em;
        color: var(--folio-color-text-muted);
        background: transparent;
        border: 1px solid var(--folio-color-border);
        border-radius: var(--folio-radius-none);
        cursor: pointer;
        transition:
          color var(--folio-transition-fast),
          background var(--folio-transition-fast),
          border-color var(--folio-transition-fast);
      }
      .chip:hover {
        color: var(--folio-color-text);
        border-color: var(--folio-color-border-hover);
      }
      :host([selected]) .chip {
        color: var(--folio-color-bg);
        background: var(--folio-color-text);
        border-color: var(--folio-color-text);
      }
      :host([disabled]) .chip {
        color: var(--folio-color-text-dim);
        cursor: not-allowed;
        pointer-events: none;
      }
    `,
  ];

  private toggle() {
    if (this.disabled) return;
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent('folio-change', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`<button
      part="button"
      class="chip"
      aria-pressed=${this.selected ? 'true' : 'false'}
      ?disabled=${this.disabled}
      @click=${this.toggle}
    >
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-chip': FolioChip;
  }
}
