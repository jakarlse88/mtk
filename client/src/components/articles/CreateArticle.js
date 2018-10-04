import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';

import 'react-mde/lib/styles/css/react-mde-all.css';

import InputField from '../common/InputField';

import { postNewArticle } from '../../actions/contentActions';

class CreateArticle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mdeState: null,
			articleAuthor: this.props.auth.user ? this.props.auth.user.name : '',
			articleHeadline: '',
			articleCategory: '',
			errors: {}
		};

		this.converter = new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true
		});
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	onEditorChange = mdeState => {
		this.setState({ mdeState });
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		const { articleAuthor, articleCategory, articleHeadline } = this.state;
		const content = this.state.mdeState.html;

		e.preventDefault();

		const newArticleData = {
			author: articleAuthor,
			category: articleCategory,
			headline: articleHeadline,
			content
		};

		this.props.postNewArticle(newArticleData, this.props.history);
	};

	goBack = () => {
		this.props.history.goBack();
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12 center-align">
						<h2>Ny Artikkel</h2>
					</div>
				</div>
				<form noValidate onSubmit={this.onSubmit}>
					<div className="row">
						<div className="col s12 m6">
							<InputField
								icon="user"
								inputId="userInput"
								labelText="Skrevet av"
								name="articleAuthor"
								placeholder="Ola Nordmann"
								value={this.state.articleAuthor}
								onChange={this.onChange}
								readOnly={true}
							/>
						</div>
						<div className="col s12 m6">
							<InputField
								icon="wrench"
								inputId="categoryInput"
								labelText="Kategori"
								name="articleCategory"
								placeholder="Taekwondo"
								value={this.state.articleCategory}
								onChange={this.onChange}
							/>
						</div>
						<div className="col s12">
							<InputField
								icon="heading"
								inputId="headlineInput"
								labelText="Overskrift"
								name="articleHeadline"
								placeholder="Treningstider Høst 2018"
								value={this.state.articleHeadline}
								onChange={this.onChange}
							/>
						</div>
					</div>
					<div className="col s12">
						<div className="row">
							<div className="col s12">
								<h5>
									<i className="fas fa-pen left" />
									Tekst
								</h5>
							</div>
						</div>
						<ReactMde
							editorState={this.state.mdeState}
							onChange={this.onEditorChange}
							generateMarkdownPreview={markdown =>
								Promise.resolve(this.converter.makeHtml(markdown))
							}
						/>
					</div>
					<div className="row">
						<div className="col s12" />
					</div>
					<div className="row">
						<div className="col s12 m6 right-align">
							<button
								onClick={this.goBack}
								type="button"
								className="btn grey waves-effect waves-dark">
								<i className="fas fa-arrow-left left" />
								Tilbake
							</button>
						</div>
						<div className="col s12 m6 left-align">
							<button
								type="submit"
								onClick={this.onSubmit}
								className="btn blue waves-effect waves-dark">
								<i className="fas fa-paper-plane right" />
								Opprett artikkel
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

CreateArticle.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	postNewArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ postNewArticle }
)(withRouter(CreateArticle));
