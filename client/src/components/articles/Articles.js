import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import ArticleItem from './ArticleItem';
import ArticleSearch from './ArticleSearch';

import { getArticlesArr } from '../../actions/contentActions';

import escapeRegExp from 'escape-string-regexp';

/*
 * TODO: Implement "X results / page"
 */

class Articles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: {},
			errors: {},
			filter: '',
			filteredArticleArr: []
		};
	}

	componentDidMount = () => {
		this.props.getArticlesArr();
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.content) {
			this.setState({
				content: nextProps.content
			});
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	onFilterChange = e => {
		this.setState({
			filter: e.target.value
		});

		this.updateFilter();
	};

	updateFilter = () => {
		const { content, filter } = this.state;
		const query = new RegExp(escapeRegExp(filter), 'i');

		this.setState({
			filteredArticleArr:
				content.articlesArr.length > 0 && filter !== ''
					? content.articlesArr.filter(
							article =>
								query.test(article.title) ||
								query.test(article.category) ||
								query.test(article.author)
					  )
					: content.articlesArr
		});
	};

	render() {
		const { content, errors, filteredArticleArr } = this.state;

		let articleContent;

		if (filteredArticleArr && filteredArticleArr.length) {
			articleContent = (
				<Fragment>
					{filteredArticleArr.map((article, index) => (
						<ArticleItem
							key={index}
							author={article.author}
							category={article.category}
							date={article.date}
							headline={article.headline}
							text={article.text}
						/>
					))}
				</Fragment>
			);
		} else if (content.articlesArr && content.articlesArr.length) {
			articleContent = (
				<Fragment>
					{content.articlesArr.map((article, index) => (
						<ArticleItem
							key={index}
							author={article.author}
							category={article.category}
							date={article.date}
							headline={article.headline}
							text={article.text}
						/>
					))}
				</Fragment>
			);
		}

		if (!filteredArticleArr) {
			articleContent = <p className="text-muted">No articles found.</p>;
		}

		return (
			<div className="container">
				<div className="row mt-4">
					<div className="col-12 m-auto">
						<h2 className="display-4 text-center">News</h2>
						{content.articleLoading && (
							<p className="text-center">
								<span className="badge">
									<i className="fa fa-spinner fa-spin fa-3x" />
								</span>
							</p>
						)}
						<hr />
					</div>
					<div className="col-12 col-lg-9 d-flex justify-content-center justify-content-lg-start">
						<div className="row">
							<div className="col-12">{articleContent}</div>
						</div>
					</div>
					<div className="col-12 col-lg-3 d-flex justify-content-center justify-content-lg-end">
						<div className="row">
							<div className="col-12">
								<ArticleSearch
									value={this.state.filter}
									onFilterChange={this.onFilterChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Articles.propTypes = {
	auth: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getArticlesArr: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	content: state.content
});

export default connect(
	mapStateToProps,
	{ getArticlesArr }
)(Articles);
