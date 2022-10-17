import { expect } from 'chai';
import { set } from '.';

describe('set function', () => {
  let obj: Record<string, unknown> = {};
  const path = 'path';
  const value = 'value';

  beforeEach(() => {
    obj = {};
  });

  it('should set a value using path to an object', () => {
    set(obj, path, value);
    expect(obj).to.haveOwnProperty(path, value);
  });

  it('should return original object', () => {
    const result = set(obj, path, value);
    expect(result).to.eq(obj);
  });

  it('should return the object itself if it is not of an object type', () => {
    const notAnObject = '';
    const result = set(notAnObject, path, value);
    expect(result).to.eq(notAnObject);
  });

  it('should throw an error if the path arg is not a string type', () => {
    const numberPath = 10;
    // @ts-ignore
    const fn = () => set(obj, numberPath, value);
    expect(fn).to.throw(Error);
  });
});
