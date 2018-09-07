const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

/*
 * Init app
 */
const app = express();

// Don't crash the server
// FIXME: I don't understand why this is necessary
const User = require('./models/User');

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
const users = require('./routes/api/users');
app.use('/api/users', users);

/*
 * Set server to listen
 */
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Express.js app now listening on port ${port}`)
);
