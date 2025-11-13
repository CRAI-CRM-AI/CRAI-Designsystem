import { Component, Host, Prop, h } from '@stencil/core';
import { GlassFilter } from '../../lib/glass-filter';

@Component({
  tag: 'crai-button',
  styleUrl: 'crai-button.css',
  shadow: true,
})
export class CraiButton {
  /** Button variant */
  @Prop() variant: 'primary' | 'glass' = 'primary';

  render() {
    return (
      <Host>
        <button>
          <slot></slot>
        </button>
        <GlassFilter />
      </Host>
    );
  }
}
