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
			filter: ''
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
	};

	render() {
		const { content, filter } = this.state;
		const query = new RegExp(escapeRegExp(filter), 'i');

		let articlesContent = [];

		if (content.articlesArr) {
			articlesContent = content.articlesArr.filter(
				article =>
					query.test(article.headline) || query.test(article.author)
			);
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<h2 className="center-align">Nyheter</h2>
						<div className="divider" />
					</div>
					{content.articleLoading ? (
						<p className="text-center">
							<span className="badge">
								<i className="fa fa-spinner fa-spin fa-3x" />
							</span>
						</p>
					) : (
						<Fragment>
							<div className="row">
								<div className="col s12 l3 push-l9">
									<ArticleSearch
										value={this.state.filter}
										onFilterChange={this.onFilterChange}
										articlesContent={articlesContent}
									/>
								</div>
								<div className="col s12 l9 pull-l3">
									{articlesContent && articlesContent.length ? (
										articlesContent.map((article, index) => (
											<ArticleItem
												id={article._id}
												key={index}
												author={article.author}
												category={article.category}
												date={article.date}
												headline={article.headline}
												text={article.text}
											/>
										))
									) : content.articlesArr && content.articlesArr.length ? (
										content.articlesArr.map((article, index) => (
											<ArticleItem
												id={article._id}
												key={index}
												author={article.author}
												category={article.category}
												date={article.date}
												headline={article.headline}
												text={article.text}
											/>
										))
									) : (
										<p className="text-muted">No articles found.</p>
									)}
								</div>
							</div>
						</Fragment>
					)}
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
