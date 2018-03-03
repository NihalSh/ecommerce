import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { signIn } from './actionCreators';

const user = handleActions({
    [signIn] (state, action) {
	console.log(action);
	return state;
    }, 
}, {
    isSignedIn: false,
});


const reducer = combineReducers({
    user,
});

export default reducer;
