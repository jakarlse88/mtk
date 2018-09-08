import axios from 'axios';

import { GET_ERRORS } from '../actions/types';

/*
 * Create new event
 */
export const createEvent = (eventData, history) => dispatch => {
	axios
		.post('/api/events/new', eventData)
		.then(res => history.push('/create-event-success'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
