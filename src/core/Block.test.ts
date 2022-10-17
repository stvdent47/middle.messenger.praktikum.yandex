import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { type Block as BlockType } from 'core/Block';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { Block } = proxyquire('./Block', {
  'core/eventBus': {
    EventBus: class {
      on = eventBusMock.on;
      emit = eventBusMock.emit;
    },
  },
}) as { Block: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block {}

  it('should fire an init event on initialization', () => {
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });
});
