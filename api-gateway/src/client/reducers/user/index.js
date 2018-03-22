import actionTypes from '../../actions/types';

const reducer = (previousState = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      if (action.error === true) {
        return {
          ...previousState,
          error: true,
          errorMessage: action.payload,
        };
      }
      return {
        ...previousState,
        ...action.payload,
        error: false,
        errorMessage: null,
      };
    case actionTypes.LOGOUT:
      return {};
    default:
      return previousState;
  }
};

export default reducer;
