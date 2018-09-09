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

/*
 * @route   POST /api/participants/new
 * @desc    Create a new Participant
 * @access  Private
 */
router.post(
	'/new',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// const {errors, isValid} = validateNewParticipantInput(req.body);

		// if (!isIvalid) {
		//     return res.status(400).json(errors);
		// }

		// Only allow unique Participants
		Participant.findOne({
			lastName: req.body.lastName,
			firstName: req.body.firstName,
			dateOfBirth: req.body.dateOfBirth
		})
			.then(participant => {
				if (participant) {
					return res.status(400).json({
						alreadyExists: 'Participant already exists'
					});
				}
			})
			.catch(err => console.log(err));

		const newParticipant = new Participant({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			dateOfBirth: req.body.dateOfBirth,
			geupGrade: req.body.geupGrade,
			danGrade: req.body.danGrade,
			amountPaid: req.body.amountPaid,
			attended: req.body.attended,
			passedGrading: req.body.passedGrading
		});

		newParticipant
			.save()
			.then(participant => res.json(participant))
			.catch(err => console.log(err));
	}
);

module.exports = router;
