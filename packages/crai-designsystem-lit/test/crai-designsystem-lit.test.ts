import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { CraiDesignsystemLit } from '../src/CraiDesignsystemLit.js';
import '../src/crai-designsystem-lit.js';

describe('CraiDesignsystemLit', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<CraiDesignsystemLit>(html`<crai-designsystem-lit></crai-designsystem-lit>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<CraiDesignsystemLit>(html`<crai-designsystem-lit></crai-designsystem-lit>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<CraiDesignsystemLit>(html`<crai-designsystem-lit header="attribute header"></crai-designsystem-lit>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<CraiDesignsystemLit>(html`<crai-designsystem-lit></crai-designsystem-lit>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
