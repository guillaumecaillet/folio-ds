import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reducedMotion } from '../../styles/shared.js';

let tooltipId = 0;

/**
 * Tooltips reveal a short text hint on hover or keyboard focus of the
 * wrapped element. Inverted colors (text on background swap) with a
 * CSS triangle. Content must be non-essential — never hide critical
 * information in a tooltip.
 *
 * @slot - The trigger element the tooltip is attached to.
 */
@customElement('folio-tooltip')
export class FolioTooltip extends LitElement {
  /** The tooltip text. */
  @property() text = '';

  /** Which side of the trigger the tooltip appears on. */
  @property({ reflect: true }) position: 'top' | 'bottom' = 'top';

  @state() private visible = false;

  private readonly id_ = `folio-tooltip-${++tooltipId}`;

  static styles = [
    reducedMotion,
    css`
      :host {
        position: relative;
        display: inline-block;
      }
      .bubble {
        position: absolute;
        left: 50%;
        z-index: var(--folio-z-tooltip);
        transform: translateX(-50%) translateY(2px);
        padding: var(--folio-space-8) var(--folio-space-16);
        font-family: var(--folio-font-family-sans);
        font-size: var(--folio-text-small);
        font-weight: 500;
        white-space: nowrap;
        color: var(--folio-color-bg);
        background: var(--folio-color-text);
        border-radius: var(--folio-radius-none);
        opacity: 0;
        pointer-events: none;
        transition:
          opacity var(--folio-transition-fast),
          transform var(--folio-transition-fast);
      }
      .bubble::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
      }
      :host([position='top']) .bubble {
        bottom: calc(100% + 8px);
      }
      :host([position='top']) .bubble::before {
        top: 100%;
        border-top-color: var(--folio-color-text);
      }
      :host([position='bottom']) .bubble {
        top: calc(100% + 8px);
      }
      :host([position='bottom']) .bubble::before {
        bottom: 100%;
        border-bottom-color: var(--folio-color-text);
      }
      .bubble.visible {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `,
  ];

  private show = () => (this.visible = true);
  private hide = () => (this.visible = false);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this.show);
    this.addEventListener('mouseleave', this.hide);
    this.addEventListener('focusin', this.show);
    this.addEventListener('focusout', this.hide);
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });
  }

  render() {
    return html`<slot aria-describedby=${this.id_}></slot>
      <span id=${this.id_} role="tooltip" class="bubble ${this.visible ? 'visible' : ''}"
        >${this.text}</span
      >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-tooltip': FolioTooltip;
  }
}
