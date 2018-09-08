const isEmpty = require('./is-empty');
const Validator = require('validator');

/*
 * Validates new event input
 */

module.exports = validateNewEventInput = (data, owner) => {
	// Hold onto any error(s) encountered
	const errors = {};

	// Validator will throw if passed anything that isn't
	// a string, so pre-validate and default to an empty string
	data.description = !isEmpty(data.description) ? data.description : '';
	data.endDate = !isEmpty(data.endDate) ? data.endDate : '';
	data.endTime = !isEmpty(data.endTime) ? data.endTime : '';
	data.eventType = !isEmpty(data.eventType) ? data.eventType : '';
	owner = !isEmpty(owner) ? owner : '';
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

	if (Validator.isEmpty(owner)) {
		errors.owner = 'Owner field is required;';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required;';
	}

	if (!Validator.isNumeric(data.prize, { no_symbols: true })) {
		errors.prize = 'Not a valid number';
	}

	if (!Validator.isISO8601(data.endDate)) {
		errors.endDate = 'Not a valid date';
	}

	if (Validator.isEmpty(data.endTime)) {
		errors.endTime = 'End time is required';
	}

	if (!Validator.isISO8601(data.startDate)) {
		errors.startDate = 'Not a valid date';
	}

	if (Validator.isEmpty(data.startTime)) {
		errors.startTime = 'Start time is required';
	}

	const newStartDate = new Date(data.startDate);
	const newEndDate = new Date(data.endaDate);

	if (newEndDate < newStartDate) {
		errors.startDate = 'Start date must precede end date';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
