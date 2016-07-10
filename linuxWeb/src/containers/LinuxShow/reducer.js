import * as at from 'constants/actionTypes';


const initialState = {
  linuxInfo: '',
};

export default function someReducer(state = initialState, action) {
  switch (action.type) {
    case at.SOME_ACTION:
      return state;
    case at.RECEIVE_LINUX_INFO:
      return Object.assign({}, state, { linuxInfo: action.linuxInfo });
    default:
      return state;
  }
}
