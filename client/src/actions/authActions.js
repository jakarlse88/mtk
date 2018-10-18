import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
	GET_ERRORS,
	CLEAR_ERRORS,
	SET_AUTH_USER
} from '../actions/types';

/*
 * Register user
 */
export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/signup-success'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

/*
 * Login user
 */
export const loginUser = (loginData, history) => dispatch => {
	dispatch({ type: CLEAR_ERRORS });

	axios
		.post('/api/users/login', loginData)
		.then(res => {
			// Save token to localStorage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);

			// Set token to auth header
			setAuthToken(token);

			// Decode token to get user data
			const decoded = jwt_decode(token);

			// Set authUser
			dispatch(setAuthUser(decoded));

			history.push('/dashboard');
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

/*
 * Set logged-in user
 */
export const setAuthUser = user => {
	return {
		type: SET_AUTH_USER,
		payload: user
	};
};

/*
 * Logout user
 */
export const logoutUser = history => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');

	// Remove auth header from future requests
	setAuthToken(false);

	// Set current user to empty object,
	// isAuthenticated will automatically be set to false
	dispatch(setAuthUser(null));

	// Redirect to landing
	if (history) {
		history.push('/');
	}
};
