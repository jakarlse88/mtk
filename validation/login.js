const Validator = require('validator');
const isEmpty = require('./is-empty');

/*
 * Validates login input
 */
module.exports = validateLoginInput = data => {
	// Hold onto any error(s) encountered
	const errors = {};

	// Validator will throw if passed anything that isn't
	// a string, so pre-validate and default to an empty string
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// Validate inputs
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
