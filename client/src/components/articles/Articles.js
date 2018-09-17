import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import ArticleArchive from './ArticleArchive';
import ArticleItem from './ArticleItem';
import ArticleSearch from './ArticleSearch';

import { getArticlesArr } from '../../actions/contentActions';

class Articles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: {},
			errors: {}
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

	render() {
		const { content, errors } = this.state;

		let articleContent;

		// FIXME: centre spinner
		if (content.articleLoading) {
			articleContent = (
				<p className="lead text-center">
					<span className="badge">
						<i className="fa fa-spinner fa-spin fa-3x" />
					</span>
				</p>
			);
		}

		if (content.articlesArr && content.articlesArr.length) {
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

		if (!this.state.content.articlesArr) {
			articleContent = <p className="text-muted">No articles found.</p>;
		}

		return (
			<div className="container">
				<div className="row mt-4">
					<div className="col-12 m-auto">
						<h2 className="display-4 text-center">News</h2>
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
								<ArticleSearch />
								<ArticleArchive />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	content: state.content
});

export default connect(
	mapStateToProps,
	{ getArticlesArr }
)(Articles);
