const isEmpty = require('./is-empty');
const Validator = require('validator');
const adminSecretSauce = require('../config/keys').adminSecretSauce;

/*
 * Validates update user input
 */
module.exports = validateUpdateUserInput = data => {
	// Hold onto any error(s) encountered
	const errors = {};

	// Validator will throw if passed anything that isn't
	// a string, so pre-validate and default to an empty string
	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';
	data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
	data.sauce = !isEmpty(data.sauce) ? data.sauce : '';

	// Validate inputs
	if (!Validator.isLength(data.name, { min: 2, max: 40 })) {
		errors.name = 'Name must be between 2-40 characters long';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be between 6-30 characters';
	}

	if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
		errors.newPassword =
			'New password must be between 6-30 characters';
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm password field is required';
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match';
	}

	if (data.sauce.toLowerCase() !== adminSecretSauce.toLowerCase()) {
		errors.sauce = 'Wrong sauce!';
	}

	if (Validator.isEmpty(data.sauce)) {
		errors.sauce = 'Sauce field is required';
	}

	// Return errors, and a flag set to true if inputs are valid
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
