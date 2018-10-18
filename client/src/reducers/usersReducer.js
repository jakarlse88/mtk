import { SET_USERS } from '../actions/types';

const _INITIAL_STATE = {
	all: null
};

export default (state = _INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_USERS:
			return {
				...state,
				all: action.payload
			};
		default:
			return state;
	}
};
