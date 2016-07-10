// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import LinuxShow from 'containers/LinuxShow';

export function createRoutes() {
  return {
    path: '/',
    component: LinuxShow,
  };
}
