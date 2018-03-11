import actionTypes from '../types';

const login = (dispatch, username, password) => {
  fetch('api/auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `userid=${username}&password=${password}`,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('authentication failed');
  }).then((data) => {
    dispatch({
      type: actionTypes.LOGIN,
      payload: {
        id: username,
        token: data.token,
      },
    });
  }).catch((err) => {
    dispatch({
      type: actionTypes.LOGIN,
      payload: err,
      error: true,
    })
  })
};

export {
  login
};
