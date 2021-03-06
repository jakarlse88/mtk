const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const content = require('./routes/api/content');
const events = require('./routes/api/events');
const participants = require('./routes/api/participants');
const users = require('./routes/api/users');

/*
 * Init app
 */
const app = express();

// Don't crash the server
// FIXME: I don't (quite) understand why this is necessary
const ArticleContentModel = require('./models/ArticleContent');
const InformationContentModel = require('./models/InformationContent');
const EventModel = require('./models/Event');
const ParticipantModel = require('./models/Participant');
const UserModel = require('./models/User');

/*
 * Body parser middleware
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * Connect to DB
 */
const db = require('./config/keys').mongoURI;

mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB/mlab connected'))
	.catch(err => console.log(err));

/*
 * Passport
 */
app.use(passport.initialize());
require('./config/passport')(passport);

/*
 * Routes
 */
app.use('/api/content', content);
app.use('/api/events', events);
app.use('/api/participants', participants);
app.use('/api/users', users);

/*
 * Serve static assets in production
 */
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

/*
 * Set server to listen
 */
const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log(`Express.js app now listening on port ${port}`)
);
