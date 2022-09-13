import { userAPI } from 'api';
import { Dispatch } from 'core/Store';
import { UpdateUserInput } from 'models/user';
import { responseHasError } from 'utils/apiHasError';

export async function updateUser(
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UpdateUserInput,
) {
  dispatch({ isLoading: true });

  const response = await userAPI.updateUser(action);

  if (responseHasError(response)) {
    dispatch({ isLoading: true });
    return;
  }

  dispatch({ isLoading: true, user: { ...state.user, ...response } });
}

export async function updateUserAvatar(
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: File,
) {
  dispatch({ isLoading: true });

  const formData = new FormData();
  formData.append('avatar', action);

  const response = await userAPI.updateUserAvatar(formData);

  if (responseHasError(response)) {
    dispatch({ isLoading: true });
    return;
  }

  dispatch({ isLoading: true, user: { ...state.user, ...response } });
}

export async function changePassword(
  dispatch: Dispatch<AppState>,
  _state: AppState,
  {
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  },
) {
  dispatch({ isLoading: true });

  const response = await userAPI.changePassword({ oldPassword, newPassword });
  // TODO — отображение ошибки, если старый пароль неверный
  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({ isLoading: false });
}
