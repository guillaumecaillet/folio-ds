import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { monoLabel } from '../../styles/shared.js';

/**
 * Badges communicate status or draw attention to a small piece of
 * metadata. The tone maps to the semantic status tokens; `accent`
 * is the neutral highlight; `key` is the gold reserved for flagging
 * key projects, and is the one tone that also carries a border.
 *
 * @slot - The badge text (one or two words).
 */
@customElement('folio-badge')
export class FolioBadge extends LitElement {
  /** Semantic tone of the badge. */
  @property({ reflect: true }) tone: 'accent' | 'ok' | 'warn' | 'danger' | 'info' | 'key' =
    'accent';

  static styles = [
    monoLabel,
    css`
      :host {
        display: inline-block;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        height: 24px;
        padding-inline: var(--folio-space-2);
        border-radius: var(--folio-radius-none);
        font-size: var(--folio-text-micro);
        font-weight: 700;
        letter-spacing: 0.08em;
        line-height: 1;
        color: var(--folio-color-accent);
        background: var(--folio-color-accent-soft);
      }
      :host([tone='ok']) .badge {
        color: var(--folio-color-status-ok);
        background: var(--folio-color-status-ok-soft);
      }
      :host([tone='warn']) .badge {
        color: var(--folio-color-status-warn);
        background: var(--folio-color-status-warn-soft);
      }
      :host([tone='danger']) .badge {
        color: var(--folio-color-status-danger);
        background: var(--folio-color-status-danger-soft);
      }
      :host([tone='info']) .badge {
        color: var(--folio-color-status-info);
        background: var(--folio-color-status-info-soft);
      }
      /* Key projects. Tinted rather than filled so it reads as a marker,
         not a status, and keeps its weight against a page of blue. */
      :host([tone='key']) .badge {
        color: var(--folio-color-key-ink);
        background: color-mix(in srgb, var(--folio-color-key) 13%, transparent);
        border: 1px solid color-mix(in srgb, var(--folio-color-key) 55%, transparent);
        letter-spacing: 0.04em;
      }
    `,
  ];

  render() {
    return html`<span class="badge mono-label"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-badge': FolioBadge;
  }
}
