import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'crai-button',
  styleUrl: 'crai-button.css',
  shadow: true,
})
export class CraiButton {
  /**
   * The button type
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  @Prop() disabled?: boolean = false;

  @Prop() variant: 'strong' | 'subtle' | 'outlined' | 'text' = 'strong';

  render() {
    return (
      <Host>
        <button type={this.type} disabled={this.disabled}>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
