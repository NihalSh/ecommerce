import actionTypes from '../types';

const addProduct = (dispatch, formData) => {
  fetch('/api/products', {
    method: 'POST',
    body: formData,
  }).then((data) => {
    if (data.ok) {
      dispatch({
        type: actionTypes.ADD_PRODUCT,
        payload: null,
        error: false,
      });
      return;
    }
    throw new RangeError('product data upload failed');
  }).catch((err) => {
    dispatch({
      type: actionTypes.ADD_PRODUCT,
      payload: err,
      error: true,
    });
  });
};

export default addProduct;
