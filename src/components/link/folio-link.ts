import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, reducedMotion } from '../../styles/shared.js';

/**
 * Links navigate. Three variants: `nav` (muted, animated underline on
 * hover — for navigation bars), `inline` (underlined accent link inside
 * body copy), and `back` (arrow-prefixed "back to" link).
 *
 * @slot - The link text.
 * @csspart anchor - The internal anchor element.
 */
@customElement('folio-link')
export class FolioLink extends LitElement {
  /** Destination URL. */
  @property() href = '#';

  /** Visual treatment. */
  @property({ reflect: true }) variant: 'nav' | 'inline' | 'back' = 'inline';

  /** Marks the current page in a `nav` variant (full color + aria-current). */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Anchor target, e.g. `_blank`. */
  @property() target?: string;

  static styles = [
    focusRing,
    reducedMotion,
    css`
      :host {
        display: inline-block;
      }
      a {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: var(--folio-space-2);
        font-family: var(--folio-font-family-sans);
        text-decoration: none;
        transition: color var(--folio-transition-fast);
      }

      /* nav */
      :host([variant='nav']) a {
        font-size: var(--folio-text-small);
        color: var(--folio-color-text-muted);
        letter-spacing: 0.01em;
      }
      :host([variant='nav']) a::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: var(--folio-color-text);
        transition: width var(--folio-transition);
      }
      :host([variant='nav']) a:hover,
      :host([variant='nav'][active]) a {
        color: var(--folio-color-text);
      }
      :host([variant='nav']) a:hover::after {
        width: 100%;
      }

      /* inline */
      :host([variant='inline']) a {
        color: var(--folio-color-accent);
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-color: color-mix(in srgb, var(--folio-color-accent) 40%, transparent);
      }
      :host([variant='inline']) a:hover {
        color: var(--folio-color-accent-strong);
        text-decoration-color: currentColor;
      }

      /* back */
      :host([variant='back']) a {
        font-size: var(--folio-text-caption);
        color: var(--folio-color-text-muted);
      }
      :host([variant='back']) a:hover {
        color: var(--folio-color-text);
      }
      :host([variant='back']) .arrow {
        transition: transform var(--folio-transition-fast);
      }
      :host([variant='back']) a:hover .arrow {
        transform: translateX(-3px);
      }
    `,
  ];

  render() {
    return html`<a
      part="anchor"
      href=${this.href}
      target=${this.target ?? nothing}
      rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
      aria-current=${this.active ? 'page' : nothing}
    >
      ${this.variant === 'back' ? html`<span class="arrow" aria-hidden="true">←</span>` : nothing}
      <slot></slot>
    </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-link': FolioLink;
  }
}
