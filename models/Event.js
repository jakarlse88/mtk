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
	eventGroup: {
		type: String,
		required: true
	},
	eventType: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	owner: {
		type: String,
		isRequired: true
	},
	participants: [
		{
			participant: {
				type: Schema.Types.ObjectId,
				ref: 'participants'
			}
		}
	],
	prize: {
		type: Number
	},
	schedule: [
		{
			date: {
				type: String,
				required: true
			},
			content: {
				type: String,
				required: true
			}
		}
	]
});

module.exports = Event = mongoose.model('events', EventSchema);
