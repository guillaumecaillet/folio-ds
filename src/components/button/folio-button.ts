import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, reducedMotion } from '../../styles/shared.js';

/**
 * Buttons trigger actions or navigate.
 *
 * - `primary` — filled with the fixed CTA blue. One per view: "Me contacter",
 *   "Voir le projet". The blue does not swap with the theme, so the CTA reads
 *   the same in dark and light.
 * - `card` — bordered, raised on hover. The default, for everything else.
 * - `ghost` — quiet and borderless, for tertiary actions.
 *
 * Set `pixel` on a `primary` button for the notched corners used on the
 * site's headline CTAs. When `href` is set the button renders as a link.
 *
 * @slot - The button label.
 * @slot icon - Optional leading icon (16×16 SVG recommended).
 * @fires click - Native click event (not fired when `disabled`).
 * @csspart button - The internal button or anchor element.
 */
@customElement('folio-button')
export class FolioButton extends LitElement {
  /** Visual treatment of the button. */
  @property({ reflect: true }) variant: 'primary' | 'card' | 'ghost' = 'card';

  /** Notched pixel corners. Intended for `primary`; ignored on `ghost`. */
  @property({ type: Boolean, reflect: true }) pixel = false;

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
        gap: var(--folio-space-8);
        box-sizing: border-box;
        height: var(--folio-control-lg);
        padding-inline: var(--folio-space-16);
        font-family: var(--folio-font-family-sans);
        font-size: var(--folio-text-body);
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
      /* Primary: the one filled treatment. The blue is fixed across themes
         on purpose — see --folio-color-cta. */
      :host([variant='primary']) .btn {
        height: var(--folio-control-xl);
        padding-inline: var(--folio-space-24);
        /* The card variant tightens tracking; the CTA does not. */
        letter-spacing: normal;
        color: var(--folio-color-cta-ink);
        background: var(--folio-color-cta);
        border-color: var(--folio-color-cta);
      }
      :host([variant='primary']) .btn:hover {
        background: var(--folio-color-cta-hot);
        border-color: var(--folio-color-cta-hot);
        transform: translateY(-2px);
      }
      /* Notched corners. Cut with clip-path so the shape survives any
         background; the border is drawn by the fill, not by the border box. */
      :host([variant='primary'][pixel]) .btn {
        --n: var(--folio-pixel-notch);
        --i: var(--folio-pixel-notch-inner);
        clip-path: polygon(
          var(--n) 0, calc(100% - var(--n)) 0,
          calc(100% - var(--n)) var(--i), calc(100% - var(--i)) var(--i),
          calc(100% - var(--i)) var(--n), 100% var(--n),
          100% calc(100% - var(--n)), calc(100% - var(--i)) calc(100% - var(--n)),
          calc(100% - var(--i)) calc(100% - var(--i)), calc(100% - var(--n)) calc(100% - var(--i)),
          calc(100% - var(--n)) 100%, var(--n) 100%,
          var(--n) calc(100% - var(--i)), var(--i) calc(100% - var(--i)),
          var(--i) calc(100% - var(--n)), 0 calc(100% - var(--n)),
          0 var(--n), var(--i) var(--n),
          var(--i) var(--i), var(--n) var(--i)
        );
      }
      :host([variant='ghost']) .btn {
        background: transparent;
        border-color: transparent;
        color: var(--folio-color-text-muted);
        padding-inline: var(--folio-space-8);
      }
      :host([variant='ghost']) .btn:hover {
        color: var(--folio-color-text);
        background: transparent;
        transform: none;
      }
      /* A disabled primary must stop reading as the page's one live action,
         so it drops the fill entirely rather than just dimming its label. */
      :host([variant='primary'][disabled]) .btn {
        background: var(--folio-color-bg-card);
        border-color: var(--folio-color-border);
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
      ::slotted(svg) {
        flex-shrink: 0;
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
