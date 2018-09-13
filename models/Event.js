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
	eventGroup: {
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
	participants: [
		{
			participant: {
				type: Schema.Types.ObjectId,
				ref: 'participants'
			}
		}
	]
});

module.exports = Event = mongoose.model('events', EventSchema);
