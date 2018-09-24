const express = require('express');
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
const validateNewArticleInput = require('../../validation/new-article');
const validateNewInformationInput = require('../../validation/new-info');

/*
 * Test route
 */
router.get('/test', (req, res) => res.json({ msg: '/content works' }));

/*
 * @route   GET /api/content/articles
 * @desc    Get all articles
 * @access  Public
 */
router.get('/articles', (req, res) => {
	ArticleContent.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => console.log(err));
});

/*
 * @route   GET /api/content/articles/:id
 * @desc    Get a single article
 * @access  Public
 */
router.get('/articles/:id', (req, res) => {
	// Hold onto any error(s) encountered
	const errors = {};

	ArticleContent.findById(req.params.id)
		.then(post => {
			if (post) {
				return res.json(post);
			} else {
				errors.article = 'Article not found';

				return res.status(404).json(errors);
			}
		})
		.catch(err => {
			errors.find = err.message;
			res.status(400).json(errors);
		});
});

/*
 * @route   POST /api/content/articles/new
 * @desc    Create a new article
 * @access  Private
 */
router.post(
	'/articles/new',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateNewArticleInput(
			req.body,
			req.user.name
		);

		if (!isValid) {
			return res.status(400).json(errors);
		}

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

/*
 * @route   POST /api/content/information/new
 * @desc    Create a new information item
 * @access  Private
 */
router.post(
	'/information/new',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateNewInformationInput(
			req.body,
			req.user.name
		);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		InformationContent.findOne({
			author: req.user.name,
			content: req.body.content,
			date: req.body.date,
			title: req.body.title,
			style: req.body.style,
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

		const newArticle = new InformationContent({
			author: req.user.name,
			content: req.body.content,
			date: req.body.date,
			title: req.body.title,
			style: req.body.style,
			category: req.body.category
		});

		newArticle
			.save()
			.then(article => res.json(article))
			.catch(err => console.log(err));
	}
);

module.exports = router;
