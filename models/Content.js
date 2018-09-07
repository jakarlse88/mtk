const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Content schema
 */

const ContentSchema = new Schema({
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
		requierd: true,
		default: Date.now()
	},
	headline: {
		type: String,
		required: true
	}
});

module.exports = Content = mongoose.model('content', ContentSchema);
