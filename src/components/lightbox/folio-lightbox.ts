import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reducedMotion } from '../../styles/shared.js';

/**
 * A full-screen image overlay. Place one instance per page; it listens
 * for `folio-zoom` events from `folio-figure` automatically (opt out
 * with `manual`), or open it yourself with `show(src, alt)`.
 * Closes on click, Escape, or the close button.
 *
 * @fires folio-close - Fired when the lightbox closes.
 * @csspart image - The enlarged img element.
 */
@customElement('folio-lightbox')
export class FolioLightbox extends LitElement {
  /** Disables automatic listening for `folio-zoom` events on document. */
  @property({ type: Boolean }) manual = false;

  @state() private src = '';
  @state() private alt = '';
  @state() private open = false;

  private previousFocus: HTMLElement | null = null;

  static styles = [
    reducedMotion,
    css`
      .overlay {
        position: fixed;
        inset: 0;
        z-index: var(--folio-z-overlay);
        display: grid;
        place-items: center;
        padding: var(--folio-space-32);
        background: color-mix(in srgb, var(--folio-color-bg) 88%, transparent);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition:
          opacity var(--folio-transition),
          visibility var(--folio-transition);
        cursor: zoom-out;
      }
      .overlay.open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        backdrop-filter: blur(6px);
      }
      img {
        max-width: min(1200px, 100%);
        max-height: 100%;
        border: 1px solid var(--folio-color-border);
        transform: scale(0.98);
        transition: transform var(--folio-transition);
      }
      .overlay.open img {
        transform: scale(1);
      }
      .close {
        position: absolute;
        top: var(--folio-space-24);
        right: var(--folio-space-24);
        width: var(--folio-control-lg);
        height: var(--folio-control-lg);
        display: grid;
        place-items: center;
        background: none;
        border: 1px solid var(--folio-color-border);
        border-radius: var(--folio-radius-none);
        color: var(--folio-color-text-muted);
        font-family: var(--folio-font-family-mono);
        font-size: var(--folio-text-body);
        cursor: pointer;
        transition:
          color var(--folio-transition-fast),
          border-color var(--folio-transition-fast);
      }
      .close:hover {
        color: var(--folio-color-text);
        border-color: var(--folio-color-border-hover);
      }
    `,
  ];

  private onZoom = (e: Event) => {
    const { src, alt } = (e as CustomEvent<{ src: string; alt: string }>).detail;
    this.show(src, alt);
  };

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) this.hide();
  };

  connectedCallback() {
    super.connectedCallback();
    if (!this.manual) document.addEventListener('folio-zoom', this.onZoom);
    document.addEventListener('keydown', this.onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('folio-zoom', this.onZoom);
    document.removeEventListener('keydown', this.onKeydown);
  }

  /** Opens the lightbox on the given image. */
  show(src: string, alt = '') {
    this.src = src;
    this.alt = alt;
    this.open = true;
    this.previousFocus = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    this.updateComplete.then(() =>
      this.shadowRoot?.querySelector<HTMLButtonElement>('.close')?.focus()
    );
  }

  /** Closes the lightbox and fires `folio-close`. */
  hide() {
    this.open = false;
    document.body.style.overflow = '';
    this.previousFocus?.focus();
    this.dispatchEvent(new CustomEvent('folio-close', { bubbles: true, composed: true }));
  }

  render() {
    return html`<div
      class="overlay ${this.open ? 'open' : ''}"
      role="dialog"
      aria-modal="true"
      aria-label=${this.alt || 'Image agrandie'}
      aria-hidden=${this.open ? 'false' : 'true'}
      @click=${this.hide}
    >
      ${this.src ? html`<img part="image" src=${this.src} alt=${this.alt} />` : ''}
      <button class="close" aria-label="Fermer" @click=${this.hide}>✕</button>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-lightbox': FolioLightbox;
  }
  interface DocumentEventMap {
    'folio-zoom': CustomEvent<{ src: string; alt: string }>;
  }
}
