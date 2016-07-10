import * as at from 'constants/actionTypes';
import fetch from 'isomorphic-fetch';

export function someAction(msg) {
  return {
    msg,
    type: at.SOME_ACTION,
  };
}

export function receiveLinuxInfo(linuxInfo) {
  return {
    linuxInfo,
    type: at.RECEIVE_LINUX_INFO,
  };
}

export function postLinuxOrder(order) {
  return (dispatch) => {
    fetch('http://localhost:8000/postLinuxOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        linuxOrder: order,
      }),
    }).then((response) => response.json())
      .then((json) => {
        dispatch(receiveLinuxInfo(json.data));
      });
  };
}