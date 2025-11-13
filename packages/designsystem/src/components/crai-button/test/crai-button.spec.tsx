import { newSpecPage } from '@stencil/core/testing';
import { CraiButton } from '../crai-button';

describe('crai-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CraiButton],
      html: `<crai-button></crai-button>`,
    });
    expect(page.root).toEqualHtml(`
      <crai-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </crai-button>
    `);
  });
});
