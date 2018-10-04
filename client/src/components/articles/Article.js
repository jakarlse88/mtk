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
				<div className="col s12 center-align">
					<span>
						<p className="center-align red-text">
							<i className="fas fa-exclamation-triangle fa-3x" /> <br />
							<br />
							<br />
							Oops! Something went wrong. Try again, or contact an admin.
						</p>
						<p className="center-align grey-text">
							The following errors were encountered:
						</p>
						{errors.article ? (
							<p className="center-align">{errors.article}</p>
						) : null}
						{errors.find ? (
							<p className="center-align">{errors.find}</p>
						) : null}
					</span>
				</div>
			);
		}

		if (Object.keys(errors).length === 0 && content.article) {
			localContent = (
				<div>
					<h2 className="center-align">{content.article.headline}</h2>
					<p className="center-align">
						<small className="grey-text">
							<Moment
								date={content.article.date}
								format="dddd DD/MM/YYYY, HH:MM"
							/>{' '}
							by {content.article.author}
						</small>
						<br />
						<small className="grey-text">
							Category: {content.article.category}
						</small>
					</p>
					<div
						dangerouslySetInnerHTML={{ __html: content.article.content }}
					/>
				</div>
			);
		}

		return (
			<div className="container">
				<div className="row">
					{content.articleLoading ? (
						<p className="center-align">
							<i className="fa fa-spinner fa-spin fa-3x" />
						</p>
					) : (
						<Fragment>
							<div className="col s12 center-align">{localContent}</div>
							<div className="col s6 right-align">
								<Link to="/articles">
									<button className="btn grey waves-effect waves-dark">
										Back
										<i className="fas fa-chevron-circle-left left fa-1x" />
									</button>
								</Link>
							</div>
							<div className="col s6 left-align">
								{auth.isAuthenticated && auth.user.role === 'admin' ? (
									<Link to={`/edit-article/${content.article._id}`}>
										<button className="btn blue waves-effect waves-dark">
											Edit article
											<i className="fas fa-cogs right" />
										</button>
									</Link>
								) : null}
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
