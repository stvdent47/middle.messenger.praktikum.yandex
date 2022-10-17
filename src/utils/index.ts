export { merge } from './merge';
export { set } from './set';

export type Indexed<T = any> = {
  [key in string]: T;
};
