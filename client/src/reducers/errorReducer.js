import { CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

const _INITIAL_STATE = {
	errors: null
};

export default (state = _INITIAL_STATE, action) => {
	switch (action.type) {
		case CLEAR_ERRORS:
			return {};
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};
