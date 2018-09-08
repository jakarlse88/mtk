const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Event schema
 */
const EventSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	endTime: {
		type: String,
		required: true
	},
	eventType: {
		type: String,
		required: true
	},
	owner: {
		type: String,
		isRequired: true
	},
	name: {
		type: String,
		required: true
	},
	prize: {
		type: Number
	},
	startDate: {
		type: Date,
		required: true
	},
	startTime: {
		type: String,
		required: true
	}
});

module.exports = Event = mongoose.model('events', EventSchema);
