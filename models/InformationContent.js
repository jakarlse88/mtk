const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * About/Information conten schema
 */
const InformationContentSchema = new Schema({
	author: {
		name: {
			type: String,
			required: true
		},
		id: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true
		}
	},
	lastEditedBy: {
		name: {
			type: String
		},
		id: {
			type: String
		},
		role: {
			type: String
		}
	},
	lastEditedDate: {
		type: Date
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	title: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	}
});

module.exports = InformationContent = mongoose.model(
	'informationContent',
	InformationContentSchema
);
