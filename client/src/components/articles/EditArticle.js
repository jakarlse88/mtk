// Load article from param id
// Set form fields' initial value to current article values
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import TurndownService from 'turndown';

import 'react-mde/lib/styles/css/react-mde-all.css';

import InputField from '../common/InputField';

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
			errors: {},
			mdeState: null
		};

		this.converter = new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true
		});
	}

	componentDidMount = () => {
		this.props.getArticle(this.props.match.params.id);
	};

	componentWillReceiveProps = nextProps => {
		if (
			nextProps.content.article.content &&
			nextProps.content.article.headline &&
			nextProps.content.article.category
		) {
			const turndownService = new TurndownService();
			const markdown = turndownService.turndown(
				nextProps.content.article.content
			);

			const mdeState = {
				...this.state.mdeState,
				html: nextProps.content.article.content,
				markdown
			};

			this.setState({
				articleHeadline: nextProps.content.article.headline,
				articleCategory: nextProps.content.article.category,
				mdeState
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

	onEditorChange = mdeState => {
		this.setState({
			mdeState
		});
	};

	onSubmit = e => {
		const { articleEditor, articleCategory, articleHeadline } = this.state;
		const content = this.state.mdeState.html;

		e.preventDefault();

		const updateData = {
			editor: articleEditor,
			category: articleCategory,
			content,
			headline: articleHeadline
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
						<h2>Redigér Artikkel</h2>
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
						<div className="col s12">
							<form noValidate onSubmit={this.onSubmit}>
								<div className="row">
									<div className="col s12 m6">
										<InputField
											icon="user"
											inputId="editorInput"
											labelText="Redigert av"
											name="articleEditor"
											readOnly={true}
											value={this.state.articleEditor}
										/>
									</div>
									<div className="col s12 m6">
										<InputField
											icon="tag"
											inputId="categoryInput"
											labelText="Kategori"
											name="articleCategory"
											value={this.state.articleCategory}
											onChange={this.onChange}
										/>
									</div>
									<div className="col s12 left-align">
										<h5>
											Innhold
											<i className="fas fa-edit left" />
										</h5>
										<ReactMde
											editorState={this.state.mdeState}
											onChange={this.onEditorChange}
											generateMarkdownPreview={markdown =>
												Promise.resolve(this.converter.makeHtml(markdown))
											}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col s6 right-align">
										<Link to={`/articles/${this.props.match.params.id}`}>
											<button className="btn grey" type="button">
												<i className="fas left fa-arrow-left" />
												Tilbake
											</button>
										</Link>
									</div>
									<div className="col s6 left-align">
										<button
											className="btn blue "
											type="submit"
											onClick={this.onSubmit}>
											<i className="fas fa-paper-plane right" />
											Oppdatér artikkel
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
