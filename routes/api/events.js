const express = require('express');
const passport = require('passport');

const router = express.Router();

/*
 * Load Event model
 */
const Event = require('../../models/Event');

/*
 * Load validators
 */
const validateNewEventInput = require('../../validation/new-event');

/*
 * @route   GET /api/events/test
 * @desc    Test /events route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: '/events works' }));

/*
 * @route   POST /api/events/new
 * @desc    Create a new event
 * @access  Private
 */
router.post(
	'/new',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validateNewEventInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newEvent = {
			description: req.body.description,
			endDate: req.body.endDate,
			endTime: req.body.endTime,
			eventType: req.body.eventType,
			name: req.body.name,
			prize: req.body.prize,
			startDate: req.body.startDate,
			startTime: req.body.startTime
		};

		newEvent
			.save()
			.then(event => res.json(event))
			.catch(err => console.log(err));
	}
);

module.exports = router;
