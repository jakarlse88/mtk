import { combineReducers } from 'redux';

import authReducer from './authReducer';
import contentReducer from './contentReducer';
import eventReducer from './eventReducer';
import errorReducer from './errorReducer';
import usersReducer from './usersReducer';

export default combineReducers({
	auth: authReducer,
	content: contentReducer,
	events: eventReducer,
	errors: errorReducer,
	users: usersReducer
});
