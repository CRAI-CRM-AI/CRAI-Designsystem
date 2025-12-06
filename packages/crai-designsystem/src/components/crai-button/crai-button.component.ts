import { html, css, LitElement, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { glassFilter } from '../../utils/glass-filter';

export const CraiButtonSelector = 'crai-button';

/**
 * ## CRAI Button
 *
 * Button component for CRAI Design System.
 *
 * @summary A versatile button component supporting multiple variants, loading states, and icons.
 *
 * @tag crai-button
 * @element crai-button
 *
 * @slot - The content of the button.
 *
 * @fires click - Fired when the button is clicked.
 *
 * @cssprop [--color-button=currentColor] - Text color of the button.
 * @cssprop [--color-button-bg=transparent] - Background color of the button.
 * @cssprop [--color-button-border=transparent] - Border color of the button.
 * @cssprop [--border-radius-md=0.375rem] - Border radius of the button.
 * @cssprop [--font-family=inherit] - Font family of the button.
 * @cssprop [--font-size=inherit] - Font size of the button.
 * @cssprop [--font-weight-default=400] - Font weight of the button.
 * @cssprop [--letter-spacing-large=normal] - Letter spacing of the button text.
 * @cssprop [--glass-inner-shadow=none] - Inner shadow for the glass literal.
 * @cssprop [--filter-blur=0px] - Blur amount for the glass literal.
 * @cssprop [--dimension-border-radius-circle=50%] - Border radius for icon-only buttons.
 */
@customElement(CraiButtonSelector)
export class CraiButton extends LitElement {
  static readonly formAssociated = true;
  /**
   * The type of the button.
   * Dictionary: `button`, `submit`, `reset`
   * @default 'button'
   */
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Whether the button is disabled.
   * @default false
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * The variant style of the button.
   * Dictionary: `primary`, `glass`
   * @default 'primary'
   */
  @property() variant: 'primary' | 'glass' = 'primary';

  /**
   * Whether the button is an icon-only button.
   * @default false
   */
  @property({ type: Boolean }) icon: boolean = false;

  /**
   * Whether the button is in a loading state.
   * When true, shows a spinner and hides the content.
   * @default false
   */
  @property({ type: Boolean }) loading: boolean = false;

  private _internals: ElementInternals;

  @query('button')
  private btn!: HTMLButtonElement;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.onkeyup = this._handleKeyup.bind(this);
    this.onkeydown = this._handleKeydown.bind(this);
    this.onselectstart = this._handleSelectStart.bind(this);
  }

  /**
   * Programmatically clicks the button.
   */
  public click(): void {
    this._handleClick();
  }

  private _handleClick(event?: MouseEvent | KeyboardEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.disabled) {
      return;
    }

    if (event instanceof MouseEvent) {
      const x = event.clientX - this.btn.getBoundingClientRect().left;
      const y = event.clientY - this.btn.getBoundingClientRect().top;
      const ripple = document.createElement('span');
      ripple.style.cssText = ` left: ${x}px; top: ${y}px; `;
      this.btn.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 1500);
    }

    this._dispatchClickEvent();

    if (this.type === 'submit') {
      this._internals.form?.requestSubmit();
    }

    if (this.type === 'reset') {
      this._internals.form?.reset();
    }
  }

  private _dispatchClickEvent(): void {
    this.dispatchEvent(new Event('click'));
  }

  private _handleKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this._handleClick(event);
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  private _handleSelectStart(event: Event): void {
    event.preventDefault();
  }

  render() {
    return html`
      <button title="CraiButton" type="${this.type}" ?disabled="${this.disabled}" @click="${this._handleClick}">
        <span class="content">
          <slot></slot>
        </span>
        <span class="spinner">
          <crai-icon-spinner id="spinner" color="var(--color-button)"></crai-icon-spinner>
        </span>
      </button>
      ${this.variant === 'glass' ? glassFilter() : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
      /* fonts */
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight-default);
      font-style: var(--font-style-normal);
      font-optical-sizing: var(--font-optical-sizing-default);
      & button {
        font: inherit;
        letter-spacing: var(--letter-spacing-large);
        cursor: pointer;
        position: relative;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: center;
        background: var(--color-button-bg);
        border-radius: var(--border-radius-md);
        border: 1px solid var(--color-button-border);
        padding: 1rem 1.5rem;
        color: var(--color-button);
        overflow: hidden;
        -webkit-corner-shape: squircle;
        /* stylelint-disable-next-line property-no-unknown */
        corner-shape: squircle;
        transition: ease-in-out;
        & span {
          position: absolute;
          transform: translate(-50%, -50%) scale(0);
          display: inline-block;
          opacity: 0.8;
          width: 25rem;
          height: 25rem;
          background-color: #fff;
          border-radius: 50%;
          animation: ripple 1.5s ease;
        }
        & span.content {
          all: unset;
          display: inline-block;
          visibility: visible;
          opacity: 1;
          transition: ease-in-out;
        }
        & span.spinner {
          all: unset;
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          visibility: hidden;
          transition: ease-in-out;

          & #spinner {
            animation: spin 1s linear infinite;
          }
        }
      }
    }

    :host([variant='glass']) {
      overflow: hidden;
      border-radius: var(--border-radius-md);
      -webkit-corner-shape: squircle;
      /* stylelint-disable-next-line property-no-unknown */
      corner-shape: squircle;
      & button {
        cursor: pointer;
        font: inherit;
        display: flex;
        position: relative;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 1rem 1.5rem;
        background: transparent;
        border-radius: var(--border-radius-md);
        -webkit-corner-shape: squircle;
        /* stylelint-disable-next-line property-no-unknown */
        corner-shape: squircle;
        outline: none;
        border: none;
        z-index: 0;
        color: white;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          border-radius: var(--border-radius-md);
          -webkit-corner-shape: squircle;
          /* stylelint-disable-next-line property-no-unknown */
          corner-shape: squircle;
          -webkit-box-shadow: var(--glass-inner-shadow);
          box-shadow: var(--glass-inner-shadow);
          background-color: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(var(--filter-blur));
        }
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--border-radius-md);
          -webkit-corner-shape: squircle;
          /* stylelint-disable-next-line property-no-unknown */
          corner-shape: squircle;
          -webkit-backdrop-filter: blur(0px);
          backdrop-filter: blur(0px);
          -webkit-filter: url(#glass-distortion);
          filter: url(#glass-distortion);
          overflow: hidden;
          isolation: isolate;
          z-index: -2;
        }
      }
    }

    :host([icon]) {
      border-radius: var(--dimension-border-radius-circle);
      -webkit-corner-shape: round;
      /* stylelint-disable-next-line property-no-unknown */
      corner-shape: round;

      & button {
        display: flex;
        align-items: center;
        padding: 0;
        width: 3.4rem;
        height: 3.4rem;
        border-radius: var(--dimension-border-radius-circle);
        -webkit-corner-shape: round;
        /* stylelint-disable-next-line property-no-unknown */
        corner-shape: round;
        &::before,
        ::after {
          border-radius: var(--dimension-border-radius-circle);
          -webkit-corner-shape: round;
          /* stylelint-disable-next-line property-no-unknown */
          corner-shape: round;
        }
      }
    }

    :host([disabled]) {
      overflow: hidden;
      position: relative;
      border-radius: var(--border-radius-md);
      -webkit-corner-shape: squircle;
      cursor: not-allowed;
      /* stylelint-disable-next-line property-no-unknown */
      corner-shape: squircle;
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: rgba(125, 125, 125, 0.6);
      }
      & button {
        cursor: not-allowed;
        pointer-events: none;
      }
    }
    :host([loading]) {
      & button {
        & span.content {
          visibility: hidden;
          opacity: 0;
        }
        & span.spinner {
          opacity: 1;
          visibility: visible;
          display: block;
        }
      }
    }

    /* keyframes */
    @keyframes ripple {
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
      }
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
}
