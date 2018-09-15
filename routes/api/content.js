const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

/*
 * Load models
 */
const ArticleContent = require('../../models/ArticleContent');
const InformationContent = require('../../models/InformationContent');

/*
 * Load validators
 */

/*
 * Test route
 */
router.get('/test', (req, res) => res.json({ msg: '/content works' }));

/*
 * @route   POST /api/content/article/new
 * @desc    Create a new article
 * @access  Private
 */
router.post(
	'/article/new',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// TODO: validation

		ArticleContent.findOne({
			author: req.user.name,
			content: req.body.content,
			date: req.body.date,
			headline: req.body.headline,
			category: req.body.category
		})
			.then(article => {
				if (article) {
					return res.status(400).json({
						articleAlreadyExists: 'Duplicate articles are not allowed'
					});
				}
			})
			.catch(err => console.log(err));

		const newArticle = new ArticleContent({
			author: req.user.name,
			content: req.body.content,
			date: req.body.date,
			headline: req.body.headline,
			category: req.body.category
		});

		newArticle
			.save()
			.then(article => res.json(article))
			.catch(err => console.log(err));
	}
);

module.exports = router;
