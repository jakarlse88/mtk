const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * User schema
 */
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	role: {
		type: String,
		default: 'mod'
	}
});

module.exports = User = mongoose.model('users', UserSchema);
