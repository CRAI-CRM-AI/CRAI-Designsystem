import { Component, Host, h } from '@stencil/core';
import { GlassFilter } from '../../lib/glass-filter';

@Component({
  tag: 'crai-button',
  styleUrl: 'crai-button.css',
  shadow: true,
})
export class CraiButton {
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
