import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { monoLabel } from '../../styles/shared.js';

/**
 * Tags label content with a category or attribute — the signature
 * bordered, mono, uppercase treatment. Tags are static: they don't
 * respond to hover or click. For interactive filtering, use `folio-chip`.
 *
 * @slot - The tag text (keep it to 1–3 words).
 */
@customElement('folio-tag')
export class FolioTag extends LitElement {
  static styles = [
    monoLabel,
    css`
      :host {
        display: inline-block;
      }
      .tag {
        display: inline-block;
        padding: var(--folio-space-1) var(--folio-space-3);
        border: 1px solid var(--folio-color-border);
        border-radius: var(--folio-radius-none);
        color: var(--folio-color-text-muted);
        letter-spacing: 0.08em;
      }
    `,
  ];

  render() {
    return html`<span class="tag mono-label"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-tag': FolioTag;
  }
}
