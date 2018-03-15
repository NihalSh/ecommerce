import actionTypes from '../types';

const getProductDetails = dispatch => (productId) => {
  fetch(`/api/products/${productId}`)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS,
        payload: err,
        error: true,
      });
    });
};

export default getProductDetails;
