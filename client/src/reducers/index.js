import { combineReducers } from 'redux';

import authReducer from './authReducer';
import eventReducer from './eventReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	auth: authReducer,
	events: eventReducer,
	errors: errorReducer
});
