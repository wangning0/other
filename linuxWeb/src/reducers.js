import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import foo from 'containers/Foo/reducer';
import linuxshow from 'containers/LinuxShow/reducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    foo,
    linuxshow,
    routing: routerReducer,
    ...asyncReducers,
  });
}

