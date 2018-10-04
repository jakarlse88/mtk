// Load article from param id
// Set form fields' initial value to current article values
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getArticle, updateArticle } from '../../actions/contentActions';

/*
 * TODO: refactor
 */

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
		const { content } = this.props;

		return (
			<div className="container">
				<div className="row">
					<div className="col s12 center-align">
						<h2>Edit Article</h2>
						<p className="grey-text center-align">
							<Moment
								format="DD/MM/YYYY - HH:MM"
								date={this.state.articleDate}
							/>
						</p>
					</div>
					{content.articleLoading ? (
						<div className="col s12 center-align">
							<p>
								<i className="fa fa-spinner fa-spin fa-3x" />
							</p>
						</div>
					) : (
						<div className="col s12 center-align">
							<form noValidate onSubmit={this.onSubmit}>
								<div className="row">
									<div className="col s12 m6">
										<div className="input-field left-align">
											<i className="prefix fas fa-user-circle" />
											<input
												id="editorInputId"
												readOnly={true}
												type="text"
												value={this.state.articleEditor}
											/>
											<span className="helper-text">Editor</span>
										</div>
									</div>
									<div className="col s12 m6">
										<div className="input-field left-align">
											<i className="prefix fas fa-tag" />
											<input
												name="articleCategory"
												type="text"
												value={this.state.articleCategory}
												onChange={this.onChange}
											/>
											<span className="helper-text">Category</span>
										</div>
									</div>
									<div className="col s12 left-align">
										<div className="input-field">
											<i className="prefix fas fa-edit" />
											<textarea
												className="materialize-textarea"
												name="articleContent"
												onChange={this.onChange}
												cols="30"
												rows="10"
												value={this.state.articleContent}
											/>
											<span className="helper-text">Content</span>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col s6 right-align">
										<Link to={`/articles/${this.props.match.params.id}`}>
											<button className="btn grey" type="button">
												<i className="fas left fa-arrow-left" />
												Back
											</button>
										</Link>
									</div>
									<div className="col s6 left-align">
										<button
											className="btn blue "
											type="submit"
											onClick={this.onSubmit}>
											<i className="fas fa-edit right" />
											Update article
										</button>
									</div>
								</div>
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
