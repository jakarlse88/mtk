const express = require('express');
const router = express.Router();

/*
 * Test route
 */
router.get('/test', (req, res) => res.json({ msg: '/content works' }));

module.exports = router;
