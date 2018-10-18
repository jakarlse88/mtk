import axios from 'axios';

import { GET_ERRORS, SET_USERS } from './types';

/*
 * Fetch all users
 */
export const getAllUsers = () => dispatch => {
	axios
		.get('/api/users')
		.then(res =>
			dispatch({
				type: SET_USERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
