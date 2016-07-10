import 'normalize.css';
import 'styles/App.css';
import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'store';
import { createRoutes } from 'routes';
import { Router, hashHistory as historyProvider, match } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';


const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

export const store = configureStore(historyProvider, {});
const routes = createRoutes(store);
export const history = syncHistoryWithStore(historyProvider, store);

match({ routes, location }, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    window.document.getElementById('app')
  );
});

