const isEmpty = require('./is-empty');
const Validator = require('validator');

/*
 * Validates new article input
 */

module.exports = validateNewInformationInput = (data, author) => {
	// Hold onto any error(s) encountered
	const errors = {};

	// Validator only does strings, so pre-
	// validate and default to an empty string
	author = !isEmpty(author) ? author : '';
	data.content = !isEmpty(data.content) ? data.content : '';
	data.title = !isEmpty(data.title) ? data.title : '';
	data.category = !isEmpty(data.category) ? data.category : '';
	data.style = !isEmpty(data.style) ? data.style : '';

	// Validate inputs
	if (Validator.isEmpty(author)) {
		errors.author = 'Author is required';
	}

	if (Validator.isEmpty(data.content)) {
		errors.content = 'Content is required';
	}

	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title is required';
	}

	if (Validator.isEmpty(data.category)) {
		errors.category = 'Category is required';
	}

	if (Validator.isEmpty(data.style)) {
		errors.style = 'Style is required';
	}

	// Return any errors,
	// and a flag set to true if inputs are valid
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
