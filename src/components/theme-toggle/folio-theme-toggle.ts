import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { focusRing, reducedMotion } from '../../styles/shared.js';

const STORAGE_KEY = 'folio-theme';

/**
 * Toggles between the dark (default) and light themes by setting
 * `data-theme` on `<html>` and persisting the choice to
 * `localStorage('folio-theme')`. Sun and moon icons cross-fade.
 *
 * @fires folio-theme-change - Fired after the theme changes. `detail: { theme: 'dark' | 'light' }`.
 * @csspart button - The internal button element.
 */
@customElement('folio-theme-toggle')
export class FolioThemeToggle extends LitElement {
  @state() private theme: 'dark' | 'light' = 'dark';

  static styles = [
    focusRing,
    reducedMotion,
    css`
      :host {
        display: inline-block;
      }
      button {
        position: relative;
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        padding: 0;
        background: none;
        border: none;
        border-radius: var(--folio-radius-none);
        color: var(--folio-color-text-muted);
        cursor: pointer;
        transition: color var(--folio-transition-fast);
      }
      button:hover {
        color: var(--folio-color-text);
      }
      svg {
        grid-area: 1 / 1;
        width: 16px;
        height: 16px;
        transition:
          opacity var(--folio-transition),
          transform var(--folio-transition);
      }
      .sun {
        opacity: 0;
        transform: rotate(-90deg) scale(0.6);
      }
      .moon {
        opacity: 1;
        transform: rotate(0) scale(1);
      }
      :host([data-current='light']) .sun {
        opacity: 1;
        transform: rotate(0) scale(1);
      }
      :host([data-current='light']) .moon {
        opacity: 0;
        transform: rotate(90deg) scale(0.6);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    const stored = localStorage.getItem(STORAGE_KEY);
    const current = document.documentElement.getAttribute('data-theme');
    this.theme = stored === 'light' || current === 'light' ? 'light' : 'dark';
    this.apply(false);
  }

  private apply(notify: boolean) {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.setAttribute('data-current', this.theme);
    if (notify) {
      localStorage.setItem(STORAGE_KEY, this.theme);
      this.dispatchEvent(
        new CustomEvent('folio-theme-change', {
          detail: { theme: this.theme },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.apply(true);
  }

  render() {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    return html`<button
      part="button"
      aria-label=${`Switch to ${next} theme`}
      title=${`Switch to ${next} theme`}
      @click=${this.toggle}
    >
      <svg class="sun" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
        <circle cx="8" cy="8" r="3.2" />
        <path d="M8 .8v2M8 13.2v2M.8 8h2M13.2 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M13.1 2.9l-1.4 1.4M4.3 11.7l-1.4 1.4" />
      </svg>
      <svg class="moon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
        <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" />
      </svg>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'folio-theme-toggle': FolioThemeToggle;
  }
}
