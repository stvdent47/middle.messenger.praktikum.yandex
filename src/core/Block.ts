import Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import { EventBus } from 'core/eventBus';

type Events = Values<typeof Block.EVENTS>;

export class Block<
  // P extends {
  //   events?: Record<string, () => void>;
  // } = {},
  P = any,
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = uuidv4();
  #element: Nullable<HTMLElement> = null;
  protected children: { [id: string]: Block } = {};
  protected readonly props: P;
  protected state: any = {};
  refs: { [key: string]: Block } = {};
  static componentName: string;
  eventBus: () => EventBus<Events>;

  public constructor(propsAndChildren = {}) {
    const eventBus = new EventBus<Events>();

    const { props, children } = this.#getPropsAndChildren(propsAndChildren);
    this.getStateFromProps(props);
    this.children = children;

    this.props = this.#makePropsProxy({
      ...(props || ({} as P)),
      id: this.id,
    });
    this.state = this.#makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this.#registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  #componentDidMount(props: P) {
    this.#checkInDom();

    this.componentDidMount(props);
  }

  componentDidMount(_props: P) {}

  #componentDidUpdate(prevProps: P, newProps: P) {
    const response = this.componentDidUpdate(prevProps, newProps);
    if (!response || this.#element?.style.display === 'none') {
      return;
    }

    this.#render();
  }

  componentDidUpdate(_prevProps: P, _newProps: P) {
    return true;
  }

  #componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

  #registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this.#componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.#render.bind(this));
  }

  #getPropsAndChildren(propsAndChildren: Record<string, Block | unknown>) {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected getStateFromProps(_props: any): void {
    this.state = {};
  }

  #createResources() {
    this.#element = this.#createDocumentElement('div');
  }

  #checkInDom() {
    const elementInDOM = document.body.contains(this.#element);

    if (elementInDOM) {
      setTimeout(() => {
        this.#checkInDom();
      }, 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  #makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        if (prop.startsWith('_')) {
          throw new Error('No access');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: unknown) {
        if (prop.startsWith('_')) {
          throw new Error('No access');
        }

        const prevProps = { ...target };
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, target);

        return true;
      },

      deleteProperty(target: Record<string, unknown>, prop: string) {
        if (prop.startsWith('_')) {
          throw new Error('No access');
        }

        delete target[prop];

        return true;
      },
    }) as unknown as P;
  }

  #createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  #compile(): DocumentFragment {
    const fragment = document.createElement('template');
    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChildren = stub.childNodes.length ? stub.childNodes : [];
      const content = component.getContent();

      stub.replaceWith(content);

      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChildren.length) {
        layoutContent.append(...stubChildren);
      }
    });

    return fragment.content;
  }

  #addEvents() {
    const { events }: Record<string, () => void> = this.props as any;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this.#element!.addEventListener(event, listener);
    });
  }

  #removeEvents() {
    const { events }: Record<string, () => void> = this.props as any;

    if (!events || !this.#element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this.#element!.removeEventListener(event, listener);
    });
  }

  #render() {
    const fragment = this.#compile();

    this.#removeEvents();
    const newElement = fragment.firstElementChild!;

    this.#element!.replaceWith(newElement);

    this.#element = newElement as HTMLElement;
    this.#addEvents();
  }

  init() {
    this.#createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  setProps = (newProps: Partial<P>) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props!, newProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this.#element;
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  show() {
    this.getContent().style.display = 'flex';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  protected render(): string {
    return '';
  }
}
