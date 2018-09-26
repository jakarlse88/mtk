// Load article from param id
// Set form fields' initial value to current article values
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getArticle, updateArticle } from '../../actions/contentActions';

class EditArticle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			articleHeadline: '',
			articleDate: Date.now(),
			articleEditor: '',
			articleCategory: '',
			articleContent: '',
			errors: {}
		};
	}

	componentDidMount = () => {
		this.props.getArticle(this.props.match.params.id);
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.content.article) {
			this.setState({
				articleHeadline: nextProps.content.article.headline,
				articleCategory: nextProps.content.article.category,
				articleContent: nextProps.content.article.content
			});
		}

		if (nextProps.auth.user) {
			this.setState({
				articleEditor: nextProps.auth.user.name
			});
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();

		const updateData = {
			editor: this.state.articleEditor,
			category: this.state.articleCategory,
			content: this.state.articleContent,
			headline: this.state.articleHeadline
		};

		this.props.updateArticle(
			this.props.match.params.id,
			updateData,
			this.props.history
		);
	};

	render() {
		const { content, errors } = this.props;

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 m-auto">
						<h2 className="display-4 text-center mt-4">Edit Article</h2>
						<hr />
					</div>
					{content.articleLoading ? (
						<div className="col-12 m-auto">
							<p className="text-center">
								<span className="badge">
									<i className="fa fa-spinner fa-spin fa-3x" />
								</span>
							</p>
						</div>
					) : (
						<div className="col-12 m-auto">
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-row">
									<div className="col-12 col-md-4">
										<div className="form-group">
											<label htmlFor="editorInputId">Edited by:</label>
											<input
												id="editorInputId"
												readOnly={true}
												type="text"
												className="form-control"
												value={this.state.articleEditor}
											/>
										</div>
									</div>
									<div className="col-12 col-md-4 m-auto">
										<div className="form-group">
											<label htmlFor="categoryInput">Date edited:</label>
											<br />
											<p className="mt-1">
												<Moment
													format="DD/MM/YYYY - HH:MM"
													date={this.state.articleDate}
												/>
											</p>
										</div>
									</div>
									<div className="col-12 col-md-4">
										<div className="form-group">
											<label htmlFor="categoryInput">Category:</label>
											<br />
											<input
												name="articleCategory"
												type="text"
												className="form-control"
												value={this.state.articleCategory}
												onChange={this.onChange}
											/>
											{errors.category ? (
												<small
													id="categoryHelp"
													className="form-text text-danger">
													{errors.category}
												</small>
											) : null}
										</div>
									</div>
									<div className="col-12 m-auto">
										<div className="form-group">
											<label htmlFor="articleContentInput">Text:</label>
											<textarea
												className="form-control"
												name="articleContent"
												onChange={this.onChange}
												cols="30"
												rows="10"
												value={this.state.articleContent}
											/>
											{errors.content ? (
												<small
													id="contentHelp"
													className="form-text text-danger">
													{errors.content}
												</small>
											) : null}
										</div>
									</div>
								</div>
								<p className="text-center">
									<Link to={`/articles/${this.props.match.params.id}`}>
										<button
											className="btn btn-secondary mr-4 mt-4 mb-4"
											type="button">
											<span className="badge">
												<i className="fas fa-arrow-left" />
											</span>
											Back
										</button>
									</Link>
									<button
										className="btn btn-success mt-4 mb-4"
										type="submit"
										onClick={this.onSubmit}>
										Update article
									</button>
								</p>
							</form>
						</div>
					)}
				</div>
			</div>
		);
	}
}

EditArticle.propTypes = {
	auth: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired || PropTypes.string.isRequired,
	getArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	content: state.content,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ getArticle, updateArticle }
)(withRouter(EditArticle));
