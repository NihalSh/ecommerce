import { createAction } from 'redux-actions';

export const signIn = createAction('SIGN_IN', (username, password) => (
    fetch('api/auth/', {
	method: 'POST',
	headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	},
	body: `userid=${username}&password=${password}`,
    })
));

