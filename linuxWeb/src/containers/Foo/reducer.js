import * as at from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  name: 'foo',
  message: 'hello world',
});

export default function foo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case at.CHANGE_NAME:
      return state.update('name', () => action.name);
    case at.CHANGE_MESSAGE:
      return state.update('message', () => action.message);
    default:
      return state;
  }
}
