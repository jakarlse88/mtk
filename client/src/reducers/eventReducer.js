import {
	GET_EVENT,
	SET_EVENT_LOADING,
	GET_EVENTS_ARR
} from '../actions/types';

const initialState = {
	eventLoading: false,
	event: {},
	eventsArr: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_EVENT:
			return {
				...state,
				eventLoading: false,
				event: action.payload
			};
		case GET_EVENTS_ARR:
			return {
				...state,
				eventLoading: false,
				eventsArr: action.payload
			};
		case SET_EVENT_LOADING:
			return {
				...state,
				eventLoading: true
			};
		default:
			return state;
	}
};
