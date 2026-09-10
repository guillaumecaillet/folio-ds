import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reducedMotion } from '../../styles/shared.js';

/**
 * Toasts surface a brief, non-blocking confirmation or notice at the
 * bottom center of the viewport, then dismiss themselves. Show one by
 * calling `show()` (optionally with a message), or set `open`.
 *
 * @slot - The toast message (alternative to the `message` property).
 * @fires folio-dismiss - Fired when the toast hides (timeout or manual).
 */
@customElement('folio-toast')
export class FolioToast extends LitElement {
  /** Message text (used by `show()` if no argument is given). */
  @property() message = '';

  /** Milliseconds before auto-dismiss. 0 disables auto-dismiss. */
  @property({ type: Number }) duration = 4000;

  /** Whether the toast is visible. */
  @property({ type: Boolean, reflect: true }) open = false;

  private timer?: ReturnType<typeof setTimeout>;

  static styles = [
    reducedMotion,
    css`
      :host {
        position: fixed;
        bottom: var(--folio-space-7);
        left: 50%;
        transform: translateX(-50%);
        z-index: var(--folio-z-toast);
        pointer-events: none;
      }
      .toast {
        padding: var(--folio-space-3) var(--folio-space-6);
        font-family: var(--folio-font-family-sans);
        font-size: var(--folio-text-small);
        font-weight: 500;
        color: var(--folio-color-bg);
        background: var(--folio-color-text);
        border-radius: var(--folio-radius-none);
        opacity: 0;
        transform: translateY(8px);
        transition:
          opacity var(--folio-transition),
          transform var(--folio-transition);
      }
      :host([open]) .toast {
        opacity: 1;
        transform: translateY(0);
      }
    `,
  ];

  /** Shows the toast (optionally overriding the message), restarts the timer. */
  show(message?: string) {
    if (message !== undefined) this.message = message;
    this.open = true;
    clearTimeout(this.timer);
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.hide(), this.duration);
    }
  }

  /** Hides the toast and fires `folio-dismiss`. */
  hide() {
    if (!this.open) return;
    this.open = false;
    clearTimeout(this.timer);
    this.dispatchEvent(new CustomEvent('folio-dismiss', { bubbles: true, composed: true }));
  }

  render() {
    return html`<div class="toast" role="status" aria-live="polite">
      <slot>${this.message}</slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-toast': FolioToast;
  }
}
