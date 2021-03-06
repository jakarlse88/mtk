import { SET_AUTH_USER } from '../actions/types';

const _INITIAL_STATE = {
	authUser: null
};

export default (state = _INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_AUTH_USER:
			return {
				...state,
				authUser: action.payload
			};
		default:
			return state;
	}
};
