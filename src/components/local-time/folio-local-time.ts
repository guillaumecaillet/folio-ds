import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Displays the current time in a given IANA timezone, in tabular mono
 * digits, updating every minute. Used in the footer to signal presence
 * ("my local time").
 */
@customElement('folio-local-time')
export class FolioLocalTime extends LitElement {
  /** IANA timezone identifier. */
  @property() timezone = 'Europe/Paris';

  /** Optional label displayed after the time, e.g. a city name. */
  @property() label = '';

  @state() private now = new Date();

  private timer?: ReturnType<typeof setInterval>;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: baseline;
      gap: var(--folio-space-8);
      font-family: var(--folio-font-family-mono);
      font-size: var(--folio-text-small);
      color: var(--folio-color-text-muted);
      font-variant-numeric: tabular-nums;
    }
    .label {
      font-size: var(--folio-text-small);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--folio-color-text-dim);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.timer = setInterval(() => (this.now = new Date()), 30_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.timer);
  }

  render() {
    const time = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: this.timezone,
    }).format(this.now);
    return html`<time datetime=${this.now.toISOString()}>${time}</time>${this.label
        ? html`<span class="label">${this.label}</span>`
        : ''}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-local-time': FolioLocalTime;
  }
}
