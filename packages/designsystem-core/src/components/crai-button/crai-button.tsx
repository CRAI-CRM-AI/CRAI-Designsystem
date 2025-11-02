import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'crai-button',
  styleUrl: 'crai-button.css',
  shadow: true,
})
export class CraiButton {
  @Event() craiClicked: EventEmitter<MouseEvent>;

  @Prop() variant: 'strong' | 'subtle' | 'outlined' | 'glass' | 'text' = 'glass';

  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  @Prop() disabled: boolean = false;

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
        <button ref={el => (this.btn = el as HTMLButtonElement)} onClick={this.handleClick}>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
