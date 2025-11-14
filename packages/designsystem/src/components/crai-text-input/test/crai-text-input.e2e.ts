import { newE2EPage } from '@stencil/core/testing';

describe('crai-text-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<crai-text-input></crai-text-input>');

    const element = await page.find('crai-text-input');
    expect(element).toHaveClass('hydrated');
  });
});
