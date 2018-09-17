import axios from 'axios';

import {
	CLEAR_ERRORS,
	GET_ERRORS,
	GET_ARTICLE,
	GET_ARTICLES_ARR,
	SET_ARTICLE_LOADING
} from './types';

/*
 * Get all content of type article
 */
export const getArticlesArr = () => dispatch => {
	dispatch(setArticleLoading());

	axios
		.get('/api/content/articles')
		.then(res =>
			dispatch({
				type: GET_ARTICLES_ARR,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

/*
 * Set article loading state
 */
export const setArticleLoading = () => {
	return {
		type: SET_ARTICLE_LOADING
	};
};

/*
 * Clear errors
 * FIXME: refactor error actions into separate file
 */
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
