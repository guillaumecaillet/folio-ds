import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, reducedMotion } from '../../styles/shared.js';

/**
 * Buttons trigger actions or navigate. `card` is the primary treatment
 * (bordered, raised on hover); `ghost` is the quiet, borderless treatment
 * for secondary actions. When `href` is set the button renders as a link.
 *
 * @slot - The button label.
 * @slot icon - Optional leading icon (16×16 SVG recommended).
 * @fires click - Native click event (not fired when `disabled`).
 * @csspart button - The internal button or anchor element.
 */
@customElement('folio-button')
export class FolioButton extends LitElement {
  /** Visual treatment of the button. */
  @property({ reflect: true }) variant: 'card' | 'ghost' = 'card';

  /** When set, renders an anchor that navigates to this URL. */
  @property() href?: string;

  /** Anchor target (only with `href`), e.g. `_blank`. */
  @property() target?: string;

  /** Disables interaction and dims the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Button type when used in a form (ignored with `href`). */
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  static styles = [
    focusRing,
    reducedMotion,
    css`
      :host {
        display: inline-block;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: var(--folio-space-2);
        padding: var(--folio-space-2) 14px;
        font-family: var(--folio-font-family-sans);
        font-size: var(--folio-text-caption);
        font-weight: 500;
        letter-spacing: -0.01em;
        color: var(--folio-color-text);
        background: var(--folio-color-bg-card);
        border: 1px solid var(--folio-color-border-hover);
        border-radius: var(--folio-radius-none);
        cursor: pointer;
        text-decoration: none;
        transition:
          background var(--folio-transition-fast),
          border-color var(--folio-transition-fast),
          transform var(--folio-transition-fast);
      }
      .btn:hover {
        background: var(--folio-color-bg-elevated);
        transform: translateY(-1px);
      }
      :host([variant='ghost']) .btn {
        background: transparent;
        border-color: transparent;
        color: var(--folio-color-text-muted);
        padding-inline: var(--folio-space-1);
      }
      :host([variant='ghost']) .btn:hover {
        color: var(--folio-color-text);
        background: transparent;
        transform: none;
      }
      :host([disabled]) .btn {
        color: var(--folio-color-text-dim);
        border-color: var(--folio-color-border);
        cursor: not-allowed;
        pointer-events: none;
        transform: none;
      }
      ::slotted(svg) {
        display: block;
        width: 16px;
        height: 16px;
      }
    `,
  ];

  render() {
    const inner = html`<slot name="icon"></slot><slot></slot>`;
    return this.href && !this.disabled
      ? html`<a
          part="button"
          class="btn"
          href=${this.href}
          target=${this.target ?? nothing}
          rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
          >${inner}</a
        >`
      : html`<button
          part="button"
          class="btn"
          type=${this.type}
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? 'true' : nothing}
        >
          ${inner}
        </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-button': FolioButton;
  }
}
