const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

/*
 * Init app
 */
const app = express();

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
 * Test route
 */
app.get('/', (req, res) => {
  return res.json({ msg: 'Hello, world!' });
});

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
  console.log(
    `Express.js app now listening on port ${port}`
  )
);
