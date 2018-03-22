import actionTypes from '../types';

export const getProductDetails = (dispatch, productId) => {
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

export const getBuyingOptions = (dispatch, id) => {
  fetch('/api/buyingoptions')
    .then(response => response.json())
    .then((data) => {
      const filteredData = data.filter(value => value.item_id === id);
      const mappedData = filteredData.map(value => (
        { name: value.seller_id, price: value.price }
      ));
      dispatch({
        type: actionTypes.GET_BUYING_OPTIONS,
        payload: mappedData,
        error: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_BUYING_OPTIONS,
        payload: err,
        error: true,
      });
    });
};

export const addBuyingOptions = (dispatch, body) => {
  fetch('/api/buyingoptions', {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        dispatch({
          type: actionTypes.ADD_BUYING_OPTIONS,
          error: false,
        });
      } else {
        dispatch({
          type: actionTypes.ADD_BUYING_OPTIONS,
          error: true,
          payload: new RangeError('response not OK'),
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.ADD_BUYING_OPTIONS,
        payload: err,
        error: true,
      });
    });
};
