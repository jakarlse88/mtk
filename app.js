const bodyParser = require('body-parser');
const express = require('express');

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
 * Test route
 */
app.get('/', (req, res) => {
  return res.json({ msg: 'Hello, world!' });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Express.js app now listening on port ${port}`
  )
);
