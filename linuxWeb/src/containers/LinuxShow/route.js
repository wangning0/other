if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import { injectAsyncReducer } from 'store';


export default function createRoutes(store) {
  return {
    path: 'linuxshow',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        injectAsyncReducer(store, 'linuxshow', require('./reducer').default);

        cb(null, require('./LinuxShow').default);
      });
    },
  };
}
