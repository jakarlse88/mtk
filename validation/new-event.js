const isEmpty = require('./is-empty');
const Validator = require('validator');

/*
 * Validates new event input
 */

module.exports = validateNewEventInput = data => {
	// Hold onto any error(s) encountered
	const errors = {};

	// Validator will throw if passed anything that isn't
	// a string, so pre-validate and default to an empty string
	data.description = !isEmpty(data.description) ? data.description : '';
	data.endDate = !isEmpty(data.endDate) ? data.endDate : '';
	data.endTime = !isEmpty(data.endTime) ? data.endTime : '';
	data.eventType = !isEmpty(data.eventType) ? data.eventType : '';
	data.name = !isEmpty(data.name) ? data.name : '';
	data.prize = !isEmpty(data.prize) ? data.prize : '';
	data.startDate = !isEmpty(data.startDate) ? data.startDate : '';
	data.startTime = !isEmpty(data.startTime) ? data.startTime : '';

	// Validate inputs
	if (!Validator.isLength(data.description, { min: 5, max: 140 })) {
		errors.description =
			'Description must be between 5-140 characters long';
	}

	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description field is required';
	}

	if (Validator.isEmpty(data.eventType)) {
		errors.eventType = 'Event type field is required';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required;';
	}

	if (Validator.isEmpty(data.prize)) {
		errors.prize = 'Prize field is required';
	}

	if (typeof data.prize !== 'number') {
		errors.prize = 'Not a valid number';
	}

	if (!data.endDate instanceof Date) {
		errors.endDate = 'Not a valid date';
	}

	if (!data.endTime instanceof Date) {
		errors.endTime = 'Not a valid time';
	}

	if (!data.startDate instanceof Date) {
		errors.startDate = 'Not a valid date';
	}

	if (!data.startTime instanceof Date) {
		errors.startTime = 'Not a valid time';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
