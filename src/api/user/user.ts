import HTTPTransport from 'core/HTTPTransport';
import {
  ChangePasswordInput,
  ChangePasswordInputDto,
  UpdateUserInput,
  UpdateUserInputDto,
  User,
} from 'models/user';

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const userAPI = {
  getUser: () =>
    HTTPTransport.get('/auth/user', {
      ...options,
    }).then(({ response }) => new User(JSON.parse(response))),

  getUserIdByLogin: (login: string) =>
    HTTPTransport.post('/user/search', {
      ...options,
      data: JSON.stringify({ login }),
      // TODO — сделать отображение списка найденных пользователей при добавлении в чат,
      // обработать ситуацию, когда ни один пользователь не найден
    }).then(({ response }) => new User(JSON.parse(response)[0])),

  updateUser: (data: UpdateUserInput) =>
    HTTPTransport.put('/user/profile', {
      ...options,
      data: JSON.stringify(new UpdateUserInputDto(data)),
    }).then(({ response }) => new User(JSON.parse(response))),

  updateUserAvatar: (data: FormData) =>
    HTTPTransport.put('/user/profile/avatar', {
      withCredentials: true,
      data,
    }).then(({ response }) => new User(JSON.parse(response))),

  changePassword: (data: ChangePasswordInput) =>
    HTTPTransport.put('/user/password', {
      ...options,
      data: JSON.stringify(new ChangePasswordInputDto(data)),
    }).then(({ response }) => response),
};
