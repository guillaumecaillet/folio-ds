import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusRing, reducedMotion } from '../../styles/shared.js';

/**
 * A project list row: mono index, project name, company, type, and a
 * trailing arrow. On hover the index, name and arrow take the accent
 * color. The company color can be customized per row via the
 * `--folio-project-row-company` custom property.
 *
 * @slot name - Rich name content (overrides the `name` property).
 * @cssproperty --folio-project-row-company - Color of the company label (defaults to text-muted).
 * @csspart row - The internal anchor element.
 */
@customElement('folio-project-row')
export class FolioProjectRow extends LitElement {
  /** Zero-padded index, e.g. "01". */
  @property() index = '';

  /** Project name. */
  @property() name = '';

  /** Company or client name. */
  @property() company = '';

  /** Project type annotation, e.g. "Design system". */
  @property() kind = '';

  /** Destination URL of the case study. */
  @property() href = '#';

  static styles = [
    focusRing,
    reducedMotion,
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
        gap: var(--folio-space-6);
        padding: var(--folio-space-4) var(--folio-space-2);
        text-decoration: none;
        font-family: var(--folio-font-family-sans);
        transition: background var(--folio-transition-fast);
      }
      .index {
        flex: none;
        font-family: var(--folio-font-family-mono);
        font-size: var(--folio-text-label);
        color: var(--folio-color-text-dim);
        font-variant-numeric: tabular-nums;
        transition: color var(--folio-transition-fast);
      }
      .name {
        font-size: 1.05rem;
        font-weight: 500;
        letter-spacing: -0.01em;
        color: var(--folio-color-text);
        transition: color var(--folio-transition-fast);
      }
      .company {
        font-size: var(--folio-text-small);
        color: var(--folio-project-row-company, var(--folio-color-text-muted));
      }
      .kind {
        margin-left: auto;
        font-family: var(--folio-font-family-mono);
        font-size: var(--folio-text-label);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--folio-color-text-dim);
        white-space: nowrap;
      }
      .arrow {
        flex: none;
        color: var(--folio-color-text-dim);
        transition:
          color var(--folio-transition-fast),
          transform var(--folio-transition-fast);
      }
      a:hover .index,
      a:hover .name,
      a:hover .arrow {
        color: var(--folio-color-accent);
      }
      a:hover .arrow {
        transform: translateX(4px);
      }
      @media (max-width: 768px) {
        .kind {
          display: none;
        }
      }
    `,
  ];

  render() {
    return html`<a part="row" href=${this.href}>
      ${this.index ? html`<span class="index">${this.index}</span>` : nothing}
      <span class="name"><slot name="name">${this.name}</slot></span>
      ${this.company ? html`<span class="company">${this.company}</span>` : nothing}
      ${this.kind ? html`<span class="kind">${this.kind}</span>` : nothing}
      <span class="arrow" aria-hidden="true">→</span>
    </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-project-row': FolioProjectRow;
  }
}
