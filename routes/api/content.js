const express = require('express');
const passport = require('passport');
const router = express.Router();

const showdown = require('showdown');
const xssFilter = require('showdown-xss-filter');
const converter = new showdown.Converter({ extensions: [xssFilter] });

/*
 * Load models
 */
const ArticleContent = require('../../models/ArticleContent');
const InformationContent = require('../../models/InformationContent');

/*
 * Load validators
 */
const validateArticleEditInput = require('../../validation/update-article');
const validateNewArticleInput = require('../../validation/new-article');
const validateNewInformationInput = require('../../validation/new-info');
const validateInformationEditInput = require('../../validation/update-info');

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
 * @route	GET /api/content/information/:type
 * @desc	Get an infoArticle by type
 * @access 	Public
 */
router.get('/information/:type', (req, res) => {
	// Hold onto any error(s) encountered
	const errors = {};

	InformationContent.findOne({
		type: req.params.type.toUpperCase()
	})
		.then(infoArticle => {
			if (infoArticle) {
				return res.json(infoArticle);
			} else {
				errors.infoArticle = 'Information article not found';
				return res.status(404).json(errors);
			}
		})
		.catch(err => {
			errors.infoArticle = err;
			return res.status(500).json(errors);
		});
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

		const text = converter.makeHtml(req.body.content);

		ArticleContent.findOne({
			author: req.user.name,
			content: text,
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
			content: text,
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
			req.user
		);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		InformationContent.findOne({
			type: req.body.type.toUpperCase()
		})
			.then(article => {
				if (article) {
					return res.status(400).json({
						infoArticle: 'Only one info article is allowed per type'
					});
				}
			})
			.catch(err => {
				console.log(err);
				return;
			});

		const newInfoArticle = new InformationContent({
			author: {
				name: req.user.name,
				id: req.user.id,
				role: req.user.role
			},
			content: req.body.content,
			date: req.body.date,
			title: req.body.title,
			type: req.body.type.toUpperCase()
		});

		newInfoArticle
			.save()
			.then(infoArticle => res.json(infoArticle))
			.catch(err => console.log(err));
	}
);

/*
 * @route   PUT /api/content/article/:id
 * @desc    Update an article item
 * @access  Private
 */
router.put(
	'/articles/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateArticleEditInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		if (req.user.role !== 'admin') {
			errors.role = "'Admin' role required for this functionality";
			return res.status(400).json(errors);
		}

		// Valid input, user auth'd and is admin
		ArticleContent.findById(req.params.id)
			.then(article => {
				// Article not found
				if (!article) {
					errors.article = 'Article not found';
					return res.status(404).json(errors);
				}

				// Article found
				article.content = converter.makeHtml(req.body.content);
				article.date = req.body.date;
				article.editedBy = req.body.editor;
				article.headline = req.body.headline;

				article
					.save()
					.then(article => res.json(article))
					.catch(err => {
						errors.internal = err.response;
						return res.status(500).json(errors);
					});
			})
			.catch(err => {
				errors.internal = err.response;
				return res.status(500).json(errors);
			});
	}
);

/*
 * @route   PUT /api/content/information/:type
 * @desc    Update an info article item by type
 * @access  Private
 */
router.put(
	'/information/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateInformationEditInput(
			req.body,
			req.user
		);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		if (req.user.role !== 'admin') {
			errors.role = '"Admin" role required for this functionality';
			return res.status(400).json(errors);
		}

		InformationContent.findOne({
			type: req.body.type.toUpperCase()
		})
			.then(infoArticle => {
				if (!infoArticle) {
					errors.infoArticle = 'Information article not found';
					return res.status(404).json(errors);
				}

				infoArticle.lastEditedBy = {
					name: req.user.name,
					id: req.user.id,
					role: req.user.role
				};
				infoArticle.content = converter.makeHtml(req.body.content);
				infoArticle.title = req.body.title;
				infoArticle.lastEditedDate = Date.now();

				infoArticle
					.save()
					.then(savedArticle => res.json(savedArticle))
					.catch(err => {
						errors.infoArticle = err;
						return res.status(500).json(errors);
					});
			})
			.catch(err => {
				errors.infoArticle = err;
				return res.status(500).json(errors);
			});
	}
);

module.exports = router;
