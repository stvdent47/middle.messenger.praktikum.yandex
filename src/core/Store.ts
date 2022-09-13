import { EventBus } from 'core/eventBus';

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any,
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any,
) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  #state: State = {} as State;

  constructor(initialState: State) {
    super();

    this.#state = initialState;
  }

  public getState() {
    return this.#state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.#state };

    this.#state = { ...this.#state, ...nextState };

    this.emit('changed', prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.#state, payload);
    } else {
      this.set({ ...this.#state, ...nextStateOrAction });
    }
  }
}
