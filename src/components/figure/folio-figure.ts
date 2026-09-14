import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reducedMotion, monoLabel } from '../../styles/shared.js';

/**
 * Figures present case-study imagery with an optional caption. When
 * `zoomable`, clicking the image fires `folio-zoom` (pair it with
 * `folio-lightbox`). Without a `src`, a labeled placeholder is
 * rendered so layouts survive missing assets.
 *
 * @fires folio-zoom - Fired on click when `zoomable`. `detail: { src: string, alt: string }`.
 * @csspart image - The internal img element.
 * @csspart caption - The figcaption element.
 */
@customElement('folio-figure')
export class FolioFigure extends LitElement {
  /** Image URL. Empty → placeholder. */
  @property() src = '';

  /** Alt text (required for meaningful images). */
  @property() alt = '';

  /** Caption below the image. */
  @property() caption = '';

  /** Enables click-to-zoom (fires `folio-zoom`). */
  @property({ type: Boolean, reflect: true }) zoomable = false;

  static styles = [
    reducedMotion,
    monoLabel,
    css`
      :host {
        display: block;
      }
      figure {
        margin: 0;
      }
      .frame {
        overflow: hidden;
        border: 1px solid var(--folio-color-border);
        border-radius: var(--folio-radius-none);
        background: var(--folio-color-bg-elevated);
      }
      img {
        display: block;
        width: 100%;
        height: auto;
        transition: transform var(--folio-transition);
      }
      :host([zoomable]) img {
        cursor: zoom-in;
      }
      :host([zoomable]) .frame:hover img {
        transform: scale(1.02);
      }
      .placeholder {
        display: grid;
        place-items: center;
        aspect-ratio: 16 / 9;
        color: var(--folio-color-text-dim);
        letter-spacing: 0.14em;
      }
      figcaption {
        padding-top: var(--folio-space-8);
        font-size: var(--folio-text-small);
        color: var(--folio-color-text-muted);
        line-height: 1.5;
      }
    `,
  ];

  private zoom() {
    if (!this.zoomable || !this.src) return;
    this.dispatchEvent(
      new CustomEvent('folio-zoom', {
        detail: { src: this.src, alt: this.alt },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`<figure>
      <div class="frame" @click=${this.zoom}>
        ${this.src
          ? html`<img part="image" src=${this.src} alt=${this.alt} loading="lazy" />`
          : html`<div class="placeholder mono-label" role="img" aria-label=${this.alt || 'Missing image'}>
              image à venir
            </div>`}
      </div>
      ${this.caption
        ? html`<figcaption part="caption">${this.caption}</figcaption>`
        : nothing}
    </figure>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-figure': FolioFigure;
  }
}
