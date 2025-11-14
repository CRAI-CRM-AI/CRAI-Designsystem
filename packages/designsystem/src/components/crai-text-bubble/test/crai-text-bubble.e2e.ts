import { newE2EPage } from '@stencil/core/testing';

describe('crai-text-bubble', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<crai-text-bubble></crai-text-bubble>');

    const element = await page.find('crai-text-bubble');
    expect(element).toHaveClass('hydrated');
  });
});
