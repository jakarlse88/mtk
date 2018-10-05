import axios from 'axios';

import {
	CLEAR_ERRORS,
	GET_ERRORS,
	GET_ARTICLE,
	GET_ARTICLES_ARR,
	GET_INFO_ARTICLE,
	POST_NEW_ARTICLE,
	SET_ARTICLE_LOADING,
	SET_ARTICLE_NOT_LOADING,
	UPDATE_ARTICLE
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
 * Get a single content of type article
 */
export const getArticle = id => dispatch => {
	dispatch(clearErrors());
	dispatch(setArticleLoading());

	axios
		.get(`/api/content/articles/${id}`)
		.then(res =>
			dispatch({
				type: GET_ARTICLE,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
			dispatch(setArticleNotLoading());
		});
};

/*
 * Get a single info article
 */
export const getInfoArticle = type => dispatch => {
	dispatch(clearErrors());
	dispatch(setArticleLoading());

	axios
		.get(`/api/content/information/${type}`)
		.then(res =>
			dispatch({
				type: GET_INFO_ARTICLE,
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
 * Post a new article
 */
export const postNewArticle = (newArticleData, history) => dispatch => {
	dispatch(clearErrors());
	dispatch(setArticleLoading());

	axios
		.post('/api/content/articles/new', newArticleData)
		.then(res => {
			dispatch({
				type: POST_NEW_ARTICLE,
				payload: res.data
			});

			history.push(`/articles/${res.data._id}`);
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

/*
 * Update/edit an article
 */
export const updateArticle = (id, updateData, history) => dispatch => {
	dispatch(clearErrors());
	dispatch(setArticleLoading());

	axios
		.put(`/api/content/articles/${id}`, updateData)
		.then(res => {
			dispatch({
				type: UPDATE_ARTICLE,
				payload: res.data
			});

			history.push(`/articles/${id}`);
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

/*
 * Set article loading state to true
 */
export const setArticleLoading = () => {
	return {
		type: SET_ARTICLE_LOADING
	};
};

/*
 * Set article loading state to false
 */
export const setArticleNotLoading = () => {
	return {
		type: SET_ARTICLE_NOT_LOADING
	};
};

/*
 * Clear errors
 */
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
