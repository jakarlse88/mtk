const bcrypt = require('bcryptjs');
const express = require('express');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
const validateUpdateUserInput = require('../../validation/update-user');

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
 * @route   GET /api/users/
 * @desc    Get all users
 * @access  Private
 */
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.find()
			.then(users => res.json(users))
			.catch(err => {
				return res.status(404).json({ error: 'No users found' });
			});
	}
);

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
 * @route   PUT /api/users/:id
 * @desc    Update an already existing user
 * @access  Private
 */
router.put(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateUpdateUserInput(req.body);

		if (req.user.role !== 'admin') {
			errors.role = "'Admin' role required";
			return res.status(400).json(errors);
		}
		// Invalid input
		if (!isValid) {
			return res.status(400).json(errors);
		}

		// Valid input
		User.findById(req.params.id)
			.then(user => {
				// User not found
				if (!user) {
					errors.user = 'User not found';
					return res.status(404).json(errors);
				}

				// User found
				bcrypt
					.compare(req.body.password, user.password)
					.then(isMatch => {
						if (isMatch) {
							// Update user password
							if (req.body.newPassword) {
								bcrypt
									.genSalt(10)
									.then(salt => {
										bcrypt
											.hash(req.body.newPassword, salt)
											.then(hash => {
												// Update user info
												user.name = req.body.name;
												user.email = req.body.email;
												user.role = req.body.role;
												user.password = hash;

												// Save updated user info
												user
													.save()
													.then(user => res.json(user))
													.catch(err => {
														errors.save = 'Could not save user data';
														return res.status(500).json(errors);
													});
											})
											.catch(err => {
												errors.hash = err;
												return res.status(500).json(errors);
											});
									})
									.catch(err => {
										errors.salt = 'Could not generate salt';
										return res.status(500).json(errors);
									});
							} else {
								// Update user info
								user.name = req.body.name;
								user.email = req.body.email;
								user.role = req.body.role;

								// Save updated user info
								user
									.save()
									.then(user => res.json(user))
									.catch(err => {
										errors.save = 'Could not save user data';
										return res.status(500).json(errors);
									});
							}
						} else {
							errors.password = 'Wrong password';
							return res.status(400).json(errors);
						}
					})
					.catch(err => {
						errors.bcrypt = 'Password compare error';
						return res.status(500).json(errors);
					});
			})
			.catch(err => res.status(500).json(err));
	}
);

/*
 * @route   POST /api/users/login
 * @desc    Login a user / return a token
 * @access  Public
 */
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

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
					name: user.name,
					role: user.role
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
