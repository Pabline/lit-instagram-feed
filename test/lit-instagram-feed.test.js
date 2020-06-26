import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import { stub } from 'sinon';
import * as response from './response.js'

import '../lit-instagram-feed.js';

describe('LitInstagramFeed', () => {
  it('Should call getUserFeed on start', async () => {
    const request = body => {
      const mockResponse = new Response(JSON.stringify(body), {
        status: 200
      });
      return Promise.resolve(mockResponse);
    }
    const spy = stub(window, "fetch").returns(Promise.resolve(request(response.default)));
    await fixture(html`
      <lit-instagram-feed .token=${'asdasd'}></lit-instagram-feed>
    `);


    await aTimeout(100);
    expect(spy).to.have.been.called;
    spy.restore();
  });

  it('Should print images if fetch its ok', async () => {
    const title = 'title';
    const subtitle = 'subtitle';
    const request = body => {
      const mockResponse = new Response(JSON.stringify(body), {
        status: 200
      });
      return Promise.resolve(mockResponse);
    }
    const spy = stub(window, "fetch").returns(Promise.resolve(request(response.default)));
    const el = await fixture(html`
      <lit-instagram-feed .token=${'123123'} .title=${title} .subtitle=${subtitle}></lit-instagram-feed>
    `);

    await aTimeout(1);
    expect(spy).to.have.been.called;
    expect(el.shadowRoot.querySelector('.title').innerText).to.equal(title);
    expect(el.shadowRoot.querySelector('.subtitle').innerText).to.equal(subtitle);
    expect(el.shadowRoot.querySelector('.posts-container')).to.exist;
    spy.restore();
  });

  it('When isnt token must show error message', async () => {
    const el = await fixture(html`
      <lit-instagram-feed></lit-instagram-feed>
    `);
    const message = el.shadowRoot.querySelector('p');

    expect(message.id).to.equal('error-token');
  });

  it('When token is wrong or server error should show loading', async () => {
    const el = await fixture(html`
    <lit-instagram-feed .token=${'123123'}></lit-instagram-feed>
  `);

  const message = el.shadowRoot.querySelector('p');

  expect(message.id).to.equal('loading');
  });
});
