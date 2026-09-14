import { css } from 'lit';

/**
 * Shared style fragments used across Folio DS components.
 * Components consume the global `--folio-*` custom properties
 * (defined in tokens.css, which pierces the shadow DOM).
 */

/** Accent focus ring, keyboard-only (matches the portfolio's :focus-visible). */
export const focusRing = css`
  :focus-visible {
    outline: 2px solid var(--folio-color-accent);
    outline-offset: 3px;
    border-radius: var(--folio-radius-none);
  }
  :focus:not(:focus-visible) {
    outline: none;
  }
`;

/** Disable transitions/animations when the user prefers reduced motion. */
export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;

/** The signature mono uppercase label ("eyebrow") type style. */
export const monoLabel = css`
  .mono-label {
    font-family: var(--folio-font-family-mono);
    font-size: var(--folio-text-small);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;
