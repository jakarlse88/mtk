const express = require('express');
const passport = require('passport');

const router = express.Router();

/*
 * Load Participant model
 */
const Participant = require('../../models/Participant');

/*
 * Load validators
 */

/*
 * @route   GET /api/participants/test
 * @desc    Test /participants route
 * @access  Public
 */
router.get('/test', (req, res) =>
	res.json({ testSuccess: '/participants works' })
);

module.exports = router;
