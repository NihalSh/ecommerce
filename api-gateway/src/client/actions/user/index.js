import actionTypes from '../types';

const getAccount = (dispatch, username) => {
  fetch(`/api/account/${username}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('account fetch failed');
    })
    .then((data) => {
      dispatch({
        type: actionTypes.GET_ACCOUNT,
        payload: {
          wallet: data.wallet,
          roles: data.roles,
          id: data.userid,
          name: data.userName,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_ACCOUNT,
        payload: err,
        error: true,
      });
    });
};

const login = (dispatch, username, password) => {
  fetch('/api/auth/', {
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
    getAccount(dispatch, username);
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
    });
  });
};

export default login;
