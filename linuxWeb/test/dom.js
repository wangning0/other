import jsdom from 'jsdom';

// setup the simplest document possible
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// get the window object out of the document
const win = doc.defaultView;

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc;
global.window = win;
global.Promise = require('bluebird');

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }

  window.matchMedia = window.matchMedia || function matchMedia() {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  };
}

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win);
