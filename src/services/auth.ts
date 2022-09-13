import { authAPI } from 'api';
import { userAPI } from 'api/user/user';
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
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await userAPI.getUser();

  dispatch({ isLoading: false, loginFormError: null });

  if (responseHasError(responseUser)) {
    dispatch(signOut);
    return;
  }

  dispatch({
    user: responseUser,
  });

  console.log('before login');
  window.router.go(`/${Screens.Chats}`);
  console.log('after login');
}

export async function signOut(dispatch: Dispatch<AppState>) {
  dispatch({ isLoading: true });

  await authAPI.signOut();

  dispatch({ isLoading: false, user: null });

  window.router.go(`/${Screens.Login}`);
}
