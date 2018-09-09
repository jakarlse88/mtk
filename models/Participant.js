const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Participant schema
 */
const ParticipantSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: Date,
		required: true
	},
	geupGrade: {
		type: Number,
		max: 9,
		min: 1
	},
	danGrade: {
		type: Number,
		max: 9,
		min: 1
	},
	amountPaid: {
		type: Number
	},
	attended: {
		type: Boolean
	},
	passedGrading: {
		type: Boolean
	}
});

module.exports = Participant = mongoose.model(
	'participants',
	ParticipantSchema
);
