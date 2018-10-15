import { SET_CURRENT_USER, SET_USERS } from '../actions/types';

const initialState = {
	authUser: null,
	users: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				authUser: action.payload
			};
		case SET_USERS:
			return {
				...state,
				users: action.payload
			};
		default:
			return state;
	}
};
