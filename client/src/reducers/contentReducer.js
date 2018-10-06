import {
	GET_ARTICLE,
	GET_ARTICLES_ARR,
	GET_INFO_ARTICLE,
	POST_NEW_ARTICLE,
	SET_ARTICLE_LOADING,
	UPDATE_ARTICLE,
	UPDATE_INFO_ARTICLE
} from '../actions/types';

const initialState = {
	article: {},
	articlesArr: [],
	articleLoading: false,
	infoArticle: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ARTICLE:
			return {
				...state,
				articleLoading: false,
				article: action.payload
			};
		case GET_INFO_ARTICLE:
			return {
				...state,
				articleLoading: false,
				infoArticle: action.payload
			};
		case GET_ARTICLES_ARR:
			return {
				...state,
				articleLoading: false,
				articlesArr: action.payload
			};
		case POST_NEW_ARTICLE:
			return {
				...state,
				articleLoading: false,
				article: action.payload
			};
		case SET_ARTICLE_LOADING:
			return {
				...state,
				articleLoading: true
			};
		case UPDATE_ARTICLE:
			return {
				...state,
				articleLoading: false,
				article: action.payload
			};
		case UPDATE_INFO_ARTICLE:
			return {
				...state,
				articleLoading: false,
				infoArticle: action.payload
			};
		default:
			return state;
	}
};
