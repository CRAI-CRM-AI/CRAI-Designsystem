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

  

  render() {
    return (
      <button type={this.type}>
        <slot></slot>
      </button>
    );
  }
}
