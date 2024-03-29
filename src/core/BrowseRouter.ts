import { Block } from 'core/Block';
import { renderDOM } from 'core/renderDOM';
// import { isEqual } from 'utils/isEqual';

function isPathEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

export class Route<P = any> {
  #pathname: string;
  #blockClass: BlockClass<P>;
  #block: Nullable<Block> = null;
  #props: Props;

  constructor(pathname: string, view: BlockClass<P>, props: Props) {
    this.#pathname = pathname;
    this.#blockClass = view;
    this.#props = props;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this.#block) {
      this.#block.hide();
    }
  }

  public match(pathname: string) {
    return isPathEqual(pathname, this.#pathname);
  }

  public render() {
    renderDOM('#root', new this.#blockClass(this.#props as P));
  }
}

export class Router {
  static __instance: Router;
  #routes: Route[] = [];
  #history: History = window.history;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  public use<P>(pathname: string, block: BlockClass<P>, props: Props = {}) {
    const route = new Route(pathname, block, props);
    this.#routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (evt: PopStateEvent) => {
      // @ts-ignore
      this.#onRoute(evt.currentTarget?.location.pathname);
    };

    this.#onRoute(window.location.pathname);
  }

  public getRoute(pathname: string): Route | undefined {
    const route = this.#routes.find((route) => route.match(pathname));
    return route || this.#routes.find((route) => route.match('*'));
  }

  #onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    route.render();
  }

  public go(pathname: string, state: unknown = {}) {
    this.#history.pushState(state, '', pathname);
    this.#onRoute(pathname);
  }

  public back() {
    this.#history.back();
  }

  public forward() {
    this.#history.forward();
  }
}
