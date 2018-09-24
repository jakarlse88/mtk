import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import { getArticle } from '../../actions/contentActions';

class Article extends Component {
	componentDidMount() {
		this.props.getArticle(this.props.match.params.id);
	}

	render() {
		const { auth, content, errors } = this.props;
		let localContent;

		if (errors.article || errors.find) {
			localContent = (
				<div className="col-12 m-auto">
					<span>
						<p className="mt-4 lead text-center text-danger">
							<span className="badge">
								<i className="fas fa-exclamation-triangle fa-3x" /> <br />
								<br />
								<br />
								Oops! Something went wrong. Try again, or contact an admin.
							</span>
						</p>
						<p className="text-center text-muted">
							The following errors were encountered:
						</p>
						{errors.article ? (
							<p className="text-center">{errors.article}</p>
						) : null}
						{errors.find ? (
							<p className="text-center">{errors.find}</p>
						) : null}
					</span>
				</div>
			);
		}

		if (Object.keys(errors).length === 0 && content.article) {
			localContent = (
				<div>
					<h2 className="display-4 text-center mt-4">
						{content.article.headline}
					</h2>
					<p className="text-center">
						<small className="text-muted">
							<Moment
								date={content.article.date}
								format="dddd DD/MM/YYYY, HH:MM"
							/>{' '}
							by {content.article.author}
						</small>
						<br />
						<small className="text-muted">
							Category: {content.article.category}
						</small>
					</p>
					<hr />
					<p>{content.article.text}</p>
				</div>
			);
		}

		return (
			<div className="container">
				<div className="row">
					{content.articleLoading ? (
						<p className="text-center">
							<span className="badge">
								<i className="fa fa-spinner fa-spin fa-3x" />
							</span>
						</p>
					) : (
						<Fragment>
							<div className="col-12 m-auto"> {localContent}</div>
							<div className="col-8 m-auto text-center">
								<Link to="/articles">
									<button className="btn btn-secondary mt-2 mb-4">
										<span className="badge">
											<i className="fas fa-arrow-left" />
										</span>{' '}
										Back
									</button>
								</Link>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		);
	}
}

Article.propTypes = {
	auth: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	content: state.content,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ getArticle }
)(Article);
