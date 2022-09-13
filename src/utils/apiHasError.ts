import { APIError } from 'api/types';

export const responseHasError = (response: any): response is APIError =>
  response && response.reason;
