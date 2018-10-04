import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import ArticleItem from './ArticleItem';
import ArticleSearch from './ArticleSearch';

import { getArticlesArr } from '../../actions/contentActions';

import escapeRegExp from 'escape-string-regexp';

class Articles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: {},
			errors: {},
			filter: '',
			currentPage: 1,
			itemsPerPage: 5,
			currentItems: [],
			indexOfFirstItem: null,
			indexOfLastItem: null,
			pageNumbers: []
		};
	}

	componentDidMount = () => {
		this.props.getArticlesArr();
	};

	componentWillReceiveProps = nextProps => {
		if (
			nextProps.content &&
			nextProps.content.articlesArr &&
			nextProps.content.articlesArr.length
		) {
			this.setState(prevState => {
				const indexOfLastItem =
					prevState.currentPage * prevState.itemsPerPage;
				const indexOfFirstItem = indexOfLastItem - prevState.itemsPerPage;
				const currentItems = nextProps.content.articlesArr.slice(
					indexOfFirstItem,
					indexOfLastItem
				);

				const pageNumbers = [];

				if (nextProps.content.articlesArr) {
					for (
						let i = 1;
						i <=
						Math.ceil(
							nextProps.content.articlesArr.length / prevState.itemsPerPage
						);
						i++
					) {
						pageNumbers.push(i);
					}
				}

				return {
					content: nextProps.content,
					currentItems,
					indexOfFirstItem,
					indexOfLastItem,
					pageNumbers
				};
			});
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.currentPage !== prevState.currentPage) {
			const indexOfLastItem =
				this.state.currentPage * this.state.itemsPerPage;
			const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
			const currentItems = this.props.content.articlesArr.slice(
				indexOfFirstItem,
				indexOfLastItem
			);

			this.setState({
				indexOfFirstItem,
				indexOfLastItem,
				currentItems
			});
		}
	};

	onPaginationClick = e => {
		this.setState({
			currentPage: Number(e.target.id)
		});
	};

	onFilterChange = e => {
		this.setState({
			filter: e.target.value
		});
	};

	render() {
		const { content, filter, currentItems, pageNumbers } = this.state;
		const query = new RegExp(escapeRegExp(filter), 'i');

		let filteredArticles = [];

		if (content.articlesArr) {
			filteredArticles = content.articlesArr.filter(
				article =>
					query.test(article.headline) || query.test(article.author)
			);
		}

		const renderItems = currentItems.map((article, index) => {
			return (
				<ArticleItem
					id={article._id}
					key={index}
					author={article.author}
					category={article.category}
					date={article.date}
					headline={article.headline}
					text={article.text}
				/>
			);
		});

		const renderFilteredItems = filteredArticles.map((article, index) => {
			console.log('filtered');
			return (
				<ArticleItem
					id={article._id}
					key={index}
					author={article.author}
					category={article.category}
					date={article.date}
					headline={article.headline}
					text={article.text}
				/>
			);
		});

		const renderPageNumbers = pageNumbers.map(number => {
			return (
				<li
					className={classnames({
						'waves-effect': true,
						'waves-blue': true,
						active: number === this.state.currentPage
					})}
					key={number}
					onClick={this.onPaginationClick}>
					<a id={number} href="#!">
						{number}
					</a>
				</li>
			);
		});

		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<h2 className="center-align">Nyheter</h2>
					</div>
					<div className="col s12">
						<ArticleSearch
							value={this.state.filter}
							onFilterChange={this.onFilterChange}
							articlesContent={filteredArticles}
						/>
					</div>
					{content.articleLoading ? (
						<p className="center-align">
							<i className="fa fa-spinner fa-spin fa-3x" />
						</p>
					) : (
						<div className="row">
							<div className="col s12">
								{content.articlesArr && content.articlesArr.length ? (
									<Fragment>
										{filter === '' && (
											<Fragment>
												{renderItems}
												<div className="row">
													<div className="col" />
												</div>
												<ul className="pagination center-align">
													{renderPageNumbers}
												</ul>
											</Fragment>
										)}
										{filter !== '' && renderFilteredItems}
									</Fragment>
								) : (
									<p className="text-muted">No articles found.</p>
								)}
							</div>
						</div>
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
