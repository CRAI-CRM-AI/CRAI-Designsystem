import { newE2EPage } from '@stencil/core/testing';

describe('crai-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<crai-button></crai-button>');

    const element = await page.find('crai-button');
    expect(element).toHaveClass('hydrated');
  });
});
