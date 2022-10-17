import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './BrowseRouter';

describe('Router', () => {
  const router = new Router();

  beforeEach(() => {
    getContentFake.callCount = 0;
  });

  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({
        currentTarget: window,
      } as unknown as PopStateEvent);
    }
  };

  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({
        currentTarget: window,
      } as unknown as PopStateEvent);
    }
  };

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockClass;

  describe('.use()', () => {
    it('should return a Router instance', () => {
      const result = router.use('/', BlockMock);

      expect(result).to.eq(router);
    });
  });

  describe('.start()', () => {
    it('should render a start page', () => {
      router.use('/', BlockMock).start();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  describe('.back()', () => {
    it('should render a page on history back action', () => {});

    window.location.pathname = '/chats';

    router.use('/', BlockMock).start();

    window.location.pathname = '/';

    expect(getContentFake.callCount).to.eq(1);
  });
});
