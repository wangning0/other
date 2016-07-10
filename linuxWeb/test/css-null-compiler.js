function noop() {
  return null;
}

require.extensions['.styl'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.less'] = noop;
require.extensions['.css'] = noop;

