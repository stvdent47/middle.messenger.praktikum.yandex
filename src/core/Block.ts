import Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';

import { EventBus } from './eventBus';

type BlockMeta<P = any> = {
  props: P;
};

type Events = Values<typeof Block.EVENTS>;

export class Block<
  P extends {
    events?: Record<string, () => void>;
  } = {},
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = uuidv4();
  private readonly _meta: Nullable<BlockMeta> = null;
  protected _element: Nullable<HTMLElement> = null;
  protected children: { [id: string]: Block } = {};
  protected readonly props: P;
  // protected state: any = {};
  refs: { [key: string]: Block } = {};
  static componentName: string;
  eventBus: () => EventBus<Events>;

  public constructor(propsAndChildren = {}) {
    const eventBus = new EventBus<Events>();

    const { props, children } = this._getPropsAndChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props,
    };

    this.props = this._makePropsProxy({
      ...(props || ({} as P)),
      id: this.id,
    });
    // this.state = this._makePropsProxy(this.state);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _getPropsAndChildren(propsAndChildren: Record<string, Block | unknown>) {
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

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(prevProps: P, newProps: P) {
    const response = this.componentDidUpdate(prevProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(_prevProps: P, _newProps: P) {
    return true;
  }

  setProps = (newProps: P) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props!, newProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
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

  _makePropsProxy(props: any) {
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

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _compile() {
    const fragment = document.createElement('template');
    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({
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

      const layoutContent = content?.querySelector('[data-layout="1"]');

      if (layoutContent && stubChildren.length) {
        layoutContent.append(...stubChildren);
      }
    });

    return fragment.content;
  }

  _addEvents() {
    // const { events = {} } = this.props;
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _removeEvents() {
    // const { events = {} } = this.props;
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
