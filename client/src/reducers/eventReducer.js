import { SET_EVENT_LOADING, GET_EVENTS_ARR } from '../actions/types';

const initialState = {
	eventLoading: false,
	currentEvent: {},
	eventsArr: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_EVENT_LOADING:
			return {
				...state,
				eventLoading: true
			};
		case GET_EVENTS_ARR:
			return {
				...state,
				eventLoading: false,
				eventsArr: action.payload
			};
		default:
			return state;
	}
};
