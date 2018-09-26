const isEmpty = require('./is-empty');
const Validator = require('validator');

/*
 * Validates new article input
 */

module.exports = validateArticleEditInput = data => {
	// Hold onto any error(s) encountered
	const errors = {};

	// Validator only does strings, so pre-
	// validate and default to an empty string
	data.editor = !isEmpty(data.editor) ? data.editor : '';
	data.content = !isEmpty(data.content) ? data.content : '';
	data.headline = !isEmpty(data.headline) ? data.headline : '';
	data.category = !isEmpty(data.category) ? data.category : '';

	// Validate inputs
	if (Validator.isEmpty(data.editor)) {
		errors.editor = 'Editor is required';
	}

	if (Validator.isEmpty(data.content)) {
		errors.content = 'Content is required';
	}

	if (Validator.isEmpty(data.headline)) {
		errors.headline = 'Headline is required';
	}

	if (Validator.isEmpty(data.category)) {
		errors.category = 'Category is required';
	}

	// Return any errors,
	// and a flag set to true if inputs are valid
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
