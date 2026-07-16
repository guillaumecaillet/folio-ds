import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, reducedMotion, monoLabel } from '../../styles/shared.js';

/**
 * A contact list row: mono uppercase label on the left, value on the
 * right. On hover the row indents slightly and both texts brighten.
 * Stack several rows to build a contact block; borders collapse
 * between adjacent rows.
 *
 * @csspart row - The internal anchor element.
 */
@customElement('folio-contact-row')
export class FolioContactRow extends LitElement {
  /** Left label, e.g. "Email". */
  @property() label = '';

  /** Right value, e.g. the address. */
  @property() value = '';

  /** Destination URL (mailto:, https://…). */
  @property() href = '#';

  /** Anchor target, e.g. `_blank`. */
  @property() target?: string;

  static styles = [
    focusRing,
    reducedMotion,
    monoLabel,
    css`
      :host {
        display: block;
        border-top: 1px solid var(--folio-color-border);
      }
      :host(:last-of-type) {
        border-bottom: 1px solid var(--folio-color-border);
      }
      a {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--folio-space-5);
        padding: var(--folio-space-4) 0;
        text-decoration: none;
        transition: padding-left var(--folio-transition);
      }
      a:hover {
        padding-left: var(--folio-space-3);
      }
      .label {
        color: var(--folio-color-text-dim);
        transition: color var(--folio-transition-fast);
      }
      .value {
        font-family: var(--folio-font-family-sans);
        font-size: var(--folio-text-small);
        color: var(--folio-color-text-muted);
        transition: color var(--folio-transition-fast);
      }
      a:hover .label {
        color: var(--folio-color-text-muted);
      }
      a:hover .value {
        color: var(--folio-color-text);
      }
    `,
  ];

  render() {
    const external = this.target === '_blank';
    return html`<a
      part="row"
      href=${this.href}
      target=${this.target ?? ''}
      rel=${external ? 'noopener noreferrer' : ''}
    >
      <span class="label mono-label">${this.label}</span>
      <span class="value">${this.value}</span>
    </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-contact-row': FolioContactRow;
  }
}
