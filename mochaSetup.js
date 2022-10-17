const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<div id="root"></div>', {
  url: 'http://0.0.0.0:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
