import { Component, Host, Prop, h } from '@stencil/core';
import { GlassFilter } from '../../lib/glass-filter';

@Component({
  tag: 'crai-text-bubble',
  styleUrl: 'crai-text-bubble.css',
  shadow: true,
})
export class CraiTextBubble {
  @Prop() variant: 'primary' | 'glass' = 'primary';
  render() {
    return (
      <Host>
        <div>
          <slot></slot>
        </div>
        {this.variant === 'glass' && <GlassFilter />}
      </Host>
    );
  }
}
