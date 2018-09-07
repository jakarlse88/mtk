const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Event schema
 */

const EventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	startTime: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	endTime: {
		type: Date,
		required: true
	},
	eventType: {
		type: String,
		required: true
	},
	prize: {
		type: Number
	}
});

module.exports = Event = mongoose.model('events', EventSchema);
