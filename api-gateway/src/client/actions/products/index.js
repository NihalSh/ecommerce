import actionTypes from '../types';

const getProducts = (dispatch) => {
  fetch('api/products')
	  .then(response => response.json())
	  .then((data) => {
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        payload: data,
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        payload: err,
        error: true,
      })
    });
}

export { getProducts };
