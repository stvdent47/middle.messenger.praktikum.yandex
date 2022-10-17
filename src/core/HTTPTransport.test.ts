import { expect } from 'chai';
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import { HTTPTransport } from 'core/HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport('http://0.0.0.0');
  });

  afterEach(() => {
    requests.length = 0;
  });

  describe('.get()', () => {
    it('should send a GET request', () => {
      instance.get('/');

      const [request] = requests;

      expect(request.method).to.eq('GET');
    });
  });

  describe('.post()', () => {
    it('should send a POST request', () => {
      instance.post('/');

      const [request] = requests;

      expect(request.method).to.eq('POST');
    });
  });

  describe('.put()', () => {
    it('should send a PUT request', () => {
      instance.put('/');

      const [request] = requests;

      expect(request.method).to.eq('PUT');
    });
  });

  describe('.patch()', () => {
    it('should send a PATCH request', () => {
      instance.patch('/');

      const [request] = requests;

      expect(request.method).to.eq('PATCH');
    });
  });

  describe('.delete()', () => {
    it('should send a DELETE request', () => {
      instance.delete('/');

      const [request] = requests;

      expect(request.method).to.eq('DELETE');
    });
  });
});
