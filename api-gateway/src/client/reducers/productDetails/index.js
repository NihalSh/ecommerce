import actionTypes from '../../actions/types';

const reducer = (state = { buyingOptions: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS:
      if (action.error === true) {
        return {
          buyingOptions: state.buyingOptions,
          error: true,
          errorMessage: action.payload,
        };
      }
      return {
        buyingOptions: state.buyingOptions,
        ...action.payload,
        error: false,
        errorMessage: null,
      };
    case actionTypes.GET_BUYING_OPTIONS:
      if (action.error === true) {
        return {
          ...state,
          buyingOptions: {
            data: null,
            error: true,
            errorMessage: action.payload,
          },
        };
      }
      return {
        ...state,
        buyingOptions: {
          data: action.payload,
          error: false,
          errorMessage: null,
        },
      };
    default:
      return state;
  }
};

export default reducer;
