import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const whichCompose = () => {
	if (process.env.NODE_ENV !== 'production') {
		return compose(
			applyMiddleware(...middleware),
			// Implements the Chrome redux tools extension
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
		);
	} else {
		return compose(applyMiddleware(...middleware));
	}
};

// const store = createStore(reducers, {}, whichCompose());

const store = createStore(
	rootReducer,
	initialState,
	whichCompose()
	// compose(
	//   applyMiddleware(...middleware),
	//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
	//     window.__REDUX_DEVTOOLS_EXTENSION__()
	// )
);

export default store;
