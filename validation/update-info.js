const isEmpty = require('./is-empty');
const Validator = require('validator');

const informationTypes = require('./informationTypes');

/*
 * Validates new article input
 */

module.exports = validateInformationEditInput = (data, author) => {
	// Hold onto any error(s) encountered
	const errors = {};

	// Validator only does strings, so pre-
	// validate and default to an empty string
	author = !isEmpty(author) ? author : '';
	data.content = !isEmpty(data.content) ? data.content : '';
	data.title = !isEmpty(data.title) ? data.title : '';
	data.type = !isEmpty(data.type) ? data.type : '';

	// Validate inputs
	if (Validator.isEmpty(author.name)) {
		errors.author = 'Author name is required';
	}

	if (Validator.isEmpty(author.id)) {
		errors.author = 'Author ID is required';
	}

	if (Validator.isEmpty(author.role)) {
		errors.author = 'Author role is required';
	}

	if (Validator.isEmpty(data.content)) {
		errors.content = 'Content is required';
	}

	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title is required';
	}

	if (Validator.isEmpty(data.type)) {
		errors.type = 'Type is required';
	}

	console.log(data.type);
	if (
		Object.values(informationTypes).indexOf(data.type.toUpperCase()) === -1
	) {
		errors.type = 'Invalid type';
	}

	// Return any errors,
	// and a flag set to true if inputs are valid
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
