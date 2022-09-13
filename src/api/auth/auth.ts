import HTTPTransport from 'core/HTTPTransport';
import {
  LoginRequestInput,
  LoginRequestInputDto,
  SignupRequestInput,
  SignupRequestInputDto,
} from 'models/auth';

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const authAPI = {
  signup: (data: SignupRequestInput) =>
    HTTPTransport.post('/auth/signup', {
      ...options,
      data: JSON.stringify(new SignupRequestInputDto(data)),
    }),

  login: (data: LoginRequestInput) =>
    HTTPTransport.post('/auth/signin', {
      ...options,
      data: JSON.stringify(new LoginRequestInputDto(data)),
    }),

  signOut: () => HTTPTransport.post('/auth/logout', { ...options }),
};
