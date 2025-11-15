import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { GlassFilter } from '../../lib/glass-filter';

@Component({
  tag: 'crai-button',
  styleUrl: 'crai-button.css',
  shadow: true,
})
export class CraiButton {
  @Event() craiClicked: EventEmitter<MouseEvent>;
  /** Button variant */
  @Prop() variant: 'primary' | 'glass' = 'primary';

  /** Button type */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  @Prop() disabled: boolean = false;

  @Prop() icon: boolean = false;

  @Prop({ mutable: true }) loading: boolean = false;

  btn: HTMLButtonElement;
  private handleClick = (e: MouseEvent) => {
    this.craiClicked.emit(e);
    let x = e.clientX - this.btn.getBoundingClientRect().left;
    let y = e.clientY - this.btn.getBoundingClientRect().top;
    const ripple = document.createElement('span');
    ripple.style.cssText = ` left: ${x}px; top: ${y}px; `;
    this.btn.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 1500);
  };
  render() {
    return (
      <Host>
        <button onClick={this.handleClick} ref={el => (this.btn = el as HTMLButtonElement)} type={this.type} disabled={this.disabled}>
          <span class="content">
            <slot></slot>
          </span>
          <span class="spinner">
            <crai-icon-spinner id="spinner" color="var(--color-button)"></crai-icon-spinner>
          </span>
        </button>
        {this.variant === 'glass' && <GlassFilter />}
      </Host>
    );
  }
}
