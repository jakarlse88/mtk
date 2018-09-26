import {
	GET_ARTICLE,
	GET_ARTICLES_ARR,
	SET_ARTICLE_LOADING,
	SET_ARTICLE_NOT_LOADING,
	UPDATE_ARTICLE
} from '../actions/types';

const initialState = {
	article: {},
	articlesArr: [],
	articleLoading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ARTICLE:
			return {
				...state,
				articleLoading: false,
				article: action.payload
			};
		case GET_ARTICLES_ARR:
			return {
				...state,
				articleLoading: false,
				articlesArr: action.payload
			};
		case SET_ARTICLE_LOADING:
			return {
				...state,
				articleLoading: true
			};
		case SET_ARTICLE_NOT_LOADING: {
			return {
				...state,
				articleLoading: false
			};
		}
		case UPDATE_ARTICLE:
			return {
				...state,
				articleLoading: false,
				article: action.payload
			};
		default:
			return state;
	}
};
