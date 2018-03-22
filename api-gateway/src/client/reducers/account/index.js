import actionTypes from '../../actions/types';

const reducer = (previousState = { roles: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_ACCOUNT:
      if (action.error === true) {
        return {
          roles: [],
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
      return {
        roles: [],
      };
    default:
      return previousState;
  }
};

export default reducer;
