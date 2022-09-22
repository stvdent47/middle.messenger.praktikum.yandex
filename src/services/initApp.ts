import { userAPI } from 'api';
import { Dispatch } from 'core/Store';
import { responseHasError } from 'utils/apiHasError';
import { Screens } from 'utils/screenList';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    dispatch({ isLoading: true });

    const response = await userAPI.getUser();

    if (responseHasError(response)) {
      window.router.go(`${Screens.Login}`);
      return;
    }

    dispatch({ user: response });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ isLoading: false, isAppInitiated: true });
  }
}
