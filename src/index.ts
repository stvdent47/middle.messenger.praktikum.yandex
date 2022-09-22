import { Components } from 'components';
import { ComponenstUI } from 'components-ui';
import { Router } from 'core/BrowseRouter';
import { registerComponent } from 'core/registerComponents';
import { Store } from 'core/Store';
import { initApp } from 'services/initApp';
import { initialState } from 'store';
import { getScreenComponent, Screens } from 'utils/screenList';

import './index.css';

[...ComponenstUI, ...Components].forEach((Component) => {
  registerComponent(Component as BlockClass);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(initialState);
  const router = new Router();

  window.store = store;
  window.router = router;

  store.on('changed', (prevState, nextState) => {
    if (process.env.SITE === 'dev') {
      console.info(
        '%cstore updated',
        'background: #222; color: #bada55',
        { prevState },
        { nextState },
      );
    }
  });

  router
    .use('/', getScreenComponent(Screens.Login))
    .use('/login', getScreenComponent(Screens.Login))
    .use('/signup', getScreenComponent(Screens.Register))
    .use('/chats', getScreenComponent(Screens.Chats))
    .use('/profile', getScreenComponent(Screens.Profile))
    .use('/change-password', getScreenComponent(Screens.ChangePassword))
    .use('/500', getScreenComponent(Screens.ServerError))
    .use('*', getScreenComponent(Screens.NotFound))
    .start();

  store.dispatch(initApp);
});
