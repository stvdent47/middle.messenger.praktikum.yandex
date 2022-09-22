import { Store } from 'core/Store';

type WithStoreProps = {
  store: Store<AppState>;
};

export function withStore<P extends WithStoreProps>(
  WrappedBlock: BlockClass<P>,
) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    #onChangeStoreCallback = () => {
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.#onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.#onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, 'store'>>;
}
