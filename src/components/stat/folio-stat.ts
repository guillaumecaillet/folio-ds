import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { monoLabel } from '../../styles/shared.js';

/**
 * Stats display a key figure with its label — impact metrics in case
 * studies, hero statistics on the landing page. The value uses tabular
 * mono numerals. The `bar` variant adds the accent left border.
 *
 * @slot value - Rich value content (overrides the `value` property).
 * @slot label - Rich label content (overrides the `label` property).
 */
@customElement('folio-stat')
export class FolioStat extends LitElement {
  /** The figure, e.g. "-38%" or "44". */
  @property() value = '';

  /** What the figure measures. */
  @property() label = '';

  /** Visual treatment: `plain` or `bar` (accent left border). */
  @property({ reflect: true }) variant: 'plain' | 'bar' = 'plain';

  static styles = [
    monoLabel,
    css`
      :host {
        display: block;
      }
      /* 32px value + 16px label = 48px, so a stat occupies exactly six
         grid rows with no gap of its own. */
      .stat {
        display: flex;
        flex-direction: column;
      }
      :host([variant='bar']) .stat {
        border-left: 2px solid var(--folio-color-accent);
        padding-left: var(--folio-space-16);
      }
      .value {
        font-family: var(--folio-font-family-mono);
        font-size: var(--folio-text-heading);
        font-weight: 500;
        color: var(--folio-color-text);
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
        line-height: var(--folio-leading-heading);
      }
      .label {
        color: var(--folio-color-text-muted);
        letter-spacing: 0.08em;
        line-height: var(--folio-leading-small);
      }
    `,
  ];

  render() {
    return html`<div class="stat">
      <span class="value"><slot name="value">${this.value}</slot></span>
      <span class="label mono-label"><slot name="label">${this.label}</slot></span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-stat': FolioStat;
  }
}
