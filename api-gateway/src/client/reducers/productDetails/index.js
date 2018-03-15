import actionTypes from '../../actions/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS:
      if (action.error === true) {
        return {
          error: true,
          errorMessage: action.payload,
        };
      }
      return {
        ...action.payload,
        error: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
