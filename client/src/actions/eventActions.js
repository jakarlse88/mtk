import axios from 'axios';

import {
	CLEAR_ERRORS,
	GET_ERRORS,
	GET_EVENT,
	GET_EVENTS_ARR,
	SET_EVENT_LOADING
} from '../actions/types';

/*
 * Create new event
 */
export const createEvent = (eventData, history) => dispatch => {
	dispatch({
		type: CLEAR_ERRORS
	});

	axios
		.post('/api/events/new', eventData)
		.then(res => history.push(`/create-event-success/${res.data._id}`))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

/*
 * Get all events
 */
export const getEventsArr = () => dispatch => {
	dispatch(setEventLoading());

	axios
		.get('/api/events')
		.then(res =>
			dispatch({
				type: GET_EVENTS_ARR,
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

/*
 * Set current event
 */

export const getEvent = eventId => dispatch => {
	dispatch(setEventLoading());

	axios
		.get(`/api/events/${eventId}`)
		.then(res =>
			dispatch({
				type: GET_EVENT,
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

/* 
 * Set loading state
 */
export const setEventLoading = () => {
	return {
		type: SET_EVENT_LOADING
	};
};

/*
 * Clear errors
 */
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
