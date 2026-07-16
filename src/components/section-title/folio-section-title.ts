import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { monoLabel } from '../../styles/shared.js';

/**
 * Section titles are the system's signature eyebrow: a small mono,
 * uppercase, letter-spaced label that opens a content section.
 * Rendered as a real heading for the document outline.
 *
 * @slot - The title text.
 */
@customElement('folio-section-title')
export class FolioSectionTitle extends LitElement {
  /** Heading level for the document outline (1–6). */
  @property({ type: Number }) level = 2;

  /** Dimmer treatment for less prominent labels. */
  @property({ type: Boolean, reflect: true }) dim = false;

  static styles = [
    monoLabel,
    css`
      :host {
        display: block;
      }
      .title {
        margin: 0;
        color: var(--folio-color-text-muted);
        letter-spacing: 0.14em;
      }
      :host([dim]) .title {
        color: var(--folio-color-text-dim);
      }
    `,
  ];

  render() {
    const level = Math.min(6, Math.max(1, this.level));
    return html`<p class="title mono-label" role="heading" aria-level=${level}>
      <slot></slot>
    </p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-section-title': FolioSectionTitle;
  }
}
