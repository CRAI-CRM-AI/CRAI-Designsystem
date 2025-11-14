import { newSpecPage } from '@stencil/core/testing';
import { CraiTextInput } from '../crai-text-input';

describe('crai-text-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CraiTextInput],
      html: `<crai-text-input></crai-text-input>`,
    });
    expect(page.root).toEqualHtml(`
      <crai-text-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </crai-text-input>
    `);
  });
});
