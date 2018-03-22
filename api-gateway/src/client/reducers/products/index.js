import actionTypes from '../../actions/types';

const reducer = (previousState = { data: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      if (action.error === true) {
        return {
          data: [],
          error: true,
          errorMessage: action.payload,
        };
      }
      return {
        data: action.payload,
        error: false,
        errorMessage: null,
      };
    default:
      return previousState;
  }
};

export default reducer;
