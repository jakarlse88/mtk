const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * About/Information conten schema
 */
const InformationContentSchema = new Schema({
	author: {
		type: String,
		required: true
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
	style: {
		type: String,
		required: true
	}
});

module.exports = InformationContent = mongoose.model(
	'informationContent',
	InformationContentSchema
);
