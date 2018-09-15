const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Article content schema
 */
const ArticleContentSchema = new Schema({
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
	},
	category: {
		type: String,
		required: true
	}
});

module.exports = ArticleContent = mongoose.model(
	'articleContent',
	ArticleContentSchema
);
