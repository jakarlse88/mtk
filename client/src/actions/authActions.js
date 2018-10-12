import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
	GET_ERRORS,
	CLEAR_ERRORS,
	SET_CURRENT_USER,
	SET_USERS
} from '../actions/types';

import { auth, db } from '../firebase';

/*
 * Register user
 */
export const registerUser = (userData, history) => dispatch => {
	const { username, email, password } = userData;

	dispatch({ type: CLEAR_ERRORS });

	auth
		.doCreateUserWithEmailAndPassword(email, password)
		.then(authUser =>
			db.doCreateUser(authUser.user.uid, username, email).then(() => {
				history.push('/signup-success');
			})
		)
		.catch(err =>
			dispatch({ type: GET_ERRORS, payload: err.response.data })
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

			// Set current user
			dispatch(setCurrentUser(decoded));

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
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

/*
 * Set all users
 */
export const setUsers = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });

	db.onceGetUsers()
		.then(snapshot =>
			dispatch({
				type: SET_USERS,
				payload: snapshot.val()
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
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
	dispatch(setCurrentUser({}));

	// Redirect to landing
	if (history) {
		history.push('/');
	}
};
