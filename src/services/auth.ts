import { authAPI, userAPI } from 'api';
import { Dispatch } from 'core/Store';
import { LoginRequestInput, SignupRequestInput } from 'models/auth';
import { responseHasError } from 'utils/apiHasError';
import { Screens } from 'utils/screenList';

export async function signup(
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: SignupRequestInput,
) {
  dispatch({ isLoading: true });

  const response = await authAPI.signup(action);

  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  window.router.go(`/${Screens.Login}`);
}

export async function login(
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: LoginRequestInput,
) {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  const responseUser = await userAPI.getUser();

  dispatch({ isLoading: false });

  if (responseHasError(responseUser)) {
    dispatch(signOut);
    return;
  }

  dispatch({
    user: responseUser,
  });

  window.router.go(`/${Screens.Chats}`);
}

export async function signOut(dispatch: Dispatch<AppState>) {
  dispatch({ isLoading: true });

  await authAPI.signOut();

  dispatch({ isLoading: false, user: null });

  window.router.go(`/${Screens.Login}`);
}
