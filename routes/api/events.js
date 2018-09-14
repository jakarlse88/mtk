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
 * @route   GET /api/events
 * @desc    Get all events
 * @access  Public
 */
router.get('/', (req, res) => {
	Event.find()
		.sort({
			date: -1
		})
		.then(posts => res.json(posts))
		.catch(err =>
			res.status(404).json({ noEventsFound: 'No events found' })
		);
});

/*
 * @route   GET /api/events/:id
 * @desc    Get specific event by id
 * @access  Public
 */
router.get('/:id', (req, res) => {
	Event.findById(req.params.id)
		.then(event => res.json(event))
		.catch(err =>
			res.status(404).json({ noEventFound: 'No event found' })
		);
});

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
		const { errors, isValid } = validateNewEventInput(
			req.body,
			req.user.name
		);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		Event.findOne({
			name: req.body.name,
			description: req.body.description
		})
			.then(event => {
				if (event) {
					return res.status(400).json({
						alreadyExists: 'An event with that name already exists'
					});
				}
			})
			.catch(err => console.log(err));

		const newEvent = new Event({
			description: req.body.description,
			eventGroup: req.body.eventGroup,
			eventType: req.body.eventType,
			eventType: req.body.eventType,
			owner: req.user.name,
			name: req.body.name,
			prize: req.body.prize,
			schedule: req.body.schedule
		});

		newEvent
			.save()
			.then(event => res.json(event))
			.catch(err => console.log(err));
	}
);

module.exports = router;
