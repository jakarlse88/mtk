const bcrypt = require('bcryptjs');
const express = require('express');
const keys = require('../../config/keys');
const router = express.Router();

/*
 * Load User model
 */
const User = require('../../models/User');

/*
 * Load validators
 */
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

/*
 * @route   GET /api/users/test
 * @desc    Test /users route
 * @access  Public
 */
router.get('/test', (req, res) => {
	res.json({
		msg: '/users works'
	});
});

/*
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		email: req.body.email
	}).then(user => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

/*
 * @route   POST /api/users/login
 * @desc    Login a user / return a token
 * @access  Public
 */
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) return res.status(400).json(errors);

	const { email, password } = req.body;

	User.findOne({
		email
	}).then(user => {
		// 404 on no user found
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// Create JWT payload
				const payload = {
					id: user.id,
					name: user.name
				};

				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

module.exports = router;
