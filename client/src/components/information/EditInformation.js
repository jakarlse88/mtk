import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import TurndownService from 'turndown';

import 'react-mde/lib/styles/css/react-mde-all.css';

import InputField from '../common/InputField';

import {
	getInfoArticle,
	updateInfoArticle
} from '../../actions/contentActions';

class EditInformation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			articleTitle: '',
			articleContent: '',
			articleEditor: '',
			errors: {},
			mdeState: null
		};

		this.converter = new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true
		});
	}

	componentDidMount = () => {
		this.props.getInfoArticle(this.props.match.params.type.toUpperCase());
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.auth) {
			this.setState({
				articleEditor: {
					name: nextProps.auth.user.name,
					id: nextProps.auth.user.id,
					role: nextProps.auth.user.role
				}
			});
		}

		if (
			nextProps.content.infoArticle.content &&
			nextProps.content.infoArticle.title
		) {
			const turndownService = new TurndownService();
			const markdown = turndownService.turndown(
				nextProps.content.infoArticle.content
			);

			const mdeState = {
				...this.state.mdeState,
				html: nextProps.content.infoArticle.content,
				markdown
			};

			this.setState({
				articleTitle: nextProps.content.infoArticle.title,
				mdeState
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
		e.preventDefault();

		const { articleEditor, articleTitle } = this.state;
		const content = this.state.mdeState.html;
		const { type } = this.props.match.params;

		const updateData = {
			lastEditedBy: articleEditor,
			title: articleTitle,
			content
		};

		this.props.updateInfoArticle(type, updateData, this.props.history);
	};

	render() {
		const { content } = this.props;

		return (
			<div className="container">
				<div className="row">
					<div className="col s12 center-align">
						<h2>Redigér Informasjonsartikkel</h2>
					</div>
				</div>

				{content.articleLoading ? (
					<div className="row">
						<div className="col s12 center-align">
							<i className="fa fa-spinner fa-spin fa-3x" />
						</div>
					</div>
				) : (
					<div className="row">
						<form noValidate onSubmit={this.onSubmit}>
							<div className="col s12 m5">
								<InputField
									icon="user"
									inputId="editorInput"
									labelText="Redigert av"
									name="articleEditor"
									readOnly={true}
									value={this.props.auth.user.name}
								/>
							</div>
							<div className="col s12 m7">
								<InputField
									icon="tag"
									inputId="titleInput"
									labelText="Tittel"
									name="articleTitle"
									value={this.state.articleTitle}
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
							<div className="row">
								<div className="col" />
							</div>
							<div className="col s6 right-align">
								<Link to={`/information/${this.props.match.params.type}`}>
									<button className="btn grey" type="button">
										<i className="fas left fa-arrow-left" />
										Tilbake
									</button>
								</Link>
							</div>
							<div className="col s6 left-align">
								<button
									className="btn blue waves-effect waves-dark"
									type="submit"
									onClick={this.onSubmit}>
									<i className="fas fa-paper-plane right" />
									Oppdatér
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		);
	}
}

EditInformation.propTypes = {
	auth: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getInfoArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	content: state.content,
	errors: state.errors,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getInfoArticle, updateInfoArticle }
)(withRouter(EditInformation));
