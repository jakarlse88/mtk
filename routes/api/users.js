const express = require('express');
const router = express.Router();

/*
 * Load User model
 */
const User = require('../../models/User');

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
router.post('/register', (req, res) => {});

module.exports = router;
