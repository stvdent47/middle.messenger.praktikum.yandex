import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from 'core/BrowseRouter';
import { Link } from './Link';

describe('Link', () => {
  it('element should return div', () => {
    const link = new Link({
      router: new Router(),
      to: '/',
      text: 'Test',
    });
    const { element } = link;

    expect(element).to.be.instanceOf(window.HTMLDivElement);
  });

  it('should go to a passed route on click', () => {
    const router = new Router();

    const spy = sinon.spy(router, 'go');
    const link = new Link({
      router: new Router(),
      to: '/',
      text: 'Test',
    });
    const element = link.element as HTMLDivElement;

    element.click();

    expect(spy.callCount).to.eq(1);
  });
});
