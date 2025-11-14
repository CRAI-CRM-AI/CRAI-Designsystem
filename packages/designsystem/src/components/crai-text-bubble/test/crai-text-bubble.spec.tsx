import { newSpecPage } from '@stencil/core/testing';
import { CraiTextBubble } from '../crai-text-bubble';

describe('crai-text-bubble', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CraiTextBubble],
      html: `<crai-text-bubble></crai-text-bubble>`,
    });
    expect(page.root).toEqualHtml(`
      <crai-text-bubble>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </crai-text-bubble>
    `);
  });
});
